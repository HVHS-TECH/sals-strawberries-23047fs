
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
        console.log("Data collect");

        //Set users data with form data
        //Get user
        let uid = GLOBAL_user["uid"];
        firebase.database().ref('/Mini Project/users/' + uid).set(
            {
                name: name,
                favoriteFruit: favoriteFruit,
                fruitQuantity: fruitQuantity
            }
        );
        console.log("Data set");
    };
    console.log("Finished fb_write()");
}

//Easy constant that is the output
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
    await snapshot.forEach(fb_displayFruit);
    console.log("Finished fb_snapshot()");
}

//Displays them 
function fb_displayFruit(child) {
    //This can display any amount of fruit that is added to the dropdowm
    //Get the options from the dropdown
    const selectElement = document.getElementById("favoriteFruit");
    const options = selectElement.options;
    //Create the arrays to story the data
    //Fruit names
    let theFruitText = [];
    //Amount of times it is said in the database
    let theFruitValue = [];

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
    //Display the fruit with the amount
    for (let i = 0; i < options.length; i++) {
        HTML_OUTPUT.innerHTML += theFruitText[i] + ": " + theFruitValue[i] + "<br>";
    }
    console.log("HTML favorite fruit set");
    console.log("Finished fb_displayFruit()");
}

/**************************************************************/
// fb_readEmailFruit()
// Handles reading of the fruit in the database
// This function reads the favorite fruits of users in a snapshot, and then activates fb_emailSnapshot to send an email
/**************************************************************/

async function fb_readEmailFruit() {
    //Checks if logged in
    if (GLOBAL_user == null) {
        alert("Please login first");
        console.log("User has failed to login first")
    } else {
        console.log("Reading fruit");
        console.log("Remove previously displayed data");
        HTML_OUTPUT.innerHTML = "";
        await firebase.database().ref('/Mini Project/users').once('value', fb_emailSnapshot, fb_error);
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
    HTML_OUTPUT.innerHTML = '<div id="emailMessage"> <p>From: Sals Strawberry Saloon</p> <p>Hello, ' + userName + '</p><p>This is Sals Strawberry Saloon, reaching out about your cars extended insurance policy.</p><p>Also, we are offering a deal on your favorite fruit: ' + favoriteFruit + '</p><p>You can get ' + fruitQuantity + ' servings per week for 27.3% more!</p><p>Best regards, Sals Strawberry Saloon</p></div>'
}

/*      Works but is a set amount
    //Create var of fruits
    //Strawberry
    let numStr = 0;
    //Mango
    let numMan = 0;
    //Plum
    let numPlu = 0;
    //Dragonfruit
    let numDra = 0;
    //Check how many of each
    if (child.val()["favoriteFruit"] == "Strawberry") {
        numStr = numStr + 1;
    } else if (child.val()["favoriteFruit"] == "Mango") {
        numMan = numMan + 1;
    } else if (child.val()["favoriteFruit"] == "Plum") {
        numPlu = numPlu + 1;
    } else {
        numDra = numDra + 1;
    }
    //Display if in HTML
    HTML_OUTPUT.innerHTML = "Strawberry: " + numStr + "<br>" +
        "Mango: " + numMan + "<br>" +
        "Plum: " + numPlu + "<br>" +
        "Dragonfruit: " + numDra + "<br>";
*/