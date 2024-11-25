/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

module.exports = {
  alias: {
    "@": path.resolve(__dirname, "source"),
  },
  extensions: [".js", ".ts", ".jsx", ".tsx"],
};
