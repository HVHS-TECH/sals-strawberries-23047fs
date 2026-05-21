
console.log("Running Sal's Strawberries")

/**************************************************************/
// fb_write
// Handles the submit button
// This function is active when user presses submit, it changes the database of a user then displays it
/**************************************************************/
function fb_write() {
    //Checks if user is logged in
    if (GLOBAL_user == null) {
        alert("Please login first");
        console.log("User has failed to login first");
    } else {
        // Get the form data
        const name = document.getElementById("name").value;
        const favoriteFruit = document.getElementById("favoriteFruit").value;
        const fruitQuantity = document.getElementById("fruitQuantity").value;
        console.log("Data collected");

        //Set users data with form data
        //Get user
        let uid = GLOBAL_user["uid"];
        firebase.database().ref('/Mini Project/users/' + uid).set(
            {
                name: String(name),
                favoriteFruit: String(favoriteFruit),
                fruitQuantity: Number(fruitQuantity)
            }
        );
        console.log("Data set");
    };
    console.log("Finished fb_write()");
}

//HTML database output constant
const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// fb_readFruit()
// Handles reading of the fruit in the database
// This function reads the favorite fruits of users in a snapshot, and then activates fb_snapshot to write favorite fruits
/**************************************************************/
async function fb_readFruit() {
    console.log("Reading fruit");
    console.log("Remove previously displayed data");
    HTML_OUTPUT.innerHTML = "";
    HTML_REVIEW_OUTPUT.innerHTML = "";
    HTML_REVIEW_LOAD_OUTPUT.innerHTML = "";
    await firebase.database().ref('/Mini Project/users').once('value', fb_snapshot, fb_error);
    console.log("Finished fb_readFruit()");
}

/**************************************************************/
// fb_snapshot() and fb_displayFruit
// Handles diplaying fruit from snapshot to html
// This function uses the data from fb_readFruit and puts it into html using fb_displayFruit
/**************************************************************/
//Gets data and activates fb_displayFruit
async function fb_snapshot(snapshot) {
    theFruitText = [];
    theFruitValue = [];
    await snapshot.forEach(fb_displayFruit);
    //Display the fruit with the amount
    for (let i = 0; i < options.length; i++) {
        HTML_OUTPUT.innerHTML += theFruitText[i] + ": " + theFruitValue[i] + "<br>";
    }
    console.log("Finished fb_snapshot()");
}
//Get the options from the dropdown    
const selectElement = document.getElementById("favoriteFruit");
const options = selectElement.options;
//Create the arrays to story the data
//Fruit names
let theFruitText = [];
//Amount of times it is said in the database
let theFruitValue = [];
//Displays them 
function fb_displayFruit(child) {
    //This can display any amount of fruit that is added to the dropdowm
    //Get the amount of data and the fruit names
    for (let i = 0; i < options.length; i++) {
        theFruitText.push(options[i].value);
        theFruitValue.push(0);
    }
    //Add the number of times it is said
    for (let i = 0; i < options.length; i++) {
        //Adds 1 when the child favoriteFruit equals each fruit in for loop
        if (child.val()["favoriteFruit"] == theFruitText[i]) {
            theFruitValue[i] = theFruitValue[i] + 1;
        }
    }
    console.log("HTML favorite fruit set");
    console.log("Finished fb_displayFruit()");
}

