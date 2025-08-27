#!/bin/bash

# SafeIntel Build Test Script
# Tests the Docker build locally before deploying

set -e

echo "🔧 Testing SafeIntel Docker build locally..."
echo "============================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test 1: Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed or not in PATH${NC}"
    exit 1
fi

echo -e "${BLUE}✅ Docker found${NC}"

# Test 2: Build the image
echo -e "${BLUE}🏗️  Building Docker image...${NC}"
if docker build -t safeintel-test .; then
    echo -e "${GREEN}✅ Docker build successful${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Test 3: Quick container test
echo -e "${BLUE}🧪 Testing container startup...${NC}"
CONTAINER_ID=$(docker run -d -p 8081:8080 safeintel-test)

# Wait a moment for startup
sleep 5

# Test if container is running
if docker ps | grep -q $CONTAINER_ID; then
    echo -e "${GREEN}✅ Container started successfully${NC}"
    
    # Optional: Test HTTP endpoint
    if command -v curl &> /dev/null; then
        if curl -f http://localhost:8081/ &> /dev/null; then
            echo -e "${GREEN}✅ HTTP endpoint responding${NC}"
        else
            echo -e "${RED}⚠️  Container running but HTTP not responding${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Container failed to start${NC}"
    docker logs $CONTAINER_ID
fi

# Cleanup
echo -e "${BLUE}🧹 Cleaning up...${NC}"
docker stop $CONTAINER_ID > /dev/null
docker rm $CONTAINER_ID > /dev/null

echo -e "${GREEN}🎉 Build test completed!${NC}"
echo ""
echo -e "${BLUE}💡 Next steps:${NC}"
echo "   1. Deploy to GCP: ./deploy.sh"
echo "   2. Run locally: docker run -p 8080:8080 safeintel-test"
echo "   3. Development: docker-compose --profile development up"
