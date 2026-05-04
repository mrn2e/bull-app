import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'api', 'schedule.json');
const scheduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

export default function handler(req, res) {
  res.status(200).json(scheduleData);
}