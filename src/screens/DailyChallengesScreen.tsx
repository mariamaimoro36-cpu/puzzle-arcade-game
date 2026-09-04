import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useGameEnhancementStore } from '../store/gameEnhancementStore';

export default function DailyChallengesScreen() {
  const {
    dailyChallenges,
    completedChallengesCount,
    totalChallengeRewards,
    initializeDailyChallenges,
    completeDailyChallenge,
  } = useGameEnhancementStore();

  useEffect(() => {
    if (dailyChallenges.length === 0) {
      initializeDailyChallenges();
    }
  }, []);

  const handleClaimReward = (challengeId: string, completed: boolean) => {
    if (!completed) {
      Alert.alert('Not Completed', 'You must complete this challenge to claim the reward.');
      return;
    }

    completeDailyChallenge(challengeId);
    Alert.alert('Reward Claimed!', 'Great job! Keep up your daily challenges! 🎉');
  };

  const renderChallengeItem = ({ item }: { item: any }) => {
    const progress = (item.progress / item.targetScore) * 100;
    const isCompleted = item.progress >= item.targetScore;

    return (
      <View style={[styles.challengeCard, item.completed && styles.claimedCard]}>
        <View style={styles.challengeHeader}>
          <View>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text style={styles.challengeDesc}>{item.description}</Text>
          </View>
          {item.completed && <Text style={styles.claimedBadge}>✓ CLAIMED</Text>}
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: isCompleted ? '#10b981' : '#6366f1',
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {item.progress}/{item.targetScore}
          </Text>
        </View>

        <View style={styles.rewardSection}>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardIcon}>🏆</Text>
            <Text style={styles.rewardAmount}>+{item.reward}</Text>
          </View>
          <TouchableOpacity
            style={[styles.claimButton, item.completed && styles.claimedButton]}
            onPress={() => handleClaimReward(item.id, isCompleted)}
            disabled={item.completed}
          >
            <Text style={styles.claimButtonText}>
              {item.completed ? 'Claimed' : isCompleted ? 'Claim' : 'In Progress'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Challenges Today</Text>
            <Text style={styles.statValue}>{completedChallengesCount}/3</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Rewards</Text>
            <Text style={styles.statValue}>{totalChallengeRewards}</Text>
          </View>
        </View>
      </View>

      {/* Challenges List */}
      <FlatList
        data={dailyChallenges}
        renderItem={renderChallengeItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 Tips</Text>
        <Text style={styles.infoText}>
          • Complete daily challenges to earn extra rewards{'\n'}
          • Challenges reset every day at midnight{'\n'}
          • Combining challenges gives bonus points!
        </Text>
      </View>
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
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  challengeCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  claimedCard: {
    backgroundColor: '#2d3748',
    borderLeftColor: '#10b981',
    opacity: 0.7,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  challengeDesc: {
    fontSize: 12,
    color: '#9ca3af',
  },
  claimedBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1f2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'right',
  },
  rewardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardIcon: {
    fontSize: 20,
  },
  rewardAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fbbf24',
  },
  claimButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  claimedButton: {
    backgroundColor: '#6b7280',
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#374151',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#d1d5db',
    lineHeight: 18,
  },
});
