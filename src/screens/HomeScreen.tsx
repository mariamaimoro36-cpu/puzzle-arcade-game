import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import { useGameStore } from '../store/gameStore';

export default function HomeScreen({ navigation }: any) {
  const { playerName, highScore, gamesPlayed } = useGameStore();

  return (
    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎮 Puzzle Arcade</Text>
          <Text style={styles.subtitle}>Master the Challenge</Text>
        </View>

        {/* Player Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.playerName}>{playerName}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{highScore}</Text>
              <Text style={styles.statLabel}>High Score</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{gamesPlayed}</Text>
              <Text style={styles.statLabel}>Games Played</Text>
            </View>
          </View>
        </View>

        {/* Game Modes */}
        <View style={styles.modesSection}>
          <Text style={styles.sectionTitle}>Game Modes</Text>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => navigation.navigate('Game', { mode: 'puzzle' })}
          >
            <Text style={styles.modeIcon}>🧩</Text>
            <View style={styles.modeContent}>
              <Text style={styles.modeName}>Puzzle Mode</Text>
              <Text style={styles.modeDescription}>Solve logic puzzles</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => navigation.navigate('Game', { mode: 'arcade' })}
          >
            <Text style={styles.modeIcon}>⚡</Text>
            <View style={styles.modeContent}>
              <Text style={styles.modeName}>Arcade Mode</Text>
              <Text style={styles.modeDescription}>Fast-paced action</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => navigation.navigate('Game', { mode: 'survival' })}
          >
            <Text style={styles.modeIcon}>💪</Text>
            <View style={styles.modeContent}>
              <Text style={styles.modeName}>Survival Mode</Text>
              <Text style={styles.modeDescription}>Endless challenges</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Leaderboard')}
          >
            <Text style={styles.navIcon}>🏆</Text>
            <Text style={styles.navLabel}>Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.navIcon}>⚙️</Text>
            <Text style={styles.navLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e7ff',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playerName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#e0e7ff',
  },
  modesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  modeButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modeIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  modeContent: {
    flex: 1,
  },
  modeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 12,
    color: '#c7d2fe',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
  },
});
