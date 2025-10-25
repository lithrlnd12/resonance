# Testing Resonance AI Features

## What Changed

The AI button is now **integrated into YouTube Music's left sidebar** instead of floating. It'll look like a native YouTube Music feature!

## How to Test

### 1. Restart the App

Close Resonance completely and restart:

```bash
npm start
```

### 2. Open Developer Console

Press `Cmd/Ctrl + Shift + I` to open DevTools

### 3. Look for Console Messages

You should see these messages in the console:

```
🎵 Resonance: Preload script loaded
🎵 Current URL: https://music.youtube.com
🎵 Checking if YouTube Music... hostname: music.youtube.com
✅ YouTube Music detected! Injecting overlay...
🎵 Injecting Resonance AI Overlay...
✅ Resonance AI Overlay + Visualizer injected successfully!
🎵 Initializing Resonance AI Overlay...
✅ YouTube Music loaded, injecting AI overlay...
✅ AI menu item added to sidebar!
✅ Resonance AI Overlay ready!
```

### 4. Look in the Left Sidebar

Once YouTube Music loads, look at the **LEFT SIDEBAR** (where Home, Explore, Library are).

You should see a new menu item:
- **Icon:** Cyan glowing circle
- **Text:** "AI ASSISTANT" in cyan
- **Position:** Right after "Home"

### 5. Click It!

Click the "AI ASSISTANT" item and the AI panel should slide in from the right with:
- Natural Language Search
- AI Playlist Generator
- Smart Queue (coming soon)
- AI DJ (coming soon)
- Music Visualizer settings

## Troubleshooting

### If you don't see console messages:

**Problem:** Preload script not running
**Fix:**
1. Check that `preload.js` exists in the root folder
2. Check `main.js` has the correct preload path
3. Try restarting with `npm run dev` to see more logs

### If console shows errors:

Send me the error messages and I'll fix them!

### If "AI ASSISTANT" doesn't appear in sidebar:

**Possible causes:**
1. YouTube Music's sidebar hasn't loaded yet (wait a few seconds)
2. YouTube Music changed their HTML structure
3. Check console for "✅ AI menu item added to sidebar!"

**Debug steps:**
1. Open console
2. Type: `document.querySelector('ytmusic-nav-bar')`
3. If it returns `null`, the sidebar hasn't loaded
4. If it returns an element, check: `document.querySelector('ytmusic-nav-bar #items')`

### If visualizer doesn't work:

1. Make sure you've clicked "AI ASSISTANT" in sidebar
2. Scroll down in the AI panel to "Music Visualizer"
3. Toggle it ON
4. Play some music
5. Wait a few seconds for audio connection

## What to Look For

✅ **Working:**
- Splash screen shows
- YouTube Music loads
- "AI ASSISTANT" in left sidebar (cyan text + icon)
- Clicking it opens panel from right
- Visualizer settings visible
- Keyboard shortcuts work (`Cmd/Ctrl + K`, `Cmd/Ctrl + P`, `Cmd/Ctrl + V`)

❌ **Not working yet (AI backend needed):**
- Actual AI search (shows placeholder)
- Actual playlist generation (shows placeholder)
- Smart recommendations

## Screenshots Location

Take a screenshot of:
1. The left sidebar showing "AI ASSISTANT"
2. The AI panel open
3. Any console errors

This will help me debug if something's wrong!

---

**Let me know what happens!** 🚀
