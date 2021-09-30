const AdminSignUp = require("../models/AdminSignUp.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
let secret = "some_secret";

exports.addNewAdmin = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  // const imgUrl = req.body.imgUrl;
  const address = req.body.address;
  const mobileno = req.body.mobile;
  const password = req.body.password;
  const email = req.body.email;
  const cpassword = req.body.cpassword;
  const imgUrl = req.file.filename;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedCpassword = bcrypt.hashSync(cpassword, 10);

  const adminSignUp = new AdminSignUp({
    name: name,
    mobileno: mobileno,
    imgUrl: imgUrl,
    address: address,
    password: hashedPassword,
    cpassword: hashedCpassword,
    email: email,

  });
  adminSignUp
    .save()
    .then((result) => {
      // console.log(result);
      res.send(adminSignUp);
      // console.log("User successfully sign-Up !");
      // res.redirect('/user/register');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminByEmail = (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  AdminSignUp.find({ email: email }).then((user) => {
    // console.log(user);
    let userData = {
      uname: user.name,
      password: user.password,
    };
    const hashedPassword = user[0].password;
    // console.log(hashedPassword);
    // console.log(password);


    // const verified = bcrypt.compare(password, hashedPassword);
    // console.log(verified);
    bcrypt.compare(password, hashedPassword, function (err, result) {
      // console.log(result);
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
        res
          .status(200)
          .send({
            token: token,
            successcode: 1,
            message: "Successfully Logged In !",
            data: user,
          });
      }

    })
  }).
    catch(err => {
      console.log(err);
      res.status(404).send({ successcode: 0, message: "EmailId is not Found !", data: "null" })
    })


}