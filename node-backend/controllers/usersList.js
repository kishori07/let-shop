const Register = require("../models/Resgister.js");
const bcrypt = require("bcrypt");
// const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
var sessionstorage = require('sessionstorage');
// const fs = require('fs');
// const RSA_PRIVATE_KEY = fs.readFileSync('../demos/private');
// fs.readFileSync(__dirName + '/dist/ssl/keys/server.key')
//to get all user list
let secret = "some_secret";
exports.getUsers = (req, res) => {
  Register.find()
    .then((users) => {
      // console.log(users);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

//to find user by emailid
exports.loginUser = (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  // console.log(password);
  // console.log(email);

  Register.find({ email: email })
    .then((user) => {
      // console.log(user);
      let userData = {
        uname: user.name,
        password: user.password,
      };

      const hashedPassword = user[0].password;
      // console.log(hashedPassword);
      // console.log(password);
      // const verified = bcrypt.compareSync(password, hashedPassword);
      // console.log(verified);
      bcrypt.compare(password, hashedPassword, function (err, result) {
        if (err) {
          throw err;
        } else if (!result) {
          // console.log("Password doesn't match!");
          res
            .status(401)
            .send({
              successcode: 0,
              message: "Email id or password is incorrect !",
              data: null,
            });
        } else {
          // console.log("Password matches!");
          let token = jwt.sign(userData, secret, { expiresIn: "15s" });
          // sessionstorage.setItem('token', token);
          res
            .status(200)
            .send({
              token: token,
              successcode: 1,
              message: "Successfully Logged In !",
              data: user,
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ successcode: 0, message: "Invalid EmailId or Password !", data: null })
    });
};

exports.getUserById = (req, res) => {

  const Id = req.params.id;
  // const password =req.body.password;
  // console.log(password)
  // console.log(Id);

  Register.findById(Id, function (err, docs) {
    if (err) {
      console.log(err);
      res
        .status(404)
        .send({
          successcode: 0,
          message: "User not found with id :" + `${Id}`,
          data: null,
        });
    } else {
      // console.log("Result : ", docs);
      res.status(200).send({ successcode: 1, message: "Found User of id :" + `${Id}`, data: docs });
    }
  }).
    catch(err => {
      console.log(err);
    })

};
