import fs from 'fs/promises';

export default async function handler(req, res) {
  const filePath = 'data/presenters.json';
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
    res.status(200).json(data.slice(0, 5)); // limit to latest 5
  } catch (err) {
    console.error('Error reading presenters:', err);
    res.status(500).json({ error: 'Failed to load presenters' });
  }
}