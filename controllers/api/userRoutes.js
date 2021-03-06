const router = require('express').Router();
const { User } = require('../../models');

//if click on home, route to home
//if logged in, route to character-creation.handlebars
//post request to create new character
router.post('/', async (req, res) => {
    // console.log(req.body);
    try {
        const dbUserData = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400)
      res.json({ message: 'Alas, not enough magic! Try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400)
      res.json({ message: 'Alas, not enough magic! Try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      console.log("Is this coming in?", req.session.loggedIn)
      res.json({ user: userData, message: 'Huzzah! Welcome home, warrior!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log('what is this', req.session.loggedIn);
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
        res.redirect('/');
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  