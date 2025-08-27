# Stage 1: Build React frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock files from frontend folder
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY . ./

# Build the React app (Vite outputs to dist, CRA to build)
RUN npm run build

# Stage 2: Serve frontend with nginx
FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from builder stage
# (adjust "dist" → "build" if you use CRA instead of Vite)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Cloud Run port
EXPOSE 8080

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
