import { assets } from "../../assets";
import { generatorFrom } from "../../utils";

export const generateContactItem = generatorFrom(async function* (contactItem: {
  type: string;
  URL: string;
}) {
  yield `
    <div class="left-column__contact-item">
      <a class="left-column__contact-item-link" href="${contactItem.URL}" target="_blank">
      `;

  if (contactItem.type === "github") {
    yield `<img src="${await assets.githubIcon}" alt="GitHub">`;
  } else if (contactItem.type === "twitter") {
    yield `<img src="${await assets.twitterIcon}" alt="Twitter">`;
  } else if (contactItem.type === "linkedin") {
    yield `<img src="${await assets.linkedinIcon}" alt="LinkedIn">`;
  }

  yield `
        <span>${decodeURI(contactItem.URL.replace(/https?:\/\//, ""))}</span>
      </a>
    </div>
  `;
});
