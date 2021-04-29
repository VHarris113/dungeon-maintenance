const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const auth = require('./utils/auth');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create({});

// This is the line that will inject the tables directly to your database
const models = require('./models');



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('The dungeon calls to us.')
    });
});
