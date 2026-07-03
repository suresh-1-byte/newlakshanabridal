#!/bin/bash
# Build script for Vercel deployment

echo "Building Lakshana Bridal Studio for Vercel..."

# Install dependencies
npm install

# Build the project
npm run build

# Copy dist/client to dist if it exists
if [ -d ".output/public" ]; then
  echo "Copying .output/public to dist/client..."
  mkdir -p dist
  cp -r .output/public/* dist/
elif [ -d "dist" ]; then
  echo "Using existing dist directory..."
else
  echo "Error: No build output found!"
  exit 1
fi

echo "Build complete!"
