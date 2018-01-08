const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const Tour = require('../models/tour');

const myBucket = 'travelcatalog';

router.post('/', (req, res, next) => {
  // Edit this
  let newTour = new Tour({
    title: req.body.title,
    agency: req.body.agency,
    description: req.body.description,
    duration: req.body.duration,
    type: req.body.type,
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
    status: 'pending',
    img: req.body.img
  });

  Tour.addTour(newTour, (err, tour) => {
    if (err) {
      console.log(err);
      res.json({ success: false, tour: null });
    } else {
      res.json({ success: true, tour: tour });
    }
  });
});

const upload = require('../config/upload');
const s3 = require('../config/upload').s3;
router.post('/upload', (req, res) => {
  upload.setDestination('tours');
  upload.single('photo')(req, res, (err) => {
    if (err) {
      res.json({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.json({
          msg: 'Error: No File Selected!'
        });
      } else {
        res.json({
          msg: 'File Uploaded!',
          file: `${req.file.key}`
        });
      }
    }
  });
});

router.get('/', (req, res, next) => {
  // Edit this
  //let query = JSON.parse(req.query.q);
  //   const url = s3.getSignedUrl('getObject', {
  //     Bucket: 'travelcatalog',
  //     Key: myKey,
  //     Expires: signedUrlExpireSeconds
  // })
  console.log(req.query.q);
  Tour.find().then(tours => {
    res.send(tours);
  });
});

router.post('/search', (req, res, next) => {
  let query = req.body;
  console.log(query);
  Tour.find(query).then(tours => {
    res.send(tours);
  });
});

router.get('/featured', (req, res, next) => {
  Tour.find().limit(9).then(tours => {
    res.send(tours);
  });
});

router.get('/:id', (req, res, next) => {

  Tour.findOne({ _id: req.params.id }).then(tour => {
    let url = upload.getUrl(tour.img);
    res.json({tour: tour, imgUrl: url});
  });
});



module.exports = router;
