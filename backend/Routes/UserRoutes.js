const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require("./../models/user");



router.get('/', (req, res) => {
    res.render('login')
});

router.get("/signup", (req, res) => {
    res.render("signup")
});

router.get('/logout', (req, res) => {
 res.render('login')
});

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const registeredUser = await User.findOne({ name, email })//user is already registered or not
        if (!registeredUser) {
            const hashedpassword = await bcrypt.hash(password, 10);
            const userdata = new User({
                name,
                email,
                password: hashedpassword,
            });
            await userdata.save();

            console.log(userdata);
            res.status(200).redirect('/index.html');
        } else {
            res.status(400).json({ message: 'User already registered' });

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
});


router.post('/login', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Find the user by name or email only (do not check password here)
        const userdata = await User.findOne({ 
            name, 
            email 
        });

        if (!userdata) {
            return res.status(400).send('User not found');
        }
        // Check if the entered password matches the hashed password in the DB
        const isMatch = await bcrypt.compare(password, userdata.password);

        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        console.log(userdata);

        // User authenticated, render the home page or send a success response
        // res.status(200).json(userdata)
        res.redirect("/index.html");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;