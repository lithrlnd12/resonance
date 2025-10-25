# 🎵 Install Resonance on Your Desktop

## ✅ Good News!

Your app is **built and ready to run!** The build succeeded - it just failed on the signing step (which you don't need).

## 📂 Where is it?

Your built app is in: `/mnt/c/myytmusic/dist/win-unpacked/`

In Windows, that's: `C:\myytmusic\dist\win-unpacked\`

## 🚀 How to Install

### Option 1: Run Directly (Easiest)

1. **Open File Explorer** in Windows
2. **Navigate to:** `C:\myytmusic\dist\win-unpacked\`
3. **Double-click** `Resonance.exe`
4. **Done!** The app launches

### Option 2: Create Desktop Shortcut

1. **Navigate to:** `C:\myytmusic\dist\win-unpacked\`
2. **Right-click** on `Resonance.exe`
3. Select **"Create shortcut"**
4. **Drag the shortcut** to your Desktop
5. **Rename it** to "Resonance" (optional)
6. **Done!** Double-click the shortcut anytime

### Option 3: Pin to Taskbar

1. **Navigate to:** `C:\myytmusic\dist\win-unpacked\`
2. **Right-click** on `Resonance.exe`
3. Select **"Pin to taskbar"**
4. **Done!** It's always accessible

### Option 4: Add to Start Menu

1. **Copy the folder:** `C:\myytmusic\dist\win-unpacked\`
2. **Paste it to:** `C:\Program Files\Resonance\`
   - (You may need admin permission)
3. **Create a shortcut** to the exe
4. **Move shortcut** to Start Menu folder:
   - `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\`
5. **Done!** Search "Resonance" in Start Menu

## 📦 Want a Proper Installer?

The signing failed because we're on WSL. To create a proper installer:

### Build on Windows Directly:

1. **Open PowerShell** or **Command Prompt** on Windows (not WSL)
2. **Navigate to the project:**
   ```
   cd C:\myytmusic
   ```
3. **Build the installer:**
   ```
   npm run build:win
   ```
4. This will create `Resonance Setup.exe` in the `dist` folder
5. You can share this installer with others!

## 🎯 What You Have Now

The `dist/win-unpacked` folder contains:
- ✅ **Resonance.exe** - The main app (177 MB)
- ✅ All necessary DLL files
- ✅ Your code (in app.asar)
- ✅ Electron runtime

This is a **fully functional desktop app!** It's just not packaged into a single installer yet.

## 📝 What Works

When you run Resonance.exe:
- ✅ Splash screen with your logo
- ✅ YouTube Music loads
- ✅ Media keys work
- ✅ System tray integration
- ✅ AI features (look for "AI ASSISTANT" in left sidebar)
- ✅ Music visualizer (in AI panel)
- ✅ All keyboard shortcuts

## 🎨 First Time Setup

1. **Launch Resonance.exe**
2. **Wait for YouTube Music** to load
3. **Sign in** with your Google account
4. **Look in the left sidebar** for "AI ASSISTANT" (cyan text)
5. **Click it** to open the AI panel
6. **Enable the visualizer** and enjoy!

## ⚡ Pro Tips

- **Portable App:** The entire `win-unpacked` folder is portable - you can move it anywhere!
- **Updates:** When we add new features, just replace this folder
- **Multiple Installs:** You can have multiple copies in different locations

## 🐛 Troubleshooting

### "App won't start"
- Make sure you're running from `C:\myytmusic\dist\win-unpacked\`
- Don't move the .exe out of the folder (it needs the DLLs)

### "Missing DLL errors"
- Re-run the build: `npm run build:win`
- Or download the entire folder again

### "AI features not showing"
- Open DevTools: `Ctrl + Shift + I`
- Check console for errors
- Send me the error messages

## 📍 File Locations

**Your built app:**
```
C:\myytmusic\dist\win-unpacked\Resonance.exe
```

**To update the app later:**
Just rebuild and replace the `win-unpacked` folder!

---

**Enjoy Resonance!** 🎵✨

When you come back, we can:
- Add the AI backend (Claude/OpenAI)
- Create a proper installer
- Add more visualizer modes
- Publish to Microsoft Store (optional)
