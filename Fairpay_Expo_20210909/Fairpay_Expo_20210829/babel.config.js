module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            i18n: "./i18n",
            utils: "./utils",
            apollo: "./apollo",
            screens: "./screens",
            navigation: "./navigation",
            hooks: "./hooks",
            configs: "./configs",
            components: "./components",
            assets: "./assets",
            constants: "./constants",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
