require('dotenv').config();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

const PORT = process.env.PORT || 3005;
const NOTIF_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004';

let orders = []; // en mémoire pour la v1

// Statuts possibles : PENDING, PREPARING, READY, DELIVERING, DELIVERED, CANCELLED

// POST /orders → créer une commande
app.post('/orders', async (req, res) => {
    const { restaurantId, customerId, items, total } = req.body;
    const newOrder = {
        id: uuidv4(),
        restaurantId,
        customerId,
        items,
        total,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    orders.push(newOrder);

    // Envoyer notification au restaurant
    try {
        await axios.post(`${NOTIF_SERVICE_URL}/notifications`, {
            restaurantId,
            type: 'NEW_ORDER',
            title: 'Nouvelle commande',
            message: `Une nouvelle commande a été passée par le client ${customerId}`,
            priority: 'HIGH'
        });
    } catch (err) {
        console.error('Erreur notification:', err.message);
    }

    res.status(201).json(newOrder);
});

// GET /orders/restaurant/:restaurantId → toutes les commandes pour un restaurant
app.get('/orders/restaurant/:restaurantId', (req, res) => {
    const { restaurantId } = req.params;
    const { status } = req.query;
    let result = orders.filter(o => o.restaurantId === restaurantId);
    if (status) result = result.filter(o => o.status === status);
    res.json(result);
});

// GET /orders/customer/:customerId → toutes les commandes d’un client
app.get('/orders/customer/:customerId', (req, res) => {
    const { customerId } = req.params;
    res.json(orders.filter(o => o.customerId === customerId));
});

// PUT /orders/:id/status → mettre à jour le statut
app.put('/orders/:id/status', async (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Commande non trouvée' });
    const { status } = req.body;
    order.status = status;
    order.updatedAt = new Date();

    // Notification au client et/ou restaurant
    try {
        await axios.post(`${NOTIF_SERVICE_URL}/notifications`, {
            restaurantId: order.restaurantId,
            type: 'ORDER_STATUS',
            title: 'Mise à jour commande',
            message: `La commande ${order.id} est maintenant ${status}`,
            priority: 'MEDIUM'
        });
    } catch (err) {
        console.error('Erreur notification:', err.message);
    }

    res.json(order);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', uptime: process.uptime(), timestamp: new Date(), serviceName: 'order-service' });
});

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));