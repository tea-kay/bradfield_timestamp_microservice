const moment = require('moment-timezone');
 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/time', function(req, res, next) {
  let date_ob = new Date();
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  let currentTime = hours + ":" + minutes + ":" + seconds


  res.json({time: currentTime})
})

router.get('/time/:region/:city', function(req, res) {

  const location  = req.params.region + '/' + req.params.city
  const time = moment().tz(location).format('hh:mm:ss')

  try {
    console.log('this is the parsedTime', time)
    res.json({ 
      time: time,
      location
    })
  } catch (e){
    res.send({ e: 'There was an error with your request please check that you have a correct region and city' })
  }
})

module.exports = router;
