## Version 3.3.0 - Mar 25 2018

- Default parameters implemented so theme renders without custom config parameters
- Local assets placed 

*Thank you very much to @paskal and @Hanzei for your important contributions!*

## Version 3.2.1 - Feb 3 2018

- Allow highlight theme choice using built-in Chroma and `pygmentsStyle` config
- Improvement for modal rendering

*Thanks to @darkk for the contribution!*

- Included Sass files

# Version 3.2 - Jan 26 2018

- Fixed "theme" namespace bug in exampleSite config file that prevented site building after Hugo v0.32.2 (#22)
- Updates supporting up to Hugo v0.35dev
- Added default templates for taxonomy pages
- Made asset links in head partial relative

*Thanks to @nancym, @penance316, @quendera, and @mrshannon for helping me squish 🐞!*

- Parameter names changed to camelCase

*Thanks to @danieldiaz14 for the contribution!*

## Version 3.1.2 - Dec 30 2017

- Updated to FontAwesome 4.7.0
- Fixed card background color in dark theme css

*Thanks to [@chrislabarge](https://github.com/chrislabarge) for the contribution and [@Lytigas](https://github.com/Lytigas) for bug catching!*

## Version 3.1.1 - Dec 4 2017

- Fixed blog posts ordered by date (reversed as of Hugo v0.31)

*Thanks to [@pmviva](https://github.com/pmviva) for the contribution!*

# Version 3.1 - Nov 14 2017

- Added columns option to projects section
- Fixed bugs with project section modal links

*Thanks to [@Heirak](https://github.com/Heirak) for the suggestions!*

# Version 3.0 - Nov 13 2017

- Projects are a content section now instead of 3 static config file entries:
  - Add any number of projects to your site
  - Projects on the main page can be external links to other websites, or they will pop open a window with details
- Updates supporting Hugo version 3.0+
- Misc bug fixes

*Thanks to [@lucab85](https://github.com/lucab85) for the contribution!*

## Version 2.20 - Jul 25 2017

- Avatar made optional
- Fixed bug in CSS dark theme

*Thanks to [@alanfran](https://github.com/alanfran) for the contribution!*

- Removed dead code (font loads) from header

## Version 2.10 - May 25 2017

- Fixed issue (#7) causing '_fades.css' to not load with some site structures
  - file '_fades.css' is now unnecessary
- Added baseURL to header assets in case the lack of was also causing complications

*Thanks to [@kirederik](https://github.com/kirederik) for the contribution!*

# Version 2.00 - April 20 2017

- Load speed improvements:
  - Lighter smooth scrolling effect using a little jQuery
- Added option to show author's local time in Contact section
- Social icons are now totally customizable via config - add as many as you want

# Version 1.00 - March 25 2017

- Standardized layout using bulma
- Minified CSS for faster loading
- Responsive hamburger menu on mobile view
- Choose your header height via config
