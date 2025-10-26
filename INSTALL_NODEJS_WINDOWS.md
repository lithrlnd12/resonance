# Install Node.js on Windows - Simple Guide

**You DO NOT need Docker.** Follow these simple steps:

## Step 1: Download Node.js

1. Open your web browser
2. Go to: **https://nodejs.org/**
3. You'll see a green button that says **"Download Node.js (LTS)"**
4. Click it - it will download a file like `node-v20.11.0-x64.msi`

## Step 2: Install Node.js

1. Find the downloaded file (usually in your Downloads folder)
2. **Double-click** the `.msi` file to run it
3. Click **Next** on the welcome screen
4. Accept the license agreement
5. **IMPORTANT:** On the "Custom Setup" screen, make sure everything is checked including:
   - "Add to PATH" (this is critical!)
6. Click **Next** then **Install**
7. Windows may ask for administrator permission - click **Yes**
8. Wait for installation to complete (takes about 1 minute)
9. Click **Finish**

## Step 3: Restart Your Terminal

**This is REQUIRED for Windows to recognize Node.js:**

1. Close ALL Command Prompt windows you have open
2. Open a **NEW** Command Prompt window
   - Press `Windows Key + R`
   - Type: `cmd`
   - Press Enter

## Step 4: Verify Installation

In your NEW Command Prompt window, type these commands **one at a time**:

```cmd
node -v
```

You should see something like: `v20.11.0`

Then type:

```cmd
npm -v
```

You should see something like: `10.2.4`

**If you see version numbers, SUCCESS! Node.js is installed.**

**If you still see `'node' is not recognized`:**
- Did you close and reopen Command Prompt? (Step 3 is critical!)
- Try restarting your computer
- The installer may have failed - try running it again

## Step 5: Install Resonance

Now that Node.js is working, navigate to your Resonance folder:

```cmd
cd C:\Users\JOEL_HTPC\resonance
```

Then install dependencies:

```cmd
npm install
```

This will take 2-5 minutes. You'll see lots of text scrolling by - that's normal!

When it's done, you'll see something like:
```
added 200 packages in 3m
```

## Step 6: Run Resonance

```cmd
npm start
```

The app should launch!

## Windows Command Prompt Tips

**DO NOT copy lines that start with `#`** - those are comments for Unix systems, not Windows.

For example, if you see:
```bash
# This is a comment
node -v # Should print version
```

On Windows, only type:
```cmd
node -v
```

Comments (text after `#`) will cause errors in Windows Command Prompt.

## Need Help?

If `node -v` still doesn't work after installation and restarting:

1. **Restart your entire computer** (not just Command Prompt)
2. Open Command Prompt as Administrator:
   - Search for "Command Prompt" in Start Menu
   - Right-click it
   - Select "Run as administrator"
3. Try `node -v` again

If it STILL doesn't work, Node.js may not have been added to your PATH. You can:
- Uninstall Node.js (from Windows Settings → Apps)
- Download it again from nodejs.org
- Run the installer again, making sure "Add to PATH" is checked

---

**Summary:**
1. Download from nodejs.org (the LTS version)
2. Run the installer
3. Close and reopen Command Prompt (or restart computer)
4. Type `node -v` to verify
5. Navigate to resonance folder
6. Run `npm install`
7. Run `npm start`
