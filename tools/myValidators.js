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

function userValidate(id, telephone, address, name) {
    if(!(validator.isAlphanumeric(id) && validator.isAlphanumeric(telephone) && validator.isAlphanumeric(address)
        && validator.isAlphanumeric(name))) {
        return({code: 400, msg: 'having illegal parameters'});
    } else if(!(validator.isLength(id, {min:1, max:20}) && validator.isLength(telephone, {min:1, max:20}) &&
        validator.isLength(address, {min:1, max:20}) && validator.isLength(name, {min:1, max:20}) )) {
        return({code: 400, msg: 'illegal parameter length'});
    } else {
        return({code: 500});
    }
}

function addAccountValidate(query){
    return({valid: true, msg: ''});
}

function delAccountValidate(query){
    return({valid: true, msg: ''});
}

function modAccountValidate(query){
    return({valid: true, msg: ''});
}

function filterAccountValidate(id, atype, ctype){
    return({valid: true, msg: ''});
}

function delLoanValidate(query){
    return({valid: true, msg: ''});
}

function addLinkValidate(atype, id, bname){
    var res;
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
    return res;
}

function delLinkValidate(query) {
    return {valid: true, msg: ''};
}

function addLoanValidate(id, bank, times, money) {
    return {valid: true, msg: ''};
}

module.exports = {
    userValidate,
    addAccountValidate,
    delAccountValidate,
    modAccountValidate,
    filterAccountValidate,

    delLoanValidate,

    addLinkValidate,
    delLinkValidate,

    addLoanValidate
}