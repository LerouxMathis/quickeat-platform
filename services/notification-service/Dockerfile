FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
USER appuser
ENV NODE_ENV=production
ENV SERVICE_NAME=notification-service
ENV PORT=3004
EXPOSE 3004
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD curl -f http://localhost:3004/health || exit 1
CMD ["node", "src/app.js"]