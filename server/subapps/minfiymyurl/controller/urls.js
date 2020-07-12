const minurl_urls = require('../dbmodals/urlmodal');

exports.save = (req, res) => {
  const dta = req.body.formvalues;
  const data = new minurl_urls(dta);
  data.minurl = getShortUrl();
  data.mainurl = dta.url;
  data.save((err, savedData) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.status(200).json({ "status": "success", "query_id": savedData._id });
  })
}
exports.get = (req, res) => {
  const query = req.params.query;
  minurl_urls.findById(query, (err, image) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json(`${process.env.BASE_URL}/${image.minurl}`);
  })
}
exports.redirect = (req, res) => {
  const query = req.params.query;
  minurl_urls.findOne({ minurl: query }, (err, response) => {
    if(err){
      return res.status(422).send(err);
    }
    else{
      return res.json(response);
    }
  })
}
const getShortUrl = () => {
  var length = 6;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}