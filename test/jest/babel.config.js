module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: false },
    ],
    '@babel/plugin-transform-runtime',
  ],
};
