import { promises as fs } from "fs";

async function asset(url: string) {
  const image = await fs.readFile(url, "base64");

  return `data:image/svg+xml;base64,${image}`;
}

export const assets = {
  githubIcon: asset("./images/github-icon.svg"),
  highlightDefaultIcon: asset("./images/highlight-default-icon.svg"),
  jobDefaultIcon: asset("./images/job-default-icon.svg"),
  linkIcon: asset("./images/link-icon.svg"),
  linkedinIcon: asset("./images/linkedin-icon.svg"),
  locationIcon: asset("./images/location-icon.svg"),
  projectDefaultIcon: asset("./images/project-default-icon.svg"),
  twitterIcon: asset("./images/twitter-icon.svg"),
};
