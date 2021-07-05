const express = require('express');
const router = express.Router();

const dater = require('silly-datetime');
const mysql = require('mysql');
const validator = require('../tools/myValidators');
const filter = require('../tools/myFilters');

/* connect to admin account database */
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'test'
});

/* default FilterData*/
const defaultFilterData = {type: '',id: ''};

/* GET users listing. */
router.get('/', function(req, res, next) {
    switch(req.query.action) {
        case 'del':
            const check = validator.delAccountValidate(req.query);
            if(!check.valid) {
                res.status(400).send({code: 400, msg: check.msg});
            } else {
                db.query('DELETE FROM ' + req.query.atype + ' WHERE 户号="' + req.query.id + '"', function (err, Data) {
                    if(err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        db.query('DELETE FROM 银行账户 WHERE 户号="' + req.query.id+'"', function (err, resultData) {
                            if(err) {
                                console.error(err);
                                res.status(500).send({code: 500, msg: 'database error'});
                            } else {
                                res.redirect('/accounts');
                            }
                        });
                    }
                });
            }
            break;
        case 'mod':
            db.query('SELECT * FROM all_account_info WHERE 户号="' + req.query.id + '"', function (err, modData){
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else if(modData.length === 0) {
                    res.status(400).send({code: 400, msg: 'parameters error'}).end();
                } else {
                    db.query('SELECT * FROM all_account_info', function (err, allData) {
                        if (err) {
                            console.error(err);
                            res.status(500).send({code: 500, msg: 'database error'}).end();
                        } else {
                            res.render('accounts.ejs', {formData: allData, modData: modData, oldFilterData: defaultFilterData});
                        }
                    });
                }
            });
            break;
        case 'filter':
            const filterRes = filter.accountFilter(req.query);
            if(filterRes.correctness === false){
                res.status(400, filterRes.dialog);
            } else {
                const oldFilterData = filterRes.oldFilterData;
                db.query('SELECT * FROM all_account_info' + filterRes.dialog, function (err, resultData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.render('accounts.ejs', {formData: resultData, oldFilterData: oldFilterData});
                    }
                });
            }
            break;
        default:
            db.query('SELECT * FROM all_account_info', function (err, resultData) {
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    res.render('accounts.ejs', {formData: resultData, oldFilterData: defaultFilterData});
                }
            });
    }
});

/* POST Method */
router.post('/', function(req, res) {
    console.log(req.body);
    const id = req.body.id.trim();
    const atype = req.body.atype.trim();
    const ratio = req.body.ratio.trim();
    const ctype = req.body.ctype.trim();
    const credit = req.body.credit.trim();
    if( !(id && atype)) {
        res.status(400).send({code: 400, msg: 'missing parameters'}).end();
    } else if (req.body.modified){
        const check = validator.modAccountValidate(req.body);
        if(!check.valid){
            const msg = check.msg;
            res.status(400).send({code: 400, msg: msg});
        } else {
            if(atype === '储蓄账户'){
                db.query('UPDATE 储蓄账户 SET 利率=' + ratio + ', 货币类型="' + ctype + '" WHERE 户号="' + id + '"', function (err, Data) {
                    if(err) {
                        console.log(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.redirect('/accounts');
                    }
                })
            } else {
                db.query('UPDATE 支票账户 SET 透支额=' + credit + ' WHERE 户号="' + id + '"', function (err, Data) {
                    if(err) {
                        console.log(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.redirect('/accounts');
                    }
                })
            }
        }
    } else {
        const check = validator.addAccountValidate(req.body);
        if( !check.valid){
            const msg = check.msg;
            res.status(400).send({code: 400, msg: msg});
        } else {
            db.query('INSERT INTO 银行账户(户号, 余额, 开户日期) VALUES("' + id + '", ' + 0 + ',"' +
                dater.format(new Date(), 'YYYY-MM-DD HH:mm') + '")', function (err ,Data) {
                if(err) {
                    console.log(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    if(atype === '储蓄账户') {
                        db.query('INSERT INTO 储蓄账户(户号, 利率, 货币类型) VALUES("' + id + '", ' + ratio + ', "' +
                            ctype + '")', function (err, Data){
                            if(err) {
                                console.log(err);
                                res.status(500).send({code: 500, msg: 'database error'}).end();
                            } else {
                                res.redirect('/accounts');
                            }
                        });
                    } else {
                        db.query('INSERT INTO 支票账户(户号, 透支额) VALUES("' + id + '", ' + credit + ')', function (err, Data){
                            if(err) {
                                console.log(err);
                                res.status(500).send({code: 500, msg: 'database error'}).end();
                            } else {
                                res.redirect('/accounts');
                            }
                        });
                    }
                }
            });
        }
    }
});

module.exports = router;