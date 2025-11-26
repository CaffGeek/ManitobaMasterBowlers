#!/usr/bin/env bash

set -euo pipefail

docker-compose -f infra/local/docker-compose.yml up -d --build
