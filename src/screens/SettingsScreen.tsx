import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useGameStore } from '../store/gameStore';

export default function SettingsScreen({ navigation }: any) {
  const {
    playerName,
    soundEnabled,
    vibrationEnabled,
    darkMode,
    setPlayerName,
    toggleSound,
    toggleVibration,
    toggleDarkMode,
  } = useGameStore();

  const handleResetStats = () => {
    Alert.alert('Reset Statistics', 'Are you sure you want to reset all statistics?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          // Reset logic here
          Alert.alert('Success', 'Statistics have been reset!');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Player Name</Text>
          <Text style={styles.value}>{playerName}</Text>
        </View>
      </View>

      {/* Game Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Settings</Text>

        <View style={styles.settingItem}>
          <Text style={styles.label}>🔊 Sound Effects</Text>
          <Switch value={soundEnabled} onValueChange={toggleSound} />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>📳 Vibration</Text>
          <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>🌙 Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>

      {/* Game Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <TouchableOpacity style={styles.button} onPress={handleResetStats}>
          <Text style={styles.buttonText}>Reset All Statistics</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Build</Text>
          <Text style={styles.value}>2024.01</Text>
        </View>
      </View>

      {/* Social Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Discord</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fbbf24',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#9ca3af',
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    borderRadius: 8,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
