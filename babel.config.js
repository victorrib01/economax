module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // Adicione seus aliases aqui, por exemplo:
            components: './src/components',
            screens: './src/screens',
            infra: './src/infra',
            context: './src/contexts',
            routes: './src/routes',
            theme: './src/theme',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
