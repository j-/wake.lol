/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    // #region https://www.dmitry-ishkov.com/2022/03/inlined-images-in-nextjs.html
    const imageLoaderRule = config.module.rules.find(
      (rule) => rule.loader === 'next-image-loader'
    );

    imageLoaderRule.exclude = /\.inline\.(png|jpg|gif|svg)$/i;

    config.module.rules.push({
      test: /\.inline\.(png|jpg|gif)$/i,
      use: [
        { loader: 'url-loader' },
      ],
    });

    config.module.rules.push({
      test: /\.inline\.svg$/i,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64',
          },
        },
      ],
    });
    // #endregion

    return config;
  },
};

module.exports = nextConfig;
