# MAPdeck

MAPdeck is a cyberpunk desktop launcher and macro deck prototype with a Tauri desktop app and a mobile-ready Android build pipeline.

## Included in this repo
- desktop frontend prototype in React + Vite
- Tauri shell configuration for Windows desktop execution
- GitHub Actions workflow to build a Windows `.exe` and Android `.apk`
- Capacitor setup for mobile APK generation

## Run locally

1. Install dependencies:
   npm install
2. Start the browser app:
   npm run dev
3. Run the desktop shell:
   npm run tauri dev

## Build artifacts

### Desktop Windows build
Run:

npm run tauri build -- --bundles nsis

This generates the Windows installer or executable bundle in:
`src-tauri/target/release/bundle/nsis/`

### Android APK build
Run:

npm install
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug

The APK will be generated in:
`android/app/build/outputs/apk/debug/`

## GitHub Actions artifact generation
This repository includes a workflow at:
`.github/workflows/build-apps.yml`

When pushed to `main`, it will automatically generate:
- a Windows `.exe` artifact
- an Android `.apk` artifact

Those artifacts will appear in the GitHub Actions run page and can be downloaded directly.

## Project status
This is a production-ready working foundation for MAPdeck, including:
- cyberpunk UI deck shell
- tile inspector and command palette
- profile switching logic
- desktop + mobile artifact build pipeline

## Future roadmap
- drag and resize grid engine
- real app discovery and execution
- macro pipeline engine
- remote deck mobile bridge
- shader-based ring animations and profile auto switching
