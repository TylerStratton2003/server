const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

var db = mysql.createPool({
    coonectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'Tyler4199!',
    database        : 'final'
});

app.get('/title', (req, res) => {
    const title = req.query.title;
    db.query("SELECT * FROM games WHERE title = ?", [title],(err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json(result)
        }

    })
})

app.get('/tags', (req, res) => {
    const tag1 = "%" + req.query.tag1 + "%";
    const tag2 = "%" + req.query.tag2 + "%";
    db.query("SELECT games.app_id, games.title, games.date_release, games.win, games.mac, games.linux, games.rating, games.positive_ratio, games.user_reviews, games.price_final, games.price_original, games.discount, games.steam_deck, gameTags.tags FROM games INNER JOIN gameTags ON games.title = gameTags.title WHERE tags LIKE ? AND tags LIKE ?", [tag1, tag2],(err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json(result)
        }

    })
})

app.get('/', (req, res) => {
    const title = req.body.title;
    db.query("SELECT * FROM games",(err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json(result)
        }

    })
})

app.listen(8080, () => {
    console.log('server listening on port 8080');
})