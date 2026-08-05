# Cyberiad Lab website

The research-group website for the Cyberiad Lab, built with Jekyll and hosted on GitHub Pages.

## Local development

```sh
bundle install
npm install
bundle exec jekyll serve
```

The site is available at `http://127.0.0.1:4000/eozlu21/`.

## Quality checks

The `Site quality` GitHub Actions workflow runs on pushes and pull requests to `gh-pages`. It validates the Jekyll build, publication images, generated internal links and assets, HTML structure, and WCAG 2 AA accessibility across the public pages.

Run the deterministic checks locally with:

```sh
ruby scripts/check_publication_images.rb
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,.github/jekyll-ci.yml
ruby scripts/check_internal_links.rb _site
bundle exec htmlproofer ./_site --disable-external --swap-urls '^/eozlu21/:/'
npm run check:html
```

The accessibility command expects a local Jekyll server on port 4000:

```sh
npm run check:accessibility
```
