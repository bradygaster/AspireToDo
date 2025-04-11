const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('Setting up to proxy requests to ' + process.env.TODO_API_URL);
  app.use(
    '/api/todos',
    createProxyMiddleware({
      target: process.env.TODO_API_URL + '/api/todos' || 'https://localhost:7005/api/todos',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug' // Add this to see more detailed logs
    })
  );
  console.log('Proxy setup complete.')
};