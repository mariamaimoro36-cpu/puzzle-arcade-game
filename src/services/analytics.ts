import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameEvent {
  eventType: 'game_start' | 'game_end' | 'score_update' | 'level_complete' | 'error';
  timestamp: number;
  playerName: string;
  score?: number;
  level?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

interface GameMetrics {
  sessionId: string;
  startTime: number;
  eventsCount: number;
  totalScore: number;
  averageScorePerGame: number;
  errorCount: number;
}

class AnalyticsService {
  private apiClient: AxiosInstance | null = null;
  private sessionId: string;
  private eventQueue: GameEvent[] = [];
  private metricsData: GameMetrics;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.metricsData = {
      sessionId: this.sessionId,
      startTime: Date.now(),
      eventsCount: 0,
      totalScore: 0,
      averageScorePerGame: 0,
      errorCount: 0,
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public initialize(apiUrl?: string): void {
    if (apiUrl) {
      this.apiClient = axios.create({
        baseURL: apiUrl,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Analytics service initialized');
    } else {
      console.warn('Analytics API URL not provided - using local storage only');
    }
  }

  public logEvent(event: Omit<GameEvent, 'timestamp'>): void {
    const fullEvent: GameEvent = {
      ...event,
      timestamp: Date.now(),
    };

    this.eventQueue.push(fullEvent);
    this.metricsData.eventsCount++;

    if (event.eventType === 'error') {
      this.metricsData.errorCount++;
    }

    if (event.score) {
      this.metricsData.totalScore += event.score;
      this.metricsData.averageScorePerGame = this.metricsData.totalScore / this.metricsData.eventsCount;
    }

    console.log(`[Analytics] Event logged: ${event.eventType}`, fullEvent);

    // Send to API if available and queue is large enough
    if (this.eventQueue.length >= 5) {
      this.flushEvents();
    }
  }

  public async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) {
      return;
    }

    try {
      if (this.apiClient) {
        await this.apiClient.post('/events', {
          sessionId: this.sessionId,
          events: this.eventQueue,
          metrics: this.metricsData,
        });
        console.log(`[Analytics] Flushed ${this.eventQueue.length} events to server`);
      } else {
        // Store locally if no API
        await this.storeEventsLocally(this.eventQueue);
        console.log(`[Analytics] Stored ${this.eventQueue.length} events locally`);
      }
      this.eventQueue = [];
    } catch (error) {
      console.error('[Analytics] Failed to flush events:', error);
      // Events remain in queue for retry
    }
  }

  private async storeEventsLocally(events: GameEvent[]): Promise<void> {
    try {
      const existing = await AsyncStorage.getItem('analytics_events');
      const allEvents = existing ? JSON.parse(existing) : [];
      const updated = [...allEvents, ...events];
      await AsyncStorage.setItem('analytics_events', JSON.stringify(updated));
    } catch (error) {
      console.error('[Analytics] Failed to store events locally:', error);
    }
  }

  public getMetrics(): GameMetrics {
    return this.metricsData;
  }

  public getSessionId(): string {
    return this.sessionId;
  }
}

export const analyticsService = new AnalyticsService();

export const initializeAnalytics = (apiUrl?: string): void => {
  analyticsService.initialize(apiUrl || process.env.REACT_APP_ANALYTICS_API_URL);
};

// Helper functions for logging common events
export const logGameStart = (playerName: string, level: number): void => {
  analyticsService.logEvent({
    eventType: 'game_start',
    playerName,
    level,
  });
};

export const logGameEnd = (playerName: string, score: number, duration: number, level: number): void => {
  analyticsService.logEvent({
    eventType: 'game_end',
    playerName,
    score,
    duration,
    level,
  });
};

export const logScoreUpdate = (playerName: string, score: number, level: number): void => {
  analyticsService.logEvent({
    eventType: 'score_update',
    playerName,
    score,
    level,
  });
};

export const logLevelComplete = (playerName: string, level: number, score: number): void => {
  analyticsService.logEvent({
    eventType: 'level_complete',
    playerName,
    level,
    score,
  });
};

export const logError = (playerName: string, error: Error, metadata?: Record<string, any>): void => {
  analyticsService.logEvent({
    eventType: 'error',
    playerName,
    metadata: {
      ...metadata,
      errorMessage: error.message,
      errorStack: error.stack,
    },
  });
};
