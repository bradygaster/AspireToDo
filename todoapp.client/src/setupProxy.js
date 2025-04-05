const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.services__todoapi__https__0 || 'https://localhost:7005',
      changeOrigin: true,
      secure: false
    })
  );
};