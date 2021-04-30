const router = require('express').Router();
const { Character, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a character
router.post('/create', async (req, res) => {
    try {
        const newCharacter = await Character.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(400).json(err);
    }
});


//delete a character
// router.delete('/:id', async (req, res) => {
//     console.log(req.params.character_id)
//     try {
//         const characterData = await Character.destroy({
//             where: {
//                 id: req.params.character_id,
//                 // user_id: req.session.user_id,
//             },
//         });

//         if (!characterData) {
//             res.status(404).json({ message: 'No character found with this id!' });
//             return;
//         }

//         res.status(200).json(characterData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// //find all characters by user id 
// router.get('/user/:id', async (req, res) => {
//     try {
//         const characterData = await Character.findAll(req.params.user_id);

//         const userCharacter = characterData.get({ plain: true });
//         console.log(userCharacter);
//         res.render('character-selection', {
//             ...userCharacter
//         });

//     } catch (err) {
//         res.status(404);
//         res.send("You have no characters to display!")
//             .then(res.redirect('/create'));
//     }
// });

// //find all characters in db regardless of user
router.get('/', async (req, res) => {
    try {
        const characters = await Character.findAll({});
        console.log(characters);
        res.json(characters)
    } catch (err) {
        res.status(400).json(err);
    }

});

// //find one character by character id

router.get('/:character_id', async (req, res) => {
    console.log(req.params.Character)
    try{ 
        const characterData = await Character.findByPk(req.params.character_id);
        if(!characterData) {
            res.status(404).json({message: 'No character with this id!'});
            return;
        }
        const character = characterData.get({ plain: true });
        res.render('character-selection', character);
        // res.status(200).json(character)
      } catch (err) {
          res.status(500).json(err);
      };     
});

// //update a character TODO: we need to decide if we are going to include this or not. We would need a separate page I think.
// router.put('/:id', async (req, res) => {
//     try {
//         const characterData = Character.update(req.body, {
//             where: {
//                 id: req.params.id,
//             },
//         });
//         if (!characterData[0]) {
//             res.status(404).json({ message: 'No character found with this id!' });
//             return;
//         }
//         res.status(200).json(characterData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// route for upload picture
// router.post('/', (req, res) => {
//     let sampleFile;
//     let uploadPath;
//     console.log(req.files.cat)
//     if (!req.files || Object.keys(req.files).length === 0) {
//         console.log("not right")
//         return res.status(400).send('No files uploaded.');
//     }
//     //name of input is sampleFile
//     sampleFile = req.files.cat;

//     uploadPath = __dirname + '/upload/' + sampleFile.name
//     console.log(sampleFile);

//     //use mv to put file on server

//     sampleFile.mv(uploadPath, function (err) {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         res.send('File uploaded to ' + uploadPath);

//     });


// });

module.exports = router;