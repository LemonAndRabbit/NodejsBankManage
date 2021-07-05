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
const defaultFilterData = {business: '储蓄业务', year: '2021', quarter: '0', month: '0'};

/* GET users listing. */
router.get('/', function(req, res, next) {
    switch(req.query.action) {
        case 'filter':
            var filterRes = filter.statFilter(req.query);
            if(filterRes.correctness === false){
                res.status(400, filterRes.dialog);
            } else {
                const oldFilterData = filterRes.oldFilterData;
                db.query(filterRes.filter, function (err, resultData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'}).end();
                    } else {
                        console.log(resultData);
                        res.render('statistics.ejs', {formData: resultData, oldFilterData: filterRes.oldFilterData});
                    }
                });
            }
            break;
        default:
            var filterRes = filter.statFilter(defaultFilterData);
            db.query(filterRes.filter, function (err, resultData) {
                if (err) {
                    console.error(err);
                    res.status(500).send({code: 500, msg: 'database error'}).end();
                } else {
                    res.render('statistics.ejs', {formData: resultData, oldFilterData: defaultFilterData});
                }
            });
    }
});

module.exports = router;