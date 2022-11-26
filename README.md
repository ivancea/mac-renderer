# Jekyll MAC renderer

A MAC JSON renderer and action made in Jekyll, for GitHub Pages. An example of the page can be seen here: <https://ivancea.github.io/jekyll-mac-renderer/>

The MAC format is defined here: <https://github.com/getmanfred/mac>

You can edit and synchronize your MAC files with the Manfred app: <https://getmanfred.com>

## Action

The action works by building your MAC repository and publishing it to GitHub Pages, in a `gh-pages` branch. This branch shouldn't be modified, as anything there will be lost on deploy.

### Parameters

- `github-token`: The GitHub token, to be able to deploy. It's usually taken from `${{ secrets.GITHUB_TOKEN }}`

### How to use

First, create a workflow in `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: "master" # Automatic build on master changes
  workflow_dispatch: # If you want to be able to build it manually from any branch

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: ivancea/jekyll-mac-renderer@v1 # Change this to the latest version
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

The GitHub page with your CV will be available at `https://<username>.github.io/<repository>/`.

### Customization

The action will merge its files  with yours in a temporary directory.
Existent files won't be overridden, so you can copy this repository files and customize/override them.

Remember that, if you change the version of the action, files may change again.
