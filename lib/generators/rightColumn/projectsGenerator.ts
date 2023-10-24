import { marked } from "marked";
import { assets } from "../../assets";
import { Project } from "../../mac";
import { generatorFrom, sortByDates } from "../../utils";
import { generateRoles } from "../common/rolesGenerator";
import { generateTypeLabels } from "../common/typeLabelGenerator";

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

      let urlText = "";
      if (details?.URL) {
        urlText = `${decodeURI(details.URL.replace(/https?:\/\//, ""))}`;
      }

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
            urlText || details?.description
              ? `
            <div class="right-column__project-details">
              ${
                urlText
                  ? `
                <a class="right-column__project-details-url" href="${details?.URL}" target="_blank">
                  <img class="right-column__project-details-url-icon" src="${await assets.linkIcon}" alt="Link" />
                  ${urlText}
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
