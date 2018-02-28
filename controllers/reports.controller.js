const fs = require('fs');
const pdf = require('html-pdf');
const dateFormat = require('dateformat');
const Transaction = require('../models/transaction')
const upload = require('../config/upload')

var options = {
  format: 'Letter',
  orientation: 'landscape'
};



exports.test = async (req, res) => {
  let html = fs.readFileSync('./temp/test.html', 'utf8');
  setTimeout(() => {
    pdf.create(html, options).toFile('./dailysales.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
  }, 1000)
}

exports.dailySales = async (req, res) => {
  //let transactions = req.body.transactions
  let day = new Date(req.body.day)
  console.log(day)

  let transactions = await Transaction.find({
    date: {
      '$gte': day
    }
  })

  let html = fs.readFileSync('./temp/daily-sales.html', 'utf8');
  html = html.replace("$DATE", dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"))
  let tbody = ''
  for(let i = 0; i < transactions.length; i++) {
    console.log(i)
    tbody = tbody.concat(`<tr>
    <td>${transactions[i].customerEmail}</td>
    <td>${transactions[i].agency}</td>
    <td>${transactions[i].tourTitle}</td>
    <td>${transactions[i].quantity}</td>
    <td>${transactions[i].date}</td>
    <td>${transactions[i].total}</td>
  </tr>`)
  }
  console.log(tbody)
  html = html.replace("$TBODY", tbody)
  setTimeout(() => {
    pdf.create(html, options).toFile('./temp/dailysales.pdf', function (err, data) {
      if (err) return console.log(err);
      console.log(data); // { filename: '/app/businesscard.pdf' }
      res.download(data.filename)

    });
  }, 1000)
}

exports.monthlySales = async (req, res) => {
  let transactions = req.body.transactions
  console.log(transactions[0])
  let html = fs.readFileSync('./temp/monthly-sales.html', 'utf8');
  html = html.replace("$DATE", dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"))
  let tbody = ''
  for(let i = 0; i < transactions.length; i++) {
    console.log(i)
    tbody = tbody.concat(`<tr>
    <td>${transactions[i].customerEmail}</td>
    <td>${transactions[i].agency}</td>
    <td>${transactions[i].tourTitle}</td>
    <td>${transactions[i].quantity}</td>
    <td>${transactions[i].date}</td>
    <td>${transactions[i].total}</td>
  </tr>`)
  }
  console.log(tbody)
  html = html.replace("$TBODY", tbody)
  html = html.replace("$MONTH", req.body.month)
  html = html.replace("$YEAR", req.body.year)
  html = html.replace("$TOTAL", req.body.total)
  html = html.replace("$AGENCY", req.body.agency)
  setTimeout(() => {
    pdf.create(html, options).toFile('./temp/monthlysales.pdf', function (err, data) {
      if (err) return console.log(err);
      console.log(data); // { filename: '/app/businesscard.pdf' }
      res.download(data.filename)
    });
  }, 1000)
}

