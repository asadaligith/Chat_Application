import { auth, signInWithEmailAndPassword, onAuthStateChanged, } from "./config.js";

// checkUser()

// function checkUser(){
//     onAuthStateChanged(auth, (user) => {
//         if (!user) {
//             console.log(`User not available`)
//             window.location.replace("./index.html")  
//         } 


//     });
    
// }


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
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}




