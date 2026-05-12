
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
        console.log("Collect data");

        //Set users data with form data
        //Get user
        let uid = GLOBAL_user.uid;
        firebase.database().ref('/sals/users/' + uid).set(
            {
                name: name,
                favoriteFruit: favoriteFruit,
                fruitQuantity: fruitQuantity
            }
        );
        console.log("Set data");
    };
}

//Easy constant that is the output
const HTML_OUTPUT = document.getElementById("databaseOutput");


/**************************************************************/
// fb_readFruit()
// Handles reading fruit from database
// This function reads the favorite fruits of users in a snapshot, and then activates fb_snapshot
/**************************************************************/
function fb_readFruit() {
    console.log("Reading fruit");
    firebase.database().ref('/sals/users').once('value', fb_snapshot, fb_error);
    console.log("Finished reading fruit");
}

/**************************************************************/
// fb_snapshot() and fb_displayFruit
// Handles diplaying fruit from snapshot to html
// This function uses the data from fb_readFruit and puts it into html using fb_displayFruit
/**************************************************************/
//Gets data and orders it
function fb_snapshot(snapshot) {
    snapshot.forEach(fb_displayFruit);
}

//Displays them
function fb_displayFruit(child) {
    //Get the options from the dropdown
    const selectElement = document.getElementById("favoriteFruit");
    const options = selectElement.options;
    let theFruitText = [];
    let theFruitValue = [];

    for (let i = 0; i < options.length; i++) {
        theFruitText.push(options[i].value);
        theFruitValue.push(i-i);
    }

    for (let i = 0; i < options.length; i++) {
        if (child.val()["favoriteFruit"] == theFruitText[i]) {
            theFruitValue.push(theFruitValue[i] + 1);
        }
    }
    //Display the fruit with the amount
    for (let i = 0; i < options.length; i++) {
        console.log(theFruitText[i] + ": " + theFruitValue[i]);
    }

    //Works but is a set amount
/*
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

}
