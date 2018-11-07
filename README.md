# Introduction theme for Hugo
[![Build Status](https://travis-ci.com/vickylai/hugo-theme-introduction.svg?branch=master)](https://travis-ci.com/vickylai/hugo-theme-introduction)
![Latest Release](https://img.shields.io/github/tag/vickylai/hugo-theme-introduction.svg)

Introduction is a minimalist, highly-versatile theme for Hugo. It can be configured as a single page, or as a full-featured site with multiple sections. It is multilingual, responsive, and includes a light and dark theme.

![Main page screenshot](https://github.com/vickylai/hugo-theme-introduction/blob/master/images/screenshot.png)

Features:

* Multilingual - supports side-by-side content in different language versions
* Custom index page sections from Markdown files
* Projects and Blog sections
* Page load fade-in CSS effect and smooth scrolling to anchor links
* Straightforward customization via `config.toml`
* Styled Markdown throughout with syntax highlighting

Developer-friendly:

* Sass files included with instant compiling to CSS thanks to [Hugo Pipes](https://gohugo.io/hugo-pipes/postcss/) and [PostCSS](https://gohugo.io/hugo-pipes/postcss/)
* Thoughtful use of Sass variables makes creating new colour schemes easy

# Getting started
## Requirements
- Extended version of [Hugo](https://gohugo.io/getting-started/installing/) (latest version recommended)
- To make changes to the theme CSS:
  - [autoprefixer](https://github.com/postcss/autoprefixer): `npm install -g autoprefixer`
  - [postcss-cli](https://github.com/postcss/postcss-cli):`npm install -g postcss-cli`

## Get the theme
Run from the root of your Hugo site:
```sh
$ git clone https://github.com/vickylai/hugo-theme-introduction.git themes/introduction
```

Alternatively, you can include this repository as a [git submodule](https://git-scm.com/book/de/v1/Git-Tools-Submodule). This makes it easier to update this theme if you have your Hugo site in git as well:

```sh
$ git submodule add https://github.com/vickylai/hugo-theme-introduction.git themes/introduction
```

## Preview the theme

Introduction ships with an fully configured example site. For a quick preview:

```
cd exampleSite/
hugo serve  --themesDir ../..
```

Then visit `http://localhost:1313/` in your browser to view the example site.


# Add content

The following explains how to add content to your Hugo site. You can find sample content in the `exampleSite/` folder.

## Introduction section

Create `index.md`:

```
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

```
hugo new home/contact.md
```

This will always be shown as the last section on the home page.

## Projects section

Introduction provides an easy way to showcase your projects. Each project can even have its own gallery, shown as an image carousel.

Start by creating an index file for the projects section:

```
hugo new projects/_index.md
```

Add a `title` and some optional content to the file.

To create a project, run:

```
hugo new projects/YourProjectName/index.md
```

The frontmatter of your new file contains some comments to help your configure your project.

You can set `external_link` to make the project link to another website.

Add images to your project by placing image files in the `YourProjectName/` folder. If you add more then one photo, they will display as a carousel gallery. Images will be ordered by filename. The first image will be shown as the project preview image. You can change the order of your images by adding a `weight` to that resource's parameters:

```
resources:
    - src: NameOfYourImage.jpg
      params:
          weight: -100
```

## Blog section

Create an index file for the blog:

```
hugo new blog/_index.md
```

Create a new blog post with:

```
hugo new blog/YourEntryTitle.md
```

Posts will also display in the Blog section of the home page.


# Configure your site

From `exampleSite/`, copy `config.toml` to the root folder of your Hugo site and change the fields as you like. Helpful comments are provided.

## Multilingual Mode

Introduction currently ships with support for English, German, and Spanish. Contributions for other language translations are welcome.

To create a new language translation, add the `.toml` file to the `i18n/` folder. See the existing files for the necessary fields.

See the [hugo documentation](https://gohugo.io/content-management/multilingual/) for more details.

## Menu

Introduction contains a default menu. If you want to override this, you can do so by defining a `menu.main` in `config.toml`.

## Google Analytics

Set `googleAnalytics` in `config.toml` to activate Hugo's [internal Google Analytics template](https://gohugo.io/templates/internal/#google-analytics).

## Disqus

Set `disqusshortname` in `config.toml` to activate Hugo's [internal Disqus template](https://gohugo.io/templates/internal/#disqus).

## Custom css
You can add custom css files by placing them under `assets/` and adding the path to the file to `customCSS` in `config.toml`.

# Issues

If you have a question or get stuck, please [open an issue](https://github.com/vickylai/hugo-theme-introduction/issues) for help and to help those who come after you. The more information you can provide, the better!

# Contributing
This theme would not be nearly as awesome without its amazing community of open source contributors, who are [listed here.](https://github.com/vickylai/hugo-theme-introduction/releases) Thank you so much! 🖤

Pull requests for bug fixes and improvements are welcome.

# License
Copyright (C) 2018 [Vicky Lai](https://vickylai.com/)

Licensed under [Apache-2.0](https://github.com/vickylai/hugo-theme-introduction/blob/master/LICENSE)
