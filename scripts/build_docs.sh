#!/bin/sh

cd exampleSite
hugo --gc --minify --themesDir ../.. -d ../docs -v -b https://vickylai.com/hugo-theme-introduction/
