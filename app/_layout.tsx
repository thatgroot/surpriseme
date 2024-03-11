import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="date" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="bestie" />
      <Stack.Screen name="record" />
      <Stack.Screen name="awesome" />
    </Stack>
  );
}

export default Layout;
