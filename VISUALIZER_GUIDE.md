# 🎨 Resonance Music Visualizer Guide

## Overview

The Resonance Music Visualizer creates beautiful, real-time visual effects that pulse and react to your music. The background comes alive with colors that sync perfectly to the beat!

## Features

### ✨ What It Does
- **Real-time audio analysis** - Reads the actual audio being played
- **Reactive visuals** - Pulsates, waves, and glows with the music
- **Multiple modes** - Different visualization styles
- **Customizable colors** - 8 presets + custom color picker
- **Adjustable intensity** - Control how strong the effects are
- **Remembers preferences** - Settings saved automatically

## How to Use

### Quick Start

1. **Open Resonance** and start playing music
2. **Click the AI button** (glowing cyan button, bottom-right)
3. **Scroll down** to "Music Visualizer" section
4. **Toggle it ON** - Watch your background come alive!

### Keyboard Shortcut
Press `Cmd/Ctrl + V` to quickly toggle the visualizer on/off

## Settings & Customization

### 1. Enable/Disable
Simple toggle switch to turn visualizer on or off

### 2. Intensity Slider (0-100%)
- **Low (10-30%):** Subtle, ambient effect
- **Medium (40-60%):** Balanced, noticeable
- **High (70-100%):** Intense, dramatic

**Tip:** Start at 50% and adjust to taste!

### 3. Visualization Modes

#### **Pulse (Radial)** - Default
- Radial gradient that expands from center
- Best for: All music types
- Effect: Gentle, breathing glow

#### **Waves (Frequency)**
- Frequency bars create wave patterns
- Best for: Electronic, bass-heavy music
- Effect: Dynamic, energetic movement

#### **Ambient (Subtle)**
- Very subtle edge lighting
- Best for: Focus sessions, background listening
- Effect: Calm, minimal distraction

### 4. Color Themes

**8 Preset Colors:**
- **Cyan** (Default) - #00E5FF - Resonance brand color
- **Purple** - #B794F6 - Dreamy, mystical
- **Green** - #00FFA3 - Fresh, energetic
- **Pink** - #FF3B6D - Vibrant, bold
- **Orange** - #FFB800 - Warm, uplifting
- **Blue** - #4D9FFF - Cool, calm
- **Red** - #FF4757 - Intense, passionate
- **Teal** - #1DD1A1 - Chill, soothing

**Custom Color:**
Use the color picker to choose ANY color you want!

## Technical Details

### How It Works
1. **Audio Capture:** Connects to YouTube Music's audio element
2. **Analysis:** Uses Web Audio API to extract frequency data
3. **Rendering:** Draws real-time visuals on a background canvas
4. **Performance:** Optimized to not affect playback or CPU

### No API Needed!
The visualizer uses built-in browser APIs - completely free, no external services required.

### Privacy
- All processing happens locally in your app
- No data sent anywhere
- No tracking or analytics

## Tips & Best Practices

### For Best Results:
1. **Play music first** - Start a song before enabling visualizer
2. **Adjust intensity** - Different genres work better at different levels
3. **Match your mood:**
   - Relaxing: Ambient mode + low intensity + blue/teal
   - Party: Waves mode + high intensity + pink/orange
   - Focus: Pulse mode + medium intensity + cyan/purple

### Performance:
- Visualizer is lightweight but uses some GPU
- If you experience lag, try:
  - Lower intensity
  - Use Pulse or Ambient mode instead of Waves
  - Disable when not actively watching

### Customization Ideas:
- **Morning:** Ambient + Orange @ 30%
- **Night:** Pulse + Purple @ 60%
- **Workout:** Waves + Red @ 80%
- **Study:** Ambient + Cyan @ 20%

## Troubleshooting

### Visualizer not showing?
1. Make sure it's toggled ON
2. Play some music (visualizer needs audio to react to)
3. Check if intensity is above 0%
4. Try refreshing the app

### Not reacting to music?
1. Wait a few seconds for audio connection
2. Try pausing and playing the song again
3. Check console logs (Cmd/Ctrl + Shift + I) for errors

### Colors look wrong?
- Check your selected color in settings
- Some monitors may display colors differently
- Try a different preset

## Keyboard Shortcuts Summary

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + V` | Toggle visualizer on/off |
| `Cmd/Ctrl + K` | Open AI Search |
| `Cmd/Ctrl + P` | Open Playlist Generator |

## What's Next?

Future visualizer features we're considering:
- 🎯 More visualization modes (particles, spectrum analyzer)
- 🎯 Beat detection for sharper responses
- 🎯 Color themes that auto-switch based on genre
- 🎯 Export visualizations as videos
- 🎯 VJ mode for fullscreen visualizations

---

**Enjoy the show!** 🎵✨

Your music has never looked this good.
