const express = require("express");
const multer = require("multer");
const userController = require("../controllers/signup");
const router = express.Router();
const productController = require("../controllers/addproduct");
const specController = require("../controllers/specification");
const path = require("path");
// router.get('/');
// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {

//     callBack(null, '/public/upload');
//   },
//   filename: (req, file, callBack) => {
//     callBack(null, `FunOfHeuristic_${file.originalname}`);
//   },
// });
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, path.join(__dirname, '../public/upload'))

  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

router.post('/add-admin', upload.single('imgUrl'), userController.addNewAdmin);


router.post('/add-products', upload.array('productImage', 5), productController.addproducts);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.post('/getAdminByEmail', userController.getAdminByEmail);
// router.get('/photo:filename', (req, res) => {
//   const img = req.query.filename;
//   console.log(img);
// });
router.post('/addprodSpec', specController.addprodSpec);
router.get('/getProdSpec/:id', specController.getProdSpec);
module.exports = router;