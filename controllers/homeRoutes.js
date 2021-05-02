const router = require('express').Router();

const {
    Character,
    User
} = require('../models');

// const { Character, Chosen, User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage');
});
//router get at homepage for and render homepage
router.get('/', (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', (req, res) => {
    try {
        res.render('homepage', {
            logged_out: req.session.logged_out
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/character-selection', withAuth, (req, res) => {
    try {
        res.render('character-selection', {
            characters: req.session.characters
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//router to redirect to character-selection.handlebars after login
router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/api/character')

            return;
        }

        res.render('homepage');

    } catch (err) {
        res.status(500).json(err);
    }
});

//router to character-creation.handlebars

// this is for the file upload section - move to character create when done


module.exports = router;