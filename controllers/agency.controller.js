const Agency = require('../models/agency')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    try {
        let count = await Agency.count({ email: req.body.email })
        if (count === 0) {
            let body = req.body
            const salt = await bcrypt.genSalt(10)
            const hash  = await bcrypt.hash(body.password, salt)
            body.password = hash
            let agency = new Agency(body)
            let u = await agency.save()
            res.json({ agency: u })
        } else {
            res.status(409).json({ msg: 'Agency already exists.' })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.login = async (req, res) => {

}

exports.delete = async (req, res) => {
    let agency = await Agency.findByIdAndRemove(req.params.id)

    try {
        if (!agency) {
            res.status(400).json({ error: 'No agency with the given ID' })
        } else {
            res.json({ agency: agency })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.update = async (req, res) => {
    try {
        let agency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!agency) {
            res.status(400).json({ error: 'No agency with the given ID' })
        } else {
            res.json({ agency: agency })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.read = async (req, res) => {
    try {
        let agency = await Agency.findById(req.params.id)

        if (!agency) {
            res.status(400).json({ error: 'No agency with the given ID' })
        } else {
            res.json({ agency: agency })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.readAll = async (req, res) => {
    try {
        let agency = await Agency.find({})
        res.json({ agency: agency })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}