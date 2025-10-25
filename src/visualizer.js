// Resonance Music Visualizer - Background pulsing with music
(function() {
  'use strict';

  console.log('🎨 Resonance Visualizer loading...');

  class ResonanceVisualizer {
    constructor() {
      this.audioContext = null;
      this.analyser = null;
      this.audioSource = null;
      this.dataArray = null;
      this.canvas = null;
      this.ctx = null;
      this.animationId = null;
      this.isEnabled = false;
      this.isConnected = false;

      // Default settings
      this.settings = {
        enabled: localStorage.getItem('resonance-visualizer-enabled') === 'true',
        color: localStorage.getItem('resonance-visualizer-color') || '#00E5FF',
        intensity: parseFloat(localStorage.getItem('resonance-visualizer-intensity')) || 0.5,
        mode: localStorage.getItem('resonance-visualizer-mode') || 'pulse' // pulse, waves, particles
      };

      this.presetColors = [
        { name: 'Cyan (Default)', color: '#00E5FF' },
        { name: 'Purple', color: '#B794F6' },
        { name: 'Green', color: '#00FFA3' },
        { name: 'Pink', color: '#FF3B6D' },
        { name: 'Orange', color: '#FFB800' },
        { name: 'Blue', color: '#4D9FFF' },
        { name: 'Red', color: '#FF4757' },
        { name: 'Teal', color: '#1DD1A1' }
      ];

      this.init();
    }

    init() {
      this.createCanvas();
      if (this.settings.enabled) {
        this.connectToAudio();
      }
    }

    createCanvas() {
      // Create background canvas for visualizer
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'resonance-visualizer-canvas';
      this.canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
        opacity: ${this.settings.enabled ? '1' : '0'};
        transition: opacity 0.5s ease;
      `;
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();

      window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    async connectToAudio() {
      if (this.isConnected) return;

      try {
        // Wait for audio element to exist
        await this.waitForAudioElement();

        const audioElement = document.querySelector('audio') || document.querySelector('video');

        if (!audioElement) {
          console.warn('🎨 No audio element found yet, will retry...');
          setTimeout(() => this.connectToAudio(), 2000);
          return;
        }

        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.8;

        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        // Connect audio source
        if (!this.audioSource) {
          this.audioSource = this.audioContext.createMediaElementSource(audioElement);
          this.audioSource.connect(this.analyser);
          this.analyser.connect(this.audioContext.destination);
        }

        this.isConnected = true;
        console.log('✅ Visualizer connected to audio!');

        if (this.settings.enabled) {
          this.start();
        }
      } catch (error) {
        console.error('❌ Failed to connect visualizer to audio:', error);
        // Retry after a delay
        setTimeout(() => this.connectToAudio(), 3000);
      }
    }

    async waitForAudioElement() {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          const audioElement = document.querySelector('audio') || document.querySelector('video');
          if (audioElement) {
            clearInterval(check);
            resolve();
          }
        }, 500);
      });
    }

    start() {
      if (!this.isConnected) {
        this.connectToAudio();
        return;
      }

      this.isEnabled = true;
      this.canvas.style.opacity = '1';

      // Resume audio context if suspended
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.animate();
      console.log('🎨 Visualizer started!');
    }

    stop() {
      this.isEnabled = false;
      this.canvas.style.opacity = '0';

      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log('🎨 Visualizer stopped');
    }

    animate() {
      if (!this.isEnabled) return;

      this.animationId = requestAnimationFrame(() => this.animate());

      // Get audio data
      this.analyser.getByteFrequencyData(this.dataArray);

      // Calculate average frequency (for pulsing)
      const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
      const normalizedAverage = average / 255;

      // Render based on mode
      switch (this.settings.mode) {
        case 'pulse':
          this.renderPulse(normalizedAverage);
          break;
        case 'waves':
          this.renderWaves(normalizedAverage);
          break;
        case 'ambient':
          this.renderAmbient(normalizedAverage);
          break;
        default:
          this.renderPulse(normalizedAverage);
      }
    }

    renderPulse(intensity) {
      const { width, height } = this.canvas;
      const scaledIntensity = intensity * this.settings.intensity;

      // Clear with fade effect
      this.ctx.fillStyle = 'rgba(10, 26, 31, 0.3)';
      this.ctx.fillRect(0, 0, width, height);

      // Create radial gradient that pulses from center
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(width, height) * 0.8;
      const radius = maxRadius * (0.3 + scaledIntensity * 0.7);

      const gradient = this.ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );

      // Parse color and add alpha
      const color = this.hexToRgb(this.settings.color);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * scaledIntensity})`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.08 * scaledIntensity})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, width, height);
    }

    renderWaves(intensity) {
      const { width, height } = this.canvas;

      // Clear with fade
      this.ctx.fillStyle = 'rgba(10, 26, 31, 0.2)';
      this.ctx.fillRect(0, 0, width, height);

      const color = this.hexToRgb(this.settings.color);
      const scaledIntensity = intensity * this.settings.intensity;

      // Draw frequency bars as waves
      const barWidth = width / this.dataArray.length;

      this.ctx.beginPath();
      this.ctx.moveTo(0, height);

      for (let i = 0; i < this.dataArray.length; i++) {
        const barHeight = (this.dataArray[i] / 255) * height * 0.5 * this.settings.intensity;
        const x = i * barWidth;
        const y = height - barHeight;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.lineTo(width, height);
      this.ctx.closePath();

      const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 * scaledIntensity})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }

    renderAmbient(intensity) {
      const { width, height } = this.canvas;
      const scaledIntensity = intensity * this.settings.intensity;

      // Very subtle fade
      this.ctx.fillStyle = 'rgba(10, 26, 31, 0.1)';
      this.ctx.fillRect(0, 0, width, height);

      const color = this.hexToRgb(this.settings.color);

      // Create ambient glow at edges
      const edgeGradient = this.ctx.createLinearGradient(0, 0, 0, height);
      edgeGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * scaledIntensity})`);
      edgeGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      edgeGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * scaledIntensity})`);

      this.ctx.fillStyle = edgeGradient;
      this.ctx.fillRect(0, 0, width, height);
    }

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 229, b: 255 }; // Default cyan
    }

    setColor(color) {
      this.settings.color = color;
      localStorage.setItem('resonance-visualizer-color', color);
    }

    setIntensity(intensity) {
      this.settings.intensity = parseFloat(intensity);
      localStorage.setItem('resonance-visualizer-intensity', intensity);
    }

    setMode(mode) {
      this.settings.mode = mode;
      localStorage.setItem('resonance-visualizer-mode', mode);
    }

    toggle(enabled) {
      this.settings.enabled = enabled;
      localStorage.setItem('resonance-visualizer-enabled', enabled);

      if (enabled) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  // Create global instance
  window.resonanceVisualizer = new ResonanceVisualizer();

  console.log('✅ Resonance Visualizer ready!');
})();
