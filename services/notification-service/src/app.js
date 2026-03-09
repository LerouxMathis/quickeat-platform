require('dotenv').config();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

const PORT = process.env.PORT || 3004;

let notifications = []; // en mémoire pour la v1

// POST /notifications → créer une notification
app.post('/notifications', (req, res) => {
    const { restaurantId, type, title, message, priority } = req.body;
    const newNotif = {
        id: uuidv4(),
        restaurantId,
        type,
        title,
        message,
        priority,
        read: false,
        createdAt: new Date()
    };
    notifications.push(newNotif);
    res.status(201).json(newNotif);
});

// GET /notifications/restaurant/:restaurantId → lister notifications
app.get('/notifications/restaurant/:restaurantId', (req, res) => {
    const { restaurantId } = req.params;
    const { read } = req.query;
    let result = notifications.filter(n => n.restaurantId === restaurantId);
    if (read !== undefined) {
        result = result.filter(n => n.read.toString() === read);
    }
    res.json(result);
});

// PUT /notifications/:id/read → marquer comme lue
app.put('/notifications/:id/read', (req, res) => {
    const notif = notifications.find(n => n.id === req.params.id);
    if (!notif) return res.status(404).json({ error: 'Notification non trouvée' });
    notif.read = true;
    res.json(notif);
});

// GET /notifications/restaurant/:restaurantId/unread/count
app.get('/notifications/restaurant/:restaurantId/unread/count', (req, res) => {
    const { restaurantId } = req.params;
    const count = notifications.filter(n => n.restaurantId === restaurantId && !n.read).length;
    res.json({ unreadCount: count });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', uptime: process.uptime(), timestamp: new Date(), serviceName: 'notification-service' });
});

app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));