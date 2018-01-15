const Tour = require('../models/tour')
const upload = require('../config/upload')

exports.create = async (req, res) => {
    let tour = new Tour(req.body)
    try {
        let t = await tour.save(req.body)
        res.json({ tour: t })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.read = async (req, res) => {
    try {
        let tour = await Tour.findById(req.params.id).lean()
        tour.img = await upload.getUrl(tour.img)
        if (!tour) {
            res.status(400).json({ error: 'No tour with the given ID' })
        } else {
            res.json({ tour: tour })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.readAll = async (req, res) => {
    try {
        let query
        if (req.query.key === undefined &&
            req.query.min === undefined &&
            req.query.max === undefined &&
            req.query.type === undefined) {
            // RETURN ALL
            query = {};
        } else {
            // SEARCH QUERIES
            query = { $and: [] };
            let keySearch = {};

            // KEYWORD
            if (req.query.key !== undefined) {
                let keyRegEx = new RegExp('.*' + req.query.key + '.*', 'i');
                keySearch = { $or: [{ title: keyRegEx }, { description: keyRegEx }, { itinerary: keyRegEx }] };
                query['$and'].push(keySearch);
            }

            // PRICE RAANGE
            if (req.query.min !== undefined && req.query.max !== undefined) {
                let min = req.query.min;
                let max = req.query.max;
                if (min < 0 || max > 1000000) {
                    res.status(400).send({ error: 'Invalid price range.' });
                } else {
                    let range = {};
                    range['price'] = { $gte: min, $lte: max }
                    query['$and'].push(range);
                    console.log(range)
                }
            }

            // TYPE
            if (req.query.type !== undefined) {
                let type = req.query.type;
                if (type === 'International' || type === 'Local') {
                    query['$and'].push({ type: type });
                } else {
                    res.status(400).send({ error: 'Invalid type' })
                }
            }
        }
        console.log(query);

        // PAGINATE
        let count = await Tour.count(query);
        totalPages = Math.ceil(count / 9);
        if (totalPages == 0) {
            res.status(204).send();
        }
        let tours
        if (req.query.page) {
            tours = await Tour.find(query).sort(req.query.sort).limit(9).skip((req.query.page - 1) * 9).lean()
        } else {
            tours = await Tour.find(query).sort(req.query.sort).lean()
        }

        if (!tours) {
            res.status(400).json({ error: 'No tours with the given query.' })
        } else {
            // Fetch image signed URL
            await Promise.all(tours.map(async (tour) => {
                tour.img = await upload.getUrl(tour.img)
            }))
            res.send(tours)
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.update = async (req, res) => {
    try {
        let tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(tour)
        if (!tour) {
            res.status(400).json({ error: 'No tour with the given ID' });
        } else {
            res.json({ tour: tour });
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.delete = async (req, res) => {
    try {
        let tour = await Tour.findByIdAndRemove(req.params.id);
        if (!tour) {
            res.status(400).json({ error: 'No tour with the given ID' });
        } else {
            res.json({ tour: tour });
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.upload = async (req, res) => {
    upload.setDestination('tours');
    upload.single('photo')(req, res, (err) => {
        if (err) {
            res.json({
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.status(500).json({
                    err: 'No File Selected!'
                });
            } else {
                res.json({
                    msg: 'File Uploaded!',
                    file: `${req.file.key}`
                });
            }
        }
    });
}