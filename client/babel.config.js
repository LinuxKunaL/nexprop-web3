module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind", unstable_transformImportMeta: true },
      ],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@ui": "./src/components/ui",
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@assets": "./src/assets",
            "@providers": "./src/providers",
            "@screen": "./src/app",
            "@constants": "./src/constants",
            "@types_": "./src/types",
            "@context": "./src/context",
            "@data": "./src/data",
            "@features": "./src/features",
            "@stores": "./src/stores",
            "@services": "./src/services",
            "@abi": "./src/abi",
            "@config": "./src/config.ts",
            "@api": "./src/api",
            "@wallet": "./src/wallet",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};
