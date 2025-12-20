import { auth,  onAuthStateChanged, signOut} from "./config.js";


checkUser()

function checkUser(){
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log(`User not available`)
            window.location.replace("./index.html")
            
        } 
    });
    
}


let logoutbtn = document.getElementById("logoutBtn")

logoutbtn.addEventListener("click", logout)

function logout(){
    signOut(auth).then(() => {
        console.log("Logout successfully")
        window.location.replace("./index.html")
    }).catch((error) => {
        console.log(error.message)
    });
    
}