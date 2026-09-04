# 🎮 Puzzle Arcade Game

A mobile puzzle and action-arcade game built with React Native and Expo, featuring comprehensive monitoring and analytics capabilities.

## 📱 Features

### Game Modes
- **🧩 Puzzle Mode**: Logic-based challenges to test your problem-solving skills
- **⚡ Arcade Mode**: Fast-paced action gameplay with quick reactions
- **💪 Survival Mode**: Endless challenges to see how long you can last

### Analytics & Monitoring
- Real-time event tracking (game start, end, score updates, level completion)
- Player performance metrics and statistics
- Session-based analytics with unique session IDs
- Local storage for offline event queuing
- Server-side event flushing for analytics API integration

### User Features
- Player statistics tracking (high scores, games played, playtime)
- Global leaderboard system
- Game settings (sound, vibration, theme)
- Persistent data storage using AsyncStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mariamaimoro36-cpu/puzzle-arcade-game.git
cd puzzle-arcade-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file from the template:
```bash
cp .env.example .env
```

4. Update `.env` with your analytics API configuration (optional):
```env
REACT_APP_ANALYTICS_API_URL=https://your-analytics-api.com
REACT_APP_ANALYTICS_API_KEY=your_api_key_here
```

### Running the App

**Web:**
```bash
npm run web
```

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Development:**
```bash
npm start
```

## 📊 Project Structure

```
puzzle-arcade-game/
├── src/
│   ├── App.tsx                 # Main app component with navigation
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Home screen with game mode selection
│   │   ├── GameScreen.tsx      # Core game screen with gameplay
│   │   ├── LeaderboardScreen.tsx # Global leaderboard display
│   │   └── SettingsScreen.tsx  # Game settings and preferences
│   ├── services/
│   │   └── analytics.ts        # Analytics service for game monitoring
│   └── store/
│       └── gameStore.ts        # Zustand store for game state
├── package.json
├── app.json                    # Expo configuration
├── .env.example               # Environment variables template
└── README.md
```

## 🎯 Analytics System

### Events Tracked

The analytics service automatically tracks the following events:

1. **game_start** - When a player starts a new game
2. **game_end** - When a game session ends
3. **score_update** - When player score changes
4. **level_complete** - When a level is completed
5. **error** - When errors occur during gameplay

### Event Data Structure

```typescript
interface GameEvent {
  eventType: 'game_start' | 'game_end' | 'score_update' | 'level_complete' | 'error';
  timestamp: number;
  playerName: string;
  score?: number;
  level?: number;
  duration?: number;
  metadata?: Record<string, any>;
}
```

### Session Metrics

```typescript
interface GameMetrics {
  sessionId: string;
  startTime: number;
  eventsCount: number;
  totalScore: number;
  averageScorePerGame: number;
  errorCount: number;
}
```

### Using Analytics

Import and use the analytics service in your components:

```typescript
import { 
  logGameStart, 
  logGameEnd, 
  logScoreUpdate,
  logLevelComplete,
  logError,
  analyticsService 
} from './services/analytics';

// Log game start
logGameStart('PlayerName', 1);

// Log score update
logScoreUpdate('PlayerName', 150, 1);

// Log game end
logGameEnd('PlayerName', 500, 60, 1);

// Manually flush events to server
await analyticsService.flushEvents();

// Get current session metrics
const metrics = analyticsService.getMetrics();
console.log(metrics);
```

## 🎮 Game Modes Detail

### Puzzle Mode
- Tap numbers in sequential order
- Build up points by completing patterns
- Increase difficulty with each level

### Arcade Mode
- Rapid tap challenges
- Accumulate points quickly
- Test your reaction time

### Survival Mode
- Continuous gameplay with increasing difficulty
- Survive as long as possible
- Earn points for every successful action

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_ANALYTICS_API_URL` | Analytics backend API URL | None (local storage only) |
| `REACT_APP_ANALYTICS_API_KEY` | API key for authentication | None |
| `REACT_APP_ENABLE_DEBUG` | Enable debug logging | false |
| `REACT_APP_GAME_VERSION` | Game version string | 1.0.0 |

## 📦 State Management

This project uses **Zustand** for state management. The game store includes:

- Player statistics (score, high score, games played)
- Current game state (level, score, active status)
- User settings (sound, vibration, theme)
- Persistent storage using AsyncStorage

## 🧪 Testing

```bash
npm run test
```

## 🔍 Linting

```bash
npm run lint
```

## 📈 Performance Monitoring

The game automatically monitors:
- Event count per session
- Average score per game
- Error frequency
- Session duration
- Frame rate and memory usage (via React Native profiling)

## 🚀 Deployment

### Building for Production

**iOS:**
```bash
npm run build
# Select iOS when prompted
```

**Android:**
```bash
npm run build
# Select Android when prompted
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues, questions, or suggestions, please create an issue on GitHub.

## 🎯 Roadmap

- [ ] Multiplayer mode
- [ ] In-game power-ups
- [ ] Social sharing features
- [ ] Cloud save synchronization
- [ ] Push notifications
- [ ] Custom themes
- [ ] Achievements system
- [ ] In-app purchases

## 📞 Contact

- GitHub: [@mariamaimoro36-cpu](https://github.com/mariamaimoro36-cpu)
- Repository: [puzzle-arcade-game](https://github.com/mariamaimoro36-cpu/puzzle-arcade-game)

---

Happy Gaming! 🎮✨
