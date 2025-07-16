import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD0vwFXxvBSeKO7nwM7R23vAZhWbhzoeCE",
  authDomain: "presenter-dashboard.firebaseapp.com",
  projectId: "presenter-dashboard",
  storageBucket: "presenter-dashboard.firebasestorage.app",
  messagingSenderId: "350743358513",
  appId: "1:350743358513:web:a55f8fcb20fc9570063910",
  measurementId: "G-BBEHVF4C69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sign-in form listener
document.getElementById('signin-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const show = document.getElementById('show').value;

  await addDoc(collection(db, 'presenters'), {
    name,
    show: show || 'Untitled Show',
    time: new Date().toLocaleTimeString()
  });

  e.target.reset();
});

// Listen for presenters
const presenterList = document.getElementById('presenter-list');
const qPresenters = query(collection(db, 'presenters'), orderBy('time', 'desc'), limit(5));
onSnapshot(qPresenters, snapshot => {
  presenterList.innerHTML = '';
  snapshot.forEach(doc => {
    const p = doc.data();
    const li = document.createElement('li');
    li.textContent = `${p.name} – ${p.show} (signed in at ${p.time})`;
    presenterList.appendChild(li);
  });
});

// Listen for messages
const messageList = document.getElementById('message-list');
const qMessages = query(collection(db, 'messages'), orderBy('time', 'desc'), limit(10));
onSnapshot(qMessages, snapshot => {
  messageList.innerHTML = '';
  snapshot.forEach(doc => {
    const m = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `<strong>${m.from}:</strong> ${m.body} <br><small>${new Date(m.time).toLocaleTimeString()}</small>`;
    messageList.appendChild(li);
  });
});