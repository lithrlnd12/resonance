# Download Resonance

Welcome! This guide will help you download and install Resonance on your computer.

## What is Resonance?

Resonance is a beautiful desktop application for YouTube Music with:
- Spotify-inspired dark UI
- Music visualizer that pulses with your music
- Media key support (Play/Pause, Next, Previous)
- System tray integration
- AI features (coming soon)

## System Requirements

- **Operating System:** Windows 10+, macOS 10.13+, or Linux (Ubuntu 18.04+)
- **RAM:** 4 GB minimum, 8 GB recommended
- **Disk Space:** 200 MB for installation
- **Internet:** Required for streaming YouTube Music
- **YouTube Music Account:** Free or Premium (Premium recommended for ad-free experience)

## Download

### Choose Your Platform

#### Windows

**Recommended: Installer**
- Download: `Resonance Setup 1.0.0.exe` (from releases)
- Installs to Program Files
- Creates desktop and start menu shortcuts
- Easy updates

**Alternative: Portable**
- Download: `Resonance 1.0.0.exe` (from releases)
- No installation required
- Run from anywhere (USB drive, Downloads folder, etc.)
- Perfect for users without admin rights

#### macOS

- Download: `Resonance-1.0.0.dmg` (from releases)
- Works on macOS 10.13 (High Sierra) and newer
- Both Intel and Apple Silicon (M1/M2) supported

#### Linux

**Recommended: AppImage (Universal)**
- Download: `Resonance-1.0.0.AppImage` (from releases)
- Works on all major Linux distributions
- No installation required
- Just make executable and run

**Alternative: DEB Package**
- Download: `resonance_1.0.0_amd64.deb` (from releases)
- For Debian, Ubuntu, Linux Mint, Pop!_OS, etc.
- Integrates with system package manager
- Easier updates

## Installation

### Windows

#### Using the Installer
1. Download `Resonance Setup 1.0.0.exe`
2. Double-click the downloaded file
3. If Windows SmartScreen appears, click "More info" → "Run anyway"
4. Follow the installation wizard
5. Launch Resonance from:
   - Desktop shortcut
   - Start menu
   - Search for "Resonance"

