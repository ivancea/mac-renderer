import { marked } from "marked";
import { StudyType, PublicEntityDetails, Competence} from "../../../generated/mac";
import { assets } from "../../assets";
import { generatorFrom } from "../../utils";
import { generateTypeLabels } from "../common/typeLabelGenerator";
import { generateSkills } from "../common/skillsGenerator";

export const generateStudies = generatorFrom(async function* (
  studies: {
    studyType?: StudyType;
    degreeAchieved: boolean;
    name: string;
    startDate:  string;
    institution?: PublicEntityDetails;
    finishDate?: string;
    linkedCompetences?: Competence[];
  }[]
) {
  if (studies.length) {
    yield `<div class="right-column__studies">`;

    for (const study of studies) {
      const institution = study.institution;

      let imageUrl = await assets.studyDefaultIcon;
      let imageAlt = "Study";

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
          </div>
      `;

      yield `
          <div class="common__roles">
            <div class="common__role">
              <div class="common__role-dates">
                ${
                  new Date(study.startDate).toLocaleDateString("en-US", {
                        month: "2-digit",
                        year: "numeric",
                      })
                } - ${
            study.finishDate
              ? new Date(study.finishDate).toLocaleDateString("en-US", {
                  month: "2-digit",
                  year: "numeric",
                })
              : study.studyType === "certification" ? "Doesn't expire" : "Present"
          }
              </div>
              <div class="common__role-title">
                ${study.name}
                ${await generateTypeLabels(study.studyType)}
              </div>
      `;

      if (institution?.URL) {
        yield `
          <a class="common__role-url" href="${institution.URL}" target="_blank">
            <img class="common__role-url-icon" src="${await assets.linkIcon}" alt="Link">
            ${decodeURI(institution.URL.replace(/https?:\/\//, ""))}
          </a>
        `;
      }

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
