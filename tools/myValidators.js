const validator = require("validator");

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

module.exports = {
    userValidate,
    addAccountValidate,
    delAccountValidate,
    modAccountValidate,
    filterAccountValidate,

    delLoanValidate
}