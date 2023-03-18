import { marked } from "marked";
import { Role } from "../../../generated/mac";
import { generatorFrom } from "../../utils";
import { generateSkills } from "./skillsGenerator";

export const generateRoles = generatorFrom(async function* (roles: Role[]) {
  if (roles.length) {
    yield `<div class="common__roles">`;
    for (const role of roles) {
      yield `
        <div class="common__role">
          <div class="common__role-dates">
            ${
              role.startDate
                ? new Date(role.startDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    year: "numeric",
                  })
                : ""
            } - ${
        role.finishDate
          ? new Date(role.finishDate).toLocaleDateString("en-US", {
              month: "2-digit",
              year: "numeric",
            })
          : "Present"
      }
          </div>
          <div class="common__role-title">
            ${role.name}
          </div>
      `;

      if (role.competences && role.competences.length) {
        const competences = role.competences.map((c) => c.name);

        yield `
          <div class="common__role-competences">
            ${await generateSkills(competences)}
          </div>
        `;
      }

      if (role.challenges && role.challenges.length) {
        yield `
          <div class="common__role-challenges">
        `;

        for (const challenge of role.challenges) {
          yield `
            <div class="common__role-challenge">
              ${marked(challenge.description)}
            </div>
          `;
        }

        yield `
          </div>
        `;
      }

      yield `
        </div>
      `;
    }

    yield `
      </div>
    `;
  }
});
