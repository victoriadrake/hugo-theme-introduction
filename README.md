# Introduction theme for Hugo

[![Netlify Status](https://api.netlify.com/api/v1/badges/51d09485-c9d1-4a88-90ba-894f09e5a29d/deploy-status)](https://app.netlify.com/sites/hugo-introduction/deploys)
![Test Hugo versions](https://github.com/victoriadrake/hugo-theme-introduction/workflows/test-versions/badge.svg)
![Latest Release](https://img.shields.io/github/tag/victoriadrake/hugo-theme-introduction.svg)

Introduction is a minimalist, highly-versatile theme for Hugo. It can be configured as a single page, or as a full-featured site with multiple sections. It is multilingual, responsive, and includes a light and dark theme.

New to the Hugo static site generator? [Learn the fundamentals here](https://gohugo.io/categories/fundamentals).

![Device mockups](https://github.com/victoriadrake/hugo-theme-introduction/blob/master/images/mockup.png)

Features:

- Multilingual - supports side-by-side content in different language versions
- Custom index page sections from Markdown files
- Projects and Blog sections
- Page load fade-in CSS effect and smooth scrolling to anchor links
- Straightforward customization via `config.toml`
- Styled Markdown throughout, including post titles
- Syntax highlighting

Developer-friendly:

- Sass files included with instant compiling to CSS thanks to [Hugo Pipes](https://gohugo.io/hugo-pipes/postcss/) and [PostCSS](https://gohugo.io/hugo-pipes/postcss/)
- Thoughtful use of Sass variables makes creating new colour schemes easy

## Getting started

Requires **Hugo extended 0.163.0 or later**. See the [Hugo installation instructions](https://gohugo.io/getting-started/installing/). The minimum supported version and the latest release are tested in CI.

Production builds also require **Node.js 22.12 or later** and the theme's local PostCSS dependencies. From the theme directory, install the locked versions:

```sh
npm ci --ignore-scripts
```

When using the theme inside another Hugo site, put the theme's local tools on your path before building. From your site's root:

```sh
PATH="$PWD/themes/introduction/node_modules/.bin:$PATH" hugo
```

`hugo server` previews compile Sass without PostCSS. Production builds use PostCSS to add browser prefixes; no global npm packages are required.

## Get the theme

Run from the root of your Hugo site:

```sh
git clone https://github.com/victoriadrake/hugo-theme-introduction.git themes/introduction
```

Alternatively, you can include this repository as a [git submodule](https://git-scm.com/docs/gitsubmodules). This makes it easier to update this theme if you have your Hugo site in git as well:

```sh
git submodule add https://github.com/victoriadrake/hugo-theme-introduction.git themes/introduction
```

## Preview the theme

Introduction ships with a fully configured example site. From the theme directory:

```sh
npm run dev
```

Then visit `http://localhost:1313/` in your browser to view the example site.

To build the example site, run `npm run build`. Output goes to `docs/`. Override the example URL with `HUGO_BASEURL=https://example.org/ npm run build` when needed.

Run `npm test` for the build regressions (Python 3.9+ and Google Chrome required) and `npm run check:html` after building to check internal links and assets, including accidental `example.com` URLs. The tests use temporary copies and leave local content and generated resources untouched.

This modernization keeps the existing content and configuration model. Navigation and project dialogs use native JavaScript; the existing Owl Carousel still uses bundled jQuery.

## Netlify demo

The [live demo](https://hugo-introduction.netlify.app/) automatically builds and publishes successful pushes to `master`. [netlify.toml](netlify.toml) controls the build: it runs `npm run build && npm run check:html` from the repository root and publishes `docs/`.

The demo pins **Hugo 0.165.0** and **Node.js 24**. This is separate from the theme's minimum supported Hugo version, 0.163.0. New Hugo releases are tested by CI, but the demo's pin must be updated explicitly. Settings in `netlify.toml` take precedence over matching settings in the Netlify dashboard.

After deploying, verify the Hugo version in the production build log and check that images load from the demo domain. A failed build leaves the previous successful deployment live.

## Add content

The following explains how to add content to your Hugo site. You can find sample content in the `exampleSite/` folder.

## Introduction section

Create `index.md`:

```sh
hugo new home/index.md
```

The `title` frontmatter will be the first large heading.

The content of `index.md` will be shown as a subtitle line.

You might want to set `headless` to `true` in the frontmatter. See [headless bundles](https://gohugo.io/content-management/page-bundles/#headless-bundle) for more information.

## Home page

Content for the home page lives under `content/home/`. You may add as many files as you want to in markdown format.

Each markdown file will show as a section on the home page and can be ordered by the `weight` value in the file's frontmatter. You can set `image` to show an image on the left side of the section. The image file must be in the `content/home/` folder.

You may add a contact section by creating
`contact.md`:

```sh
hugo new home/contact.md
```

This will always be shown as the last section on the home page.

## Projects section

Introduction provides an easy way to showcase your projects. Each project can even have its own gallery, shown as an image carousel.

Start by creating an index file for the projects section:

```sh
hugo new projects/_index.md
```

Add a `title` and some optional content to the file.
Add an optional `weight` for ordering projects section.

To create a project, run:

```sh
hugo new projects/YourProjectName/index.md
```

The frontmatter of your new file contains some comments to help your configure your project.

You can set `external_link` to make the project link to another website.

Add images to your project by placing image files in the `YourProjectName/` folder. If you add more then one photo, they will display as a carousel gallery. Images will be ordered by filename. The first image will be shown as the project preview image. You can change the order of your images by adding a `weight` to that resource's parameters:

```sh
resources:
    - src: NameOfYourImage.jpg
      params:
          weight: -100
project_timeframe: "June-December"
```

You can add a `project_timeframe` parameter to the frontmatter of your project to optionally display an arbitrary string on the homepage and modal.

## Blog section

Create an index file for the blog:

```sh
hugo new blog/_index.md
```

Add an optional `weight` for ordering blog section on your homepage

Create a new blog post with:

```sh
hugo new blog/YourEntryTitle.md
```

Posts will also display in the Blog section of the home page.

## Configure your site

From `exampleSite/`, copy `config.toml` to the root folder of your Hugo site and change the fields as you like. Helpful comments are provided.

## Multilingual

Introduction currently ships with support for [many languages](https://github.com/victoriadrake/hugo-theme-introduction/tree/master/i18n). Contributions for other language translations are welcome.

To create a new language translation, add the `.toml` file to the `i18n/` folder. See the existing files for the necessary fields.

See the [hugo documentation](https://gohugo.io/content-management/multilingual/) for more details.

## Menu

Introduction contains a default menu. If you want to override this, you can do so by defining a `menu.main` in `config.toml`.

Optionally, you can disable this menu by setting `showMenu` to `false` in your `config.toml`.

## Contact section clock

Introduction can optionally show your current local time in your [contact section](https://hugo-introduction.netlify.app/#contact). This uses vanilla JS and variables you provide. You can set this up by copying the settings in the exampleSite `config.toml` for `localTime`, `timeZone`, and `timeFormat`.

## Plausible

You can easily use Plausible.io for analytics by setting `plausible = true` in your `config.toml`. Plausible offers a privacy-friendly alternative to Google Analytics. You'll need your own Plausible account - see [plausible.io](https://plausible.io/) for more.

## Google Analytics

For Google Analytics 4, set the measurement ID in your configuration:

```toml
[services.googleAnalytics]
  id = "G-MEASUREMENT_ID"
```

The theme loads Google's `gtag.js` when this ID is present.

## Disqus

Set `disqusshortname` in `config.toml` to activate Hugo's [internal Disqus template](https://gohugo.io/templates/internal/#disqus).

## Custom CSS

You can add custom CSS files by placing them under `assets/` and adding the paths to the files to the `customCSS` list in `config.toml`.

## Custom JavaScript

You can add custom JavaScript files by placing them under `assets/` and adding the paths to the files to the `customJS` list in `config.toml`.

## Issues

If you have a question or get stuck, please [open an issue](https://github.com/victoriadrake/hugo-theme-introduction/issues) for help and to help those who come after you. The more information you can provide, the better!

## Contributing

Contributions for new translations, fixes, and features are welcome.

This theme would not be nearly as awesome without its amazing community of open source [contributors](https://github.com/victoriadrake/hugo-theme-introduction/graphs/contributors). Thank you so much! ❤

## License

Copyright (C) 2017-2026 [Victoria Drake](https://victoria.dev/)

Licensed under the [Apache License, Version 2.0](https://github.com/victoriadrake/hugo-theme-introduction/blob/master/LICENSE) (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
