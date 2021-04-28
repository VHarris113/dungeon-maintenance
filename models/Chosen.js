const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chosen extends Model {}

Chosen.init (
    {
        race: {
            type: DataTypes.STRING
        },
        class: {
            type: DataTypes.STRING 
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chosen',
      }
);

module.exports = Chosen;