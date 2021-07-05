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
const defaultFilterData = {id: ''};

/* GET users listing. */
router.get('/', function(req, res, next) {
    switch(req.query.action) {
        case 'del':
            const check = validator.delLoanValidate(req.query);
            if(!check.valid) {
                res.status(400).send({code: 400, msg: check.msg});
            } else {
                db.query('DELETE FROM 贷款持有者关系' + ' WHERE 贷款号="' + req.query.id + '"', function (err, Data) {
                    if(err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        db.query('DELETE FROM 款项 WHERE 贷款号="' + req.query.id+'"', function (err, resultData) {
                            if(err) {
                                console.error(err);
                                res.status(500).send({code: 500, msg: 'database error'});
                            } else {
                                db.query('DELETE FROM 贷款 WHERE 贷款号="' + req.query.id+'"', function (err, resultData) {
                                    if(err) {
                                        console.error(err);
                                        res.status(500).send({code: 500, msg: 'database error'});
                                    } else {
                                        res.redirect('/loans');
                                    }
                                });
                            }
                        });
                    }
                });
            }
            break;
        case 'give':
            db.query('SELECT * FROM all_loan_info WHERE 贷款号="' + req.query.id + '"', function (err, resultData) {
                if(err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'});
                } else if(resultData.length === 0) {
                    res.status(400).send({code: 400, msg: 'parameters error'}).end();
                } else {
                    db.query('SELECT * FROM all_loan_info', function (err, allData) {
                       if(err) {
                           console.error(error);
                           res.status(500).send({code: 500, msg: 'database error'}).end();
                       } else {
                           res.render('loans.ejs', {formData: allData, oldFilterData: defaultFilterData, giveData: resultData});
                       }
                    });
                }
            });
            break;
        case 'link':
            db.query('SELECT * FROM all_loan_info WHERE 贷款号="' + req.query.id + '"', function (err, resultData) {
                if(err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'});
                } else if(resultData.length === 0) {
                    res.status(400).send({code: 400, msg: 'parameters error'}).end();
                } else {
                    db.query('SELECT * FROM all_loan_info', function (err, allData) {
                        if(err) {
                            console.error(error);
                            res.status(500).send({code: 500, msg: 'database error'}).end();
                        } else {
                            res.render('loans.ejs', {formData: allData, oldFilterData: defaultFilterData, linkData: resultData});
                        }
                    });
                }
            });
            break;
        case 'filter':
            const filterRes = filter.loanFilter(req.query);
            if(filterRes.correctness === false){
                res.status(400, filterRes.dialog);
            } else {
                const oldFilterData = filterRes.oldFilterData;
                db.query('SELECT * FROM all_loan_info' + filterRes.dialog, function (err, resultData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.render('loans.ejs', {formData: resultData, oldFilterData: oldFilterData});
                    }
                });
            }
            break;
        default:
            db.query('SELECT * FROM all_loan_info', function (err, resultData) {
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    res.render('loans.ejs', {formData: resultData, oldFilterData: defaultFilterData});
                }
            });
    }
});

/* POST Method */

router.post('/', function(req, res) {
    console.log(req.body);
    //发放贷款
    if(req.body.give) {
        db.query('SELECT * FROM all_loan_info WHERE 贷款号="' + req.body.give + '"', function(err, resData) {
            if (err) {
                console.error(err);
                res.status(500).send({code: 500, msg: 'database error'}).end();
            } else if (resData.length === 0){
                res.status(500).send({code: 500, msg: 'loan not found'}).end();
            } else if(resData[0].应支付次数 === resData[0].已支付次数){
                res.status(500).send({code: 500, msg: '已达最大支付次数'}).end();
            } else if(parseFloat(req.body.money) + resData[0].已支付金额 > resData[0].贷款额) {
                res.status(500).send({code: 500, msg: '非法支付金额'}).end();
            } else {
                console.log( 'INSERT INTO 款项 VALUES("' + req.body.give + '",' + (resData[0].已支付次数+1) + '",' + req.body.money + ',"'
                    + dater.format(new Date(), 'YYYY-MM-DD HH:mm') + '")');
                console.log('here!');
                db.query('INSERT INTO 款项 VALUES("' + req.body.give + '","' + (resData[0].已支付次数+1) + '",' + req.body.money + ',"'
                    + dater.format(new Date(), 'YYYY-MM-DD HH:mm') + '")', function (err, data){
                    if(err) {
                        console.log(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        res.redirect('/loans');
                    }
                });
            }
        });
    } else if(req.body.link) {
        db.query('SELECT * FROM all_loan_info WHERE 贷款号="' + req.body.link + '"', function(err, resData) {
            if (err) {
                console.error(err);
                res.status(500).send({code: 500, msg: 'database error'}).end();
            } else if (resData.length === 0){
                res.status(500).send({code: 500, msg: 'loan not found'}).end();
            } else {
                db.query('SELECT * FROM 客户 WHERE 客户身份证号="' + req.body.id +'"', function(err, check2Data) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else if (resData.length === 0){
                        res.status(500).send({code: 500, msg: 'id not found'}).end();
                    } else {
                        console.log( 'INSERT INTO 贷款持有者关系 VALUES("' + req.body.link + '","' + req.body.id + '")');
                        console.log('here!');
                        db.query('INSERT INTO 贷款持有者关系 VALUES("' + req.body.link + '","' + req.body.id + '")'
                            , function (err, data){
                            if(err) {
                                console.log(err);
                                res.status(500).send({code: 500, msg: 'database error'}).end();
                            } else {
                                res.redirect('/loans');
                            }
                        });
                    }
                })
            }
        });
    } else { //添加贷款
        var id = req.body.id;
        var bank = req.body.bank;
        var times = req.body.times;
        var money = req.body.money;
        const check = validator.addLoanValidate(id, bank, times, money);
        if(!check.valid) {
            const msg = check.msg;
            res.status(400).send({code: 400, msg: msg});
        } else {
            db.query('INSERT INTO 贷款 VALUES(' + money + ',"' + id + '","' + bank + '",' + times + ')', function(err, Data) {
                if(err) {
                    console.log(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    res.redirect('/loans');
                }
            });
        }
    }
});

module.exports = router;