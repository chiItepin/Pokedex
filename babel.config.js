module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo'],
      ["@babel/preset-env", { "modules": "auto" }],
    ],
    plugins: [
      ["@babel/plugin-proposal-class-properties"],
    ]
  };
};
