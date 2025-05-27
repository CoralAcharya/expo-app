import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Loop fade animation: 1 -> 0 -> 1 ...
    opacity.value = withRepeat(
      withTiming(0, { duration: 1000 }),
      -1, // infinite
      true // reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>This text is written by me!</Text>
      <Animated.Text style={[styles.animatedText, animatedStyle]}>
        This text is written by me!
      </Animated.Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    fontSize: 18,
    marginTop: 10,
  },
});