// === Firebase App Import ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// === Firebase Config ===
const firebaseConfig = {
  apiKey: "AIzaSyD0vwFXxvBSeKO7nwM7R23vAZhWbhzoeCE",
  authDomain: "presenter-dashboard.firebaseapp.com",
  projectId: "presenter-dashboard",
  storageBucket: "presenter-dashboard.firebasestorage.app",
  messagingSenderId: "350743358513",
  appId: "1:350743358513:web:a55f8fcb20fc9570063910",
  measurementId: "G-BBEHVF4C69"
};

// === Initialize Firebase ===
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === Handle Presenter Sign-In ===
document.getElementById('signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const show = document.getElementById('show').value;

  try {
    await addDoc(collection(db, 'presenters'), {
      name,
      show: show || 'Untitled Show',
      time: new Date().toLocaleTimeString()
    });
    document.getElementById('signin-form').reset();
  } catch (error) {
    console.error("Error signing in:", error);
  }
});

// === Listen for Presenters in Realtime ===
function listenForPresenters() {
  const q = query(collection(db, 'presenters'), orderBy('time', 'desc'), limit(5));
  onSnapshot(q, snapshot => {
    const list = document.getElementById('presenter-list');
    list.innerHTML = '';
    snapshot.forEach(doc => {
      const p = doc.data();
      const li = document.createElement('li');
      li.textContent = `${p.name} – ${p.show} (signed in at ${p.time})`;
      list.appendChild(li);
    });
  });
}

// === Listen for Incoming Messages in Realtime ===
function listenForMessages() {
  const q = query(collection(db, 'messages'), orderBy('time', 'desc'), limit(10));
  onSnapshot(q, snapshot => {
    const list = document.getElementById('message-list');
    list.innerHTML = '';
    snapshot.forEach(doc => {
      const m = doc.data();
      const li = document.createElement('li');
      li.className = 'message';
      li.innerHTML = `<strong>${m.from}:</strong> ${m.body}<br><small>${new Date(m.time).toLocaleTimeString()}</small>`;
      list.appendChild(li);
    });
  });
}

// === Start listeners ===
listenForPresenters();
listenForMessages();