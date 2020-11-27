var express = require('express');
var app = express()
var router = express.Router();
var urlencoderParser = app.use(express.urlencoded({ extended: false }));

/* GET users listing. */

router.get('/', function (req, res, next) {
  let dataArray = require('../public/services/eventtype.json');
  res.json({ eventtype: dataArray });
});

router.post('/', urlencoderParser, function(req, res, next) {
  //let dataArray = require('../public/services/users.json');
  console.log(req.body);
  /* dataArray = dataArray.filter(value => value.name === req.body.userName);
  //res.json({ user: dataArray });
  res.render('users', { user: dataArray }); */
  res.json({ eventtype: req.body });
});


module.exports = router;