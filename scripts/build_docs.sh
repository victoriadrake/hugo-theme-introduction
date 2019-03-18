#!/bin/sh

rm -rf docs/
cd exampleSite
hugo --gc --minify --themesDir ../.. -d ../docs -v -b /
