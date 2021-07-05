const validator = require('./myValidators');

const dater = require('silly-datetime');

function userFilter(req){
    const id = req.query.id.trim();
    const telephone = req.query.telephone.trim();
    const address = req.query.address.trim();
    const name = req.query.name.trim();
    const check = validator.userValidate(id?id:'000', telephone?telephone:'000', address?address:'000',
        name?name:'000');
    if(check.code!==500)
        return {correctness: false, dialog: check.msg};
    var query = '';
    if(id)
        query = query + '客户身份证号="' + id + '"';
    if(telephone){
        if(query !== '')
            query = query + ' and ';
        query = query + '客户联系电话="' + telephone + '"';
    }
    if(address){
        if(query !== '')
            query = query + ' and ';
        query = query + '客户家庭住址="' + address + '"';
    }
    if(name){
        if(query !== '')
            query = query + ' and ';
        query = query + '客户姓名="' + name + '"';
    }

    if(query)
        query = ' WHERE ' + query;
    return {correctness: true, dialog: query, oldFilterData: {id: id, telephone: telephone,
            address: address, name: name}};
}

function accountFilter(query) {
    const id = query.id.trim();
    const atype = query.atype.trim();
    const ctype = query.ctype.trim();
    const check = validator.filterAccountValidate(id?id:'000', atype?atype:'储蓄账户', ctype?ctype:'JPY');
    if(!check.valid)
        return ({correctness: false, msg: check.msg});
    var filter = '';
    if(id)
        filter = filter + '户号="' + id + '"';
    if(atype){
        if(filter !== '')
            filter = filter + ' and ';
        filter = filter + '账户类型="' + atype + '"';
    }
    if(ctype){
        if(filter !== '')
            filter = filter + ' and ';
        filter = filter + '货币类型="' + ctype + '"';
    }

    if(filter)
        filter = ' WHERE ' + filter;
    return {correctness: true, dialog: filter, oldFilterData: {id: id, atype: atype, ctype: ctype}};
}

function loanFilter(query) {
    const id = query.id.trim();
    const bank = query.bank.trim();
    const status = query.status.trim();
    const check = validator.filterAccountValidate(id?id:'000', bank?bank:'000', status?status:'未支付');
    if(!check.valid)
        return ({correctness: false, msg: check.msg});
    var filter = '';
    if(id)
        filter = filter + '贷款号="' + id + '"';
    if(bank){
        if(filter !== '')
            filter = filter + ' and ';
        filter = filter + '支行名字="' + bank + '"';
    }
    if(status){
        if(filter !== '')
            filter = filter + ' and ';
        filter = filter + '支付状态="' + status + '"';
    }

    if(filter)
        filter = ' WHERE ' + filter;
    return {correctness: true, dialog: filter, oldFilterData: {id: id, bank: bank, status: status}};
}

function statFilter(query) {
    const business =  query.business.trim();
    const year = parseInt(query.year.trim());
    const quarter = parseInt(query.quarter.trim());
    const month = parseInt(query.month.trim());

    var startDate = new Date();
    var endDate = new Date();
    var res;

    if(quarter === 0 && month === 0) {
        startDate.setFullYear(year, 0, 1);
        startDate.setHours(0,0,0);
        endDate.setFullYear(year+1, 1-1,1);
        endDate.setHours(0,0,0);
    } else if(quarter !== 0) {
        startDate.setFullYear(year, quarter*3-3, 1);
        startDate.setHours(0,0,0);
        if(quarter===4) {
            endDate.setFullYear(year+1, 0,1);
            endDate.setHours(0,0,0);
        } else {
            endDate.setFullYear(year, quarter*3,1);
            endDate.setHours(0,0,0);
        }
    } else {
        startDate.setFullYear(year, month-1, 1);
        startDate.setHours(0,0,0);
        if(month === 12) {
            endDate.setFullYear(year+1, 0,1);
            endDate.setHours(0,0,0);
        } else {
            endDate.setFullYear(year, month,1);
            endDate.setHours(0,0,0);
        }
    }
    var res = {filter1: '', filter2: '', filter3: '', filter: ''};
    if(business === '储蓄业务') {
        res.filter1 = 'SELECT count(distinct 客户身份证号) as 客户数, 支行名字 FROM bank_account_info WHERE 开户日期 BETWEEN "'
            + dater.format(startDate, "YYYY-MM-DD HH:mm") + '" and "'
            + dater.format(endDate, "YYYY-MM-DD HH:mm") + '"'
            + 'GROUP BY 支行名字';
        res.filter2 = 'SELECT sum(余额) as 业务量, 支行名字 from dis_bank_account_info WHERE 开户日期 BETWEEN "'
            + dater.format(startDate, "YYYY-MM-DD HH:mm") + '" and "'
            + dater.format(endDate, "YYYY-MM-DD HH:mm") + '"'
            + 'GROUP BY 支行名字';
        res.filter3 = 'SELECT a.支行名字, 客户数, 业务量 from (\n' + res.filter1 + ') a,(\n' + res.filter2 + ') b\n'
            + 'WHERE a.支行名字=b.支行名字';
        res.filter = 'SELECT 支行.支行名字 as 支行名字, 客户数, 业务量 from 支行 left outer join (\n' + res.filter3 + ') c\n'
            + 'on 支行.支行名字=c.支行名字';
        console.log(res.filter);
    } else {
        res.filter1 = 'SELECT count(distinct 客户身份证号) as 客户数, 支行名字 from bank_loan_info WHERE 款项日期 BETWEEN "'
            + dater.format(startDate, "YYYY-MM-DD HH:mm") + '" and "'
            + dater.format(endDate, "YYYY-MM-DD HH:mm") + '"'
            + 'GROUP BY 支行名字';
        res.filter2 = 'SELECT sum(款项金额) as 业务量, 支行名字 from dis_bank_loan_info WHERE 款项日期 BETWEEN "'
            + dater.format(startDate, "YYYY-MM-DD HH:mm") + '" and "'
            + dater.format(endDate, "YYYY-MM-DD HH:mm") + '"'
            + 'GROUP BY 支行名字';
        res.filter3 = 'SELECT a.支行名字, 客户数, 业务量 from (\n' + res.filter1 + ') a,(\n' + res.filter2 + ') b\n'
            + 'WHERE a.支行名字=b.支行名字';
        res.filter = 'SELECT 支行.支行名字 as 支行名字, 客户数, 业务量 from 支行 left outer join (\n' + res.filter3 + ') c\n'
            + 'on 支行.支行名字=c.支行名字';
        console.log(res.filter);
    }
    return {correctness: true, filter: res.filter,
        oldFilterData: {business: business, year: year, quarter: quarter, month: month}};
}
module.exports = {
    userFilter,
    accountFilter,
    loanFilter,
    statFilter
}