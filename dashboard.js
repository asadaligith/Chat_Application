import { auth,  onAuthStateChanged, signOut, getDocs, query, 
    where, db, collection, doc, getDoc, addDoc , serverTimestamp} from "./config.js";

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
    userList.innerHTML = "";

    querySnapshot.forEach(async (docSnap) => {
        const userData = docSnap.data();
        const otherUserId = docSnap.id;

        // Check if a Friend Request exists (either sent or received)
        const requestQuery = query(
            collection(db, "FriendRequests"),
            where("fromID", "in", [userId, otherUserId]),
            where("toID", "in", [userId, otherUserId])
        );

        const requestSnap = await getDocs(requestQuery);

        let buttonHTML = `<button onclick="addFriend('${otherUserId}', '${userData.firstname} ${userData.lastname}', this)">Add Friend</button>`;

        if (!requestSnap.empty) {
            const requestData = requestSnap.docs[0].data();

            if (requestData.status === "pending") {
                buttonHTML = `<button disabled style="background:gray">Request Sent</button>`;
            } else if (requestData.status === "accepted") {
                buttonHTML = `<button disabled style="background:green">Friends</button>`;
            }
        }

        // Render user
        userList.innerHTML += `
        <li class="user-item" id=${docSnap.id}>
            <img src="https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg" />
            <br/>
            <span>${userData.firstname} ${userData.lastname}</span>
            ${buttonHTML}
        </li>
        `;
    });
}

    // querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    // const userData = doc.data();

    // userList.innerHTML += `<li class="user-item" id=${doc.id}>
    //                 <img src="https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg" />
    //                 </br>
    //                 <span>${userData.firstname} ${userData.lastname}</span> 
    //                 <button onclick="addFriend('${doc.id}', '${userData.firstname} ${userData.lastname}', this)">Add Freind</button>
    //             </li>`
    // });



window.addFriend = async (friendId, friendName, button) => {
    console.log("Request Sent to", friendId, friendName)
    // Disable the button to prevent multiple clicks
    try {
        button.disabled = true;
        button.innerText = "Sending...";

        // Add a new document with a generated id.
        const RequestSent = await addDoc(collection(db, "FriendRequests"), {
        fromID: userId,
        fromName: currentUserName.innerText,
        toID: friendId,
        toName: friendName,
        status: "pending",
        timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", RequestSent.id);
        button.innerText = "Request Sent";
        button.style.backgroundColor = "gray";

    } catch (error) {
        console.error("Error adding document: ", error.message);
        button.disabled = false;
        button.innerText = "Add Friend";
        
    }

}