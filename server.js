const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require('express-session')
// const helpers = require('./utils/helpers');
const auth = require('./utils/auth');
const fileUpload = require('express-fileupload');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create({});

// This is the line that will inject the tables directly to your database
const models = require('./models');
// default option


// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
// };

//   app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(fileUpload());
app.use(express.static('public'));
app.use(express.static('upload'));


sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => {
        console.log('The dungeon calls to us.')
    });
});