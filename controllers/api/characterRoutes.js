const router = require('express').Router();
const { Character, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a character
router.post('/create', withAuth, (req, res) => {
    try {
        const newCharacter = Character.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete a character
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const characterData = await Character.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!characterData) {
            res.status(404).json({ message: 'No character found with this id!' });
            return;
        }

        res.status(200).json(characterData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//find all characters by user id 
router.get('user/:id', withAuth, async (req, res) => {
    try {
        const characterData = await Character.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: id,
                },
            ],
        });

        const userCharacter = characterData.get({ plain: true });
        console.log(userCharacter);
        res.render('character-selection', {
            ...userCharacter
        });

    } catch (err) {
        res.status(404)
        alert("You have no characters to display!")
            .then(res.redirect('/create'));
    }
});

//find all characters in db regardless of user
router.get('/', async (req, res) => {
    try {
        const characters = await Character.findAll({});
        console.log(characters);
        res.json(characters)
    } catch (err) {
        res.status(400).json(err);
    }

});

//find one character by character id

router.get('/:id', withAuth, async (req, res) => {
    try{ 
        const characterData = await Character.findByPk(req.params.id);
        if(!characterData) {
            res.status(404).json({message: 'No character with this id!'});
            return;
        }
        const character = characterData.get({ plain: true });
        res.render('character-selection', character);
      } catch (err) {
          res.status(500).json(err);
      };     
});

//update a character TODO: we need to decide if we are going to include this or not. We would need a separate page I think.
router.put('/:id', async (req, res) => {
    try {
        const characterData = Character.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!characterData[0]) {
            res.status(404).json({ message: 'No character found with this id!' });
            return;
        }
        res.status(200).json(characterData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;