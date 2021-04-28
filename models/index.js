const User = require('./User');
const Character = require('./Character');

//Associations

User.hasMany(Character, {
    foreignKey: 'user_id',
    //intentionally excluding onDelete: 'CASCADE'
});

Character.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Character }