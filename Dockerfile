# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build application for production
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM node:20-alpine

WORKDIR /app

# Install http-server globally to serve the built application
RUN npm install -g http-server

# Copy built application from previous stage
COPY --from=build /app/dist/frontend/browser /app/dist

# Expose port
EXPOSE 4200

# Start application with CORS enabled
CMD ["http-server", "dist", "-p", "4200", "--cors"]
