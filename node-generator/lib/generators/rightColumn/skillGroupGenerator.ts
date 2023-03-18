import { Competence } from "../../../generated/mac";
import { generatorFrom } from "../../utils";
import { generateSkills } from "../common/skillsGenerator";

export const generateSkillGroup = generatorFrom(async function* (
  level: string | undefined,
  skills: Competence[]
) {
  if (skills.length) {
    const skillNames = skills.map((skill) => skill.name);

    yield `
      <div class="right-column__skill-group">
        <div class="right-column__skill-group-level">
            ${level ?? ""}
        </div>
        ${await generateSkills(skillNames)}
      </div>
    `;
  }
});
