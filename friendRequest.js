import {  query, where, db, collection, doc, updateDoc, 
        setDoc, onSnapshot, serverTimestamp} from "./config.js";

let friendRequestsList = document.getElementById("friendRequestsList")

const q = query(collection(db, "FriendRequests"), where("status", "==", "pending"));

onSnapshot(q, (snapshot) => {
  friendRequestsList.innerHTML = "";

  if (snapshot.empty) {
    friendRequestsList.innerHTML = `<li>No pending requests</li>`;
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    friendRequestsList.innerHTML += `
      <li id="request-${docSnap.id}">
        <p><strong>${data.fromName}</strong></p>
        <div class="actions">
          <button onclick="acceptFriendRequest('${docSnap.id}','${data.fromID}','${data.toID}')">Accept</button>
          <button onclick="declineFriendRequest('${docSnap.id}')"> Cancel </button>
        </div>
      </li>
    `;
  });
});

// Accept Friend Request

window.acceptFriendRequest = async function (requestId,fromID,toID) {
  try {
    // 1️⃣ Update request status
    await updateDoc(doc(db, "FriendRequests", requestId), {
      status: "accepted",
      respondedAt: serverTimestamp(),
    });

    // 2️⃣ Create friendship (duplicate-proof)
    const friendId = fromID < toID ? `${fromID}_${toID}`: `${toID}_${fromID}`;

    await setDoc(doc(db, "Friends", friendId), {
      user1: fromID,
      user2: toID,
      createdAt: serverTimestamp(),
    });

    // UI auto update via onSnapshot
    console.log("Friend request accepted");

  } catch (error) {
    console.error("Accept error:", error.message);
  }
};


window.declineFriendRequest = async function(requestId) {
    try {
        const Cancel = doc(db, "FriendRequests", requestId);
        await updateDoc(Cancel, {
        status: "declined",
        respondedAt: serverTimestamp(),
    
    });
        console.log("Friend request declined:", requestId);
    } catch (error) {
        console.error("Error declining friend request:", error.message);
    }
        
}