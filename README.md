# Volleyball Calendar

Shared volleyball travel calendar (Nov 2026 – Nov 2027).

## Deploy to Zeabur

1. Create a new GitHub repo (e.g. `volleyball-calendar`)
2. Push all these files to it:
   ```
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/volleyball-calendar.git
   git push -u origin main
   ```
3. Go to [zeabur.com](https://zeabur.com) → your project
4. Click **Deploy Service** → **GitHub** → select `volleyball-calendar`
5. Zeabur auto-detects Node.js and deploys
6. Go to **Networking** tab → **Generate Domain** → you get a `*.zeabur.app` URL
7. Share that URL with Sara — she can open it in any browser and edit

## Data

Events are stored in `data/events.json` on the server. They persist across restarts.

## Local dev

```
npm install
npm start
# open http://localhost:3000
```
