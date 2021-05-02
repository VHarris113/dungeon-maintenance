const router = require('express').Router();
const { Character, User } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
// const fileUpload = require('express-fileupload');

//create a character
router.post('/', async (req, res) => {

    try {
        const newCharacter = Character.create({
            ...req.body,
            user_id: req.session.user_id,
        });

      res.render('character-selection',{newCharacter})
    } catch (err) {
        res.status(400).json(err);
    }
});


//delete a character
router.delete('/:character_id', async (req, res) => {
    console.log(req.params.character_id)
    try {
        const characterData = await Character.destroy({
            where: {
                character_id: req.params.character_id,
                // user_id: req.session.user_id,
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


// //find all characters by user id 
router.get('/user/:user_id', async (req, res) => {
    try {
    const charData = await Character.findAll({
            where: {
                user_id: req.params.user_id
            }
    });
    const characters = charData.map(char => char.get({plain : true}));
    console.log(characters);
    res.render('character-selection', {characters});
} catch (err) {
    res.status(500).json(err);
}
});
    // console.log(req.params.user_id)
//     try {
//         //const characterData = await Character.findByFk(req.params.user_id);
// const characterData = await Character.findAll({
//     attributes: ['name'],
//     where: {
//         user_id: req.params.user_id
//     }
// })

//         const userCharacter = characterData.get({ plain: true });
//         console.log(userCharacter);
//         // res.render('character-selection', {
//         //     ...userCharacter
//         // });
//         res(200).json(userCharacter)

//     } catch (err) {
//         res.status(404);
//        // res.send("You have no characters to display!");
//          //  res.redirect('/create');
//     }
// });

// //find all characters in db regardless of user
router.get('/', async (req, res) => {
    try {
        const charData = await Character.findAll({});
        const characters = charData.map(char => char.get({plain : true}));
        console.log(characters);
        res.render('character-selection', {characters});
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

// route for upload picture --- in server file now
// router.post('/', (req, res) => {
//     let sampleFile;
//     let uploadPath;
//     console.log(req)
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

// From Multer documentation: https://github.com/expressjs/multer#diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '../../../public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  
  // The upload.single() middleware is used when a single file is expected:
  // https://github.com/expressjs/multer#singlefieldname
  router.post('/', withAuth, upload.single('image'), async (req, res) => {
    // req.file is the 'image' file.
    console.log('req.file', req.file);
  
    try {
      const newProject = await Project.create({
        ...req.body,
        // If no image was uploaded, undefined is returned, and the project is created with the default image.
        image: req.file && req.file.originalname,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });
module.exports = router;