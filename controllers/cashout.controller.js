const Cashout = require('../models/cashout')
const Transactions = require('../models/transaction')
const Agency = require('../models/agency')

exports.issueCashout = async (req, res) => {
    // Get all uncashed for agency
    let transactions = await Transactions.find(
        { agency: req.body.agency, cashedOut: false },
        '_id total'
    )
    if(!transactions || transactions.length == 0) {
        res.status(400).json({ error: 'No uncashed transactions for given agency'})
    } else {
        // Update transactions cashedout = true
        let conditions = { _id: {$in: transactions} }
        let update = { cashedOut: true }
        let options = { multi: true }
        let affected = await Transactions.update(conditions, update, options)
        // Subtract to total balance
        let sum = 0
        for(t of transactions) {
            sum += t.total
        }
        let updatedAgency = await Agency.findByIdAndUpdate(
            req.body.agencyId,
            { $inc: {'balance': -sum} }
        )
        // Create new cashout
        // Add to db
        let newCashout = new Cashout({
            agencyId: req.body.agencyId,
            agency: req.body.agency,
            bankAccount: req.body.bankAccount,
            amount: req.body.amount,
            transactions: transactions
        });
        let cashout = await newCashout.save()
        res.send(cashout)
    }

}

exports.create = async (req, res) => {
  let cashout = new Cashout(req.body)
  try {
      let t = await cashout.save(req.body)
      res.json({ cashout: t })
  } catch (err) {
      res.status(500).json({ error: err })
  }
}

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