# MAPdeck

MAPdeck is a cyberpunk desktop launcher and macro deck prototype built with React + Vite and a Tauri desktop shell.

## Features in this MVP
- animated cyberpunk deck UI
- draggable/resizable visual tile layout concept
- app search and launcher simulation
- live stats widgets
- dark glassmorphism theme
- Tauri-ready shell structure

## Local development

1. Install dependencies:
   npm install
2. Start the app in development mode:
   npm run dev
3. For desktop mode with Tauri:
   npm run tauri dev

## Production build

npm run build

## Project structure
- `src/` — frontend app
- `src-tauri/` — Rust/Tauri shell

## Next roadmap
- native app discovery
- real macro pipeline engine
- desktop profiles and hotkeys
- shader-based tile rings
- remote mobile deck control
