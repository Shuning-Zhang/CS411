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
// let config = {
//         user: process.env.DB_USER,
//         database: process.env.DB_DATABASE,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//     }
    
//     if (process.env.DB_INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//       config.socketPath = `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`;
//     }
    
//     var db = mysql.createConnection(config);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.post("/api/login", (require, response) => {
    const UserId = require.body.UserId;
    const Password = require.body.Password;

    const sqlSearchActor = "SELECT * FROM User WHERE UserId = ? AND Password = ?";

    db.query(sqlSearchActor, [UserId, Password], (err, result) => {
        if (err) console.log(err);
        if (result.length == 0) {
            response.send(false);
        }
    })
});

app.post("/api/signup", (require, response) => {
    const UserId = require.body.UserId;
    const Password = require.body.Password;

    const sqlInsert = "INSERT INTO `User` (`UserId`, `Password`) VALUES (?,?)";
    db.query(sqlInsert, [UserId, Password], (err, result) => {
        if (err) console.log(err);
    })
});

app.get("/api/getRecommMovie", (require, response) => {
    const sqlSelect = "SELECT * FROM RecommendMovie;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
    
});

app.get("/api/getRecommDirector", (require, response) => {
    const sqlSelect = "SELECT * FROM RecommendDirector;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
    
});

app.get("/api/getRecommActor", (require, response) => {
    const sqlSelect = "SELECT * FROM RecommendActor;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
    
});

app.get("/api/getDirector", (require, response) => {
    const sqlSelect = "SELECT Director.DirectorName, avg(Movie.avgRating) as ave From Movie Join Direct on Movie.movieId = Direct.MovieId Join Director on Direct.DirectorId = Director.DirectorId Group By Director.DirectorName ORDER BY ave DESC LIMIT 30;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
    
});

app.get("/api/getActor", (require, response) => {
    const sqlSelect = "SELECT Actor.ActorName, avg(Movie.avgRating) as ave From Movie Join Act on Movie.movieId = Act.MovieId Join Actor on Act.ActorId = Actor.ActorId Group By Actor.ActorId ORDER BY ave DESC LIMIT 30;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
    
});

app.post("/api/recommend", (require, response) => {
    const language = require.body.language;
    const runtime = require.body.runtime;
    const avgRating = require.body.avgRating;
    const GenreType = require.body.GenreType;
    
    const sqlSelect = "CALL recommendForUser(?,?,?,?);";
    
    db.query(sqlSelect, [language, runtime, avgRating, GenreType],(err, result) => {
        if (err) console.log(err);
        response.send("Submit Successfully!");
    });
    
});

app.post("/api/post", (require, response) => {
    const MovieLanguage = require.body.MovieId;
    
    const sqlSelect = "SELECT * FROM Movie WHERE movieId = ?;";
    
    db.query(sqlSelect,MovieLanguage,(err, result) => {
        response.send(result);
        console.log(result);
    });
    
});

app.post("/api/postSearch", (require, response) => {
    const MovieGenre = require.body.MovieGenre;
    const sqlSelect = "select * from Movie Natural Join style Natural Join Genre where GenreType = ?;";
    db.query(sqlSelect,MovieGenre,(err, result) => {
        response.send(result);
    });
    
});

app.post("/api/postSearchFav", (require, response) => {
    const UserId = require.body.UserId;
    const sqlSelect = "select * from Fav WHERE UserId = ?;";
    db.query(sqlSelect,UserId,(err, result) => {
        response.send(result);
    });
    
});

app.post("/api/insertUser", (require, response) => {
    const MovieId = require.body.UserId;
    const MovieLanguage = require.body.Fav_Movie;
    const MovieIntro = require.body.Fav_Director;
    const MovieRuntime = require.body.Fav_Actor;
    console.log(MovieId);
    console.log(MovieLanguage);
    const sqlInsert = "INSERT INTO Fav (UserId, Fav_Movie, Fav_Director, Fav_Actor) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [MovieId, MovieLanguage, MovieIntro, MovieRuntime],(err, result) => {
        response.send("Insert Successfully!");
    })
})


app.get("/api/getUser", (require, response) => {
    const sqlSelect = "SELECT * FROM Fav WHERE ";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
    });
});

app.delete("/api/deleteUser/:UserId", (require, response) => {
    const MovieId = require.params.UserId;
    console.log(MovieId);
    const sqlDelete = "DELETE FROM Fav WHERE UserId = ?";
    console.log(sqlDelete);
    db.query(sqlDelete, MovieId, (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.put("/api/updateUser/", (require, response) => {
    const MovieId = require.body.UserId;
    const MovieName = require.body.Fav_Movie;

    const sqlUpdate = "UPDATE Fav SET Fav_Movie = ? WHERE UserId = ?";
    db.query(sqlUpdate, [MovieName,MovieId], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.put("/api/updateDirector/", (require, response) => {
    const MovieId = require.body.UserId;
    const MovieName = require.body.Fav_Director;
    
    const sqlUpdate = "UPDATE Fav SET Fav_Director = ? WHERE UserId = ?";
    db.query(sqlUpdate, [MovieName,MovieId], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.put("/api/updateActor/", (require, response) => {
    const MovieId = require.body.UserId;
    const MovieName = require.body.Fav_Actor;
    
    const sqlUpdate = "UPDATE Fav SET Fav_Actor = ? WHERE UserId = ?";
    db.query(sqlUpdate, [MovieName,MovieId], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

