const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Armor = sequelize.define('Armor', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    max_health:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    armor: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
    },
    fisical_armor: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    magic_armor: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    regeneracion_vida_min: {//todavia no tiene funcionamiento
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
    },
    price:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    level:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
},{
    timestamps: false,
});

module.exports = Armor;