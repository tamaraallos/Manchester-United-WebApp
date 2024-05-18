import express, { response } from 'express';
import cors from 'cors';
import { addUser, confirmUser, getUserId } from './user/register.js';
import { addPost, readPosts, deletePost, updatePost, storeLikes } from './user/postService';

const app = express();
const session = require('express-session'); 
const bodyParser = require('body-parser');

// CORS middleware
app.use(cors());

app.use(bodyParser.json());

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false
}));

// register endpoint - add new user to json file
app.post('/register', (req, res) => {
    const userData = req.body;
    try {
        addUser(userData.firstName, userData.lastName, userData.username, userData.password);
        res.status(200).send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).send('Username already exists');
    }
});

//login endpoint - allows user to login if it meets requirments
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const isUserValid = confirmUser(username, password);
        if (isUserValid) {
            const userId = getUserId(username);
            req.session.user = { id: userId, username: username };
            res.json({success: true, message: 'Login succesful'});
        } else {
            res.status(401).json({success: false, message: 'Invalid user or password'});
        }
    } catch (error) {
        console.error('Login failed!', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

// forum endpoint - add post to json file
app.post('/forum', (req, res) => {
    try {
        const { title, body, category, username } = req.body;
        addPost(title, body, category, username);            
        res.status(200).json({ sucess: true});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({sucess: false});

    }
});

// send data endpoint -  sends data to DisplayPosts.vue  (this displays posts)
app.post('/posts', (req, res) => {
    try {
        const posts = readPosts();
        res.status(200).json({sucess: true, posts: posts});
    } catch (error) {
        console.error('Error fetching posts:', { error });
        res.status(500).json({ success: false, message: 'An error occurred while fetching posts' });
    }
});

// delete endpoint - delete posts based on id
app.delete('/posts/:id', (req, res) => {
    try {
        const postId = req.params.id
        const deleted = deletePost(postId);
        if (deleted) {
            res.status(200).json({ success: true, message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while fetching posts' });
    }
});

// update endpoint - update posts from passed in data
app.put('/posts/update/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPostData = req.body;
    if (updatePost(postId, updatedPostData)) {
        res.status(200).json({ message: 'Post updated successfully' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// user react endpoint - saves user react type
app.put('/posts/likeType/:id', (req, res) => {
    try {
        const postId = req.params.id;
        const username = req.body.username;
        const likeType = req.body.likeType;        
        const likedPost = storeLikes(postId, username, likeType);
        if(likedPost) {
            res.status(200).json({ success: true, message: 'Post liked successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while liking post' });
    }

});

// confirm server is running + port number
app.listen(8000, () => {
    console.log('Server is listening on port 8000')
});