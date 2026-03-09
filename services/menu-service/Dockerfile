# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build || echo "no build step"

# Stage 2: Production
FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
USER appuser
ENV NODE_ENV=production
ENV SERVICE_NAME=menu-service
ENV PORT=3002
ENV RESTAURANT_SERVICE_URL=http://restaurant-service:3001
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:3002/health || exit 1
CMD ["node", "src/app.js"]