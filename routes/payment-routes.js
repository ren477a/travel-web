const router = require('express').Router(); // eslint-disable-line new-cap


router.post('/charge', (req, res, next) => {
    console.log(req.body);
});



router.get('/', (req, res, next) => {
    console.log('asdasd');
});

module.exports = router;
