import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schedulePath = path.join(__dirname, '..', 'bull-calendar-events-data.json');

export default async function handler(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading schedule data:', error);
    res.status(500).json({ error: 'Failed to load schedule data' });
  }
}