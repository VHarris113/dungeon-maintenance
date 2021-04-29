const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const models = require('./models');
// const hbs = exphbs.create({ helpers });

// This is the line that will inject the tables directly to your database
const models = require('./models');

const hbs = exphbs.create({ helpers });
const initRoutes = require('./controllers/api/web');
global.__basedir = __dirname

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
initRoutes(app);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('The dungeon calls to us.')
    });
});