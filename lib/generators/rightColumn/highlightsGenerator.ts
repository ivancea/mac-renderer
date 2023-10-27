import { marked } from "marked";
import { assets } from "../../assets";
import { Highlight } from "../../mac";
import { generatorFrom, sortByDates } from "../../utils";
import { generateSkills } from "../common/skillsGenerator";
import { generateTypeLabels } from "../common/typeLabelGenerator";
import { makeLink } from "../../links";

export const generateHighlights = generatorFrom(async function* (highlights: Highlight[]) {
  if (highlights.length) {
    yield `<div class="right-column__highlights">`;

    for (const highlight of sortByDates(highlights)) {
      const { details } = highlight;

      let imageUrl = await assets.highlightDefaultIcon;
      let imageAlt = "Highlight";

      if (details.image && "link" in details.image) {
        imageUrl = details.image.link;
      }

      if (details.image && details.image.alt) {
        imageAlt = details.image.alt;
      }

      const link = await makeLink(details.URL);

      yield `
        <div class="right-column__highlight">
          <div class="right-column__highlight-title">
            <img class="right-column__highlight-title-image" src="${imageUrl}" alt="${imageAlt}" />
            <div class="right-column__highlight-title-name">
              ${details.name}
              ${await generateTypeLabels(highlight.type)}
            </div>
          </div>
          ${
            link || details.description
              ? `
            <div class="right-column__highlight-details">
              ${
                link
                  ? `
                <a class="right-column__highlight-details-url" href="${link.url}" target="_blank">
                  <img class="right-column__highlight-details-url-icon" src="${link.icon}" alt="${link.alt}" />
                  ${link.text}
                </a>
              `
                  : ""
              }
              ${
                details.description
                  ? `
                <div class="right-column__highlight-details-description">
                  ${marked(details.description)}
                </div>
              `
                  : ""
              }
            </div>
          `
              : ""
          }
          ${
            highlight.publishingDate
              ? `<div class="right-column__highlight-date">${new Date(
                  highlight.publishingDate,
                ).toLocaleDateString("en-US", { month: "2-digit", year: "numeric" })}</div>`
              : ""
          }

          ${await generateSkills(highlight.relatedCompetences?.map((c) => c.name) ?? [])}
        </div>
      `;
    }

    yield `</div>`;
  }
});
