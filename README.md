# WordClass (WIP)

WordClass is an easily extensible electron app for drilling word classes (noun gender, aspect, animacy, etc.) in various languages.
## How to Run

1. **Install dependencies:**
	```powershell
	npm install
	```
2. **Start the app:**
	```powershell
	npm start
	```
3. The app will launch in a browser or Electron window, depending on configuration.

## Architecture

- **src/main/**: Main application logic (session state, word set reading).
- **src/preload/**: Preload scripts for Electron. Currently defines IPC context bridge.
- **src/renderer/**: Frontend UI (HTML, CSS, JS, components for class selection).
- **packs/**: Language packs with word data and metadata.
- **utils/**: Utilities for processing word data.
- **icons/**: SVG icons for UI.

## Key Classes & IPC Breakdown

### Main Classes
- **SessionState (`src/main/SessionState.js`)**: Manages the state of a learning session, including current word, progress, and user responses.
- **WordSetFileReader (`src/main/WordSetFileReader.js`)**: Loads and parses word sets from language pack files.
- **PageBuilder (`src/renderer/PageBuilder.js`)**: Builds and updates UI pages dynamically based on session state and user actions.

### IPC (Inter-Process Communication)
- **Preload Script (`src/preload/preload.js`)**: Uses Electron's `contextBridge` and `ipcRenderer` to expose backend functions to the frontend. Provides methods like `getPackInfo`, `startSession`, `processAnswer`, `saveSession`, and `quitSession`.
- **Renderer (`src/renderer/script.js`)**: Calls exposed preload methods via `window.fromMain` to interact with backend logic. Handles user actions and updates UI accordingly.
- **Main Process (`src/main/main.js`)**: Handles IPC events, manages session lifecycle, and coordinates data flow between frontend and backend.

**Control Flow Example:**
1. Renderer requests a new session via `window.fromMain.startSession(id)`.
2. Preload forwards the request to the main process using `ipcRenderer.invoke('start-session', id)`.
3. Main process creates a new `SessionState`, loads data with `WordSetFileReader`, and returns session info.
4. Renderer updates UI using `PageBuilder` and session data.
