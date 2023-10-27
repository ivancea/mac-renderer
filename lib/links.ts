import { assets } from "./assets";

type LinkData = {
  url: string;
  text: string;
  icon: string;
  alt: string;
};

export async function makeLink(url: string): Promise<LinkData>;
export async function makeLink(url?: string): Promise<LinkData | undefined>;
export async function makeLink(url?: string): Promise<LinkData | undefined> {
  if (!url) {
    return undefined;
  }

  return {
    url: url,
    text: `${decodeURI(url.replace(/https?:\/\//, ""))}`,
    ...(await iconForUrl(url)),
  };
}

async function iconForUrl(url: string) {
  if (url.includes("github.com")) {
    return {
      icon: await assets.githubIcon,
      alt: "GitHub",
    };
  }

  if (url.includes("twitter.com")) {
    return {
      icon: await assets.twitterIcon,
      alt: "Twitter",
    };
  }

  if (url.includes("linkedin.com")) {
    return {
      icon: await assets.linkedinIcon,
      alt: "LinkedIn",
    };
  }

  return {
    icon: await assets.linkIcon,
    alt: "Link",
  };
}
