const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');

module.exports = {
  reactStrictMode: true,
  assetPrefix: '/FFXIV-Rotation-Overlay/',
  basePath: '/FFXIV-Rotation-Overlay',
}

module.exports = withPlugins([
  // [optimizedImages, {
  //   mozjpeg: {
  //     quality: 80,
  //   },
  //   pngquant: {
  //     speed: 3,
  //     strip: true,
  //     verbose: true,
  //   },
  //   // imagesPublicPath: '/FFXIV-Rotation-Overlay/.next/static/images/',
  // }],
  {
    basePath: '/FFXIV-Rotation-Overlay',
    assetPrefix: '/FFXIV-Rotation-Overlay/',
    // env,
  },
]);