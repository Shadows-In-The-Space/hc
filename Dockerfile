# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /build/frontend
COPY hc-main/package.json hc-main/package-lock.json* ./
RUN npm install
COPY hc-main/ ./
ENV VITE_API_URL=""
RUN npm run build

# Stage 2: Build Backend
FROM node:20-alpine AS backend-build
RUN apk add --no-cache python3 make g++
WORKDIR /build/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 3: Runtime
FROM node:20-alpine
RUN apk add --no-cache nginx supervisor sqlite python3 make g++

# Backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev && apk del python3 make g++
COPY --from=backend-build /build/backend/dist ./dist

# Frontend static files
COPY --from=frontend-build /build/frontend/dist /app/frontend
# Copy public assets that may not be in the Vite build
COPY hc-main/public/ /app/frontend/

# Nginx config
COPY deploy/nginx.conf /etc/nginx/http.d/default.conf

# Supervisor config
COPY deploy/supervisord.conf /etc/supervisord.conf

# Data directory for SQLite
RUN mkdir -p /app/data
VOLUME ["/app/data"]

ENV NODE_ENV=production
ENV PORT=3002
ENV DATA_DIR=/app/data

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
