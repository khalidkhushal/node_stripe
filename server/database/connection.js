const Sequelize = require(`sequelize`);


const sequelize = new Sequelize(`task_db`, `root`, `12345`, {
    host: `localhost`,
    dialect: `mysql`
});

sequelize.authenticate().then(() => {
    console.log(`connected to database`)
}).catch((err) => {
    console.error(`Error:`, err)
})

module.exports = sequelize;
global.sequelize = sequelize;