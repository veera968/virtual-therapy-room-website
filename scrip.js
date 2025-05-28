// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    measurementId: "YOUR_FIREBASE_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Authentication - Sign In and Sign Out
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in:", user.email);
    } else {
        window.location.href = "/login"; // Redirect to login page if not signed in
    }
});

// Function to send message
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatMessages = document.getElementById("chat-messages");

    if (userInput.trim()) {
        // Display user's message
        const userMessage = document.createElement("p");
        userMessage.textContent = "You: " + userInput;
        chatMessages.appendChild(userMessage);

        // Clear input field
        document.getElementById("user-input").value = '';

        // Simulate a response from therapist
        setTimeout(() => {
            const therapistMessage = document.createElement("p");
            therapistMessage.textContent = "Therapist: Let's work through that together.";
            chatMessages.appendChild(therapistMessage);

            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Function to schedule session
function scheduleSession() {
    const sessionTime = document.getElementById("session-time").value;
    if (sessionTime) {
        db.collection("sessions").add({
            userId: auth.currentUser.uid,
            sessionTime: sessionTime,
            status: "Scheduled"
        })
        .then(() => alert("Session Scheduled!"))
        .catch(err => console.error("Error scheduling session:", err));
    }
}

// Payment Integration (Stripe)
function makePayment() {
    // Stripe integration code (client-side)
    const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY");
    stripe.redirectToCheckout({
        sessionId: "YOUR_PAYMENT_SESSION_ID"
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    });
}

// Progress Tracking
function saveProgress() {
    const progressNotes = document.getElementById("progress-notes").value;
    if (progressNotes) {
        db.collection("progress").add({
            userId: auth.currentUser.uid,
            notes: progressNotes,
            date: new Date()
        })
        .then(() => alert("Progress Saved!"))
        .catch(err => console.error("Error saving progress:", err));
    }
}

// Logout Function
function logout() {
    auth.signOut().then(() => {
        window.location.href = "/login";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}
