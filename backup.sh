#!/usr/bin/env bash

set -euo pipefail

powershell -NoProfile -ExecutionPolicy Bypass -File infra/local/backup-prod-db.ps1 "$@"
