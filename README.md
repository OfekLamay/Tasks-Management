# Tasks-Management — Client

React frontend for the **Tasks-Management** project.  
This app provides the UI for managing tasks and users and communicates with the **Tasks-Management Server** via HTTP APIs.

---

## Prerequisites

- **Node.js** (recommended: latest LTS)
- **npm** (comes with Node.js)
- **Tasks-Management Server** running locally or deployed

---

## Getting started (Windows `cmd`)

### 1) Install dependencies

```bat
cd Tasks-Management
npm install
```

### 2) Configure API proxy (important)

This client expects the server to be reachable via a proxy configured in `package.json`.

Open `package.json` and set:

- Local development:

```json
"proxy": "http://localhost:3001"
```

- Deployment:

```json
"proxy": "https://<your-server-domain>"
```

> The server (by default) runs on port **3001**.

### 3) Run the app (development)

```bat
npm start
```

The app will be available at:
- `http://localhost:3000`

---

## Build for production

```bat
npm run build
```

This creates an optimized production build in the `build/` directory.

---

## Troubleshooting

### UI runs but API calls fail / 404 / CORS issues
- Make sure the server is running and reachable.
- Make sure `"proxy"` in `package.json` points to the correct server URL (local: `http://localhost:3001`).
- After changing `"proxy"`, restart the React dev server.

### Check installed versions

```bat
node -v
npm -v
```

---

## Project structure (key files)

- `src/App.js` — main application component
- `src/components/` — UI components (Tasks, Users, etc.)
- `src/redux/` — Redux store and slices
- `public/` — static assets and HTML template
