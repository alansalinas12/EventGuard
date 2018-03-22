$(document).ready(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    var database = firebase.database();

    firebase.auth().onAuthStateChanged(function(user) {
        window.user = user;
        console.log(user);
    });

    function googleSignin() {
        firebase.auth()
        .signInWithRedirect(provider)
        .then(function(result){
            var token = reult.credential.accessToken;
            var user = result.user;

            console.log(token);
            console.log(user);
            }).catch (function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(error.code)
                console.log(error.message)
            });
    }
    //sign in button id
    $("#signIn").on("click", function () {
        googleSignin();
    });

    function googleSignout() {
        firebase.auth().signOut()

            .then(function () {
                console.log('Signout Success')
            }, function (error) {
                console.log('Signout Failed')
            });
    }
    //sign out button id
    $("#signOut").on("click", function () {
        googleSignout();
    });

if (user) {
    var uid = firebase.auth().currentUser.uid;
    database.ref().child('users/').child(uid).update({
        name: user.desplayName,
        email: user.email
    });
}

});