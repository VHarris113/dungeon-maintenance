const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Character extends Model{} 

Character.init(
    {
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        race: {
            type: DataTypes.STRING,
        },
        class: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
        profile_image: {
            type: DataTypes.STRING,
            defaultValue: 'filler.png',
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Character',
      }
);

module.exports = Character;