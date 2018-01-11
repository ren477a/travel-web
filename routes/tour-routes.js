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
    img: req.body.img,
    sold: 0
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
  let query = req.body.query;
  let pageNum = req.body.pageNum;
  let totalPages = 1;
  console.log('skip ' + ((pageNum - 1) * 9));
  console.log(query.title);
  if (query.title != undefined) {
    query.title = {
      $regex: new RegExp('.*' + query.title + '.*', 'i')
    }
  }

  if(query.minPrice && query.maxPrice) {
    query['pricing.fixed'] = { $gte: query.minPrice, $lte: query.maxPrice }
    delete query.minPrice;
    delete query.maxPrice;
  }
  console.log(query)

  let sortBy = query.sortBy;
  if(sortBy) {
      delete query.sortBy;
  }
  console.log(query);
  Tour.count(query, (err, c) => {
    console.log(c);
    totalPages = Math.ceil(c / 9);
    if (totalPages == 0) {
      res.json({
        tours: [],
        pageNum: 1,
        totalPages: totalPages
      })
    }
    console.log(totalPages);
    console.log('total pages ' + totalPages);
    console.log('pagenum ' + pageNum)
    if (pageNum > totalPages) pageNum = totalPages;
    console.log(pageNum)
    let promise = Tour.find(query).limit(9).skip((pageNum - 1) * 9);
    console.log(sortBy)
    if(sortBy) {
      if(sortBy.col === 'price') {
        console.log({'pricing.fixed': sortBy.asc});
        promise = promise.sort({'pricing.fixed': sortBy.asc});
      } else if (sortBy.col === 'title') {
        promise = promise.sort({title: sortBy.asc});
      }
    }
    promise.then(tours => {
      var arrayLength = tours.length;
      console.log('length ' + arrayLength)
      let urls = new Array(arrayLength);
      for (var i = 0; i < arrayLength; i++) {
        urls[i] = upload.getUrl(tours[i].img)
      }
      res.json({
        tours: tours,
        pageNum: pageNum,
        totalPages: totalPages,
        urls: urls
      });
    });
  });

});

router.get('/featured', (req, res, next) => {
  Tour.find().limit(9).then(tours => {
    var arrayLength = tours.length;
    console.log('length ' + arrayLength)
    let urls = new Array(arrayLength);
    for (var i = 0; i < arrayLength; i++) {
      urls[i] = upload.getUrl(tours[i].img)
    }
    res.json({
      tours: tours,
      urls: urls
    });
  });
});

router.get('/:id', (req, res, next) => {

  Tour.findOne({ _id: req.params.id }).then(tour => {
    console.log(tour);
    let url = upload.getUrl(tour.img);
    res.json({ tour: tour, imgUrl: url });
  });
});

router.put('/archive/:id', (req, res, next) => {
  var conditions = { _id: req.params.id }
    , update = { status: 'notonsale' }
    , options = { multi: true };

  Tour.update(conditions, update, options, (err, numAffected) => {
    // numAffected is the number of updated documents
    res.json({ numAffected: numAffected });
  });
});

module.exports = router;
