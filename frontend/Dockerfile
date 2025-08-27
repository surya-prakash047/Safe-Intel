# Stage 1: Build React frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve frontend with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files (change "build" <-> "dist" depending on your framework)
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port (Cloud Run requires 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
