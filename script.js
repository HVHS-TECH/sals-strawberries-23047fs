
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
// This function reads the favorite fruits of users, and then activates fb_displayFruit
/**************************************************************/
function fb_readFruit() {
    console.log("Reading fruit");
    firebase.database().ref('/sals/users').orderByChild("favoriteFruit").once('value', fb_displayFruit, fb_error);
    console.log("Finished reading fruit");
}

/**************************************************************/
// displayFruit()
// Handles diplaying fruit from snapshot to html
// This function uses the data from fb_readFruit into html
/**************************************************************/
//Gets data and orders it
function fb_displayFruit(snapshot) {
    snapshot.forEach(fb_show);
}
//Displays them
function fb_show(child) {
    console.log(child.val()["name"] + " " + child.val()["favoriteFruit"]);
    HTML_OUTPUT.innerHTML += child.val()["name"] + " " + child.val()["favoriteFruit"] + "<br>"
}
