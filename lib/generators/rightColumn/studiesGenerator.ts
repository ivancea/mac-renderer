import { marked } from "marked";
import { assets } from "../../assets";
import { Study } from "../../mac";
import { generatorFrom, sortByDates } from "../../utils";
import { generateSkills } from "../common/skillsGenerator";
import { generateTypeLabels } from "../common/typeLabelGenerator";

export const generateStudies = generatorFrom(async function* (studies: Study[]) {
  if (studies.length) {
    yield `<div class="right-column__studies">`;

    for (const study of sortByDates(studies)) {
      const institution = study.institution;

      yield `
        <div class="right-column__study">
          <div class="right-column__study-institution">
            <div class="right-column__study-institution-title">
      `;

      if (institution?.image && "link" in institution.image) {
        yield `<img class="right-column__study-institution-image" src="${
          institution.image.link
        }" alt="${("alt" in institution.image && institution.image.alt) || ""}"/>`;
      } else {
        yield `<img class="right-column__study-institution-image" src="${await assets.studyDefaultIcon}" alt="Study">`;
      }

      yield `
              <div class="right-column__study-institution-name">
                ${institution?.name}
              </div>
            </div>
      `;

      if (institution?.URL) {
        yield `
          <a class="right-column__study-institution-url" href="${institution.URL}" target="_blank">
            <img class="right-column__study-institution-url-icon" src="${await assets.linkIcon}" alt="Link">
            ${decodeURI(institution.URL.replace(/https?:\/\//, ""))}
          </a>
        `;
      }

      yield `
        </div>
        <div class="common__roles">
          <div class="common__role">
            <div class="common__role-dates">
              ${new Date(study.startDate).toLocaleDateString("en-US", {
                month: "2-digit",
                year: "numeric",
              })} ${
        study.finishDate
          ? " - " +
            new Date(study.finishDate).toLocaleDateString("en-US", {
              month: "2-digit",
              year: "numeric",
            })
          : study.studyType !== "certification"
          ? " - Present"
          : ""
      }
            </div>
            <div class="common__role-title">
              ${study.name}
              ${await generateTypeLabels(study.studyType)}
            </div>
      `;

      if (institution?.description && institution.description.length) {
        yield `
          <div class="common__role-challenges">
            <div class="common__role-challenge">
              ${marked(institution.description)}
            </div>
          </div>
        `;
      }

      if (study.linkedCompetences && study.linkedCompetences.length) {
        const competences = study.linkedCompetences.map((c) => c.name);

        yield `
          <div class="common__role-competences">
            ${await generateSkills(competences)}
          </div>
        `;
      }

      yield `
            </div>
          </div>
        </div>
      `;
    }

    yield `</div>`;
  }
});
