const minurl_UsrFeedback = require('../dbmodals/feedbackmodal');

exports.save = (req, res) => {
      const dta = req.body;
      const data = new minurl_UsrFeedback(dta);
      data.save((err, savedData) => {
        if (err) {
          return res.status(422).send(err);
        }
        return res.json({"status":"success"});
      })
    
}