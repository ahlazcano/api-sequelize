const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Product = require("../app/model/product.model");

// Obtener todos los productos
router.get("/products", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: products 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

// Obtener un producto por su ID
router.get("/products/:product_id", async (req, res) => {
    try {
        const id = req.params.product_id;
        const singleProduct = await Product.findOne({
            where: {
                product_id: id
            }
        });
        if (singleProduct) {
            res.status(200).json({
                ok: true,
                status: 200,
                body: singleProduct
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: 'Product not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

// Crear un nuevo producto
router.post("/products", async (req, res) => {
    try {
        const dataProducts = req.body;
        
        if (!dataProducts || !dataProducts.product_name || !dataProducts.price) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Product data is incomplete or missing'
            });
        }

        await Product.sync();
        const createProduct = await Product.create({
            product_name: dataProducts.product_name,
            price: dataProducts.price,
            is_in_stock: dataProducts.is_in_stock || false,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created product",
            product: createProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

// Actualizar un producto por su ID
router.put("/products/:product_id", async (req, res) => {
    try {
        const id = req.params.product_id;
        const dataProducts = req.body;

        const updateProduct = await Product.update({
            product_name: dataProducts.product_name,
            price: dataProducts.price,
            is_in_stock: dataProducts.is_in_stock || false,
        }, {
            where: {
                product_id: id,
            }
        });

        if (updateProduct[0] === 1) { // Sequelize update returns an array, with the first element being the number of affected rows
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Product updated successfully',
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: 'Product not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

// Eliminar un producto por su ID
router.delete("/products/:product_id", async (req, res) => {
    try {
        const id = req.params.product_id;
        const deleteProduct = await Product.destroy({
            where: {
                product_id: id,
            }
        });

        if (deleteProduct) {
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Product deleted successfully'
            });
        } else {
            res.status(404).json({
                ok: false,
                status: 404,
                message: 'Product not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;
