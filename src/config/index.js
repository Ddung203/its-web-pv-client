const currentEnvironment = import.meta.env.VITE_NODE_ENV || "development";

const defaultConfig = {};

const environmentConfig = {
  development: {
    X_API_KEY: import.meta.env.VITE_X_API_KEY_SECRET || "ITS-DDung203",
    API_URL: import.meta.env.VITE_API_URL,
    firebaseConfig: {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    },
  },
  production: {
    X_API_KEY: import.meta.env.VITE_X_API_KEY_SECRET,
    API_URL: import.meta.env.VITE_API_URL,
    firebaseConfig: {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    },
  },
};

if (!environmentConfig[currentEnvironment]) {
  console.error(
    `Environment configuration for "${currentEnvironment}" is missing`
  );
}

const configs = {
  ...defaultConfig,
  ...environmentConfig[currentEnvironment],
};

export const { X_API_KEY, API_URL, firebaseConfig } = configs;
