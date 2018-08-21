# Introduction theme for Hugo
[![Build Status](https://travis-ci.com/vickylai/hugo-theme-introduction.svg?branch=master)](https://travis-ci.com/vickylai/hugo-theme-introduction)
![Latest Release](https://img.shields.io/github/tag/vickylai/hugo-theme-introduction.svg)

A minimal, smooth-scrolling theme for Hugo. Can be configured as a single page site or full-featured site with many sections.

![Main page screenshot](https://github.com/vickylai/hugo-theme-introduction/blob/master/images/screenshot.png)

Features:
- Minimalist home page
    - About section with profile photo
    - Contact section with option to show your local timezone
    - Optional Projects and Blog sections
- Light and Dark themes
- Browser friendly CSS fade-in effect for some pizzaz
- Smooth scroll-to-section navigation
- Responsive and fast

## Getting started
### Requirements
- [Hugo](https://gohugo.io/getting-started/installing/) extended version 0.45 or greater
- [autoprefixer](https://github.com/postcss/autoprefixer): `npm install -g autoprefixer`
- [postcss-cli](https://github.com/postcss/postcss-cli):`npm install -g postcss-cli`

### Get the theme
Run from the root of your Hugo site:
```sh
$ git clone https://github.com/vickylai/hugo-theme-introduction.git themes/introduction
```

Alternatively you can include this repository as a [git submodule](https://git-scm.com/book/de/v1/Git-Tools-Submodule). This makes it easier to update this theme if you have your Hugo site in git as well. For this you need to run:

```sh
$ git submodule add https://github.com/vickylai/hugo-theme-introduction.git themes/introduction
```

### Configure your site
From the exampleSite, copy `config.toml` to the root folder of your Hugo site and change the fields as you like.

The following explains how to add content to your hugo site. Introduction ships with an fully configured example site. For a quick preview just go into `exampleSite/` and run `hugo  --themesDir ../..`. If you have configuration problems, you might want to check out how its done in `exampleSite/`.

### Home page
Content for the home page lives under `content/home/`. Create `index.md` (`hugo new home/index.md`) and set a *title*. The content of this file will be shown as a tag line. You might want to set [*headless*](https://gohugo.io/content-management/page-bundles/#headless-bundle) to `true`. You may add more files to the home section. They show up automaticity on the home page and can be ordered via *weight*. You can set *image* for a page to show an image on the left side. The image has to be placed inside `content/home`.

You may add a contact section by creating
`contact.md` (`hugo new home/contact.md`). This will allways be shown last on the home page.

### Projects section
Introduction provides an easy way to your projects. You can even add a gallery to your projects. Start by creating an index file (`hugo new projects/_index.md`), which you needs a *title*. You can also add some text.

Now you are ready to add some projects. Jet again, create an index file (`hugo new creating/YourProjectName/index.md`). You can add *external_link* to create a link to a website. Or add images to your project by placing them in the same folder as the index file you just created. If you add more then one photo, a gallery will be created. Images are ordered by there filename. The first image will be used as a project preview image. If you want to change the order of your image, you can do this by adding *weight* to some image via font matter in your index file:
```
resources:
    - src: NameOfYourImage.jpg
      params:
          weight: -100
```
The projects themself can also be ordered by *weight*.

### Blog section
Creating a blog section is quite simple with Introduction. Just add an index file for the section (`hugo new blog/_index.md`). Then you can create as many blog entry as you like via (`hugo new blog/YourEntryTitle.md`). They will also automaticity appear on the home page.

## Advanced configuration
### Multilingual Mode
You can create a multilingual website with Introduction. The default config file even contains all necessary configuration option. You just have to adjust the accordingly.

Introduction ships with some translation. If you want to add a new language, you have to add a necessary translations to `i18n`. See the [hugo documentation](https://gohugo.io/content-management/multilingual/) for more details.

### Menu
Introduction contains a default menu. If you want to override this, you can do so by defining a *menu.main* in your config file.

### Disqus and Google Analytics
Introduction supports comments from Disqus. You just have to set *disqusshortname* in your config file.

It also offers tracking via Google Analytics. For this to work, you have to set *googleAnalytics*.

## Custom css
You can add custom css files by placing them under `assets/` and adding the path to your css file to *customCSS* in your config file.

## Contributing
Pull requests for bug fixes and suggestions are welcome.

Contributors are listed in [CHANGELOG.md](https://github.com/vickylai/hugo-theme-introduction/blob/master/CHANGELOG.md). Thank you so much! 🖤

## License
Copyright (C) 2018 [Vicky Lai](https://vickylai.com/introduction/)

Licensed under [AGPL-3.0](https://github.com/vickylai/hugo-theme-introduction/blob/master/LICENSE)
