const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'events.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readEvents() {
  if (!fs.existsSync(DATA_FILE)) return {};
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return {}; }
}

function writeEvents(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/events', (req, res) => {
  res.json(readEvents());
});

app.post('/api/events', (req, res) => {
  const { dateKey, event } = req.body;
  if (!dateKey || !event || !event.title) return res.status(400).json({ error: 'Missing fields' });
  const events = readEvents();
  if (!events[dateKey]) events[dateKey] = [];
  event.id = Date.now() + '_' + Math.random().toString(36).slice(2);
  event.updatedAt = new Date().toISOString();
  events[dateKey].push(event);
  writeEvents(events);
  res.json({ success: true, event });
});

app.put('/api/events/:dateKey/:eventId', (req, res) => {
  const { dateKey, eventId } = req.params;
  const update = req.body;
  const events = readEvents();
  if (!events[dateKey]) return res.status(404).json({ error: 'Not found' });
  const idx = events[dateKey].findIndex(e => e.id === eventId);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  events[dateKey][idx] = { ...events[dateKey][idx], ...update, id: eventId, updatedAt: new Date().toISOString() };
  writeEvents(events);
  res.json({ success: true });
});

app.delete('/api/events/:dateKey/:eventId', (req, res) => {
  const { dateKey, eventId } = req.params;
  const events = readEvents();
  if (!events[dateKey]) return res.status(404).json({ error: 'Not found' });
  events[dateKey] = events[dateKey].filter(e => e.id !== eventId);
  if (!events[dateKey].length) delete events[dateKey];
  writeEvents(events);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Volleyball Calendar running on port ${PORT}`));
