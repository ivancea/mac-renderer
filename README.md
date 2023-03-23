# MAC renderer

_To configure this action in your repository, see the [How to use](#how-to-use) section below._

A MAC JSON renderer and action made in JS, with an action for GitHub Pages. An example of the page can be seen here: <https://ivancea.github.io/mac-renderer/>

The MAC format is defined here: <https://github.com/getmanfred/mac>

You can edit and synchronize your MAC files with the Manfred app: <https://getmanfred.com>

The resulting HTML is printable using the browser's print function, as it will avoid breaking blocks (Jobs, projects, highlights).

## Library

To use the library, install it with `npm install mac-renderer`, and use it like this:

```ts
import { ManfredAwesomicCV, generateHtml } from "mac-renderer";

const yourCv: ManfredAwesomicCV = {
  // ...
};

const html = await generateHtml(yourCv);
```

## CLI

Usage: `npx mac-renderer <input-file>`.

## Action

The action works by generating a HTML and PDF version of your MAC and publishing it to GitHub Pages.

### Parameters

- `github-token`: The GitHub token, to be able to deploy. It's usually taken from `${{ secrets.GITHUB_TOKEN }}`

### How to use

First, grant permission to actions in your repository to read and write to it.
For that, go to `Settings` > `Actions` > `General`, and in the `Workflow permissions` section, select `Read and write permissions`.

Then, go to the repository `Settings`, and in the `Pages` tab, in `Source`, choose `GitHub Actions`. This will enable the site.

Finally, create a workflow in `.github/workflows/deploy.yml` with this content (Replace the branch name you want to use):

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
      - uses: ivancea/mac-renderer@v1
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

After that, the GitHub page with your CV will be available at `https://<username>.github.io/<repository>/`, and the CV at `https://<username>.github.io/<repository>/cv.pdf`.
