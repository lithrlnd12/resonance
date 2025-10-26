# Windows Setup Guide for Resonance

This guide will help you set up Resonance on Windows from scratch.

## Step 1: Install Node.js (Required)

If you see the error `'npm' is not recognized as an internal or external command`, you need to install Node.js first.

### Download and Install Node.js

1. **Visit the Node.js website:**
   - Go to: https://nodejs.org/
   - You'll see two download options

2. **Choose the LTS version:**
   - Click the **LTS (Long Term Support)** version (recommended)
   - This will download a file like `node-v20.x.x-x64.msi`

3. **Run the installer:**
   - Double-click the downloaded `.msi` file
   - Click **Next** through the installer
   - **Important:** Make sure "Add to PATH" is checked (it's checked by default)
   - Click **Install**
   - You may need to provide administrator permission

4. **Verify installation:**
   - Open a **new** Command Prompt or PowerShell window
   - Type: `node --version`
   - You should see something like `v20.10.0`
   - Type: `npm --version`
   - You should see something like `10.2.3`

   **Note:** You must open a NEW terminal window after installing Node.js for the PATH to update.

### If npm Still Not Recognized

If you still see `'npm' is not recognized`, try:

1. **Close ALL Command Prompt/PowerShell windows**
2. **Restart your computer** (this ensures PATH is updated)
3. **Open a NEW Command Prompt**
4. Try `npm --version` again

If it still doesn't work:
- The installer may not have added Node.js to your PATH
- Manually add `C:\Program Files\nodejs\` to your system PATH
- See: https://nodejs.org/en/download/package-manager

## Step 2: Navigate to Resonance Directory

Once Node.js is installed:

```cmd
cd C:\Users\JOEL_HTPC\resonance
```

If the directory doesn't exist, you need to clone or download the Resonance repository first.

## Step 3: Install Resonance Dependencies

```cmd
npm install
```

This will:
- Download all required packages (Electron, etc.)
- Create a `node_modules` folder
- Take a few minutes to complete

You should see output like:
```
added 200 packages in 2m
```

## Step 4: Run Resonance

Once installation completes:

```cmd
npm start
```

This will launch the Resonance app!

## Step 5: Build Resonance (Optional)

To create a standalone .exe file:

```cmd
npm run build:win
```

The built app will be in `dist\win-unpacked\Resonance.exe`

## Troubleshooting

### "Cannot find module 'electron'"
- Run `npm install` again
- Make sure it completed without errors

### "npm ERR! network"
- Check your internet connection
- Try again - sometimes npm servers are slow

### "Permission denied" or "Access denied"
- Run Command Prompt as Administrator
- Right-click Command Prompt → "Run as administrator"

### "ENOENT: no such file or directory"
- Make sure you're in the resonance directory
- Use `dir` to list files - you should see `package.json`

## Quick Reference

Once Node.js is installed, here's the workflow:

```cmd
# Navigate to project
cd C:\Users\JOEL_HTPC\resonance

# Install dependencies (first time only)
npm install

# Run the app in development mode
npm start

# Build for Windows (creates .exe)
npm run build:win
```

## System Requirements

- **Windows:** 10 or later
- **Node.js:** 18.0 or later
- **Disk Space:** ~500 MB for dependencies
- **RAM:** 4 GB minimum, 8 GB recommended

## Need Help?

1. Check that Node.js is installed: `node --version`
2. Check that npm is installed: `npm --version`
3. Make sure you're in the correct directory: `dir` should show `package.json`
4. Try closing and reopening your terminal

---

**Next:** Once setup is complete, see [README.md](./README.md) for features and usage instructions.
