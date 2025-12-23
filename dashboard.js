import { auth,  onAuthStateChanged, signOut, getDocs, query, where, db, collection, doc, getDoc} from "./config.js";

let userId = null;
let userList = document.getElementById("userList");
let currentUserName = document.getElementById("currentUserName");



checkUser()

function checkUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
           const uid = user.uid
           userId = uid
           console.log("User Available")
           getCurrentUserData(uid)
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

async function getCurrentUserData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const userData = docSnap.data();
    currentUserName.innerText = userData.firstname + " " + userData.lastname

    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}
 
}


async function getUsers(){
    console.log(userId, "userId")
    const q = query(collection(db, "users"), where("userId", "!=", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const userData = doc.data();

    userList.innerHTML += `<li class="user-item" id=${doc.id}>
                    <img src="https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg" />
                    </br>
                    <span>${userData.firstname} ${userData.lastname}</span> 
                    <button onclick="addFriend('${doc.id}', '${userData.firstname} ${userData.lastname}')">Add Freind</button>
                </li>`
    });

}