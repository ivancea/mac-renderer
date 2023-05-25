import { promises as fs } from "fs";
import path from "path";

const assetsRoot = path.resolve(__dirname, "../images/");

async function asset(url: string) {
  const image = await fs.readFile(path.join(assetsRoot, url), "base64");

  return `data:image/svg+xml;base64,${image}`;
}

export const assets = {
  githubIcon: asset("github-icon.svg"),
  highlightDefaultIcon: asset("highlight-default-icon.svg"),
  jobDefaultIcon: asset("job-default-icon.svg"),
  linkIcon: asset("link-icon.svg"),
  linkedinIcon: asset("linkedin-icon.svg"),
  locationIcon: asset("location-icon.svg"),
  projectDefaultIcon: asset("project-default-icon.svg"),
  studyDefaultIcon: asset("study-default-icon.svg"),
  twitterIcon: asset("twitter-icon.svg"),
};
