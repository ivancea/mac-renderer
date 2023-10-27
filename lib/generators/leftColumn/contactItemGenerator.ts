import { makeLink } from "../../links";
import { generatorFrom } from "../../utils";

export const generateContactItem = generatorFrom(async function* (contactItem: {
  type: string;
  URL: string;
}) {
  const link = await makeLink(contactItem.URL);

  yield `
    <div class="left-column__contact-item">
      <a class="left-column__contact-item-link" href="${link.url}" target="_blank">
        <img src="${link.icon}" alt="${link.alt}">
        <span>${link.text}</span>
      </a>
    </div>
  `;
});
