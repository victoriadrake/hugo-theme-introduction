# <a href="https://github.com/vickylaiio/hugo-theme-introduction" target="_blank">Introduction theme for Hugo</a>

A minimal, single page, smooth scrolling theme for Hugo.

![Main page screenshot](https://github.com/vickylaiio/hugo-theme-introduction/blob/master/images/screenshot.png)

Features:
- Single scrolling home page
    - About section with profile photo
    - Contact section with option to show your local timezone
    - Optional Projects and Blog sections
- Browser friendly CSS fade-in effect for some pizzaz
- Smooth scroll-to-section navigation
- Responsive and fast

## Quick start

### Get the theme

From the root of your Hugo site:
```sh
$ cd themes
$ git clone https://github.com/vickylaiio/hugo-theme-introduction.git introduction
```

### Configure your site

From the exampleSite, copy `config.toml` to the root folder of your Hugo site and change the fields as you like.

Start with:

1. Set your baseurl
2. Set your full name and first name
3. Set your introduction header height (use "medium", "large", or "fullheight")
4. Set your avatar image
5. Set your timezone, if you choose to show it
6. Choose whether or not to show the Blog and Projects sections, and configure them to your liking
7. Input your social site urls and font-awesome icon names - use as many as you like

### Create About and Contact pages

Run:
```sh
$ hugo new about.md 
$ hugo new contact.md
```
Then edit the markdown files with the content you'd like shown in your main page's About and Contact sections.

## Preview your site locally

Use Hugo's built-in server to see your site in action as you make changes.

```
$ hugo -t introduction --watch serve
```

Visit `localhost:1313` in your browser to see a live preview of your site.

## Blog posts

To create a new blog post, run:
```
$ hugo new blog/your-post.md
```

## License
This theme is released under the [Creative Commons Attribution 3.0 license.](https://github.com/vickylaiio/hugo-theme-introduction/blob/master/LICENSE.md)
