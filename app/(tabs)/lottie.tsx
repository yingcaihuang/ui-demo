import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const RemoteLottieUrl = 'https://raw.githubusercontent.com/airbnb/lottie-web/master/demo/gatin/data.json';

export default function LottieScreen() {
  const animation = useRef<LottieView>(null);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // You can control the animation programmatically
    // animation.current?.play();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
       <View style={styles.header}>
            <ThemedText type="title">Lottie Animations</ThemedText>
            <ThemedText style={styles.subtitle}>High performance vector animations</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#fff' }]}>
            <View style={styles.cardHeader}>
                <IconSymbol name="play.circle.fill" size={24} color={theme.tint} />
                <ThemedText type="subtitle">Remote Remote URL</ThemedText>
            </View>
            <View style={styles.lottieContainer}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: 'transparent',
                    }}
                    source={{ uri: RemoteLottieUrl }}
                />
            </View>
            <ThemedText style={styles.description}>
                Loading animation directly from a remote JSON file.
            </ThemedText>
        </View>

        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#fff' }]}>
            <View style={styles.cardHeader}>
                <IconSymbol name="square.and.arrow.down.fill" size={24} color={theme.tint} />
                <ThemedText type="subtitle">Local .lottie File</ThemedText>
            </View>
            <View style={styles.lottieContainer}>
                <LottieView
                    autoPlay
                    loop
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    // @ts-ignore
                    source={require('../../assets/animations/lottie_demo.lottie')}
                />
            </View>
             <ThemedText style={styles.description}>
                Loading a downloaded .lottie file from assets.
            </ThemedText>
        </View>

        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#fff' }]}>
            <View style={styles.cardHeader}>
                <IconSymbol name="arrow.down.circle.fill" size={24} color={theme.tint} />
                <ThemedText type="subtitle">Generic Loader</ThemedText>
            </View>
            <View style={styles.lottieContainer}>
                 {/* Using another sample if available, or just reusing with different speed */}
                <LottieView
                    autoPlay
                    speed={2.0}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                    source={{ uri: RemoteLottieUrl }}
                />
            </View>
             <ThemedText style={styles.description}>
                Same animation playing at 2x speed.
            </ThemedText>
        </View>

         <View style={styles.infoBox}>
            <ThemedText type="defaultSemiBold">How to use custom animations?</ThemedText>
            <ThemedText style={{ marginTop: 8 }}>
                1. Download a .json file from LottieFiles.com{"\n"}
                2. Place it in your project (e.g., assets/animation.json){"\n"}
                3. Import it using: `require('../../assets/animation.json')`
            </ThemedText>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  lottieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  infoBox: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(100,100,100, 0.1)',
  }
});
