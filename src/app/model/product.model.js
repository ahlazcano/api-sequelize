const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("product_test", "root", "oracle", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

class Product extends Model {}

Product.init({
    product_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    in_stock: {
        type: DataTypes.BOOLEAN
    },
}, 
{
    sequelize,
    modelName: "product",
}
);

module.exports = Product;
// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("All Good!!");
//     } catch (err) {
//         console.error("All Bad!!", err);
//     }
// }

// testConnection();
