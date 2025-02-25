const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('najiz', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
