const validator = require("validator");

const mysql = require('mysql');

/* connect to admin account database */
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'test'
});

function userValidate(id, telephone, address, name, loanmaster, accountmaster) {
    if(!(validator.isAlphanumeric(id) && validator.isAlphanumeric(telephone) && validator.matches(address, /^[^']*$/)
            && validator.matches(name, /^[^']*$/) && validator.isAlphanumeric(loanmaster) && validator.isAlphanumeric(accountmaster))) {
        return({code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && validator.isLength(telephone, {min:1, max:20}) &&
            validator.isLength(address, {min:1, max:50}) && validator.isLength(name, {min:1, max:20} &&
            validator.isLength(loanmaster, {min:1, max:20}) && validator.isLength(accountmaster, {min:1, max:20})))) {
        return({code: 400, msg: 'illegal parameter length'});
    } else {
        return({code: 500});
    }
}

function addAccountValidate(query){
    const id = query.id.trim();
    const ratio = query.ratio.trim();
    const ctype = query.ctype.trim();
    const credit = query.credit.trim();
    const atype = query.atype.trim();
    const left = query.left.trim();
    if(!(validator.isAlphanumeric(id) && validator.isNumeric(left) && parseFloat(left) >=0
            && (atype==='支票账户' || validator.isNumeric(ratio) && validator.matches(ctype, /^[^']*$/)) &&
            (atype==='储蓄账户' || validator.isNumeric(credit) && parseFloat(credit) > 0) )) {
        return({valid: false, code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && (atype === '支票账户' || validator.isLength(ctype, {min:1, max:20}) ))) {
        return({valid: false, code: 400, msg: 'illegal parameter length'});
    } else {
        return({valid: true, code: 500});
    }
}

function delAccountValidate(query){
    return({valid: true, msg: ''});
}

function modAccountValidate(query){
    const id = query.id.trim();
    const ratio = query.ratio.trim();
    const ctype = query.ctype.trim();
    const credit = query.credit.trim();
    const atype = query.atype.trim();
    const left = query.left.trim();
    if(!(validator.isAlphanumeric(id) && validator.isNumeric(left) && parseFloat(left) >=0
            && (atype==='支票账户' || validator.isNumeric(ratio) && validator.matches(ctype, /^[^']*$/)) &&
            (atype==='储蓄账户' || validator.isNumeric(credit) && parseFloat(credit) > 0) )) {
        return({valid: false, code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && (atype === '支票账户' || validator.isLength(ctype, {min:1, max:20}) ))) {
        return({valid: false, code: 400, msg: 'illegal parameter length'});
    } else {
        return({valid: true, code: 500});
    }
}

function filterAccountValidate(id, atype, ctype){
    if(!( (id ==='' ||validator.isAlphanumeric(id)) && (ctype==='' ||validator.matches(ctype, /^[^']*$/)))) {
        return({valid: false, code: 400, msg: 'having illegal parameters'});
    } else {
        return({valid: true, code: 500});
    }
}

function addLoanValidate(id, bank, times, money) {
    if(!(validator.isAlphanumeric(id)  && validator.matches(bank, /^[^']*$/) &&
            validator.matches(times, /^[0-9]*$/) && parseInt(times) > 0 &&
            validator.isNumeric(money) && parseFloat(money) > 0)) {
        return({valid: false, code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && validator.isLength(bank, {min:1, max:20}) )) {
        return({valid: false, code: 400, msg: 'illegal parameter length'});
    } else {
        return({valid: true, code: 500});
    }
}

function filterLoanValidate(id, bank) {
    if(!(validator.isAlphanumeric(id)  && validator.matches(bank, /^[^']*$/))){
        return({valid: false, code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && validator.isLength(bank, {min:1, max:20}) )) {
        return({valid: false, code: 400, msg: 'illegal parameter length'});
    } else {
        return({valid: true, code: 500});
    }
}

function delLoanValidate(query){
    return({valid: true, msg: ''});
}

function addLinkValidate(atype, id, bname, account){
    if(!(validator.isAlphanumeric(id) && validator.matches(bname, /^[^']*$/) && validator.isAlphanumeric(account))){
        return({valid: false, code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && validator.isLength(bname, {min:1, max:20})
        && validator.isLength(account, {min:1, max:20}))) {
        return({valid: false, code: 400, msg: 'illegal parameter length'});
    } else {
        return({valid: true, code: 200, msg: ''});
    }
    /*
    db.query('SELECT * FROM 客户 WHERE 客户身份证号 ="' + id + '"', function(err, resData) {
        if (err) {
            console.error(err);
            res.valid = false;
            res.msg = 'Internal Error';
        } else if(resData.length === 0) {
            res.valid = false;
            res.msg = 'no such account';
        } else {
            res.valid = true;
            res.msg = '';
        }
    });
    db.query('SELECT * FROM 支行 WHERE 支行名字 ="' + bname + '"', function(err, resData) {
        if (err) {
            console.error(err);
            res.valid = false;
            res.msg = 'Internal Error';
        } else if(resData.length === 0) {
            res.valid = false;
            res.msg = 'no such bank';
        } else {
            res.valid = true;
            res.msg = '';
        }
    });
    db.query('SELECT * FROM all_account_info WHERE 户号="' + account + '"', function(err, resData) {
        if (err) {
            console.error(err);
            res.valid = false;
            res.msg = 'Internal Error';
        } else if(resData.length === 0) {
            res.valid = false;
            res.msg = 'no such account';
        } else {
            res.valid = true;
            res.msg = '';
        }
    });
     */
}

function delLinkValidate(query) {
    return {valid: true, msg: ''};
}

module.exports = {
    userValidate,
    addAccountValidate,
    delAccountValidate,
    modAccountValidate,
    filterAccountValidate,
    addLoanValidate,
    filterLoanValidate,
    delLoanValidate,
    addLinkValidate,
    delLinkValidate,
}