const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'35.192.150.223',
    user: 'root',
    password:'123456',
    database:'project',
})

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Actor LIMIT 10";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.get("/api/find", (require, response) => {
    const sqlSelect = `SELECT * 
    FROM (SELECT Actor.ActorName AS Name, COUNT(*) AS Count 
    FROM Favorite JOIN Actor ON Favorite.FavActor = Actor.ActorId
    GROUP BY Actor.ActorName
    ORDER BY Count DESC) AS t1 UNION
    (SELECT Director.DirectorName AS Name, COUNT(*) AS Count
    FROM Favorite JOIN Director ON Favorite.FavDirector = Director.DirectorId
    GROUP BY Director.DirectorName
    ORDER BY Count DESC)
    ORDER BY Count DESC
    LIMIT 15;`;
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// app.get("/api/search", (require, response) => {
//     const ActorName = require.body.ActorName;
//     const sqlSearch = "SELECT * FROM Actor WHERE ActorName = ?";
//     db.query(sqlSearch, ActorName, (err, result) => {
//         response.send(result);
//         //console.log(result);
//     });
// });

app.post("/api/search", (require, response) => {
    const ActorName = require.body.ActorName;

    const sqlSearchActor = "SELECT * FROM Actor WHERE ActorName = ?";
    db.query(sqlSearchActor, ActorName, (err, result) => {
        //if (err) console.log(err);
        //console.log(ActorName);
        response.send(result);
        //console.log(result);
    })
});

app.post("/api/insert", (require, response) => {
    const movieName = parseInt(require.body.ActorId);
    const movieReview = require.body.ActorName;

    const sqlInsert = "INSERT INTO `Actor` (`ActorId`, `ActorName`) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) console.log(err);
    })
});


app.delete("/api/delete/:ActorId", (require, response) => {
    const ActorId = parseInt(require.params.ActorId);

    const sqlDelete = "DELETE FROM `Actor` WHERE `ActorId`= ?";
    db.query(sqlDelete, ActorId, (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const movieName = parseInt(require.body.ActorId);
    const movieReview = require.body.ActorName;

    const sqlUpdate = "UPDATE `Actor` SET `ActorName` = ? WHERE `ActorId`= ?";
    db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

