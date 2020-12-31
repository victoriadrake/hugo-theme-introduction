---
title: "Theme Features"
date: 2020-07-25T02:04:06-05:00
tags: ["code"]
series: ["quickstart"]
---

Here are some helpful tips for setting up this theme.

## Configuration

Most of what you'll want to configure is demonstrated in the exampleSite `config.toml`. This is [Hugo's configuration file](https://gohugo.io/getting-started/configuration/). You can copy the `config.toml` in the `exampleSite/` to your site root get started.

<details><summary>Here are all the options included in the configuration file for this example site!</summary>

```toml
{{% md %}}
{{< readfile file="config.toml" >}}
{{% /md %}}
```

</details>

## Syntax Highlighting

Introduction allows the use of Hugo's rich built-in syntax highlighting capabilities. See [Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/) in the Hugo docs.

Below is an example configuration for Highlight. See [Highlight in the Hugo docs](https://gohugo.io/getting-started/configuration-markup#highlight) for more.

```toml
[markup]
  [markup.highlight]
    codeFences = true
    guessSyntax = false
    hl_Lines = ""
    lineNoStart = 1
    lineNos = false
    lineNumbersInTable = true
    noClasses = true
    # For styles, see https://xyproto.github.io/splash/docs/longer/all.html
    style = "friendly"
    tabWidth = 4
```

## Shortcodes

[Custom shortcodes](https://gohugo.io/templates/shortcode-templates/) can be added to a `layouts/shortcodes/` directory in your site root. Below, I use two custom shortcodes to display a data file: the current configuration file for this site! See the [source for this page](https://github.com/victoriadrake/hugo-theme-introduction/blob/master/exampleSite/content/en/blog/configuration.md) to understand how to use shortcodes.

## Show HTML in Posts

To ensure Hugo renders any HTML that your shortcode or other additions like Font Awesome uses in posts, make sure these lines for [the Goldmark renderer](https://gohugo.io/getting-started/configuration-markup) are in your `config.toml`:

```toml
[markup]
defaultMarkdownHandler = "goldmark"

[markup.goldmark]

[markup.goldmark.renderer]
unsafe = true
```
