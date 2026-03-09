const log = (level, message, extra = {}) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    service: process.env.SERVICE_NAME || 'menu-service',
    ...extra,
    message
  }));
};

module.exports = log;