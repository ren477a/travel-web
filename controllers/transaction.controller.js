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

exports.readAll = async (req, res) => {
    try {
        let transactions = await Transaction.find({})
        res.json({ transactions: transactions })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}