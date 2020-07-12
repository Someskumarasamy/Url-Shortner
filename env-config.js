const prod = process.env.NODE_ENV === 'production';

module.exports ={
    'process.env.APPID' : 'urlshortner',
    'process.env.BASE_URL':prod?'http://localhost:3000/':''
}