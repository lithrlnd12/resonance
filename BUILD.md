# Building Resonance for Distribution

This guide explains how to package Resonance as a downloadable desktop application for Windows, macOS, and Linux.

## Prerequisites

Before building, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - For cloning the repository
- At least **500 MB** of free disk space (for build artifacts)

### Platform-Specific Requirements

#### Windows
- No additional requirements (builds work on any platform)

#### macOS
- **Xcode Command Line Tools** (only needed when building on macOS)
  ```bash
  xcode-select --install
  ```

#### Linux
- Install build dependencies:
  ```bash
  # Debian/Ubuntu
  sudo apt-get install -y build-essential

  # Fedora/RHEL
  sudo dnf install @development-tools
  ```

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/lithrlnd12/resonance.git
cd resonance

# Install dependencies
npm install
```

### 2. Build for Your Platform

#### Windows (Installer + Portable)
```bash
npm run build:win
```

This creates:
- `dist/Resonance Setup 1.0.0.exe` - Windows installer (NSIS)
- `dist/Resonance 1.0.0.exe` - Portable executable (no installation required)

#### macOS (DMG)
```bash
npm run build:mac
```

This creates:
- `dist/Resonance-1.0.0.dmg` - macOS disk image installer

#### Linux (AppImage + DEB)
```bash
npm run build:linux
```

This creates:
- `dist/Resonance-1.0.0.AppImage` - Universal Linux executable
- `dist/resonance_1.0.0_amd64.deb` - Debian/Ubuntu package

### 3. Build for All Platforms

```bash
npm run build
```

This builds for all platforms (Windows, macOS, and Linux).

**Note:** You can build for any platform from any OS. electron-builder handles cross-platform compilation automatically.

## Distribution

After building, the packaged applications are in the `dist/` directory:

```
dist/
├── Resonance Setup 1.0.0.exe       # Windows installer
├── Resonance 1.0.0.exe             # Windows portable
├── Resonance-1.0.0.dmg             # macOS installer
├── Resonance-1.0.0.AppImage        # Linux universal
└── resonance_1.0.0_amd64.deb       # Linux Debian/Ubuntu
```

### Recommended Distribution Files

Upload these files for users to download:

1. **Windows Users**: `Resonance Setup 1.0.0.exe` (installer) or `Resonance 1.0.0.exe` (portable)
2. **macOS Users**: `Resonance-1.0.0.dmg`
3. **Linux Users**: `Resonance-1.0.0.AppImage` (works on all distros)

### File Sizes (Approximate)

- Windows installer: ~150 MB
- Windows portable: ~150 MB
- macOS DMG: ~150 MB
- Linux AppImage: ~150 MB
- Linux DEB: ~150 MB

## Installation Instructions for End Users

### Windows

**Option 1: Installer (Recommended)**
1. Download `Resonance Setup 1.0.0.exe`
2. Double-click to run the installer
3. Follow the installation wizard
4. Launch from Start Menu or Desktop shortcut

**Option 2: Portable**
1. Download `Resonance 1.0.0.exe`
2. Double-click to run (no installation needed)
3. Can be run from USB drive or any folder

### macOS

1. Download `Resonance-1.0.0.dmg`
2. Double-click to mount the disk image
3. Drag Resonance to Applications folder
4. Launch from Applications or Spotlight

**Note:** On first launch, macOS may show a security warning. Go to System Preferences → Security & Privacy and click "Open Anyway".

### Linux

**Option 1: AppImage (Universal)**
1. Download `Resonance-1.0.0.AppImage`
2. Make it executable:
   ```bash
   chmod +x Resonance-1.0.0.AppImage
   ```
3. Double-click or run from terminal:
   ```bash
   ./Resonance-1.0.0.AppImage
   ```

**Option 2: DEB Package (Debian/Ubuntu)**
1. Download `resonance_1.0.0_amd64.deb`
2. Install via terminal:
   ```bash
   sudo dpkg -i resonance_1.0.0_amd64.deb
   sudo apt-get install -f  # Install dependencies if needed
   ```
3. Launch from applications menu or run `resonance`

## Advanced Build Configuration

### Custom Icon

The app icon is located at `assets/icon.png`. To use a custom icon:

1. Replace `assets/icon.png` with your icon (recommended: 512x512 PNG)
2. Rebuild the app

electron-builder will automatically convert the PNG to:
- `.ico` for Windows
- `.icns` for macOS
- Keep `.png` for Linux

### Version Number

Update the version in `package.json`:

```json
{
  "version": "1.0.0"
}
```

### App Name and ID

Modify in `package.json`:

```json
{
  "name": "resonance",
  "productName": "Resonance",
  "build": {
    "appId": "com.resonance.app"
  }
}
```

### Build Targets

You can customize build targets in `package.json`:

```json
{
  "build": {
    "win": {
      "target": ["nsis", "portable", "zip"]
    },
    "mac": {
      "target": ["dmg", "zip"]
    },
    "linux": {
      "target": ["AppImage", "deb", "rpm", "snap"]
    }
  }
}
```

## Troubleshooting

### Build Fails

**Problem:** `npm run build` fails with errors

**Solutions:**
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```
3. Update electron-builder:
   ```bash
   npm install electron-builder@latest --save-dev
   ```

### Large File Sizes

**Problem:** Built apps are very large (>200 MB)

**Explanation:** This is normal for Electron apps because they bundle:
- Chromium browser engine (~100 MB)
- Node.js runtime (~30 MB)
- Your app code and dependencies

**To reduce size:**
- Remove unused dependencies in `package.json`
- Use `asar` compression (enabled by default)
- Consider publishing updates only (delta updates)

### macOS Code Signing

**Problem:** macOS shows "unidentified developer" warning

**Solutions:**
1. **For users:** Right-click → Open (instead of double-click) on first launch
2. **For developers:** Get an Apple Developer certificate ($99/year)
3. **For developers:** Sign the app:
   ```bash
   export APPLE_ID=your@email.com
   export APPLE_ID_PASSWORD=app-specific-password
   npm run build:mac
   ```

### Linux Dependencies

**Problem:** AppImage won't run on some Linux distros

**Solution:** Install FUSE:
```bash
# Ubuntu/Debian
sudo apt install libfuse2

# Fedora
sudo dnf install fuse-libs
```

## Publishing to GitHub Releases

You can automate building and publishing to GitHub Releases:

1. Create a GitHub Personal Access Token
2. Add to environment:
   ```bash
   export GH_TOKEN=your_github_token
   ```
3. Build and publish:
   ```bash
   npm run build
   ```

electron-builder can automatically create a GitHub Release and upload the build artifacts.

## Continuous Integration (CI)

Example GitHub Actions workflow to build on every release:

```yaml
name: Build/release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: softprops/action-gh-release@v1
        with:
          files: dist/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Save this as `.github/workflows/build.yml` to enable automatic builds on tagged releases.

## Next Steps

After building:

1. Test the packaged app on the target platform
2. Upload to GitHub Releases or your website
3. Create a `CHANGELOG.md` documenting new features
4. Share download links with users

## Support

If you encounter issues:

1. Check the [electron-builder docs](https://www.electron.build/)
2. Review the [Electron docs](https://www.electronjs.org/docs)
3. Open an issue on the GitHub repository

---

**Happy building!** 🚀
