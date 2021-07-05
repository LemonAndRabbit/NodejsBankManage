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

/* GET users listing. */
router.get('/', function(req, res, next) {
    switch(req.query.action) {
        case 'del':
            console.log(req.query);
            const check = validator.delLinkValidate(req.query);
            if(!check.valid) {
                res.status(400).send({code: 400, msg: check.msg});
            } else {
                db.query('DELETE FROM ' + req.query.atype + ' WHERE 客户身份证号="' + req.query.id + '" and 支行名字="' + req.query.bname + '"', function (err, Data) {
                    if(err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        res.redirect('/link');
                    }
                });
            }
            break;
        default:
            db.query('SELECT * FROM all_link_info', function (err, resultData) {
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    res.render('link.ejs', {formData: resultData});
                }
            });
    }
});

/* POST Method */
router.post('/', function(req, res) {
    console.log(req.body);
    var atype = req.body.atype;
    var id = req.body.id;
    var bname = req.body.bname;
    var account = req.body.account;
    //var check = validator.addLinkValidate(atype, id, bname);
    console.log('INSERT INTO ' + atype + ' VALUE("' + id + '","' + bname
        + '","' + account + '","' + dater.format(new Date(), 'YYYY-MM-DD HH:mm') + '")');

    db.query('INSERT INTO ' + atype + ' VALUE("' + id + '","' + bname
        + '","' + account + '","' + dater.format(new Date(), 'YYYY-MM-DD HH:mm') + '")', function (err, data){
        if(err) {
            console.log(err);
            res.status(500).send({code: 500, msg: 'database error'}).end();
        } else {
            res.redirect('/link');
        }
    });
});

module.exports = router;