#!/bin/sh
set -eu

# These browser-safe values are injected from the Container App environment.
# Never set a Master Key here: this JavaScript file is visible to visitors.
cat > /usr/share/nginx/html/runtime-config.js <<EOF
window.__SMART_UBUHINZI_CONFIG__ = {
  VITE_PARSE_APP_ID: "${VITE_PARSE_APP_ID:-}",
  VITE_PARSE_JAVASCRIPT_KEY: "${VITE_PARSE_JAVASCRIPT_KEY:-}",
  VITE_PARSE_SERVER_URL: "${VITE_PARSE_SERVER_URL:-}"
};
EOF