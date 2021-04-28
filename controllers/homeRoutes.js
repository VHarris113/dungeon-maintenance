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

router.get('/my-characters', async (req, res) => {
    try {
        res.render('my-characters', {
            characters: req.session.characters
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//router to login/sign up

//router to profile/character collection