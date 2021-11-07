const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

// @route    GET api/profile/me
// @desc     Get all profiles
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
      const profile = await Profile.find({
        user: {$nin :  req.user.id}
      });
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/profile/me
// @desc     Get current logged users matrimony profiles
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/',
    auth,
    async (req, res) => {
       
      // destructure the request
      const {
        name,
        maritalstatus,
        gender,
        dob,
        timeofbirth,
        placeofbirth,
        height,
        weight,
        matchfor
      } = req.body;
  
      console.log("user id");
      console.log(req.user.id);
      // build a profile
      const profileFields = {
        user: req.user.id,
        name : name,
        maritalstatus : maritalstatus ,
        gender : gender,
        dob : dob,
        timeofbirth : timeofbirth,
        placeofbirth : placeofbirth,
        height : height,
        weight : weight,
        matchfor : matchfor    
      };
  
      console.log(profileFields);
      
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );


        let validationerror = profile.validateSync();
        if (validationerror != null) {
  
          return res.status(400).json({ errors: validationerror.message });
        }

        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    }
  );

  module.exports = router;