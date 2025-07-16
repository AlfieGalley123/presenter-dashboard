async function fetchPresenters() {
  const res = await fetch('/api/get-presenters');
  const data = await res.json();
  const list = document.getElementById('presenter-list');
  list.innerHTML = '';
  data.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} – ${p.show} (signed in at ${p.time})`;
    list.appendChild(li);
  });
}

async function fetchMessages() {
  const res = await fetch('/api/get-messages');
  const data = await res.json();
  const list = document.getElementById('message-list');
  list.innerHTML = '';
  data.forEach(msg => {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<strong>${msg.from}:</strong> ${msg.body} <br><small>${msg.time}</small>`;
    list.appendChild(li);
  });
}

document.getElementById('signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const show = document.getElementById('show').value;
  await fetch('/api/signin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, show })
  });
  fetchPresenters();
});

setInterval(() => {
  fetchPresenters();
  fetchMessages();
}, 5000);

fetchPresenters();
fetchMessages();