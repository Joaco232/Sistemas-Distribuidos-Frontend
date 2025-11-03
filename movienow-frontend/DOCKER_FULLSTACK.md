# MovieNow Full Stack - Docker Compose

This is the complete docker-compose configuration for running the entire MovieNow application stack (Frontend + Backend + Database).

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Backend Docker image built (`movienow-backend:latest`)
- Frontend Docker image built (`movienow-frontend:latest`)

## Quick Start

1. Make sure you have a `backend.env` file with the backend environment variables:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/movienowdb
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=admin
SPRING_JPA_HIBERNATE_DDL_AUTO=update
# Add your other backend environment variables here
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8080
   - **Database**: localhost:5433 (PostgreSQL)

4. Stop all services:
```bash
docker-compose down
```

## Full Stack Docker Compose

Create a `docker-compose.yml` at the root of your project:

```yaml
services:
  # Frontend Service (React with Vite)
  frontend:
    image: movienow-frontend:latest
    container_name: movienow-frontend-container
    ports:
      - "3000:80"
    restart: unless-stopped
    depends_on:
      - backend
    networks:
      - movienow-network

  # Backend Service (Spring Boot)
  backend:
    image: movienow-backend:latest
    container_name: movienow-backend-container
    ports:
      - "8080:8080"
    env_file:
      - backend.env
    depends_on:
      - db
    networks:
      - movienow-network

  # Database Service (PostgreSQL)
  db:
    image: postgres:16
    container_name: movienow-db-container
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_DB=movienowdb
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - movienow-network

networks:
  movienow-network:
    driver: bridge

volumes:
  postgres-data:
    driver: local
```

## Building the Frontend Image

If you need to build the frontend image:

```bash
cd movienow-frontend
docker build -t movienow-frontend:latest .
```

Or rebuild with the full stack:

```bash
# In the root directory with the full stack docker-compose.yml
docker-compose build frontend
docker-compose up -d
```

## Environment Variables

### Frontend
The frontend uses `VITE_API_BACK_URL` to know where the backend is located:
- **Development**: `http://localhost:8080`
- **Docker**: `http://localhost:8080` (browser connects from host machine)

The environment variable is baked into the build, so if you need to change it, rebuild the image:

```bash
cd movienow-frontend
docker build --build-arg VITE_API_BACK_URL=http://your-backend:8080 -t movienow-frontend:latest .
```

### Backend
Backend environment variables should be in a `backend.env` file:
- Database connection (using Docker service name `db`)
- API keys
- JWT secrets
- etc.

## Troubleshooting

### Frontend shows blank page
1. Check browser console for errors (F12)
2. Verify the backend is accessible from your browser at http://localhost:8080
3. Check CORS configuration in the backend
4. Verify the frontend was built with the correct API URL

### Backend can't connect to database
1. Make sure the database URL uses the Docker service name: `jdbc:postgresql://db:5432/movienowdb`
2. Check the database credentials in `backend.env`
3. View logs: `docker logs movienow-backend-container`

### Port already in use
If you get "port already allocated" errors:
- Change the port mapping in docker-compose.yml (e.g., `"3001:80"` instead of `"3000:80"`)
- Or stop the conflicting service

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker logs -f movienow-frontend-container
docker logs -f movienow-backend-container
docker logs -f movienow-db-container
```

### Rebuild everything
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Clean slate (removes volumes too)
```bash
docker-compose down -v
docker-compose up -d
```

## Network Architecture

When running in Docker Compose:
- **Browser → Frontend**: User accesses `http://localhost:3000`
- **Browser → Backend**: Frontend JavaScript makes API calls to `http://localhost:8080`
- **Backend → Database**: Backend connects using `jdbc:postgresql://db:5432/movienowdb`

Note: The frontend runs in the browser (client-side), so it connects to the backend using `localhost:8080` from the user's machine, NOT from inside the container.

## Data Persistence

The PostgreSQL database data is persisted in the `postgres-data` volume. This means:
- Data survives container restarts
- Data survives `docker-compose down`
- Data is deleted with `docker-compose down -v`

## Production Considerations

For production deployment:
1. Use environment-specific docker-compose files
2. Don't expose database ports externally (remove `5433:5432` mapping)
3. Use secrets management for sensitive data
4. Enable HTTPS with a reverse proxy (nginx, traefik)
5. Configure proper resource limits
6. Set up health checks
7. Use Docker secrets instead of .env files
