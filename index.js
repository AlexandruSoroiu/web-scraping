const express = require('express');
const cheerio = require('cheerio');
const got = require("fix-esm").require("got");

const app = express();
const PORT = process.env.PORT || 4000;

const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { value: '', title: ''});
});

app.post('/send-url', urlencodedparser, async (req, res) => {
    let url = req.body.myurl;

    await (async () => {
        const response = await got(url);

        const $ = cheerio.load(response.body);

        let title = $('h1').html();
        let value = $('.ratingValue').find('span[itemprop="ratingValue]').html();

        res.render('index', { value: value, title: title});
    })();
});

app.listen(PORT, () => {
    console.log(`Server started: Listening to port ${PORT}`);
});

