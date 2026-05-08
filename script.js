
console.log("Running Sal's Strawberries")

function writeForm(){
    // Get the form data
    const favoriteFruit = document.getElementById("favoriteFruit").value;
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
function fb_handleLogin(_user) {
  if (_user) {
    GLOBAL_user = _user; //Save user details into global variable
    console.log(GLOBAL_user);
    let uid = _user.uid;
    //Create new user in database
    firebase.database().ref('/sals/users/'+uid).set(
    {
        name: '',
        favouriteFruit: '',
        servingsPerWeek: 0
    });
    console.log("New user created");
  } else {
    fb_popupLogin();
  }
}
//Creates a popup and gets user google
function fb_popupLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;
    console.log(GLOBAL_user);
  });
}
//Simple logout
function fb_logout() {
  authenticationListener();
  firebase.auth().signOut();
}