module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@ui": "./src/components/ui",
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@assets": "./src/assets",
            "@providers": "./src/providers",
            "@screen": "./src/app",
            "@theme": "./src/constants",
            "@types_:": "./src/types",
            "@context:": "./src/context",
            "@data:": "./src/data",
            "@feature:": "./src/features",
            "@stores:": "./src/stores",
            "@services:":"./src/services"
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
