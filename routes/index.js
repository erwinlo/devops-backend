var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
     res.render('index', {
          title: 'DevOps Backend Server',
          hostname: require('os').hostname()
     });
});

module.exports = router;
