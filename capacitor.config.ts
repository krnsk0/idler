import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.planetfall.app',
  appName: 'vite-idler',
  webDir: 'dist',
  bundledWebRuntime: false,
  // this will need to be removed when shipping to ios
  "server": {
    "url": "http://localhost:5175/?debug=true",
    "cleartext": true
  },
};

export default config;
