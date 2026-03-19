#!/usr/bin/env bash

set -euo pipefail

normalize_path_arg() {
  local value="$1"

  if [[ "$value" =~ ^[A-Za-z]:\\.*$ ]]; then
    printf '%s\n' "$value"
    return 0
  fi

  if [[ "$value" =~ ^[A-Za-z]:[^\\].*$ ]]; then
    local drive="${value:0:1}"
    local rest="${value:2}"
    rest="${rest//\//\\}"
    printf '%s:\\%s\n' "$drive" "$rest"
    return 0
  fi

  if [[ "$value" == /[A-Za-z]/* ]] && command -v cygpath >/dev/null 2>&1; then
    cygpath -w "$value"
    return 0
  fi

  printf '%s\n' "$value"
}

args=("$@")
if [[ ${#args[@]} -gt 0 ]]; then
  args[0]="$(normalize_path_arg "${args[0]}")"
fi

powershell -NoProfile -ExecutionPolicy Bypass -File infra/local/restore-local-db.ps1 "${args[@]}"
