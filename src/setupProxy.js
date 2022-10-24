const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "http://ec2-54-238-94-249.ap-northeast-1.compute.amazonaws.com:5000",
      changeOrigin: true,
    })
  );
};
