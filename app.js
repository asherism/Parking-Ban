"use strict";

const express = require('express');
const app = express();
const request = require("request");
const cheerio = require("cheerio");

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    request('http://www.halifax.ca/snow/update.php', function (error, response, body) {
        var $ = cheerio.load(body);
        $('td[width="590"][valign="top"][bgcolor="#CCCCCC"]').each(function (index) {
            if (index == 1) {
                var status = $(this).text().trim().replace('Status:', '');
                // console.log(typeof status);
                var antwoord = "";
                if (status.includes("lifted")) {
                    antwoord = "No."
                } else { antwoord = "Yes." }
                res.render('pages/index', { status, antwoord });
            }
        });
    })
});


app.use(express.static('public'));

// start Express on port 8080
app.listen(80, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});