/**************************************************************/
// fb_readEmailFruit()
// Handles reading of the fruit in the database
// This function reads the favorite fruits of users in a snapshot, and then activates fb_emailSnapshot to send an email
/**************************************************************/
function fb_readEmailFruit() {
    //Checks if logged in
    if (GLOBAL_user == null) {
        alert("Please login first");
        console.log("User has failed to login first")
    } else {
        console.log("Reading fruit");
        console.log("Remove previously displayed data");
        HTML_OUTPUT.innerHTML = "";
        HTML_REVIEW_OUTPUT.innerHTML = "";
        HTML_REVIEW_LOAD_OUTPUT.innerHTML = "";
        firebase.database().ref('/Mini Project/users').once('value', fb_emailSnapshot, fb_error);
        console.log("Finished fb_readEmailFruit()");
    }
}
/**************************************************************/
// fb_emailSnapshot() and fb_email()
// Handles diplaying an email with values from database from snapshot in to html
// This function uses the data from fb_readEmailFruit and puts it into html using fb_email()
/**************************************************************/
//Gets data and activates fb_email
async function fb_emailSnapshot(snapshot) {
    await snapshot.forEach(fb_email);
    console.log("Finished fb_emailSnapshot()");
}
//Uses the data and creates an email
function fb_email(child) {
    let userName = child.val()["name"];
    let favoriteFruit = child.val()["favoriteFruit"];
    let fruitQuantity = child.val()["fruitQuantity"]
    HTML_OUTPUT.innerHTML = '<div id="emailMessage"> <p>From: Sals Strawberry Saloon</p> <p>Hello, ' + userName + '</p>' +
        '<p>This is Sals Strawberry Saloon, reaching out about your cars extended insurance policy.</p><p>Also, we are offering a deal on your favorite fruit: '
        + favoriteFruit + '</p><p>You can get ' + fruitQuantity + ' servings per week for 27.3% more!</p><p>Best regards, Sals Strawberry Saloon</p></div>'
}

/**************************************************************/
// fb_review
// Handles creating a reply prompt and storing the data
// This function creates a prompt then activates fb_reviewStore
/**************************************************************/
//HTML review output constant
const HTML_REVIEW_OUTPUT = document.getElementById("reviewOutput");
const HTML_REVIEW_LOAD_OUTPUT = document.getElementById("reviewLoadOutput");
//Create the review textbox then activates fb_reviewStore when button pressed
function fb_reviewPrompt() {
    //Check if logged in
    if (GLOBAL_user == null) {
        alert("Please login first");
        console.log("User has failed to login first")
    } else {
        //Reset output
        HTML_OUTPUT.innerHTML = "";
        //Create a review place
        HTML_REVIEW_OUTPUT.innerHTML = '<label for="reviewText">Leave a review</label>'
            + '<input type="text" id="reviewText" name="reviewText" required />'
            + '<button onclick="fb_reviewStore()">Submit</button>';
        //Displays all other reviews
        fb_globalDisplayReview();
    }
}
//Displays all reviews
function fb_globalDisplayReview() {
    firebase.database().ref('/Mini Project/Global Reviews/').once('value', fb_globalReviewSnapshot, fb_error);
    console.log("Got the global data");
}
//Get it and display
function fb_globalReviewSnapshot(snapshot) {
    let dbdata = snapshot.val();
    if (dbdata == null) {
        HTML_REVIEW_LOAD_OUTPUT.innerHTML = "There are currently no reviews, be the first";
    } else {
        HTML_REVIEW_LOAD_OUTPUT.innerHTML = "";
        let number = Object.keys(dbdata);
        for (i = 1; i < (number.length + 1); i++) {
            HTML_REVIEW_LOAD_OUTPUT.innerHTML += '<div class="container"><img class="img" src="' + dbdata[i]["profilePicture"] + '">'
                + dbdata[i]["review"] + '</div>    ';
        }
        console.log("Displayed global reviews");
    };
}
let reviewLength;
//Count the length of global reviews
async function fb_countReviews() {
    await firebase.database().ref('/Mini Project/Global Reviews/').once('value', fb_readLength, fb_error);
}
function fb_readLength(snapshot) {
    let data = snapshot.val();
    if (data == null) {
        reviewLength = 1;
    } else {
        reviewLength = Number(Object.keys(data).length + 1);
    };
}
//Store review then load it
async function fb_reviewStore() {
    const reviewText = document.getElementById("reviewText").value;
    if (badWords.test(reviewText) == true) {
        alert("Your review contains characters or words unwanted, please redo it");
        return;
    } else {
        console.log("Data collected");
        //Set users data with form data
        await fb_countReviews();
        //Push review to global review database
        firebase.database().ref('/Mini Project/Global Reviews/' + reviewLength).set({
            review: String(reviewText),
            profilePicture: GLOBAL_user["photoURL"]
        });
        console.log("Data set");
        //Display reviews
        fb_globalDisplayReview()
    };
}

const badWords = /["'`<>]/;