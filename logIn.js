import { auth, signInWithEmailAndPassword, onAuthStateChanged, } from "./config.js";

let currentUserName = document.getElementById("currentUserName");
checkUser()

function checkUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(`User available`)
            window.location.replace("./dashboard.html")  
        } else{
            console.log(`No user available`)
        }


    });
    
}


window.Login = (event)=>{
    event.preventDefault()
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, "LogIn")
        window.location.replace("./dashboard.html")
        currentUserName.innerText = user.firstName + " " + user.lastName

        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}




