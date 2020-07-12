const express = require('express');
const router = express.Router();
const urls = require('./controller/urls');
const feedback = require('./controller/feedback');

router.post('/store',urls.save)
router.get('/store/:query',urls.get)
router.get('/redirect/:query',urls.redirect)
router.post('/feedback', feedback.save)
router.use((err, req, res, next) => {
  console.log("Error in WEBAPI route for request => " + req.headers.referer + "\n Error is \n" + err);
  if (err) {
    return res.status(500).send(err);
  }
  next();
})
module.exports = router;