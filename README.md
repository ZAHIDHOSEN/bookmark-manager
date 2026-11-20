# Bookmark & Link Manager

A single-page MERN app to save, search, favorite and delete web links.

## Live Links
- Frontend: https://client-topaz-one-29.vercel.app
- Backend API: https://server-zeta-amber-92.vercel.app/api/bookmarks

## Tech Stack
MongoDB Atlas, Express.js, React (Vite), Node.js

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bookmarks` | List bookmarks (`?category=`, `?search=`) |
| POST | `/api/bookmarks` | Create bookmark (201 / 400) |
| PATCH | `/api/bookmarks/:id/favorite` | Toggle favorite (200 / 404) |
| DELETE | `/api/bookmarks/:id` | Delete bookmark (200 / 404) |

## Local Setup
```bash
git clone https://github.com/ZAHIDHOSEN/bookmark-manager
cd bookmark-manager
```

Backend:
```bash
cd server
npm install
npm run dev
```
Create `server/.env` (see `server/.env.example`):
```
DB_URL=your_mongodb_connection_string
PORT=5000
```

Frontend:
```bash
cd client
npm install
npm run dev
```
Create `client/.env.local` (see `client/.env.example`):
```
VITE_BACKEND_URL=http://localhost:5000
```
