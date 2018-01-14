const User = require('../models/user')
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        let count = await User.count({ email: req.body.email })
        if (count === 0) {
            let body = req.body;
            const salt = bcrypt.genSalt(10);
            body.password = bcrypt.hash(body.password)
            let user = new User(body)
            let u = await user.save()
            res.json({ user: u })
        } else {
            res.status(409).json({ msg: 'User already exists.' })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.login = async (req, res) => {

}

exports.delete = async (req, res) => {
    let user = await User.findByIdAndRemove(req.params.id);

    try {
        if (!user) {
            res.status(400).json({ error: 'No user with the given ID' });
        } else {
            res.json({ user: user });
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.update = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            res.status(400).json({ error: 'No user with the given ID' });
        } else {
            res.json({ user: user });
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.read = async (req, res) => {
    try {
        let user = await User.findById(req.params.id).exec();

        if (!user) {
            res.status(400).json({ error: 'No user with the given ID' });
        } else {
            res.json({ user: user });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.readAll = async (req, res) => {
    try {
        let users = await User.find({}).exec();
        res.json({ users: users });
    } catch (err) {
        res.status(500).json({ error: err })
    }
}