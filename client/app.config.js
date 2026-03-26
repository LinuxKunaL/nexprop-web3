import "dotenv/config";

export default {
  expo: {
    name: "nexprop",
    slug: "nexprop",
    version: "1.0.0",
    orientation: "portrait",
    icon: "src/assets/images/logos/icon.png",
    scheme: "nexprop",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#14B8A6",
    },
    router: {
      appRoot: "src/app",
    },
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.giga.nexprop",
    },
    android: {
      icon: "src/assets/images/logos/icon.png",
      adaptiveIcon: {
        foregroundImage: "src/assets/images/logos/icon.png",
      },
      package: "com.giga.nexprop",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: ["INTERNET", "ACCESS_FINE_LOCATION"],
      softwareKeyboardLayoutMode: "resize",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      output: "static",
      favicon: "src/assets/images/logos/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "src/assets/images/logos/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
