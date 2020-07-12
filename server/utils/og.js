const og = require('open-graph'); 

exports.info = (req,res)=>{
    const url = req.params.url;
    try{
      const link = decodeURIComponent(url)
      og(link, function(err, meta) {
        if(err){
          console.log("error in og derivation");
        }
        else if (meta) {
          res.status(200);
          res.json({
            success: 1,
            meta
          });
        } else {
          res.status(202)
          res.json({
            success: 0,
            meta: {}
          });
        }
      });
    }
    catch(err){
      console.log(err);
      res.status(202)
      res.json({
          success: 0,
          meta: {}
      })
    }
  }