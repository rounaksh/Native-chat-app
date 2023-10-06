const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const localStrategy = require('passport-local').Strategy
const user = require('./models/user')
const message = require('./models/message')
const User = require('./models/user')
const dotenv = require('dotenv')

const app = express()
const port = 8000
app.use(cors())
app.use(express.urlencoded({ exptended: true }))
app.use(express.json())
app.use(passport.initialize())
dotenv.config({ path: './.env' })

mongoose.connect(
    process.env.mongoDB_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('connected')
}).catch(err => {
    console.log('err connecting: ', err)
})

app.listen(port, () => {
    console.log('server running on port 8000')
})

// Endpoint for regestring the user
app.post('/register', (req, res) => {
    const { name, email, password, image } = req.body
    // Create new user object
    const newUser = new User({ name, email, password, image })

    // save the user to database
    newUser.save().then(() => {
        res.status(200).json({ message: 'User Registered successfully' })
    }).catch(err => {
        console.log('Error Registering user', err)
        res.status(500).json({ message: 'Error Registering user!' })
    })
})

// Funtion to create token for user
const createToken = (userId) => {
    // set the token payload
    const payLoad = { userId: userId }

    // Generate the token with a secret key and expiration time
    const token = jwt.sign(payLoad, process.env.secret_key, { expiresIn: "1h" })

    return token
}

// Endpoint for user login
app.post('/login', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    // Checking if email and password are provided
    if (!email || !password) res.status(404).json({ message: 'Email and Password are required!!' })

    // Check if user is present in DB
    User.findOne({ email }).then(user => {
        if (!user) return res.status(404).json({ message: 'User Not Found!!' })

        // Comparing credentials provided
        if (user.password !== password) return res.status(404).json({ message: 'Invalid Password!' })

        const token = createToken(user._id)
        res.status(200).json({ token })
    }).catch(err => {
        console.log('Error in finding user', err.message)
        res.status(500).json({ message: 'Internal Server Error!' })
    })
})

//  Endpoint to access all users except the user who is logged in
app.get('/users/:userId', (req, res) => {
    const loggedInUserId = req.params.userId

    user.find({ _id: { $ne: loggedInUserId } }).then(users => {
        res.status(201).json(users)
    }).catch(err => {
        console.log('Error: ', err.message)
        res.status(500).json({ message: 'Error retriving users' })
    })
})

//  Endpoint to send a friend request
app.post('/friend-request', async (req, res) => {
    const { currentUserId, selectedUserId } = req.body
    try {
        //  Update recivers friend request array
        await User.findByIdAndUpdate(selectedUserId, {
            $push: {
                friendRequests: currentUserId
            },
        })
        // Update senders sent friend request array
        await User.findByIdAndUpdate(currentUserId, {
            $push: {
                sentFriendRequest: selectedUserId
            }
        })

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})

// Endpoint to show all friend requests of a perticular user
app.get('/friend-request/:userId', async (req, res) => {
    try {
        const { userId } = req.params

        // fetching user data based on user id
        const user = await User.findById(userId).populate('friendRequests', 'name email image').lean()

        console.log(userId)
        const friendRequests = user.friendRequests
        res.json(friendRequests)
    } catch (err) {
        console.log(err)
        res.sendStatus(500).json({ message: 'Internal Server Error, Try again!!' })
    }
})

app.get('/', () => {
    console.log('hello')
})