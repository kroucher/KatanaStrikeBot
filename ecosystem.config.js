module.exports = {
  apps : [{
    name: "KatanaStrikeBot",
    script: "./index.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
