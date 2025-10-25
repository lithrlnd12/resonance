// Resonance AI Overlay - Injected into YouTube Music
(function() {
  'use strict';

  console.log('🎵 Resonance AI Overlay loaded');

  // Wait for YouTube Music to load
  function waitForElement(selector, callback, maxAttempts = 50) {
    let attempts = 0;
    const interval = setInterval(() => {
      if (document.querySelector(selector) || attempts >= maxAttempts) {
        clearInterval(interval);
        callback();
      }
      attempts++;
    }, 200);
  }

  // Inject CSS
  function injectStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'ai-overlay.css';
    document.head.appendChild(link);
  }

  // Create main overlay container
  function createOverlayContainer() {
    const overlay = document.createElement('div');
    overlay.id = 'resonance-ai-overlay';
    document.body.appendChild(overlay);
    return overlay;
  }

  // Inject AI menu item into YouTube Music's left sidebar
  function injectSidebarAIButton() {
    // Wait for YouTube Music's sidebar navigation to load
    const checkSidebar = setInterval(() => {
      const sidebarNav = document.querySelector('ytmusic-nav-bar');

      if (sidebarNav) {
        clearInterval(checkSidebar);

        // Find the navigation items container
        const navItems = sidebarNav.querySelector('#items');

        if (navItems) {
          // Create AI menu item
          const aiMenuItem = document.createElement('ytmusic-guide-entry-renderer');
          aiMenuItem.className = 'resonance-sidebar-item';
          aiMenuItem.style.cssText = `
            display: flex;
            align-items: center;
            padding: 8px 12px;
            cursor: pointer;
            transition: background 0.2s;
            border-radius: 8px;
            margin: 4px 12px;
          `;

          aiMenuItem.innerHTML = `
            <div style="display: flex; align-items: center; width: 100%; gap: 24px;">
              <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: #00E5FF;">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <circle cx="12" cy="12" r="3" fill="#00E5FF"/>
                  <path d="M12 8l-1.5 4h3L12 8z" fill="#0A1A1F"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <span style="color: #00E5FF; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                  AI Assistant
                </span>
              </div>
            </div>
          `;

          // Hover effect
          aiMenuItem.addEventListener('mouseenter', () => {
            aiMenuItem.style.background = 'rgba(0, 229, 255, 0.1)';
          });

          aiMenuItem.addEventListener('mouseleave', () => {
            aiMenuItem.style.background = 'transparent';
          });

          // Click handler
          aiMenuItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleAIPanel();

            // Visual feedback
            aiMenuItem.style.background = 'rgba(0, 229, 255, 0.2)';
            setTimeout(() => {
              aiMenuItem.style.background = 'rgba(0, 229, 255, 0.1)';
            }, 200);
          });

          // Insert after "Home" or at the top
          const firstItem = navItems.querySelector('ytmusic-guide-entry-renderer');
          if (firstItem && firstItem.nextSibling) {
            navItems.insertBefore(aiMenuItem, firstItem.nextSibling);
          } else {
            navItems.prepend(aiMenuItem);
          }

          console.log('✅ AI menu item added to sidebar!');
        }
      }
    }, 500);

    // Stop checking after 30 seconds
    setTimeout(() => clearInterval(checkSidebar), 30000);
  }

  // Create AI Panel Sidebar
  function createAIPanel(container) {
    const panel = document.createElement('div');
    panel.className = 'resonance-ai-panel';
    panel.innerHTML = `
      <div class="resonance-ai-panel-header">
        <div class="resonance-ai-panel-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          AI Assistant
        </div>
        <button class="resonance-close-btn" onclick="this.closest('.resonance-ai-panel').classList.remove('open')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div class="resonance-ai-panel-content">
        <div class="resonance-feature-card" onclick="openAISearch()">
          <h3>
            <svg class="resonance-feature-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Natural Language Search
          </h3>
          <p>Search with phrases like "upbeat songs for Friday afternoon" or "chill music for studying"</p>
        </div>

        <div class="resonance-feature-card" onclick="openPlaylistGenerator()">
          <h3>
            <svg class="resonance-feature-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H8v-2h4V7h2v4h4v2h-4v4z"/>
            </svg>
            AI Playlist Generator
          </h3>
          <p>Create custom playlists with AI - just describe what you want to listen to</p>
        </div>

        <div class="resonance-feature-card" onclick="alert('Coming soon!')">
          <h3>
            <svg class="resonance-feature-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            Smart Queue
          </h3>
          <p>AI automatically curates your queue based on your current mood and listening patterns</p>
        </div>

        <div class="resonance-feature-card" onclick="alert('Coming soon!')">
          <h3>
            <svg class="resonance-feature-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
            </svg>
            AI DJ Mode
          </h3>
          <p>Let AI be your personal DJ with curated music flows and fun commentary</p>
        </div>

        <!-- Visualizer Settings -->
        <div class="resonance-section-divider"></div>
        <h3 class="resonance-section-title">
          <svg class="resonance-feature-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9h4l-5 7v-7m6 0h4l-5 7v-7m6 0h4l-5 7v-7"/>
          </svg>
          Music Visualizer
        </h3>

        <div class="resonance-settings-card">
          <div class="resonance-setting-row">
            <label class="resonance-toggle-label">
              <span>Enable Visualizer</span>
              <div class="resonance-toggle">
                <input type="checkbox" id="visualizer-toggle" onchange="toggleVisualizer(this.checked)">
                <span class="resonance-toggle-slider"></span>
              </div>
            </label>
          </div>

          <div id="visualizer-settings" class="visualizer-settings-expanded">
            <div class="resonance-setting-row">
              <label>
                <span class="resonance-label-text">Intensity</span>
                <input type="range" id="visualizer-intensity" min="0" max="1" step="0.1" value="0.5"
                  oninput="updateVisualizerIntensity(this.value)" class="resonance-slider">
                <span class="resonance-slider-value" id="intensity-value">50%</span>
              </label>
            </div>

            <div class="resonance-setting-row">
              <label>
                <span class="resonance-label-text">Mode</span>
                <select id="visualizer-mode" onchange="updateVisualizerMode(this.value)" class="resonance-select">
                  <option value="pulse">Pulse (Radial)</option>
                  <option value="waves">Waves (Frequency)</option>
                  <option value="ambient">Ambient (Subtle)</option>
                </select>
              </label>
            </div>

            <div class="resonance-setting-row">
              <span class="resonance-label-text">Color Theme</span>
              <div class="resonance-color-grid" id="color-presets"></div>
            </div>

            <div class="resonance-setting-row">
              <label>
                <span class="resonance-label-text">Custom Color</span>
                <input type="color" id="visualizer-color" value="#00E5FF"
                  onchange="updateVisualizerColor(this.value)" class="resonance-color-picker">
              </label>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(panel);
    return panel;
  }

  // Create AI Search Overlay
  function createSearchOverlay(container) {
    const overlay = document.createElement('div');
    overlay.className = 'resonance-search-overlay';
    overlay.innerHTML = `
      <div class="resonance-search-container">
        <div class="resonance-search-box">
          <input
            type="text"
            class="resonance-search-input"
            placeholder="Try: 'energetic workout music' or 'relaxing jazz for studying'"
            id="resonance-ai-search-input"
          />
          <svg class="resonance-search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div class="resonance-search-suggestions">
          <h3>Try these:</h3>
          <span class="resonance-suggestion-chip" onclick="searchWithAI('upbeat indie rock for road trip')">
            Upbeat indie rock for road trip
          </span>
          <span class="resonance-suggestion-chip" onclick="searchWithAI('chill lo-fi beats for studying')">
            Chill lo-fi for studying
          </span>
          <span class="resonance-suggestion-chip" onclick="searchWithAI('90s hip hop workout playlist')">
            90s hip hop workout
          </span>
          <span class="resonance-suggestion-chip" onclick="searchWithAI('relaxing music for meditation')">
            Relaxing meditation music
          </span>
          <span class="resonance-suggestion-chip" onclick="searchWithAI('energetic EDM for party')">
            Energetic EDM party
          </span>
        </div>
      </div>
    `;

    // Close on click outside
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });

    // Handle Enter key
    overlay.querySelector('#resonance-ai-search-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          searchWithAI(query);
        }
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }
    });

    container.appendChild(overlay);
    return overlay;
  }

  // Create Playlist Generator Modal
  function createPlaylistModal(container) {
    const modal = document.createElement('div');
    modal.className = 'resonance-playlist-modal';
    modal.innerHTML = `
      <div class="resonance-playlist-content">
        <h2>AI Playlist Generator</h2>
        <p>Describe the playlist you want and AI will create it for you</p>
        <textarea
          class="resonance-prompt-input"
          placeholder="Example: Create a playlist of upbeat indie rock songs perfect for a summer road trip, with some 90s nostalgia mixed in. Keep it around 1 hour."
          id="resonance-playlist-prompt"
        ></textarea>
        <div class="resonance-modal-actions">
          <button class="resonance-btn resonance-btn-primary" onclick="generatePlaylist()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Generate Playlist
          </button>
          <button class="resonance-btn resonance-btn-secondary" onclick="closePlaylistModal()">
            Cancel
          </button>
        </div>
      </div>
    `;

    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    container.appendChild(modal);
    return modal;
  }

  // Global functions for UI interactions
  window.toggleAIPanel = function() {
    const panel = document.querySelector('.resonance-ai-panel');
    panel.classList.toggle('open');
  };

  window.openAISearch = function() {
    const overlay = document.querySelector('.resonance-search-overlay');
    overlay.classList.add('active');
    setTimeout(() => {
      document.getElementById('resonance-ai-search-input').focus();
    }, 100);

    // Close AI panel
    document.querySelector('.resonance-ai-panel').classList.remove('open');
  };

  window.openPlaylistGenerator = function() {
    const modal = document.querySelector('.resonance-playlist-modal');
    modal.classList.add('active');
    setTimeout(() => {
      document.getElementById('resonance-playlist-prompt').focus();
    }, 100);

    // Close AI panel
    document.querySelector('.resonance-ai-panel').classList.remove('open');
  };

  window.closePlaylistModal = function() {
    document.querySelector('.resonance-playlist-modal').classList.remove('active');
  };

  window.searchWithAI = async function(query) {
    console.log('🔍 AI Search:', query);

    // For now, just use YouTube Music's search
    // TODO: Add AI processing to interpret the query
    const ytMusicSearch = document.querySelector('ytmusic-search-box input');
    if (ytMusicSearch) {
      ytMusicSearch.value = query;
      ytMusicSearch.dispatchEvent(new Event('input', { bubbles: true }));

      // Trigger search
      const searchButton = document.querySelector('ytmusic-search-box button');
      if (searchButton) {
        searchButton.click();
      }
    }

    // Close search overlay
    document.querySelector('.resonance-search-overlay').classList.remove('active');

    // TODO: Send to AI backend to enhance search
    alert(`🎵 Searching for: "${query}"\n\nAI enhancement coming soon! This will intelligently interpret your request and find the perfect music.`);
  };

  window.generatePlaylist = async function() {
    const prompt = document.getElementById('resonance-playlist-prompt').value.trim();

    if (!prompt) {
      alert('Please describe the playlist you want!');
      return;
    }

    console.log('🎵 Generating playlist:', prompt);

    // Show loading state
    const modal = document.querySelector('.resonance-playlist-content');
    const originalContent = modal.innerHTML;
    modal.innerHTML = `
      <div class="resonance-loading">
        <div class="resonance-spinner"></div>
        <p class="resonance-loading-text">AI is creating your playlist...</p>
      </div>
    `;

    // TODO: Send to AI backend
    setTimeout(() => {
      modal.innerHTML = originalContent;
      closePlaylistModal();
      alert(`🎵 Playlist generated!\n\nPrompt: "${prompt}"\n\nAI backend integration coming soon! This will use Claude/GPT to analyze your prompt and create the perfect playlist.`);
    }, 2000);
  };

  // Visualizer control functions
  window.toggleVisualizer = function(enabled) {
    if (window.resonanceVisualizer) {
      window.resonanceVisualizer.toggle(enabled);
    }

    // Show/hide settings
    const settings = document.getElementById('visualizer-settings');
    if (settings) {
      settings.style.display = enabled ? 'block' : 'none';
    }
  };

  window.updateVisualizerIntensity = function(value) {
    if (window.resonanceVisualizer) {
      window.resonanceVisualizer.setIntensity(value);
    }
    document.getElementById('intensity-value').textContent = Math.round(value * 100) + '%';
  };

  window.updateVisualizerMode = function(mode) {
    if (window.resonanceVisualizer) {
      window.resonanceVisualizer.setMode(mode);
    }
  };

  window.updateVisualizerColor = function(color) {
    if (window.resonanceVisualizer) {
      window.resonanceVisualizer.setColor(color);
    }

    // Update all preset buttons to show active state
    document.querySelectorAll('.resonance-color-chip').forEach(chip => {
      if (chip.dataset.color === color) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  };

  // Initialize visualizer settings
  function initVisualizerSettings() {
    // Wait for visualizer to be ready
    const waitForVisualizer = setInterval(() => {
      if (window.resonanceVisualizer) {
        clearInterval(waitForVisualizer);

        const settings = window.resonanceVisualizer.settings;

        // Set initial toggle state
        const toggle = document.getElementById('visualizer-toggle');
        if (toggle) {
          toggle.checked = settings.enabled;
          // Show/hide settings based on toggle
          const settingsContainer = document.getElementById('visualizer-settings');
          if (settingsContainer) {
            settingsContainer.style.display = settings.enabled ? 'block' : 'none';
          }
        }

        // Set initial intensity
        const intensitySlider = document.getElementById('visualizer-intensity');
        if (intensitySlider) {
          intensitySlider.value = settings.intensity;
          document.getElementById('intensity-value').textContent = Math.round(settings.intensity * 100) + '%';
        }

        // Set initial mode
        const modeSelect = document.getElementById('visualizer-mode');
        if (modeSelect) {
          modeSelect.value = settings.mode;
        }

        // Set initial color
        const colorPicker = document.getElementById('visualizer-color');
        if (colorPicker) {
          colorPicker.value = settings.color;
        }

        // Create color preset chips
        const colorGrid = document.getElementById('color-presets');
        if (colorGrid && window.resonanceVisualizer.presetColors) {
          window.resonanceVisualizer.presetColors.forEach(preset => {
            const chip = document.createElement('button');
            chip.className = 'resonance-color-chip';
            chip.dataset.color = preset.color;
            chip.style.background = preset.color;
            chip.title = preset.name;
            chip.onclick = () => {
              updateVisualizerColor(preset.color);
              document.getElementById('visualizer-color').value = preset.color;
            };

            if (preset.color === settings.color) {
              chip.classList.add('active');
            }

            colorGrid.appendChild(chip);
          });
        }
      }
    }, 500);
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K for AI search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openAISearch();
    }

    // Cmd/Ctrl + P for playlist generator
    if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
      e.preventDefault();
      openPlaylistGenerator();
    }

    // Cmd/Ctrl + V for visualizer toggle
    if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
      e.preventDefault();
      const toggle = document.getElementById('visualizer-toggle');
      if (toggle) {
        toggle.checked = !toggle.checked;
        toggleVisualizer(toggle.checked);
      }
    }
  });

  // Initialize
  function init() {
    console.log('🎵 Initializing Resonance AI Overlay...');

    waitForElement('ytmusic-app', () => {
      console.log('✅ YouTube Music loaded, injecting AI overlay...');

      injectStyles();
      const container = createOverlayContainer();

      // Inject AI button into YouTube Music's sidebar
      injectSidebarAIButton();

      createAIPanel(container);
      createSearchOverlay(container);
      createPlaylistModal(container);

      // Initialize visualizer settings
      initVisualizerSettings();

      console.log('✅ Resonance AI Overlay ready!');
      console.log('💡 Keyboard shortcuts:');
      console.log('   - Cmd/Ctrl + K: AI Search');
      console.log('   - Cmd/Ctrl + P: AI Playlist Generator');
      console.log('   - Cmd/Ctrl + V: Toggle Visualizer');
      console.log('💡 Look for "AI ASSISTANT" in the left sidebar!');
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
