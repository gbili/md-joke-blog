module.exports = function(api) {
  api.cache(false);
  const presets = [
    ["@babel/preset-env", {
        targets: {
          node: "current",
        },
        modules: "commonjs",
    },],
  ];
  const plugins = [
    ["@babel/transform-runtime", {
        regenerator: true,
        polyfills: false,
    },],
  ];
  return { presets, plugins };
};
