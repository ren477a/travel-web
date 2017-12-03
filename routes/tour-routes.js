const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Tour = require('../models/tour');

router.post('/', (req, res, next) => {
  // Edit this
  console.log('post tour');
  let newTour = new Tour({
    title: req.body.title,
    subtitle: req.body.subtitle,
    agency: req.body.agency,
    description: req.body.description,
    duration: req.body.duration,
    isInternational: req.body.isInternational,
    itinerary: req.body.itinerary,
    inclusions: req.body.inclusions,
    exclusions: req.body.exclusions,
    notes: req.body.notes,
    terms: req.body.terms,
    validityInDays: req.body.validityInDays,
    pricing: {
      ptype: req.body.pricing.ptype,
      fixed: req.body.pricing.fixed,
      group: [{
            persons: req.body.pricing.persons,
            price: req.body.pricing.price
          }]
      },
    status: {
      approved: false,
      onSale: false
    }
  });

  Tour.addTour(newTour, (err, tour) => {
    if(err) {
      console.log(err);
      res.json({success: false, tour: null});
    } else {
      res.json({success: true, tour: tour});
    }
  });
});

router.get('/', (req, res, next) => {
  // Edit this
  console.log('get tours');
  Tour.find({}).then(ninjas => {
    res.send(ninjas);
  });
});



module.exports = router;
