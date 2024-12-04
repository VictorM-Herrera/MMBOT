const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Weapon = sequelize.define('Weapon', {
    name: {
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    true_damage:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    fisical_damage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    magic_damage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    crit_chance: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
    },
    crit_damage: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
    },
    atack_speed: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
    },
    fisical_pen: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    magic_pen: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    price:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    level:{
        type: DataTypes.INTEGER,
        defaultValue:1,
    },
    rarity: {
        type: DataTypes.STRING(50),
        allowNull:false,
    },
},{
    timestamps:false,
});

module.exports = Weapon;