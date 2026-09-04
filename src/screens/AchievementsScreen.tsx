import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useGameEnhancementStore } from '../store/gameEnhancementStore';

export default function AchievementsScreen() {
  const { achievements, totalAchievementPoints, unlockedAchievementsCount } =
    useGameEnhancementStore();

  const renderAchievementItem = ({ item }: { item: any }) => (
    <View style={[styles.achievementCard, item.unlocked && styles.unlockedCard]}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[styles.achievementName, !item.unlocked && styles.lockedText]}>
          {item.name}
        </Text>
        <Text style={styles.achievementDesc}>{item.description}</Text>
        <View style={styles.pointsBox}>
          <Text style={styles.points}>+{item.points} points</Text>
        </View>
      </View>
      {item.unlocked && <Text style={styles.unlockedBadge}>✓</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Achievements</Text>
            <Text style={styles.statValue}>
              {unlockedAchievementsCount}/{achievements.length}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Points</Text>
            <Text style={styles.statValue}>{totalAchievementPoints}</Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(unlockedAchievementsCount / achievements.length) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round((unlockedAchievementsCount / achievements.length) * 100)}% Complete
        </Text>
      </View>

      {/* Achievements List */}
      <FlatList
        data={achievements}
        renderItem={renderAchievementItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
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
  header: {
    backgroundColor: '#374151',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#4b5563',
    marginHorizontal: 16,
  },
  progressSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6b7280',
    opacity: 0.6,
  },
  unlockedCard: {
    borderLeftColor: '#fbbf24',
    opacity: 1,
    backgroundColor: '#2d3748',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 32,
  },
  achievementInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  lockedText: {
    color: '#9ca3af',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  pointsBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#6366f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  points: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  unlockedBadge: {
    fontSize: 24,
    color: '#10b981',
    marginLeft: 8,
  },
});
