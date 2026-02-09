#!/bin/sh
set -e

echo "Running balance db migrations..."
npm run migration:run:balance:prod

echo "Starting balance service..."
npm run start:balance:prod
