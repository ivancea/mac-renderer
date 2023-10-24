import { assets } from "../../assets";
import { Highlight } from "../../mac";
import { generatorFrom, sortByDates } from "../../utils";
import { generateSkills } from "../common/skillsGenerator";
import { generateTypeLabels } from "../common/typeLabelGenerator";

export const generateHighlights = generatorFrom(async function* (highlights: Highlight[]) {
  if (highlights.length) {
    yield `<div class="right-column__highlights">`;

    for (const highlight of sortByDates(highlights)) {
      const { details } = highlight;

      let imageUrl = await assets.highlightDefaultIcon;
      let imageAlt = "Highlight";

      if (details?.image && "link" in details.image) {
        imageUrl = details.image.link;
      }

      if (details?.image && "alt" in details.image) {
        imageAlt = details.image.alt as string;
      }

      let urlText = "";
      if (details?.URL) {
        urlText = `${decodeURI(details.URL.replace(/https?:\/\//, ""))}`;
      }

      yield `
        <div class="right-column__highlight">
          <div class="right-column__highlight-title">
            <img class="right-column__highlight-title-image" src="${imageUrl}" alt="${imageAlt}" />
            <div class="right-column__highlight-title-name">
              ${details?.name}
              ${await generateTypeLabels(highlight.type)}
            </div>
          </div>
          ${
            urlText || details?.description
              ? `
            <div class="right-column__highlight-details">
              ${
                urlText
                  ? `
                <a class="right-column__highlight-details-url" href="${
                  details?.URL
                }" target="_blank">
                  <img class="right-column__highlight-details-url-icon" src="${await assets.linkIcon}" alt="Link" />
                  ${urlText}
                </a>
              `
                  : ""
              }
              ${
                details?.description
                  ? `
                <div class="right-column__highlight-details-description">
                  ${details.description}
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
                  highlight.publishingDate
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
