const Sequelize = require(`sequelize`);
const sequelize = require(`./connection`)

const products = sequelize.define(`products`, {
    id: {
        type: Sequelize.INTEGER(5),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'products',
    modelName: 'products',

})

const orders = sequelize.define(`orders`, {
    id: {
        type: Sequelize.INTEGER(5),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
    },
    total: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    stripe_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'orders',
    modelName: 'orders',

})



module.exports = { products, orders };