#!/bin/sh

rm -rf ../docs
cd ../exampleSite
HUGO_THEME=hugo-theme-introduction hugo --gc --minify --themesDir ../.. -v -b / -d ../docs
