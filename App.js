import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Platform } from 'react-native';
// My Changes Begin here
import { PermissionsAndroid } from 'react-native';
import { Alert, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// My Changes End here
export default function App() {
  const opacity = useSharedValue(1);

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    // My changes begin here
    const getToken = async() => {
      const token = await messaging().getToken();
      console.log("FCM Token is: ", token);
    }
    useEffect(() => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      getToken();
    })
    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Alert.alert('Foreground Notification', JSON.stringify(remoteMessage.notification));
        const { title, body} = remoteMessage.notification || {};
        if (title || body) {
          Alert.alert(
            title || 'Notification',
            body || '',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
            { cancelable: true }
          );
        }
      });

      return unsubscribe;
    }, []);
  }
  // My Changes end here
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