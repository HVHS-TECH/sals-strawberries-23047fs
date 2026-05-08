/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYlME0VP3-c40U6MLzfNmNloXUkyvXTI8",
    authDomain: "randompants-3ef2c.firebaseapp.com",
    databaseURL: "https://randompants-3ef2c-default-rtdb.firebaseio.com",
    projectId: "randompants-3ef2c",
    storageBucket: "randompants-3ef2c.firebasestorage.app",
    messagingSenderId: "463883863321",
    appId: "1:463883863321:web:5875252fe8bd2666893188",
    measurementId: "G-CVF16131QY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This log prints the firebase object to the console to show that it is working.
// As soon as you have the script working, delete this log.
console.log("Firebase initialize finished:");
console.log(firebase);
