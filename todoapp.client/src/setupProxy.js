const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('Setting up proxy for API requests...');
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.TODO_API_URL || 'https://localhost:7005',
      changeOrigin: true,
      secure: false
    })
  );
  console.log('Proxy setup complete.')
};