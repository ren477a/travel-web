const Transaction = require('../models/transaction')

exports.create = async (req, res) => {
  let transaction = new Transaction(req.body)
  try {
      let t = await transaction.save(req.body)
      res.json({ transaction: t })
  } catch (err) {
      res.status(500).json({ error: err })
  }
}

exports.delete = async (req, res) => {
    let transaction = await Transaction.findByIdAndRemove(req.params.id)

    try {
        if (!transaction) {
            res.status(400).json({ error: 'No transaction with the given ID' })
        } else {
            res.json({ transaction: transaction })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.update = async (req, res) => {
    try {
        let transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!transaction) {
            res.status(400).json({ error: 'No transaction with the given ID' })
        } else {
            res.json({ transaction: transaction })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.claim = async (req, res) => {
    try {
        let transaction = await Transaction.findByIdAndUpdate(req.params.id, { claimed: true }, { new: true })

        if (!transaction) {
            res.status(400).json({ error: 'No transaction with the given ID' })
        } else {
            res.json({ transaction: transaction })
        }
    } catch (err) {
        err => res.status(500).json({ error: err })
    }
}

exports.read = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id)

        if (!transaction) {
            res.status(400).json({ error: 'No transaction with the given ID' })
        } else {
            res.json({ transaction: transaction })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.findByCustomerId = async (req, res) => {
    try {
        let count = await Transaction.count({ customerId: req.params.customerId});
        totalPages = Math.ceil(count / 9);
        if (totalPages == 0) {
            res.status(204).send();
        }
        let transactions
        console.log(req.query.page)
        if (req.query.page) {
            transactions = await Transaction.find({ customerId: req.params.customerId}).limit(9).skip((req.query.page - 1) * 9).sort('-date').lean()
        } else {
            transactions = await Transaction.find({ customerId: req.params.customerId}).sort('-date').lean()
        }

        if (!transactions) {
            res.status(400).json({ error: 'No transaction with the given ID' })
        } else {
            res.json({ transactions: transactions, totalPages: totalPages })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.findByAgency = async (req, res) => {
    try {
        let query = { $and: [{ agency: req.params.agency }] };
        if (req.query.key !== undefined) {
            let keyRegEx = new RegExp('.*' + req.query.key + '.*', 'i');
            query['$and'].push({ $or: [{tourTitle: keyRegEx }, { customerEmail: keyRegEx }, { paymentId: keyRegEx }] });
        }
        console.log(query)
        let transaction = await Transaction.find(query).sort('-date')

        if (!transaction) {
            res.status(400).json({ error: 'No transaction with the given ID' })
        } else {
            res.json({ transactions: transaction })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.readAll = async (req, res) => {
    try {
        let transactions = await Transaction.find({})
        res.send(transactions)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}