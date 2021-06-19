const validator = require('./myValidators');

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

module.exports = {
    userFilter,
    accountFilter,
    loanFilter
}