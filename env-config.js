const prod = process.env.NODE_ENV === 'production';

module.exports ={
    'process.env.APPID' : 'urlshortner',
    'process.env.BASE_URL':prod?'http://localhost:3000/':'https://url-shortner-apympxbwp.vercel.app/',
    'process.env.DB_URI': prod?'':'mongodb+srv://test:Pass12345@cluster0-aw7ut.mongodb.net/test?retryWrites=true&w=majority'
}