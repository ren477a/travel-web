const fs = require('fs');
const pdf = require('html-pdf');
const dateFormat = require('dateformat');
const Transaction = require('../models/transaction')
const s3 = require('s3');
const upload = require('../config/upload')

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default 
  s3RetryCount: 3,    // this is the default 
  s3RetryDelay: 1000, // this is the default 
  multipartUploadThreshold: 20971520, // this is the default (20 MB) 
  multipartUploadSize: 15728640, // this is the default (15 MB) 
  s3Options: {
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY,
    // any other options are passed to new AWS.S3() 
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
  },
});

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
  let nextDay = new Date(req.body.day)
  nextDay.setDate(nextDay.getDate() + 1)
  console.log(day)

  let transactions = await Transaction.find({
    date: {
      '$gte': day,
      '$lt': nextDay
    }
  })

  let totalSales = 0;
  for(let i = 0; i < transactions.length; i++) {
    totalSales += transactions[i].total
  }

  console.log(transactions)

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  });

  let html = fs.readFileSync('./temp/daily-sales.html', 'utf8');
  html = html.replace("$DATE", dateFormat(Date.now(), "ddd, mmm dS, yyyy, h:MM TT"))
  let tbody = ''
  for (let i = 0; i < transactions.length; i++) {
    //console.log(i)
    tbody = tbody.concat(`<tr>
    <td>${transactions[i].customerEmail}</td>
    <td>${transactions[i].agency}</td>
    <td>${transactions[i].tourTitle}</td>
    <td>${transactions[i].quantity}</td>
    <td>${dateFormat(transactions[i].date, "ddd, mmm dS, yyyy, h:MM TT")}</td>
    <td>${formatter.format(transactions[i].total)}</td>
  </tr>`)
  }
  //console.log(tbody)
  html = html.replace("$TBODY", tbody)
  html = html.replace("$DAY", day.toDateString())
  html = html.replace("$TOTAL", formatter.format(totalSales))
  setTimeout(() => {
    pdf.create(html, options).toFile('./temp/dailysales.pdf', function (err, data) {
      if (err) return console.log(err);
      console.log(data); // { filename: '/app/businesscard.pdf' }

      let params = {
        localFile: data.filename,

        s3Params: {
          Bucket: "travelcatalog",
          Key: "dailysales.pdf",
          // other options supported by putObject, except Body and ContentLength. 
          // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
        },
      };
      let uploader = client.uploadFile(params);
      uploader.on('error', function (err) {
        console.error("unable to upload:", err.stack);
      });
      uploader.on('progress', function () {
        console.log("progress", uploader.progressMd5Amount,
          uploader.progressAmount, uploader.progressTotal);
      });
      uploader.on('end', (response) => {
        console.log(response)
        console.log("done uploading");
        res.json({ url: upload.getUrl('dailysales.pdf') })
      });

    });
  }, 1000)
}

exports.monthlySales = async (req, res) => {
  let month = new Date(req.body.day)
  let nextMonth = new Date(req.body.day)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  console.log(month)
  console.log(nextMonth)

  let transactions = await Transaction.find({
    date: {
      '$gte': month,
      '$lt': nextMonth
    }
  })

  let totalSales = 0;
  for(let i = 0; i < transactions.length; i++) {
    totalSales += transactions[i].total
  }

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  });

  let html = fs.readFileSync('./temp/monthly-sales.html', 'utf8');
  html = html.replace("$DATE", dateFormat(Date.now(), "ddd, mmm dS, yyyy, h:MM TT"))
  let tbody = ''
  for (let i = 0; i < transactions.length; i++) {
    //console.log(i)
    tbody = tbody.concat(`<tr>
    <td>${transactions[i].customerEmail}</td>
    <td>${transactions[i].agency}</td>
    <td>${transactions[i].tourTitle}</td>
    <td>${transactions[i].quantity}</td>
    <td>${dateFormat(transactions[i].date, "mm/dd/yyyy, h:MM TT")}</td>
    <td>${formatter.format(transactions[i].total)}</td>
  </tr>`)
  }
  //console.log(tbody)
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  html = html.replace("$TBODY", tbody)
  html = html.replace("$MONTH", monthNames[month.getMonth()])
  html = html.replace("$YEAR", month.getFullYear())
  html = html.replace("$TOTAL", formatter.format(totalSales))
  html = html.replace("$AGENCY", 'Admin')
  setTimeout(() => {
    pdf.create(html, options).toFile('./temp/monthlysales.pdf', function (err, data) {
      if (err) return console.log(err);
      console.log(data); // { filename: '/app/businesscard.pdf' }

      let params = {
        localFile: data.filename,

        s3Params: {
          Bucket: "travelcatalog",
          Key: "monthlysales.pdf",
          // other options supported by putObject, except Body and ContentLength. 
          // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
        },
      };
      let uploader = client.uploadFile(params);
      uploader.on('error', function (err) {
        console.error("unable to upload:", err.stack);
      });
      uploader.on('progress', function () {
        console.log("progress", uploader.progressMd5Amount,
          uploader.progressAmount, uploader.progressTotal);
      });
      uploader.on('end', (response) => {
        console.log(response)
        console.log("done uploading");
        res.json({ url: upload.getUrl('monthlysales.pdf') })
      });

    });
  }, 1000)
}

