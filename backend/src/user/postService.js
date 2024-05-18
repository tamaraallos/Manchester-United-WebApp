import fs from 'fs';

const path = require('path');

const postFilePath = path.join(__dirname, 'userPost.json'); // post details saved here

// function read the user's post
function readPosts() {
    try {
        const postData = JSON.parse(fs.readFileSync(postFilePath, 'utf-8'));
        return postData;
    } catch (error) {
        return [];
    }
}

// function write the post data into the json file
function writePosts(postData) {
    try {
        fs.writeFileSync(postFilePath, JSON.stringify(postData, null, 2));
    } catch (error) {
        console.error('Error writing post data to file', error);
    }
}

// function to add user post
function addPost(title, body, category, username) {
    const posts = readPosts(); // reads post
    const postId = posts.length + 1; // generates primary key based on length of array
    const newPost = { // initalised object with passed in data
        id: postId,
        title: title,
        body: body,
        category: category,
        username: username,
        likes: [], // like/dislike always empty when creating new post
        dislikes: []
    };
    posts.push(newPost);
    writePosts(posts); // updates json file
}

// delete post
function deletePost(id) {
    let posts = readPosts(); 
    // find index of the post to delete
    const deletedItemIndex = posts.findIndex(post => post.id === id);

    if(deletedItemIndex !== 1) {
        posts.splice(deletedItemIndex, 1);// remove the post from the array
        writePosts(posts); // update json file 
        return true;
    } else {
        return false;
    }
}

// update post based on id
function updatePost(id, updatedPostData) {
    id = Number(id); // convert to integer
    let posts = readPosts();
    const object = posts.find(obj => obj.id === id);
    if (object) {
        Object.keys(updatedPostData).forEach(key => {
            if (key !== 'username') {
                object[key] = updatedPostData[key];
            }
        });
        writePosts(posts)
        return true; // sucess

    } else {
        return false; // fail
    }
}

// like and dislike
function storeLikes(id, username, likeType) {
    let posts = readPosts();
    id = Number(id);
    const post = posts.find(post => post.id === id);
    
    if (post) {
        const hasLiked = post.likes.includes(username);
        const hasDisliked = post.dislikes.includes(username);
        // check if user has interacted with the post already
        if (!hasLiked && !hasDisliked) {
            if (likeType === 'like') {   // if not then name added to whatever they chose to react
                post.likes.push(username);
            } else if (likeType === 'dislike') {
                post.dislikes.push(username);
            }
            writePosts(posts); // upates json file
            return true; 
        } else {
            return false; // user has already liked the post 
        }
    } else {
        return false; // post doesn't exist/not found
    }
}

export { 
    addPost,
    readPosts,
    deletePost,
    updatePost,
    storeLikes
 };