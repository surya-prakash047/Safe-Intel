# Stage 1: Build Vite React frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install deps
RUN npm ci

# Copy frontend source
COPY . ./

# Build Vite app (outputs to /dist)
RUN npm run build

# Stage 2: Serve frontend with nginx
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d

# Copy built Vite files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
