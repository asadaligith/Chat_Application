import { auth, createUserWithEmailAndPassword ,setDoc , doc, db} from "./config.js";

window.Signup = (event)=>{
    event.preventDefault()
    
    const firstname = document.getElementById("firstname")
    const lastname = document.getElementById("lastname")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    
    createUserWithEmailAndPassword(auth, email.value, password.value ,firstname.value)
    .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    
    await setdataInFirebase(user.uid ,firstname.value,lastname.value ,email.value)
    firstname.value = ''
    lastname.value = ''
    email.value = ''
    password.value = ''

    
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

async function setdataInFirebase(userID, firstname, lastname, email){
      await setDoc(doc(db, "users", userID), {
      firstname:firstname,
      lastname: lastname,
      email: email,
      userId: userID,
});
    }

