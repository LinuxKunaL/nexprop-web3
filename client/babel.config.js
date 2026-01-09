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
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@assets": "./src/assets",
            "@providers":"./src/providers",
            "@states":"./src/states",
            "@screen":"./src/app",
            "@theme":"./src/constants"
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
