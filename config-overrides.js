const { addWebpackAlias, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@pages": path.resolve(__dirname, "src/pages"),
  })
);
