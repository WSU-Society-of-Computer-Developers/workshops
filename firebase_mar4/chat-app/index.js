// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth()
// initialize database
const db = firebase.database();
const authForm = document.forms.auth

firebase.auth().onAuthStateChanged((user) => {
  // when the user logs in, it will hide the login form and show the message content
  // when the user doesn't exist (i.e not logged in) we keep showing them the login form 
  authForm.style.display = user ? "none" : "block"
  document.getElementById("message-form").style.display = user ? "block" : "none"
})

authForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const email = authForm.email.value
  const password = authForm.password.value
  if (authForm.isSignup.checked) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
        alert(`Registered with ${user.email}`)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        alert(errorMessage)
      });
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        alert(`Logged in as ${user.email}`)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }

})

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  // stops the page from refreshing on submit
  e.preventDefault();
  const user = firebase.auth().currentUser;
  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username: user.email,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const user = firebase.auth().currentUser; // user is nullable (errors)
  if (user) {
    const messages = snapshot.val();
    const message = `<li class=${user.email === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  }
});