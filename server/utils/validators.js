const { ua_Browsers, ua_OS } = require('./uaconstants')
exports.validatemail = (mail) => {
    try {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(mail) ? mail : undefined;
    }
    catch (err) {
        return undefined
    }

}

exports.clientdetail = (dta) => {
    try {
        var browser = "undefined", os = "undefined";
        if (!!dta) {
            for (var i = ua_Browsers.length - 1; i >= 0; i--) {
                if (ua_Browsers[i][1].test(dta)) {
                    browser = ua_Browsers[i][0];
                    break;
                }
            }
            for (var j = ua_OS.length - 1; j >= 0; j--) {
                if (ua_OS[j][1].test(dta)) {
                    os = ua_OS[j][0];
                    break;
                }
            }
        }
        return { browser: browser, os: os };
    } catch (error) {
        console.log(error)
        return { browser: "undefined", os: "undefined" }
    }
}

exports.clientip = (req) => {
    try {
        var cnt='';
        if (req != undefined && req != null) {
            if(!!req.headers && !!req.headers['x-forwarded-for']){
                cnt=req.headers['x-forwarded-for'].split(',').pop()
            }
            else if(!!req.connection && !!req.connection.remoteAddress){cnt=req.connection.remoteAddress;}
            else if(!!req.socket && !!req.socket.remoteAddress){cnt=req.socket.remoteAddress;}
            else if(!!req.connection && !!req.connection.socket && !!req.connection.socket.remoteAddress){cnt=req.connection.socket.remoteAddress;}
            return cnt
        }
    }
    catch (err) {
        return ("notfound");
    }
}