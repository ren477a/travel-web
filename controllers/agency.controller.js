const Agency = require('../models/agency')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        let count = await Agency.count(
            { $or: [{ email: req.body.email }, { agencyName: req.body.agencyName }]})
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
    try {
        let agency = await Agency.findOne({ email: req.body.email })
        if(!agency) {
            res.status(500).json({ error: 'Agency not found'})
        } else if (agency.length == 0) {
            res.status(204).json({ success: false, msg: 'Agency not found.' })
        } else {
            bcrypt.compare(req.body.password, agency.password, (err, isMatch) => {
                if (isMatch) {
                    if(agency.status === 'approved') {
                        const token = jwt.sign(
                            { data: { agency: agency } },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 }
                        )
                        res.json({ success: true, token: 'JWT ' + token })
                    } else {
                        res.json({success: false, msg: 'Your registered account is not yet approved.'})
                    }
                    
                } else {
                    res.json({ success: false, msg: 'Email and password does not match.' })
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
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
        let count = await Agency.count({});
        totalPages = Math.ceil(count / 9);
        if (totalPages == 0) {
            res.json({tours: [], totalPages:0});
        }

        let agency
        if(req.query.page) {
            agency = await Agency.find({}).limit(9).skip((req.query.page - 1) * 9)
        } else {
            agency = await Agency.find({})
        }
        res.json({ agency: agency, totalPages: totalPages })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}