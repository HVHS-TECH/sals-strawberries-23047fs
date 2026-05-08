
console.log("Running Sal's Strawberries")

function fb_write(){
    // Get the form data
    const name = document.getElementById("name").value;
    const favoriteFruit = document.getElementById("favoriteFruit").value;
    const fruitQuantity = document.getElementById("fruitQuantity").value;
    console.log("collect data");

    //Set users data with form data
    let uid = GLOBAL_user.uid;
    firebase.database().ref('/sals/users/'+uid).set( 
        {
            name: name,
            favoriteFruit: favoriteFruit,
            fruitQuantity: fruitQuantity
        }
    );
    console.log("Set data");

}
