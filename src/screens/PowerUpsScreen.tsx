import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useGameEnhancementStore } from '../store/gameEnhancementStore';

export default function PowerUpsScreen() {
  const { powerUpInventory, activatePowerUp, activePowerUps, deactivatePowerUp } =
    useGameEnhancementStore();

  const POWER_UP_DATA = [
    {
      id: 'multiplier_2x',
      name: '2x Score Multiplier',
      icon: '×2',
      description: 'Double your score for 30 seconds',
      rarity: 'common',
      duration: '30s',
    },
    {
      id: 'multiplier_3x',
      name: '3x Score Multiplier',
      icon: '×3',
      description: 'Triple your score for 15 seconds',
      rarity: 'rare',
      duration: '15s',
    },
    {
      id: 'shield',
      name: 'Shield',
      icon: '🛡️',
      description: 'Protect against one mistake for 20 seconds',
      rarity: 'rare',
      duration: '20s',
    },
    {
      id: 'slowtime',
      name: 'Slow Time',
      icon: '⏱️',
      description: 'Slow down time by 50% for 25 seconds',
      rarity: 'epic',
      duration: '25s',
    },
    {
      id: 'bomb',
      name: 'Bomb Blast',
      icon: '💣',
      description: 'Instantly earn 500 points',
      rarity: 'epic',
      duration: '5s',
    },
  ];

  const handleActivatePowerUp = (powerUpId: string) => {
    const count = powerUpInventory[powerUpId] || 0;
    if (count <= 0) {
      Alert.alert('No Stock', `You don't have any ${powerUpId} power-ups left!`);
      return;
    }

    activatePowerUp(powerUpId);
    Alert.alert('Activated!', `${powerUpId} power-up is now active!`);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '#10b981';
      case 'rare':
        return '#6366f1';
      case 'epic':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  const renderPowerUpItem = ({ item }: { item: any }) => {
    const count = powerUpInventory[item.id] || 0;
    const isActive = activePowerUps.some((p) => p.id === item.id);

    return (
      <View style={[styles.powerUpCard, isActive && styles.activeCard]}>
        <View style={styles.cardContent}>
          <View
            style={[styles.iconContainer, { backgroundColor: getRarityColor(item.rarity) }]}
          >
            <Text style={styles.icon}>{item.icon}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.powerUpName}>{item.name}</Text>
            <Text style={styles.powerUpDesc}>{item.description}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Duration</Text>
                <Text style={styles.metaValue}>{item.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Rarity</Text>
                <Text style={[styles.metaValue, { color: getRarityColor(item.rarity) }]}>
                  {item.rarity.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <View style={styles.countBox}>
            <Text style={styles.countLabel}>Stock</Text>
            <Text style={[styles.countValue, count === 0 && styles.emptyCount]}>{count}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.activateButton,
              count === 0 && styles.disabledButton,
              isActive && styles.activeButton,
            ]}
            onPress={() => handleActivatePowerUp(item.id)}
            disabled={count === 0 || isActive}
          >
            <Text style={styles.activateButtonText}>
              {isActive ? 'ACTIVE' : count === 0 ? 'OUT' : 'USE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const totalPowerUps = Object.values(powerUpInventory).reduce((a, b) => a + b, 0);

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Power-ups</Text>
            <Text style={styles.statValue}>{totalPowerUps}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Active</Text>
            <Text style={styles.statValue}>{activePowerUps.length}</Text>
          </View>
        </View>
      </View>

      {/* Power-ups List */}
      <FlatList
        data={POWER_UP_DATA}
        renderItem={renderPowerUpItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Guide Section */}
      <View style={styles.guideSection}>
        <Text style={styles.guideTitle}>🎯 How to Use Power-ups</Text>
        <Text style={styles.guideText}>
          • Activate power-ups during gameplay to boost your score{'\n'}
          • Each power-up has a limited duration{'\n'}
          • Stack multiple power-ups for maximum effect{'\n'}
          • Earn more power-ups by completing challenges!
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
  powerUpCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeCard: {
    backgroundColor: '#2d3748',
    borderColor: '#fbbf24',
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 32,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  powerUpName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  powerUpDesc: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#d1d5db',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#4b5563',
  },
  countBox: {
    alignItems: 'center',
  },
  countLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 2,
  },
  countValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  emptyCount: {
    color: '#6b7280',
  },
  activateButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: '#fbbf24',
  },
  disabledButton: {
    backgroundColor: '#6b7280',
  },
  activateButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1f2937',
  },
  guideSection: {
    backgroundColor: '#374151',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 12,
    color: '#d1d5db',
    lineHeight: 18,
  },
});
