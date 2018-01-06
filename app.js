"use strict";

const express = require("express");
const app = express();
const request = require("request");
const cheerio = require("cheerio");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  request(
    "https://www.halifax.ca/transportation/winter-operations/service-updates",
    function(error, response, body) {
      var $ = cheerio.load(body);
      // console.log($('td.row_1.col_1.c-table__cell'));
      $("td.row_1.col_1.c-table__cell").each(function(index) {
        // console.log(($(this)).text() +  index)
        if (index === 0) {
          var status = $(this)
            .text()
            .trim();
          console.log(status);
          var antwoord;
          var link;
          if (status.includes("not") || status.includes("NOT")) {
            antwoord = "No.";
            link = "<meta property=\"og:image\" content=\"http://www.istheparkingbanon.ca/Yes.png\"\>"
          } else {
            antwoord = "Yes.";
            link = "<meta property=\"og:image\" content=\"http://www.istheparkingbanon.ca/No.png\"\>"
          }
          res.render("pages/index", { status, antwoord, link });
        }
      });
    }
  );
});

app.use(express.static("public"));

// start Express on port 8080
app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});
