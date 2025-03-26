export const environment = {
  production: false,
  appName: 'MiApp Dev',
  apiBaseUrl: 'http://localhost:3000/api', // API local
  oneSignal: {
    appId: 'ONESIGNAL-DEV-APP-ID', // ID de desarrollo
    googleProjectNumber: '1234567890', // Solo para Android
    safariWebId: 'web.onesignal.dev.123', // Solo para iOS web
  },
  enableDebug: true, // Mostrar logs
};
