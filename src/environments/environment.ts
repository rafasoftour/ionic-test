export const environment = {
  production: false,
  appName: 'Plannerstats App',
  version: '1.0.0',
  apiBaseUrl: 'http://localhost:3000/plannerstats', // API local
  oneSignal: {
    appId: '41a4d1d3-1ce0-48a8-a879-cbd9c3a3bc3e', // ID de desarrollo
    googleProjectNumber: '1234567890', // Solo para Android
    safariWebId: 'web.onesignal.dev.123', // Solo para iOS web
  },
  enableDebug: true, // Mostrar logs
};
