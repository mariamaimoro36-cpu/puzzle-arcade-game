import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  gamesPlayed: number;
  date: string;
}

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated leaderboard data
    setTimeout(() => {
      setLeaderboard([
        {
          rank: 1,
          name: 'ProGamer23',
          score: 4850,
          gamesPlayed: 42,
          date: '2024-01-15',
        },
        {
          rank: 2,
          name: 'PuzzleMaster',
          score: 4620,
          gamesPlayed: 38,
          date: '2024-01-14',
        },
        {
          rank: 3,
          name: 'ArcadeKing',
          score: 4120,
          gamesPlayed: 35,
          date: '2024-01-13',
        },
        {
          rank: 4,
          name: 'Player',
          score: 3850,
          gamesPlayed: 28,
          date: '2024-01-12',
        },
        {
          rank: 5,
          name: 'GameChamp',
          score: 3420,
          gamesPlayed: 25,
          date: '2024-01-11',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const renderLeaderboardEntry = ({ item }: { item: LeaderboardEntry }) => (
    <View style={[styles.entry, item.rank <= 3 && styles.topEntry]}>
      <View style={styles.rankBox}>
        <Text style={styles.rankText}>
          {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : item.rank}
        </Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerStats}>{item.gamesPlayed} games • {item.date}</Text>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>{item.score}</Text>
        <Text style={styles.scoreLabel}>pts</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Global Leaderboard</Text>
        <Text style={styles.subtitle}>Top Players This Month</Text>
      </View>

      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardEntry}
        keyExtractor={(item) => item.rank.toString()}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  topEntry: {
    backgroundColor: '#1f2937',
    borderLeftColor: '#fbbf24',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  rankBox: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 28,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  playerStats: {
    fontSize: 12,
    color: '#9ca3af',
  },
  scoreBox: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
});
