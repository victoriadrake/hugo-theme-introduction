---
title: "Support for Multiple Authors"
date: 2022-02-21T16:04:06-05:00
tags: ["features", "blog"]
series: ["quickstart"]
author: ["Hugo Contributors"]
---

Using Introduction, your site can feature multiple authors. Each post displays a byline -- the name of a post's author -- if the `author` field is set in the post front matter. For example, here's the front matter for this post:

```yaml
---
title: "Support for Multiple Authors"
date: 2022-02-20T02:04:06-05:00
tags: ["features", "blog"]
series: ["quickstart"]
author: ["Hugo Contributors"]
---
```

You can list one or more authors. For example, here's a byline with two credits:

```yaml
author: ["Hugo Contributors", "Victoria Drake"]
```

Even when there is just one author, ensure you use a list format (`["Name"]`) for the `author` field.
