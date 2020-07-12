import Axios from "axios";

export const cookieFromReq = (req, token) => {
    if (req.headers.cookie) {
        var cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${token}=`));
        if (!cookie) {
            cookie = req.cookies.split(';').find(c => c.trim().startsWith(`${token}=`));
        }
        if (!cookie) { return undefined }
        return cookie.split('=')[1];
    }
    return undefined
}

export const getMonthName = (date) => {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[date.getMonth()]
}

export const offensivecheck = (dta) => {
    const blockedwords = ['porn', 'xnxx', 'xhamster', 'boobs', 'xxx'];
    for (var i = blockedwords.length - 1; i >= 0; i--) {
        if (dta.includes(blockedwords[i])) {
            return true;
        }
    }
    return false;
}
export const urlCheck = async (urll, isFinal) => {
   try{
    urll = urll.trim();
    console.log(new Request('').url)
    //var tndta = false;
    // var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        var myRequest = new URL(urll)
    if (!!myRequest) {
        if (isFinal) {
            var rtndta = false;
            await fetch(myRequest, {
                mode: 'no-cors'
            }).then(response => {
                console.log(response)
                if(response.status === 200 || response.status === 0){
                    rtndta = true
                }
            })
            .catch(err => {
                console.log("err"+err);
                rtndta =  false;
            })
            return rtndta 
        }
        else{
            return true
        }
    }
    else {
        return false;
    }
   }
   catch(ex){
       console.log(ex.message);
       return false;
   }
}
export const getStateId =()=>{
    var length = Math.floor(Math.random() * 10)+3;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}