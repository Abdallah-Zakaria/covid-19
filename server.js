'use strict'

//..dependencies
const express = require("express")
const pg = require("pg")
const superagent = require("superagent")
const methodOverride = require("method-override")
const { search } = require("superagent")
require('dotenv').config();

const PORT = process.env.PORT || 3000
const client = new pg.Client(process.env.DATABASE_URL);
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//..route
app.get("/", homePage)
app.post("/search", searche)
app.get("/allContry", countryPage)
app.post("/save", saveIt)
app.post("/myRecord", myRecordPage)
app.get("/details/:id" , detailsPage )
//..handler
function homePage(req, res) {
    let url = `https://api.covid19api.com/world/total`
    superagent.get(url)
        .then(details => {
            let wordTotal = details.body
            res.render("pages/index", { data: wordTotal })
        })
}

function searche(req, res) {
    let { country, start, end } = req.body
    let url = `https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`
    superagent.get(url)
        .then(result => {
            let statics = result.body
            res.render("pages/resultPage", { data: statics })
        })
}
function countryPage(req, res) {
    let url = `https://api.covid19api.com/summary`
    superagent.get(url)
        .then(result => {
            let allCounty = result.body
            console.log(allCounty)
            res.render("pages/countryPage", { data: allCounty })
        })
}
function saveIt(req, res) {
    let { Country, TotalDeaths, TotalRecovered, TotalConfirmed, Date } = req.body
    let SQL = `INSERT INTO aww (Country,TotalDeaths,TotalRecovered,TotalConfirmed,Date) VALUES ($1.$2,$3,$4,$5);`
    let VALUES = [Country, TotalDeaths, TotalRecovered, TotalConfirmed, Date]
    client.query(SQL, VALUES)
        .then(() => {
            res.redirect("/myRecord")
        })
}
function myRecordPage(req, res) {
    let SQL = `SELECT * FROM aww;`
    client.query(SQL)
        .then(result => {
            let myRecord = result.rows
            res.render("pages/myRecordPage", { data: myRecord })
        })
}
function detailsPage(req,res){
    let id = req.params.id
    let SQL = 
}
//..else

client.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening to ${PORT}`)
        })
    })
