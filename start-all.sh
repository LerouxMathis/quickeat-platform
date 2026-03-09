#!/bin/bash
# start-all.sh
# Script pour lancer tous les services en prod sur Linux

echo "Construction des images..."
docker-compose -f docker-compose.prod.yml build

echo "Démarrage des services..."
docker-compose -f docker-compose.prod.yml up -d

echo "Vérification des containers..."
docker ps

echo "Tous les services QuickEat sont démarrés !"