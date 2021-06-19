const express = require('express');
const router = express.Router();

/* check login */
router.use(function (req, res, next) {
    if(!req.session['user_id'] && req.url !== '/login') {
        res.redirect('/login');
    } else {
        next();
    }
});

/* Login 路由 */
router.use('/login', require('./login'));

/* 客户查询路由 */
router.use('/users', require('./users'));

/* 账户查询路由 */
router.use('/accounts', require('./accounts'));

/* 贷款管理路由 */
router.use('/loans', require('./loans'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'you are ' + req.session['user_id'] + '!'});
});

module.exports = router;