/**
 * Sound Effects and Audio Management
 * Manages game sounds and audio effects
 */

interface SoundEffect {
  name: string;
  file: string;
  volume: number;
}

class AudioManager {
  private sounds: Map<string, SoundEffect> = new Map();
  private isMuted: boolean = false;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds(): void {
    this.sounds.set('tap', { name: 'tap', file: 'sounds/tap.mp3', volume: 0.3 });
    this.sounds.set('score', { name: 'score', file: 'sounds/score.mp3', volume: 0.5 });
    this.sounds.set('levelup', { name: 'levelup', file: 'sounds/levelup.mp3', volume: 0.7 });
    this.sounds.set('gameover', { name: 'gameover', file: 'sounds/gameover.mp3', volume: 0.6 });
    this.sounds.set('success', { name: 'success', file: 'sounds/success.mp3', volume: 0.4 });
    this.sounds.set('error', { name: 'error', file: 'sounds/error.mp3', volume: 0.4 });
  }

  public playSound(soundName: string): void {
    if (this.isMuted) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      console.log(`[Audio] Playing sound: ${sound.name} (volume: ${sound.volume})`);
      // Audio playback would be implemented here with React Native Sound or Expo Audio
    } else {
      console.warn(`[Audio] Sound not found: ${soundName}`);
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    console.log(`[Audio] Audio ${muted ? 'muted' : 'unmuted'}`);
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public setSoundVolume(soundName: string, volume: number): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.volume = Math.max(0, Math.min(1, volume));
      console.log(`[Audio] Volume set for ${soundName}: ${sound.volume}`);
    }
  }

  public getSounds(): string[] {
    return Array.from(this.sounds.keys());
  }
}

export const audioManager = new AudioManager();
