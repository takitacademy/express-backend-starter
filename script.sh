#!/bin/bash

# Ensure script is executable
if [ ! -x "$0" ]; then
    echo "Making script executable..."
    chmod +x "$0"
fi

docker-compose down
docker-compose build
docker-compose up -d 
docker ps

echo "Docker Compose setup completed successfully!"
