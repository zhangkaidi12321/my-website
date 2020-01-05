module.exports = {
  apps: [
    {
      name: 'online',
      script: './src/app.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8081
      }
    }
  ]
}