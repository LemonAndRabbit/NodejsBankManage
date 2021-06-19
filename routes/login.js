const express = require('express');
const router = express.Router();

const mysql = require('mysql');

/* connect to admin account database */
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'admin'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login.ejs');
});

/* Process login Request */
router.post('/', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log('----------------- Login ------------------');
    console.log('username=' + username);
    console.log('password=' + password);
    console.log('------------------------------------------');
    if(username && password){
        db.query('SELECT * FROM admin_table WHERE username="' + username + '"', function(err, userData) {
            if(err){
                console.error(err);
                res.status(500).send({code:500, data:[], msg: 'database error'});
            }else if(userData.length === 0) {
                res.status(400).send({code:400,data:[],msg:'parameters error'});
            }else if(userData[0].password !== password){
                res.status(400).send({code:400,data:[],msg:'username or password error'});
            }else{
                req.session['user_id'] = userData[0].ID;
                res.status(200).send({code:200,data:[],msg:'success'});
            }
        });
    }else {
        res.status(400).send({code:400,data:[],msg:'parameters error'});
    }
});

module.exports = router;