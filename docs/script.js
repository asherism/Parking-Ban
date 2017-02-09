// initialize Express in project
const express = require('express');


const request = require("request");
const cheerio = require("cheerio");


    request('http://www.halifax.ca/snow/update.php', function (error, response, body) {
        var $ = cheerio.load(body);

        $('td[width="590"][valign="top"][bgcolor="#CCCCCC"]').each(function (index) {

            if (index == 1) {
                var status = $(this).text().trim().replace('Status:','');

                let antwoord = "";

                if (status.includes("lifted")) {
                    antwoord = "No."
                } else { antwoord = "Yes." }

                res.render('index', { status, antwoord });

            }

        });
    })
});
