# MAC renderer

_To configure this action in your repository, see the [How to use](#how-to-use) section below._

A MAC JSON renderer and action made in JS, with an action for GitHub Pages. An example of the page can be seen here: <https://ivancea.github.io/mac-renderer/>

The MAC format is defined here: <https://github.com/getmanfred/mac>

You can edit and synchronize your MAC files with the Manfred app: <https://getmanfred.com>

The resulting HTML is printable using the browser's print function, as it will avoid breaking blocks (Jobs, projects, highlights).

## CLI

Usage: `npx mac-renderer <input-file>`.

## Action

The action works by building your MAC repository and publishing it to GitHub Pages, in a `gh-pages` branch. This branch shouldn't be modified, as anything there will be lost on deploy.

### Parameters

- `github-token`: The GitHub token, to be able to deploy. It's usually taken from `${{ secrets.GITHUB_TOKEN }}`

### How to use

First, grant permission to actions in your repository to read and write to it.
For that, go to `Settings` > `Actions` > `General`, and in the `Workflow permissions` section, select `Read and write permissions`.

Then, create a workflow in `.github/workflows/deploy.yml` with this content (Replace the branch name you want to use):

```yaml
name: Deploy to GitHub Pages

on:
  # Automatic build on push, choose the branch you want to use here
  push:
    branches: "master"
  # If you want to be able to build it manually from any branch
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: ivancea/mac-renderer@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

# Minimum required permissions
permissions:
  contents: read
  pages: write
  id-token: write
```

This will execute the build of the page every time you push to master, or when you manually trigger the workflow.

The build will produce an artifact with the page and automatically deploy it GitHub Pages.

If you haven't configured yet your GitHub Pages, go to the repository `Settings`, and in the `Pages` tab, choose `Deploy from a branch` in `Source` and select the `gh-pages` branch. This will enable the site, and launch another action to publish the branch every time it changes.

After that, the GitHub page with your CV will be available at `https://<username>.github.io/<repository>/`.
