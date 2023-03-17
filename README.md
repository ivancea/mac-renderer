# Jekyll MAC renderer

{% note %}

To configure this action in your repository, see the [How to use](#how-to-use) section below.

{% endnote %}


A MAC JSON renderer and action made in Jekyll, for GitHub Pages. An example of the page can be seen here: <https://ivancea.github.io/jekyll-mac-renderer/>

The MAC format is defined here: <https://github.com/getmanfred/mac>

You can edit and synchronize your MAC files with the Manfred app: <https://getmanfred.com>

The resulting HTML is printable using the browser's print function, as it will avoid breaking blocks (Jobs, projects, highlights).

## Local development

You can run the page locally with docker, with `docker-compose up`.

It's published at `http://localhost:4000/`, and the page is rebuilt every time a file is changed.

## Action

The action works by building your MAC repository and publishing it to GitHub Pages, in a `gh-pages` branch. This branch shouldn't be modified, as anything there will be lost on deploy.

### Parameters

- `github-token`: The GitHub token, to be able to deploy. It's usually taken from `${{ secrets.GITHUB_TOKEN }}`

### How to use

First, grant permission to actions in your repository to read and write to it.
For that, go to `Settings` > `Actions` > `General`, and in the `Workflow permissions` section, select `Read and write permissions`.

Then, create a workflow in `.github/workflows/deploy.yml` with this content:

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

This will execute the build of the page every time you push to master, or when you manually trigger the workflow.

The build will upload the built page to the `gh-pages` branch, or to the branch you've already configured to be used for GitHub Pages.
*You can check <https://github.com/helaili/jekyll-action> to see the exact logic, as that action is used underneath.*

If you haven't configured yet your GitHub Pages, go to the repository `Settings`, and in the `Pages` tab, choose `Deploy from a branch` in `Source` and select the `gh-pages` branch. This will enable the site, and launch another action to publish the branch every time it changes.

After that, the GitHub page with your CV will be available at `https://<username>.github.io/<repository>/`.

### Customization

The action will merge its files  with yours in a temporary directory.
Existent files won't be overridden, so you can copy this repository files and customize/override them.

Remember that, if you change the version of the action, files may change again.
