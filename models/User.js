const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User',{
    discord_id:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    hasJoined: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    level:{
        type: DataTypes.INTEGER,
        defaultValue:1,
    },
    rolls:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    gold:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    class:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    max_health: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
    },
    true_damage:{
        type:DataTypes.INTEGER,
        defaultValue:10,
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
        defaultValue: 0.05, // 5%
    },
    crit_damage: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 1.5, // Multiplicador 1.5x
    },
    armor: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
    },
    fisical_armor: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
    },
    magic_armor: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
    },
    atack_speed: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 1.0, // Ataques por segundo
    },
},{ timestamps: false,});

module.exports = User;
