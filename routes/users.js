const express = require('express');
const router = express.Router();

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
const defaultFilterData = {id: '', telephone: '', address: '', name: ''};

/* GET users listing. */
router.get('/', function(req, res, next) {
    switch(req.query.action) {
        case 'del':
            console.log('prepare to delete id=' + req.query.id);
            db.query('DELETE FROM 联系人信息 WHERE 客户身份证号="' + req.query.id + '"', function (err,resultData) {
                if(err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'});
                } else {
                    db.query('DELETE FROM 客户 WHERE 客户身份证号="' + req.query.id+'"', function (err, resultData) {
                        if(err) {
                            console.error(err);
                            res.status(500).send({code: 500, msg: 'database error'});
                        } else {
                            res.redirect('/users');
                        }
                    });
                }
            });
            break;
        case 'mod':
            console.log('prepare to modify id=' + req.query.id);
            db.query('SELECT * FROM 客户 WHERE 客户身份证号="' + req.query.id + '"', function (err, modData){
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else if(modData.length == 0) {
                    res.status(400).send({code: 400, msg: 'parameters error'}).end();
                } else {
                    db.query('SELECT * FROM 客户', function (err, allData) {
                        if (err) {
                            console.error(err);
                            res.status(500).send({code: 500, msg: 'database error'}).end();
                        } else {
                            res.render('users.ejs', {formData: allData, modData: modData, oldFilterData: defaultFilterData});
                        }
                    });
                }
            });
            break;
        case 'filter':
            const filterRes = filter.userFilter(req);
            if(filterRes.correctness === false){
                res.status(400, filterRes.dialog);
            } else {
                const oldFilterData = filterRes.oldFilterData;
                db.query('SELECT * FROM 客户' + filterRes.dialog, function (err, resultData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        console.log(resultData);
                        res.render('users.ejs', {formData: resultData, oldFilterData: oldFilterData});
                    }
                });
            }
            break;
        default:
            db.query('SELECT * FROM 客户', function (err, resultData) {
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    console.log(resultData);
                    res.render('users.ejs', {formData: resultData, oldFilterData: defaultFilterData});
                }
            });
    }
});

/* POST Method */
router.post('/', function(req, res) {
    var id = req.body.id.trim();
    var telephone = req.body.telephone.trim();
    var address = req.body.address.trim();
    var name = req.body.name.trim();

    if( !(id && telephone && address && name)) {
        res.status(400).send({code: 400, msg: 'missing parameters'}).end();
    } else if( validator.userValidate(id, telephone, address, name).code !== 500){
        const msg = validator.userValidate(id, telephone, address, name).msg;
        res.status(400).send({code: 400, msg: msg});
    } else {
        if(req.body.modified){
            db.query('UPDATE 客户 SET 客户姓名="' + name +'", 客户联系电话="' + telephone + '", 客户家庭住址="' + address
                + '" WHERE 客户身份证号="' + id + '"', function (err, resultData){
                if(err){
                    console.error(err);
                    res.status(500).send({code:500,msg:'database error'});
                }else{
                    res.redirect('/users');
                }
            });
        } else {
            db.query('INSERT INTO 客户 (客户身份证号, 客户联系电话, 客户家庭住址, 客户姓名) VALUE("' + id + '","' + telephone
                + '","' + address + '","' + name + '")', function (err, data){
                if(err) {
                    console.log(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    res.redirect('/users');
                }
            });
        }
    }
})

module.exports = router;