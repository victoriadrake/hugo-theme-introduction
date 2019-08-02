# Introduction theme for Hugo
[![Build Status](https://travis-ci.com/victoriadrake/hugo-theme-introduction.svg?branch=master)](https://travis-ci.com/victoriadrake/hugo-theme-introduction)
![Latest Release](https://img.shields.io/github/tag/victoriadrake/hugo-theme-introduction.svg)

Introduction is a minimalist, highly-versatile theme for Hugo. It can be configured as a single page, or as a full-featured site with multiple sections. It is multilingual, responsive, and includes a light and dark theme.

![Main page screenshot](https://github.com/victoriadrake/hugo-theme-introduction/blob/master/images/screenshot.png)

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
$ git clone https://github.com/victoriadrake/hugo-theme-introduction.git themes/introduction
```

Alternatively, you can include this repository as a [git submodule](https://git-scm.com/book/de/v1/Git-Tools-Submodule). This makes it easier to update this theme if you have your Hugo site in git as well:

```sh
$ git submodule add https://github.com/victoriadrake/hugo-theme-introduction.git themes/introduction
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
Add an optional `weight` for ordering projects section.

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
Add an optional `weight` for ordering blog section on your homepage

Create a new blog post with:

```
hugo new blog/YourEntryTitle.md
```

Posts will also display in the Blog section of the home page.


# Configure your site

From `exampleSite/`, copy `config.toml` to the root folder of your Hugo site and change the fields as you like. Helpful comments are provided.

## Multilingual Mode

Introduction currently ships with support for English, German, Spanish and French. Contributions for other language translations are welcome.

To create a new language translation, add the `.toml` file to the `i18n/` folder. See the existing files for the necessary fields.

See the [hugo documentation](https://gohugo.io/content-management/multilingual/) for more details.

## Menu

Introduction contains a default menu. If you want to override this, you can do so by defining a `menu.main` in `config.toml`.

## Google Analytics

Set `googleAnalytics` in `config.toml` to activate Hugo's [internal Google Analytics template](https://gohugo.io/templates/internal/#google-analytics).

## Disqus

Set `disqusshortname` in `config.toml` to activate Hugo's [internal Disqus template](https://gohugo.io/templates/internal/#disqus).

## Staticman

Procedures to start using Staticman:

1. Add Staticman bot/app, depending on your Git service provider.
    - GitHub: choose either one of the following method
        + GitHub App: refer to issue
        [https://github.com/eduardoboucas/staticman/issues/243](https://github.com/eduardoboucas/staticman/issues/243)
        for detailed procedures.
        + GitHub bot: invite
        **[@staticmanlab](https://github.com/staticmanlab)** as a collaborator
        to your repository (by going to your repository's **Settings** page,
        navigating to the **Collaborators** tab.

            ![add staticmanlab on GitHub](https://user-images.githubusercontent.com/5748535/62385579-c5fc3a80-b555-11e9-9a87-a71e00022d13.png)

            Then help **[@staticmanlab](https://github.com/staticmanlab)**
            accept the invitation by going to

                https://staticman3.herokuapp.com/v3/connect/github/<username>/<repo-name>

            ![help staticmanlab accept invitation](https://user-images.githubusercontent.com/5748535/62385576-c563a400-b555-11e9-988b-d6c43226ca53.png)

            Now, **[@staticmanlab](https://github.com/staticmanlab)** has been
            invited to your repository.

            ![staticmanlab invited to GitHub repo](https://user-images.githubusercontent.com/5748535/62385578-c5fc3a80-b555-11e9-80ca-f687930a0917.png)

    - GitLab: Add the GitLab user associated with your Staticman API endpoint
      (e.g. **[@staticmanlab](https://github.com/staticmanlab)** as a
      "**developer**" for your project by going to **Settings → Members → Invite
      member**.

      There's *no* invitation acceptance mechanism on GitLab.  The invited
      member enjoys the privileges once the invitation is sent.  Therefore,
      there's *no* need to hit `/connect`.

    - Framagit: Since Framagit is a fork of GitLab, the overall setup is similar
      to that on GitLab.  (Note that the Framagit bot is named as
      **[@statimcanlab1](https://framagit.org/staticmanlab1)**.)

        ![@staticmanlab1 invited to Framagit repo](https://user-images.githubusercontent.com/5748535/62385580-c5fc3a80-b555-11e9-94b4-277cfccc32d7.png)

2. Fill in the site config file `config.toml` with reference to the instructions
in the comments.

    Framagit users may choose `gitlab` for `gitProvider` in `config.toml`.

    In case of empty `endpoint`, the public Framagit instance will be used.

    | instance | `endpoint` |
    | --- | --- |
    | official production | `https://api.staticman.net` |
    | GitLab | `https://staticman3.herokuapp.com` |
    | Framagit | `https://staticman-frama.herokuapp.com` |

3. Proceed to the **root-level** repo config file `staticman.yml`.  Note that
the name and path of this file *can't* be changed.

    The parameter `moderation` is for comment moderation, and it defaults to
    `true`, so each new comment is created as a pull/merge request.  If it is
    switched to `false`, then Staticman will directly commit against the
    configured `branch`.

    If you are working on GitLab/Framagit and you have set `moderation: false`,
    depending on your `branch`, you might need the following steps.

    - protected branch (e.g. `master`): Go to **Settings → Repository →
      Protected Branches** and permit the GitLab bot to push against that
      branch.
    - unprotected branch (GitHub's default): *no* measures needed

4. (Optional, GitHub only) To prevent old inactive branches (representing
approved comments) from piling up, you may set up a webhook according to
[Staticman's documenation](https://staticman.net/docs/webhooks).  Make sure to
input the **Payload URL** according to your chosen `endpoint`.  For example, the
default `endpoint` is `https://staticman3.herokuapp.com`, so the corresponding
**Payload URL** should be `https://staticman3.herokuapp.com/v1/webhook`.

5. (Optional, but recommended) To stop spam bots, it's suggested to enable
[reCAPTCHA](https://developers.google.com/recaptcha/docs/display).  You may
refer to the site config file for details.

## Custom css
You can add custom css files by placing them under `assets/` and adding the path to the file to `customCSS` in `config.toml`.

# Issues

If you have a question or get stuck, please [open an issue](https://github.com/victoriadrake/hugo-theme-introduction/issues) for help and to help those who come after you. The more information you can provide, the better!

# Contributing
This theme would not be nearly as awesome without its amazing community of open source contributors, who are [listed here.](https://github.com/victoriadrake/hugo-theme-introduction/releases) Thank you so much! 🖤

Pull requests for bug fixes and improvements are welcome.

# License
Copyright (C) 2018 [Victoria Drake](https://victoria.dev/)

Licensed under [Apache-2.0](https://github.com/victoriadrake/hugo-theme-introduction/blob/master/LICENSE)
