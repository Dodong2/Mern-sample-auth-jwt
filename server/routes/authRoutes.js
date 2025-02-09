const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const auth = require('../routes/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

router.use(cookieParser());

//register
router.post('/register', async(req, res) => {
    const { username, gmail, password } = req.body

    if (!username || !gmail || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    try {
        const hashedPass = await bcrypt.hash(password, 10)
        const user = new User({ username, gmail, password: hashedPass })
        await user.save()
        return res.status(201).send('User registered')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error registering user')
    }
})

//login
router.post('/login', async (req, res) => {
    const { gmail, password } = req.body;
    try {
        const user = await User.findOne({ gmail });
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', overwrite: true });
        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error logging in');
    }
});

  //post text
  router.post('/post', auth, async (req, res) => {
    
    try {
        const { text } = req.body
        if (!text) return res.status(400).send('Text is required');
        const post = new Post({ text, user: req.user._id })
        await post.save()
        res.status(201).send('Post created')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error creating post')
    }
  })

  //get post
  router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username')
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).send('Post error')
    }
  })

//logout
  router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' })
    res.status(200).send('Logged out')
  })


module.exports = router
