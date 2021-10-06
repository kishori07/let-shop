const express = require("express");
const path = require("path");
const CORS = require('cors');
const app = express();
const expressJWT = require('express-jwt');
const mongoose = require("mongoose");
const dbConfig = require("./utility/database.js");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/adminroute")
// const mongoClient = require("mongodb").MongoClient;
let secret = 'some_secret';
app.use(CORS());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
// app.use(express.static(__dirname + '/public'));
// app.use('/upload', express.static('upload'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, '/uploads')));
app.use('/user', userRouter);
app.use('/admin', adminRouter);
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(expressJWT({ secret: secret, algorithms: ['HS256'] })
  .unless( // This allows access to /token/sign without token authentication
    {
      path: [
        '/',
        '/user',
        '/user/loginUser',
        '/admin/getAdminByEmail',
        '/admin/getAllProducts',
        'public/upload/',

      ]
    }
  ));
app.get('/user', (req, res) => {
  res.status(200)
    .json({
      "success": true,
      "msg": "Secret Access Granted"
    });
});
app.get('/admin', (req, res) => {
  res.status(200)
    .json({
      "success": true,
      "msg": "Secret Access Granted"
    });
});
const port = process.env.PORT || 3000;
// const port = 'https://lets--shop.herokuapp.com/'
// app.use('/up', adminRouter);
// app.use('/getUsers',userRouter);
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(result => {
  app.listen(port, () => {
    console.log("Listening at port 3000 !");
  })
}).catch(err => {
  console.log(err);
})

// app.get("/", (req, res) => {
//   res.send("Hello");
// });




// mongoClient.connect(
//   dbConfig.url,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err, dbs) => {
//     if (err) throw err;
//     if (dbs) {
//       const db = dbs.db("mobileApp");
//       const mb = db.collection("saveData");
//       app.locals.collection = { mb };
//       console.log("Successfully Connected to Database !");
//       app.listen(3000, () => {
//         console.log("Listening at port 3000 !");
//       });
//     }
//   }
// );

