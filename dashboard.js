import { auth,  onAuthStateChanged, signOut} from "./config.js";

const userId = null;

checkUser()

function checkUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
           const uid = user.uid
           userId = uid
           console.log("User Available")
           getUsers()

        } else{
            console.log("User Not Available")
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




async function getUsers(){
    console.log(userId, "userId")
    const q = query(collection(db, "users"), where("userId", "!=", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

}