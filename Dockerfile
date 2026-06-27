# ---- Build stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---- Production stage ----
FROM nginx:1.25-alpine

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Default backend address (override via env var in K8s/Compose)
ENV API_UPSTREAM=localhost:8080

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/healthz || exit 1
