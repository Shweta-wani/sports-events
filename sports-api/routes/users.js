var express = require('express');
var app = express()
var router = express.Router();
var urlencoderParser = app.use(express.urlencoded({ extended: false }));
const fs = require('fs');
const path = require('path');

/* GET users listing. */

router.get('/', function (req, res, next) {
  let dataArray = require('../public/services/users.json');
  res.json({ users: dataArray });
});

router.post('/', urlencoderParser, function (req, res, next) {
  //let dataArray = require('../public/services/users.json');
  console.log(req.body);
  /* dataArray = dataArray.filter(value => value.name === req.body.userName);
  //res.json({ user: dataArray });
  res.render('users', { user: dataArray }); */
  res.json({ users: req.body });
});

router.post('/:name', urlencoderParser, function (req, res, next) {
  let dataArray = require('../public/services/users.json');
  req.body.id = dataArray.length + 1;
  req.body.password = req.body.name;
  dataArray.push(req.body);

  fs.writeFileSync(path.resolve(__dirname, '../public/services/users.json'), JSON.stringify(dataArray));
  res.json({ users: req.body });
});

router.put('/:id', urlencoderParser, function (req, res, next) {
  let dataArray = require('../public/services/users.json');
  let position = parseInt(req.params.id) - 1;

  data = dataArray.filter(value => parseInt(value.id) !== parseInt(req.params.id));
  fs.writeFileSync(path.resolve(__dirname, '../public/services/users.json'), JSON.stringify(data));
  req.body.password = req.body.name
  data.splice(position, 0, req.body);
  fs.writeFileSync(path.resolve(__dirname, '../public/services/users.json'), JSON.stringify(data));
  res.json({ users: req.body });
});

router.delete('/:id', function (req, res, next) {
  console.log(req.params.id)
  let dataArray = require('../public/services/users.json');
  dataArray = dataArray.filter(value => parseInt(value.id) !== parseInt(req.params.id));
  fs.writeFileSync(path.resolve(__dirname, '../public/services/users.json'), JSON.stringify(dataArray));
  res.json({ userid: req.params.id });
});



module.exports = router;
