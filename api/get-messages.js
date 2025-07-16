import fs from 'fs/promises';

export default async function handler(req, res) {
  const filePath = 'data/messages.json';
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
    res.status(200).json(data.slice(0, 10)); // latest 10
  } catch (err) {
    console.error('Error reading messages:', err);
    res.status(500).json({ error: 'Failed to load messages' });
  }
}