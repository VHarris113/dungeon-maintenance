const User = require('./User');
const Chosen = require('./Chosen');
const Character = require('./Character');

//Associations

User.hasMany(Character, {
    foreignKey: 'user_id',
    //intentionally excluding onDelete: 'CASCADE'
});

Character.belongsTo(User, {
    foreignKey: 'user_id',
});

Chosen.belongsTo(Character, {
    as: 'race',
    foreignKey: 'race'
});

Chosen.belongsTo(Character, {
    as: 'class',
    foreignKey: 'class'
});

module.exports = { User, Chosen, Character }