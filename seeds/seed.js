const sequelize = require('../config/connection');
const {User, Character, Chosen} = require('../models');

const userData = require('./userData.json');
const characterData = require('./characterData.json');
const chosenData = require('./chosenData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        
    });

    for (const character of characterData) {
        await Character.create({
            ...character,
            user_id: users[Math.floor(Math.random()*users.length)].id,
        })
    }
    process.exit(0);
};

seedDatabase();