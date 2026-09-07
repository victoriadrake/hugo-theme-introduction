#!/bin/sh
set -eu

# Resolve paths from this script, so invocation does not depend on the caller's cwd.
theme_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
export PATH="$theme_dir/node_modules/.bin:$PATH"

base_url="https://hugo-introduction.netlify.app/"
if [ "${1:-}" = "server" ]; then
  base_url="http://localhost/"
fi

exec hugo --source "$theme_dir/exampleSite" \
  --themesDir "$(dirname -- "$theme_dir")" \
  --theme "$(basename -- "$theme_dir")" \
  --destination "$theme_dir/docs" \
  --cleanDestinationDir --minify \
  --baseURL "${HUGO_BASEURL:-$base_url}" "$@"
