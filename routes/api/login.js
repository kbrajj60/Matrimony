const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/User');



// @route    POST api/login
// @desc     Authenticate user & get tokepogestn
// @access   Public
router.post('/signin', check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

  router.post("/signup",
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    async (req,res) => 
    {   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("Users Post call");
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        //image for the email
         const avatar =
        //  normalize(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          }
        //   ),
        //   { forceHttps: true }
        )
        ;
  
        user = new User({
          name,
          email,
          avatar,
          password
        });
  
        const salt = await bcrypt.genSalt(10);
  
        //Decrypt the password before saving in Database
        user.password = await bcrypt.hash(password, salt);
  
        //Save user in Database
        await user.save();
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        //Return Json WebToken When user is registered
      
         jwt.sign(
           payload,
           config.get('jwtSecret'),
           { expiresIn: '5 days' },
           (err, token) => {
             if (err) throw err;
             res.json({ token });
           }
         );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
});
  


  module.exports = router;