# MovieNow Frontend - Docker Setup

This guide explains how to run the MovieNow frontend application using Docker.

## ⚠️ Important: API URL Configuration

The frontend is configured to connect to the backend at `http://localhost:8080`. This means:
- The **backend must be running** on port 8080 before the frontend will work correctly
- API calls are made from your **browser** (client-side), not from within the Docker container
- If you see a blank page, check that the backend is accessible at http://localhost:8080

## Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

### Using Docker Compose (Recommended)

1. Navigate to the movienow-frontend directory:
```bash
cd movienow-frontend
```

2. Build and run the container:
```bash
docker-compose up -d
```

3. Access the application at: `http://localhost:3000`

4. To stop the container:
```bash
docker-compose down
```

### Using Docker CLI

1. Build the Docker image:
```bash
docker build -t movienow-frontend .
```

2. Run the container:
```bash
docker run -d -p 3000:80 --name movienow-frontend movienow-frontend
```

3. Access the application at: `http://localhost:3000`

4. To stop the container:
```bash
docker stop movienow-frontend
docker rm movienow-frontend
```

## Docker Configuration

### Dockerfile
The application uses a multi-stage build:
- **Build stage**: Uses Node.js 20 Alpine to build the Vite application
- **Production stage**: Uses Nginx Alpine to serve the static files

### Custom Port
To use a different port, modify the `docker-compose.yml` file:
```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

Or with Docker CLI:
```bash
docker run -d -p 8080:80 --name movienow-frontend movienow-frontend
```

## Development Mode with Docker

For development with hot-reload, you can create a separate development Docker setup:

```bash
docker run -it --rm \
  -v ${PWD}:/app \
  -v /app/node_modules \
  -p 5173:5173 \
  -w /app \
  node:20-alpine \
  sh -c "npm install && npm run dev -- --host"
```

Then access at: `http://localhost:5173`

## Useful Commands

View logs:
```bash
docker-compose logs -f
```

Rebuild the image:
```bash
docker-compose up -d --build
```

Access container shell:
```bash
docker exec -it movienow-frontend sh
```

## Environment Variables

If your application requires environment variables, create a `.env` file and modify the `docker-compose.yml`:

```yaml
services:
  movienow-frontend:
    # ... other settings
    env_file:
      - .env
```

## Troubleshooting

- **Port already in use**: Change the port mapping in docker-compose.yml or stop the service using that port
- **Build fails**: Ensure you have a stable internet connection for downloading dependencies
- **Application not loading**: Check logs with `docker-compose logs -f`
