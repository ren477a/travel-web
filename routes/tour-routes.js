const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Tour = require('../models/tour');

router.post('/', (req, res, next) => {
  // Edit this
  console.log('post tour');
  let newTour = new Tour({
    title: req.body.title,
    agency: req.body.agency,
    description: req.body.description,
    itinerary: req.body.itinerary,
    inclusions: req.body.inclusions,
    exclusions: req.body.exclusions,
    notes: req.body.notes,
    terms: req.body.terms,
    validityInSeconds: req.body.validityInSeconds,
    pricing: {
      ptype: req.body.pricing.ptype,
      fixed: req.body.pricing.fixed,
      group: [{
            persons: req.body.pricing.persons,
            price: req.body.pricing.price
          }]
      }
  });

  Tour.addTour(newTour, (err, tour) => {
    if(err) {
      res.json({success: false, msg:'Failed to add tour'});
    } else {
      res.json({success: true, msg:'New tour added to database'});
    }
  });
});

router.get('/', (req, res, next) => {
  // Edit this
  res.send('get tour')
});



module.exports = router;
