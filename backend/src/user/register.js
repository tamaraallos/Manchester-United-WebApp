import fs from 'fs';

const path = require('path');

const userDataFilePath = path.join(__dirname, 'userData.json'); // user register/login details saved here

// function reads user data from JSON file
function readUserData() {
    try {
        const userData = JSON.parse(fs.readFileSync(userDataFilePath, 'utf-8'));
        return userData;
    } catch (error) {
        return []; // if file doesn't exist/empty return an empty array (created file if not exist)
    }
}

// function write user data to JSON file
function writeUserData(userData) {
    try {
        fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 2));
        // logger('User data written successfully'); 
    } catch (error) {
        logger('Error writing user data to file', error); // log error
    }
}

// function to add a new user to userData.json
function addUser(firstName, lastName, username, password) {
    const userData = readUserData();
    const existingUser = userData.find(user => user.username === username);
    if (existingUser) {
        throw new Error('Username already exists. Please try again.');
    }
    //initialises passed in data
    const newUser = {
        id: userData.length + 1, // primary key auto-increment based on array length
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    };
    // pushes data then writes to file
    userData.push(newUser);
    writeUserData(userData);
}

// verifies user and password
function confirmUser(username, password) {
    const userData = readUserData();
    const user = userData.find(user => user.username === username && user.password === password);
    return user; 
}

// get userId
function getUserId(username) {
    const userData = readUserData();
    const user = userData.find(user => user.username === username);
    return user ? user.id : null; // if user exist return id else null
}

export { 
    readUserData,
    writeUserData,
    addUser,
    confirmUser, 
    getUserId,
};

