const Cashout = require('../models/cashout')

exports.delete = async (req, res) => {
    let cashout = await Cashout.findByIdAndRemove(req.params.id)

    try {
        if (!cashout) {
            res.status(400).json({ error: 'No cashout with the given ID' })
        } else {
            res.json({ cashout: cashout })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.update = async (req, res) => {
    try {
        let cashout = await Cashout.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!cashout) {
            res.status(400).json({ error: 'No cashout with the given ID' })
        } else {
            res.json({ cashout: cashout })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.read = async (req, res) => {
    try {
        let cashout = await Cashout.findById(req.params.id)

        if (!cashout) {
            res.status(400).json({ error: 'No cashout with the given ID' })
        } else {
            res.json({ cashout: cashout })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.readAll = async (req, res) => {
    try {
        let cashouts = await Cashout.find({})
        res.json({ cashouts: cashouts })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}