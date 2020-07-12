const mongoose = require('mongoose');
const schema = mongoose.Schema;


const sch_user = new schema({
    minurl: { type: String, required: true },
    mainurl: { type: String, required: true, maxlength: 256 },
    isAuto: { type: Boolean, required: true },
    ogdata: {
        ogtitle: String,
        ogdes: String,
        ogimg: String
    },
    createdat: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('minurl_urls', sch_user);