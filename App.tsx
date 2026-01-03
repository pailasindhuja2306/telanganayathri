import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { AppStateProvider } from './src/state/AppState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    ...(Platform.OS === 'web' ? {
      display: 'flex' as any,
      overflow: 'hidden' as any,
      position: 'absolute' as any,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    } : {}),
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <AppStateProvider>
        <AppNavigator />
      </AppStateProvider>
    </GestureHandlerRootView>
  );
}
