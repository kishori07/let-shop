const Products = require("../models/products");

exports.addproducts = (req, res) => {
    // console.log("Files", req.files);
    // console.log("Body", req.body);
    const imageArray = [];
    for (let i = 0; i < req.files.length; i++) {
        imageArray.push(req.files[i].originalname);
    }
    const pname = req.body.productBrandName;
    const pid = req.body.productId;
    const pprice = req.body.productPrice;
    const descp = req.body.Description;
    const pavailable = req.body.productAvailability;
    const pcode = req.body.productModel;
    const rating = req.body.StarRating;
    const pimage = imageArray;
    const category = req.body.category;
    const specId = req.body.specId;
    const products = new Products({
        productBrandName: pname,
        productId: pid,
        productPrice: pprice,
        Description: descp,
        productModel: pcode,
        productImage: pimage,
        productAvailability: pavailable,
        StarRating: rating,
        category: category,
        specId: specId
    });

    products
        .save()
        .then((result) => {
            // console.log(result);
            if (result)
                res
                    .status(200)
                    .send({ successcode: 1, message: "success", data: products });
            else
                res
                    .status(500)
                    .send({
                        successcode: 0,
                        message: "Something went wrong,Please try again !",
                        data: "null",
                    });
            // console.log("Successfully added 1 product !");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getAllProducts = (req, res) => {
    Products.find()
        .then((products) => {
            if (products)
                res
                    .status(200)
                    .send({
                        successcode: 1,
                        message: "Succefully Get All Products !",
                        data: products,
                    });
            else
                res
                    .status(404)
                    .send({
                        successcode: 0,
                        message: "Something went wrong,Please try again !",
                        data: null,
                    });
        })
        .catch((err) => {
            res.send(err);
        });
};
exports.getProductById = (req, res) => {
    const id = req.params.id;

    Products.findById(id, function (err, docs) {
        if (err) {
            console.log(err);
            res
                .status(404)
                .send({
                    successcode: 0,
                    message: "Product not found with id :" + `${id}`,
                    data: null,
                });
        } else {
            // console.log("Result : ", docs);
            res.status(200).send({ successcode: 1, message: "Found 1 product of id :" + `${id}`, data: docs });
        }

    });
};
