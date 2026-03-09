# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci --omit=dev

# Copier le code
COPY . .

# Compiler TypeScript si besoin
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Changer l'utilisateur
USER appuser

# Variables d'environnement
ENV NODE_ENV=production
ENV SERVICE_NAME=restaurant-service
ENV PORT=3001

# Exposer le port
EXPOSE 3001

# Healthcheck simple
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD curl -f http://localhost:3001/health || exit 1

# Lancer l'application
CMD ["node", "dist/app.js"]