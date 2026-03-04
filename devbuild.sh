#!/bin/bash
set -e
cd "$(dirname "$0")"
npm run build && rm -rf devpublic && mv out devpublic && chown -R www-data:www-data devpublic && chmod -R 755 devpublic
