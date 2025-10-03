#!/bin/bash

if [ -z "$1" ]; then
  echo "ERROR: Parameter is not set"
  exit 1
fi

REGISTRY_URL="$1" && \
APP_VERSION=v$(npm pkg get version | xargs echo)   && \
APP_NAME=$(npm pkg get name | xargs echo) && \
echo "$REGISTRY_URL/$APP_NAME:$APP_VERSION"
docker manifest inspect "$REGISTRY_URL/$APP_NAME:$APP_VERSION" && \
{
  echo "Image already exists" && \
  exit 1;
} || \
{
  npm install && \
  npm run build && \
  docker build --no-cache -t "$REGISTRY_URL/$APP_NAME:$APP_VERSION" -t "$REGISTRY_URL/$APP_NAME:latest" -f ./Dockerfile . && \
  docker image push "$REGISTRY_URL/$APP_NAME:$APP_VERSION" && \
  docker image push "$REGISTRY_URL/$APP_NAME:latest";
}