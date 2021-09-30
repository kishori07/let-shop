// const Item = require("../models/cart");

// exports.itemAdded = (req, res) => {
//     console.log(req.body);
//     const userId = req.body.userId;
//     const productId = req.body.productId;
//     const quantity = req.body.quantity;

//     const items = new Item({
//         userId: userId,
//         productId: productId,
//         quantity: quantity,
//     });
//     items
//         .save()
//         .then((result) => {
//             console.log(result);
//             if (result)
//                 res
//                     .status(200)
//                     .send({ successcode: 1, message: "success", data: items });
//             else
//                 res.status(500).send({
//                     successcode: 0,
//                     message: "Something went wrong,Please try again !",
//                     data: "null",
//                 });
//             console.log("Successfully 1 product added to cart !");
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send(err);
//         });
// };

// exports.getAllCartByUserId = (req, res) => {
//     const id = req.params.id;

//     Item.findById(
//         id, function (err, docs) {
//             if (err) {
//                 console.log(err);
//                 res
//                     .status(404)
//                     .send({
//                         successcode: 0,
//                         message: "Product not found with id :" + `${id}`,
//                         data: null,
//                     });
//             } else {
//                 console.log("Result : ", docs);
//                 res.status(200).send({ successcode: 1, message: "Found 1 product of id :" + `${id}`, data: docs });
//             }

//         });


// };