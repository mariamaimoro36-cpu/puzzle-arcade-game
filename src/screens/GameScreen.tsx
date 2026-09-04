import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { logGameStart, logGameEnd, logScoreUpdate } from '../services/analytics';

export default function GameScreen({ route, navigation }: any) {
  const { mode = 'puzzle' } = route.params || {};
  const { playerName, currentScore, currentLevel, startGame, updateScore, endGame } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    // Start game
    startGame(1);
    logGameStart(playerName, 1);
  }, []);

  useEffect(() => {
    if (gameEnded || timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameEnded]);

  useEffect(() => {
    if (timeLeft === 0 && !gameEnded) {
      handleGameEnd();
    }
  }, [timeLeft]);

  const handleScore = (points: number) => {
    updateScore(points);
    logScoreUpdate(playerName, currentScore + points, currentLevel);
  };

  const handleGameEnd = () => {
    setGameEnded(true);
    endGame(currentScore);
    logGameEnd(playerName, currentScore, 60 - timeLeft, currentLevel);

    Alert.alert(
      'Game Over!',
      `Final Score: ${currentScore}\n\nWell played! 🎉`,
      [
        {
          text: 'Play Again',
          onPress: () => navigation.pop(),
        },
        {
          text: 'Home',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const renderGameContent = () => {
    switch (mode) {
      case 'puzzle':
        return (
          <View style={styles.gameContent}>
            <Text style={styles.gameTitle}>Puzzle Challenge</Text>
            <View style={styles.puzzleGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={styles.puzzleButton}
                  onPress={() => handleScore(10 + num * 5)}
                >
                  <Text style={styles.puzzleText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.instruction}>Tap numbers in order!</Text>
          </View>
        );

      case 'arcade':
        return (
          <View style={styles.gameContent}>
            <Text style={styles.gameTitle}>Arcade Action</Text>
            <View style={styles.arcadeBox}>
              <TouchableOpacity
                style={styles.arcadeButton}
                onPress={() => handleScore(25)}
              >
                <Text style={styles.arcadeButtonText}>TAP! 🎯</Text>
              </TouchableOpacity>
              <Text style={styles.instruction}>Tap as fast as you can!</Text>
            </View>
          </View>
        );

      case 'survival':
        return (
          <View style={styles.gameContent}>
            <Text style={styles.gameTitle}>Survival Mode</Text>
            <View style={styles.survivalBox}>
              <TouchableOpacity
                style={styles.survivalButton}
                onPress={() => handleScore(15)}
              >
                <Text style={styles.survivalButtonText}>+15</Text>
              </TouchableOpacity>
              <Text style={styles.instruction}>Keep surviving!</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.label}>Score</Text>
            <Text style={styles.value}>{currentScore}</Text>
          </View>
          <View>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{timeLeft}s</Text>
          </View>
          <View>
            <Text style={styles.label}>Level</Text>
            <Text style={styles.value}>{currentLevel}</Text>
          </View>
        </View>
      </View>

      {/* Game Content */}
      {renderGameContent()}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.endButton]}
          onPress={handleGameEnd}
        >
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  gameContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  puzzleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  puzzleButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  puzzleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  arcadeBox: {
    alignItems: 'center',
  },
  arcadeButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 40,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginBottom: 24,
  },
  arcadeButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  survivalBox: {
    alignItems: 'center',
  },
  survivalButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 50,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginBottom: 24,
  },
  survivalButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  instruction: {
    fontSize: 14,
    color: '#d1d5db',
    marginTop: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
