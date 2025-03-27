export const environment = {
  production: false,
  appName: 'Plannerstats App',
  apiBaseUrl: 'http://localhost:3000/plannerstats', // API local
  oneSignal: {
    appId: 'ONESIGNAL-DEV-APP-ID', // ID de desarrollo
    googleProjectNumber: '1234567890', // Solo para Android
    safariWebId: 'web.onesignal.dev.123', // Solo para iOS web
  },
  enableDebug: true, // Mostrar logs
};
