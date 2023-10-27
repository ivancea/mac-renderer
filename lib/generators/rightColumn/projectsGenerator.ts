import { marked } from "marked";
import { assets } from "../../assets";
import { Project } from "../../mac";
import { generatorFrom, sortByDates } from "../../utils";
import { generateRoles } from "../common/rolesGenerator";
import { generateTypeLabels } from "../common/typeLabelGenerator";
import { makeLink } from "../../links";

export const generateProjects = generatorFrom(async function* (projects: Project[]) {
  if (projects.length) {
    yield `<div class="right-column__projects">`;

    for (const project of sortByDates(projects)) {
      const { details, roles } = project;

      let imageUrl = await assets.projectDefaultIcon;
      let imageAlt = "Project";

      if (details?.image && "link" in details.image) {
        imageUrl = details.image.link;
      }

      if (details?.image && "alt" in details.image) {
        imageAlt = details.image.alt as string;
      }

      const link = await makeLink(details?.URL);

      yield `
        <div class="right-column__project">
          <div class="right-column__project-title">
            <img class="right-column__project-title-image" src="${imageUrl}" alt="${imageAlt}" />
            <div class="right-column__project-title-name">
              ${details?.name}
              ${await generateTypeLabels(project.type)}
            </div>
          </div>
          ${
            link || details?.description
              ? `
            <div class="right-column__project-details">
              ${
                link
                  ? `
                <a class="right-column__project-details-url" href="${link.url}" target="_blank">
                  <img class="right-column__project-details-url-icon" src="${link.icon}" alt="${link.alt}" />
                  ${link.text}
                </a>
              `
                  : ""
              }
              ${
                details?.description
                  ? `
                <div class="right-column__project-details-description">
                  ${marked(details.description)}
                </div>
              `
                  : ""
              }
            </div>
          `
              : ""
          }
          ${await generateRoles(roles)}
        </div>
      `;
    }

    yield `</div>`;
  }
});
