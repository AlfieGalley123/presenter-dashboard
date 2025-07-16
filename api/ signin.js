import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, show } = req.body;
  const presenter = {
    name,
    show: show || 'Untitled Show',
    time: new Date().toLocaleTimeString(),
  };

  const filePath = 'data/presenters.json';
  try {
    const existing = JSON.parse(await fs.readFile(filePath, 'utf8'));
    existing.unshift(presenter);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error saving presenter:', err);
    res.status(500).json({ error: 'Failed to sign in' });
  }
}