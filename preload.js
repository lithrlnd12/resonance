const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Expose safe APIs to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Splash screen communication
  splashDone: () => ipcRenderer.send('splash-done'),

  // AI features
  searchWithAI: (query) => ipcRenderer.invoke('ai-search', query),
  generatePlaylist: (prompt) => ipcRenderer.invoke('ai-playlist', prompt),
  getRecommendations: () => ipcRenderer.invoke('ai-recommendations')
});

// Inject AI overlay when YouTube Music loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('🎵 Resonance: Preload script loaded');
  console.log('🎵 Current URL:', window.location.href);

  // Wait for YouTube Music to be ready
  const checkYouTubeMusic = setInterval(() => {
    console.log('🎵 Checking if YouTube Music... hostname:', window.location.hostname);
    if (window.location.hostname === 'music.youtube.com') {
      clearInterval(checkYouTubeMusic);
      console.log('✅ YouTube Music detected! Injecting overlay...');
      injectAIOverlay();
    }
  }, 500);

  // Timeout after 10 seconds
  setTimeout(() => {
    clearInterval(checkYouTubeMusic);
    console.log('⏱️ Stopped checking for YouTube Music');
  }, 10000);
});

function injectAIOverlay() {
  console.log('🎵 Injecting Resonance AI Overlay...');

  try {
    // Inject CSS
    const cssPath = path.join(__dirname, 'src', 'ai-overlay.css');
    const css = fs.readFileSync(cssPath, 'utf8');
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);

    // Also inject colors.css
    const colorsCssPath = path.join(__dirname, 'src', 'colors.css');
    const colorsCss = fs.readFileSync(colorsCssPath, 'utf8');
    const colorsStyleElement = document.createElement('style');
    colorsStyleElement.textContent = colorsCss;
    document.head.appendChild(colorsStyleElement);

    // Inject Visualizer JavaScript first
    const visualizerJsPath = path.join(__dirname, 'src', 'visualizer.js');
    const visualizerJs = fs.readFileSync(visualizerJsPath, 'utf8');
    const visualizerScriptElement = document.createElement('script');
    visualizerScriptElement.textContent = visualizerJs;
    document.body.appendChild(visualizerScriptElement);

    // Then inject AI Overlay JavaScript
    const jsPath = path.join(__dirname, 'src', 'ai-overlay.js');
    const js = fs.readFileSync(jsPath, 'utf8');
    const scriptElement = document.createElement('script');
    scriptElement.textContent = js;
    document.body.appendChild(scriptElement);

    console.log('✅ Resonance AI Overlay + Visualizer injected successfully!');
  } catch (error) {
    console.error('❌ Failed to inject AI overlay:', error);
  }
}
