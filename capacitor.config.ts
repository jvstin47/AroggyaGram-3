import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.aroggyagram.app',
  appName: 'AroggyaGram',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
