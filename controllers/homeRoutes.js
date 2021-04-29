const router = require('express').Router();
const { Character, Chosen, User } = require('../models');
const withAuth = require('.../utils/auth');

//router get at homepage for and render homepage
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_out: req.session.logged_out
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/character-selection', async (req, res) => {
    try {
        res.render('character-selection', {
            characters: req.session.characters
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//router to login/sign up
router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/character-selection')
        } else {
            res.redirect('/login')
        }
        res.render('character-selection');

    } catch (err) {
        res.status(500).json(err);
    }
})
//router to profile/character collection