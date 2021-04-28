const sequelize = require("../config/connection");
const { User, Character } = require("../models");

const userData = require("./userData.json");
const characterData = require("./characterData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Creating the userdata and seeding it
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const characters = await Character.bulkCreate(characterData, {
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
