// Connect plugins to the file
const postcss_import = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // Connect plugins to PostCSS
  plugins: [
    postcss_import,
    autoprefixer,
    cssnano({ preset: "default" }), // set default minification settings
  ],
};