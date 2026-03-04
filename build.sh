#!/bin/bash
set -e
echo -n "Type 'im not a robot :D' to continue: "
read -r confirm
if [ "$confirm" != "im not a robot :D" ]; then
  echo "Aborted."
  exit 1
fi
cd "$(dirname "$0")"
npm run build && rm -rf release && mv out release && chown -R www-data:www-data release && chmod -R 755 release
