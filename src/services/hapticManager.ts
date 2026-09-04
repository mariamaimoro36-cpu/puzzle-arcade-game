/**
 * Haptic Feedback Manager
 * Manages device vibration and haptic feedback
 */

import { Vibration } from 'react-native';

interface HapticPattern {
  name: string;
  pattern: number[];
}

class HapticManager {
  private patterns: Map<string, HapticPattern> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    this.initializePatterns();
  }

  private initializePatterns(): void {
    this.patterns.set('tap', { name: 'tap', pattern: [50] });
    this.patterns.set('score', { name: 'score', pattern: [30, 20, 30] });
    this.patterns.set('success', { name: 'success', pattern: [50, 30, 50] });
    this.patterns.set('error', { name: 'error', pattern: [100, 50, 100] });
    this.patterns.set('levelup', { name: 'levelup', pattern: [100, 100, 100] });
  }

  public trigger(patternName: string): void {
    if (!this.isEnabled) return;

    const pattern = this.patterns.get(patternName);
    if (pattern) {
      Vibration.vibrate(pattern);
      console.log(`[Haptics] Triggered: ${patternName}`);
    } else {
      console.warn(`[Haptics] Pattern not found: ${patternName}`);
    }
  }

  public customVibrate(pattern: number | number[], repeat: number = 0): void {
    if (!this.isEnabled) return;

    Vibration.vibrate(pattern, repeat === 0);
    console.log(`[Haptics] Custom vibration triggered`);
  }

  public stop(): void {
    Vibration.cancel();
    console.log(`[Haptics] Vibration stopped`);
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    console.log(`[Haptics] Haptics ${enabled ? 'enabled' : 'disabled'}`);
  }

  public isHapticEnabled(): boolean {
    return this.isEnabled;
  }

  public getPatterns(): string[] {
    return Array.from(this.patterns.keys());
  }
}

export const hapticManager = new HapticManager();
