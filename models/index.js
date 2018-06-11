const Sequelize = require('sequelize');
let sequelize = null;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: true //false
    })
} else {

    sequelize = new Sequelize('foodgatsby', 'root', 'root', {
        host: 'localhost',
        dialect: 'postgres',
    });

}

const models = {
    role: sequelize.import("./role"),
    user: sequelize.import("./user"),
    restaurant: sequelize.import("./restaurant"),
    product: sequelize.import("./product"),
    branch: sequelize.import("./branch"),
    reminder: sequelize.import("./reminder"),
    activation: sequelize.import("./activation"),
}

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;