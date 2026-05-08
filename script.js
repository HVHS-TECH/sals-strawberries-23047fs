
console.log("Running Sal's Strawberries")

function fb_write(){
    // Get the form data
    const name = document.getElementById("name").value;
    const favoriteFruit = document.getElementById("favoriteFruit").value;
    const fruitQuantity = document.getElementById("fruitQuantity").value;

    //Set users data with form data
    let uid = GLOBAL_user.uid;
    firebase.database().ref('/sals/users/'+uid).set( 
        {
            name: name,
            favoriteFruit: favoriteFruit,
            fruitQuantity: fruitQuantity
        }
    );

}


/**************************************************************/
// Authentication
// Handles logging in and out
// This function creates a listener to check if users are logged into google; if not creates a popup
/**************************************************************/
let GLOBAL_user;

//Create listener
function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin)
}
//Checks if user is logged in, if not fb_popupLogin
async function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GLOBAL_user = _user; //Save user details into global variable
    } else {
    console.log("User not logged in - starting popup")
    await fb_popupLogin();
    console.log("User is logged in");
  }
}
//Creates a popup and gets user google
function fb_popupLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;
    let uid = result.user.uid;
    //Create new user in database
    firebase.database().ref('/sals/users/'+uid).set(
    {
        name: '',
        favouriteFruit: '',
        fruitQuantity: 0
    });
    console.log("New user created");
  });
}
//Simple logout
function fb_logout() {
  authenticationListener();
  firebase.auth().signOut();
  console.log("Logged out")
}