#### Using Portable Version
1. Download `Resonance 1.0.0.exe`
2. Move to your desired folder (e.g., `C:\Apps\`)
3. Double-click to run
4. (Optional) Create a desktop shortcut

### macOS

1. Download `Resonance-1.0.0.dmg`
2. Double-click the DMG file to mount it
3. Drag the Resonance app to your Applications folder
4. Eject the Resonance disk image
5. Open Applications folder
6. Right-click Resonance → "Open"
   - On first launch, macOS will show a security warning
   - Click "Open" to confirm
   - This is normal for apps downloaded from the internet
7. Subsequent launches: just double-click or use Spotlight

**Tip:** Add Resonance to your Dock for quick access!

### Linux

#### Using AppImage
1. Download `Resonance-1.0.0.AppImage`
2. Make it executable:
   ```bash
   chmod +x Resonance-1.0.0.AppImage
   ```
3. Run it:
   ```bash
   ./Resonance-1.0.0.AppImage
   ```
4. (Optional) Move to `/usr/local/bin/` for system-wide access:
   ```bash
   sudo mv Resonance-1.0.0.AppImage /usr/local/bin/resonance
   resonance  # Run from anywhere
   ```

**Note:** If AppImage doesn't run, install FUSE:
```bash
# Ubuntu/Debian
sudo apt install libfuse2

# Fedora
sudo dnf install fuse-libs
```

#### Using DEB Package
1. Download `resonance_1.0.0_amd64.deb`
2. Install via terminal:
   ```bash
   sudo dpkg -i resonance_1.0.0_amd64.deb
   sudo apt-get install -f  # Fix dependencies if needed
   ```
3. Launch from:
   - Applications menu (under "Sound & Video" or "Audio")
   - Terminal: `resonance`

## First Launch

### 1. Splash Screen
When you first launch Resonance, you'll see a beautiful splash screen with animations.

### 2. YouTube Music Login
- The app loads YouTube Music directly
- Sign in with your Google account
- Your playlists, likes, and history will sync automatically

### 3. Enjoy!
You're all set! Start listening to your music.

## Features Guide

### Music Visualizer
Press `Cmd/Ctrl + V` to toggle the visualizer:
- Choose from 3 visualization modes (Pulse, Waves, Ambient)
- Select from 8 color presets or use custom colors
- Adjust intensity with the slider
- Your preferences are saved automatically

### Keyboard Shortcuts

**Playback:**
- `Space` - Play/Pause
- `Cmd/Ctrl + →` - Next Track
- `Cmd/Ctrl + ←` - Previous Track

**Features:**
- `Cmd/Ctrl + V` - Toggle Music Visualizer
- `Cmd/Ctrl + K` - AI Search (coming soon)
- `Cmd/Ctrl + P` - AI Playlist Generator (coming soon)

**App:**
- `Cmd/Ctrl + R` - Reload
- `Cmd/Ctrl + Q` - Quit

### Media Keys
Your keyboard's media keys work too:
- Media Play/Pause
- Media Next Track
- Media Previous Track

### System Tray
Resonance runs in your system tray:
- **Windows:** Bottom-right corner (system tray)
- **macOS:** Top-right corner (menu bar)
- **Linux:** Depends on desktop environment

Right-click the tray icon for quick actions.

## Troubleshooting

### Windows: "Windows protected your PC"
This is Windows SmartScreen being cautious about new apps.
1. Click "More info"
2. Click "Run anyway"
This is safe - the app isn't signed yet because code signing certificates cost $300+/year.

### macOS: "Cannot open because it is from an unidentified developer"
1. Don't double-click. Instead, right-click (or Ctrl+click)
2. Select "Open"
3. Click "Open" in the dialog
This only needs to be done on first launch.

### Linux: AppImage won't run
Install FUSE:
```bash
sudo apt install libfuse2  # Debian/Ubuntu
sudo dnf install fuse-libs  # Fedora
```

### App won't start / Blank screen
1. Close the app completely
2. Delete the app data folder:
   - **Windows:** `%APPDATA%\resonance`
   - **macOS:** `~/Library/Application Support/resonance`
   - **Linux:** `~/.config/resonance`
3. Restart the app

### Audio issues
- Make sure YouTube Music works in your browser first
- Check your system volume and YouTube Music volume
- Try reloading the app (`Cmd/Ctrl + R`)

### Visualizer not working
- Ensure music is actually playing
- Try toggling it off and on again (`Cmd/Ctrl + V`)
- Reload the app (`Cmd/Ctrl + R`)

## Uninstalling

### Windows
**Installer version:**
- Settings → Apps → Resonance → Uninstall

**Portable version:**
- Just delete the EXE file

### macOS
- Drag Resonance from Applications to Trash
- Empty Trash

### Linux
**AppImage:**
- Just delete the AppImage file

**DEB package:**
```bash
sudo apt remove resonance
```

### Remove App Data (Optional)
To completely remove all settings and data:

**Windows:**
```
Delete: %APPDATA%\resonance
```

**macOS:**
```bash
rm -rf ~/Library/Application\ Support/resonance
```

**Linux:**
```bash
rm -rf ~/.config/resonance
```

## Updates

Currently, updates are manual:
1. Download the latest version
2. Install (replaces the old version automatically)
3. Your settings and data are preserved

**Auto-updates coming soon!**

## Privacy & Data

Resonance:
- Does NOT collect any personal data
- Does NOT track your listening habits
- Does NOT send data to external servers (except YouTube Music itself)
- All settings stored locally on your computer

Your YouTube Music account is between you and Google - Resonance just displays the YouTube Music web interface.

## Getting Help

Having issues?

1. Check the troubleshooting section above
2. Read the [full documentation](./README.md)
3. Open an issue on [GitHub](https://github.com/lithrlnd12/resonance/issues)

## What's Next?

Resonance is actively developed with exciting AI features coming soon:
- Natural language search ("upbeat songs for Friday afternoon")
- AI playlist generator
- Smart queue management
- AI DJ / Radio host
- Mood detection
- Lyrics & song insights

Stay tuned! 🎵

---

**Enjoy Resonance!** Made with ❤️ and AI
