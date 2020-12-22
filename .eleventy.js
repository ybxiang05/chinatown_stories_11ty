const fs = require("fs");
const util = require("util");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");

module.exports = function (config) {
  // Passthrough copy
  config.addPassthroughCopy("static");
  config.addPassthroughCopy("js");

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404/index.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  // Filters
  config.addFilter("console", function (value) {
    return util.inspect(value);
  });

  // shortcodes
  config.addShortcode("contentImage", function (path, alt, className) {
    return `<img ${className ? 'class="' + className + '"' : ""}
        src="/static/assets/content_images/${path}"
        alt="${alt}"
        >`;
  });

  config.addPlugin(lazyImagesPlugin, {
    imgSelector: ".content img", // custom image selector
  });

  // Collections
  config.addCollection("content", function (collection) {
    return [...collection.getFilteredByGlob("content/**/*.md")].sort(function (
      a,
      b
    ) {
      return a.data.order - b.data.order;
    });
  });

  return {
    dir: {
      includes: "components",
      layouts: "components/layouts",
      output: "dist",
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
