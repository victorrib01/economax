import { config } from 'dotenv';
config();

export default () => ({
  expo: {
    name: 'economax',
    slug: 'economax',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.victorrib01.economax',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.victorrib01.economax',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      API_URL: process.env.API_URL || null,
      VERSION: process.env.VERSION || null,
      eas: {
        projectId: '54273f39-f950-4494-a6e2-952d2c4e2400',
      },
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/54273f39-f950-4494-a6e2-952d2c4e2400',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
});
