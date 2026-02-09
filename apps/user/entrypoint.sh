#!/bin/sh
set -e

echo "Running user db migrations..."
npm run migration:run:user:prod

echo "Starting user service..."
npm run start:user:prod
