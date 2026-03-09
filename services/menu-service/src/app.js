require('dotenv').config();
const express = require('express');
const app = express();
const log = require('./utils/logger');
const dishesRouter = require('./routes/dishes');
const client = require('prom-client');

// Metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5]
});

app.use(express.json());

// Middleware pour metrics
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
});

// Routes
app.use('/menus', dishesRouter);
app.use('/dishes', dishesRouter);

// /health
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: process.env.SERVICE_NAME || 'menu-service',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dishesLoaded: require('./services/menuService').dishes.length
  });
});

// /metrics pour Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => log('info', `Menu Service running on port ${PORT}`));