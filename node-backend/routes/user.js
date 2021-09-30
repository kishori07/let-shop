const express = require("express");
const path = require("path");
const userController = require("../controllers/admin");
const allController = require("../controllers/usersList");
const paymentController = require("../controllers/payment");
const { RouteReuseStrategy } = require("@angular/router");
// const cartController = require("../controllers/carts");
const router = express.Router();

router.get('/');

router.get('/getAllUsers', allController.getUsers);

router.get('/getUserById/:id', allController.getUserById);

router.post('/add-user', userController.addNewUser);

router.post('/loginUser', allController.loginUser);

router.post('/webhook', paymentController.webhook);
router.post('/payementintent', paymentController.payementintent);
// router.post('/addToCart', cartController.itemAdded);

// router.get('/getCartItem/:id', cartController.getAllCartByUserId);

router.delete('/removeCartItem', userController.removeCartItem);

// router.delete('/removeAll', userController.removeAll);

router.put('/addCartToUser', userController.addCartToUser);

router.put('/updateQuantity', userController.updateQuantity);

router.get('/api/payment/success', paymentController.Success);

router.post('/api/payment', paymentController.payment);
module.exports = router;