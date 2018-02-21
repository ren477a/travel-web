var fs = require('fs');
var pdf = require('html-pdf');

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
  let html = fs.readFileSync('./temp/daily-sales.html', 'utf8');
  setTimeout(() => {
    pdf.create(html, options).toFile('./temp/dailysales.pdf', function (err, data) {
      if (err) return console.log(err);
      console.log(data); // { filename: '/app/businesscard.pdf' }
      res.download(data.filename)

    });
  }, 1000)
}

exports.monthlySales = async (req, res) => {
  let html = fs.readFileSync('./temp/test.html', 'utf8');
  setTimeout(() => {
    pdf.create(html, options).toFile('./temp/monthlysales.pdf', function (err, data) {
      if (err) return console.log(err);
      console.log(data); // { filename: '/app/businesscard.pdf' }
      res.download(data.filename)
    });
  }, 1000)
}