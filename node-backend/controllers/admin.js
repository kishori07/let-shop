const Register = require("../models/Resgister.js");


exports.addNewUser = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  // const imgUrl = req.body.imgUrl;
  const address = req.body.address;
  const mobileno = req.body.mobileno;
  const password = req.body.password;
  // console.log(password);
  const email = req.body.email;
  const cpassword = req.body.cpassword;
  const bcrypt = require('bcrypt');
  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedCpassword = bcrypt.hashSync(cpassword, 10);

  // console.log(hashedPassword);
  // const cpass = bcrypt.compareSync(cpassword, hashedPassword);
  // console.log(cpass);

  const register = new Register({
    name: name,
    mobileno: mobileno,
    // imgUrl: imgUrl,
    address: address,
    password: hashedPassword,
    cpassword: hashedCpassword,
    email: email,
  });
  register
    .save()
    .then((result) => {
      // console.log(result);
      res.send(register);
      // console.log("User successfully sign-Up !");
      // res.redirect('/user/register');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addCartToUser = (req, res) => {
  // console.log(req.body);
  const { id, productId, quantity, cartId } = req.body;
  Register.findOneAndUpdate(
    { _id: id },
    { $push: { cartItems: { "Cart": productId, "quan": quantity } } },
    { new: true }
  )
    .then(cartItems => {
      // console.log(cartItems);
      res.status(200).send({ successcode: 1, message: "Successfully 1 item is added to cart !", data: cartItems })
    })
    .catch(err => res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null }));
  // Register.updateOne(
  //   { _id: id },
  //   { $push: { cartItems: { "Cart": productId, "quan": quantity } } }, { new: true, upsert: true }).exec()
  // res.sendStatus(200);

}
// exports.updateQuantity = (req, res) => {
//   console.log(req.body);
//   const { id, productId, quantity } = req.body;
//   // console.log(docs);
//   Register.findOneAndUpdate({ _id: id, "cartItems.Cart": productId }, { $set: { [cartItems.$[quan]]: quantity } },
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         console.log(result);
//         res.send("Ok");
//       }
//     }
//   );
//

// ).then(cartItems => {
//   console.log(cartItems);
//   res.status(200).send({ successcode: 1, message: "Successfully Update quantity of id :" + `${productId}`, data: cartItems['cartItems'] })
// })
//   .catch(err => res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null }));

// ).
//   catch(err => {
//     console.log(err);
//   })
// { $set: { "Cart": productId, "quan": quantity } },
// { new: true }
//   Register.findById(
// ).then(cartItems => {
//   console.log(cartItems);
//   res.status(200).send({ successcode: 1, message: "Successfully Update quantity of id :" + `${productId}`, data: cartItems['cartItems'] })
// })
//   .catch(err => res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null }));
// }
// exports.removeAll = (req, res) => {
//   console.log(req.body);
//   const { id, productId } = req.body;
//   Register.findOneAndUpdate(
//     { _id: id },
//     { $pull: { cartItems: [{ Cart: productId },] } },
//     { new: true }
//   ).then(cartItems => {
//     res.status(200).send({ successcode: 1, message: "Successfully delected items from Cart !", data: cartItems['cartItems'] })
//   })
//     .catch(err => {
//       res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null })
//     });
// }

exports.removeCartItem = (req, res) => {
  console.log(req.body);
  const { id, productId } = req.body;
  Register.findOneAndUpdate(
    { _id: id },
    { $pull: { cartItems: { Cart: productId } } },
    { new: true }
  )
    .then(cartItems => {
      // console.log(cartItems);
      res.status(200).send({ successcode: 1, message: "Successfully delected 1 item from Cart !", data: cartItems['cartItems'] })
    })
    .catch(err => {
      res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null })
    });
  // const { id, productId, quantity } = req.body;
  // Register.updateOne(
  //   { _id: id },
  //   { $pull: { cartItems: { "Cart": productId, "quan": quantity } } }, { new: true, upsert: true }).exec()
  // res.sendStatus(200);
}

exports.updateQuantity = (req, res) => {
  // console.log(req.body);
  const { id, productId, quantity } = req.body;
  Register.findOneAndUpdate(
    { _id: id, "cartItems.Cart": productId },
    { $set: { "cartItems.$.quan": quantity } },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null })
      }
      else {
        // console.log(result);
        res.status(200).send({ successcode: 1, message: "Successfully Updated 1 item from Cart !", data: result })
      }
    }
  )
  // .then(cartItems => {
  //   console.log(cartItems);
  //   res.status(200).send({ successcode: 1, message: "Successfully Updated 1 item from Cart !", data: cartItems })
  // })
  //   .catch(err => {
  //     res.status(500).send({ successcode: 0, message: "Something went wrong , Please try again !", data: null })
  //   });
}