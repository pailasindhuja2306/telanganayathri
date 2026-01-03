module.exports = {
  expo: {
    name: "Telangana Yatri",
    slug: "telangana-yatri",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#4C3CC5"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.telanganayatri.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#4C3CC5"
      },
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ],
      package: "com.telanganayatri.app",
      versionCode: 1
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
      build: {
        babel: {
          include: ["@expo/vector-icons"]
        }
      }
    },
    plugins: []
  }
};
