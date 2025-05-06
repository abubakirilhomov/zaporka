/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    '@tailwindcss/line-clamp': {}, // Подключение плагина
  },
};

export default config;
