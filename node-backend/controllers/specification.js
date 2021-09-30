const Specification = require("../models/spec");

exports.addprodSpec = (req, res) => {
    // console.log("Files", req.files);
    console.log("Body", req.body);

    const products = new Specification(req.body);

    products
        .save()
        .then((result) => {
            console.log(result);
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

exports.getProdSpec = (req, res) => {
    const id = req.params.id;

    Specification.findById(id, function (err, docs) {
        if (err) {
            console.log(err);
            res
                .status(404)
                .send({
                    successcode: 0,
                    message: "Specification not found with id :" + `${id}`,
                    data: null,
                });
        } else {
            // console.log("Result : ", docs);
            res.status(200).send({ successcode: 1, message: "Found Specification of id :" + `${id}`, data: docs });
        }

    });
}