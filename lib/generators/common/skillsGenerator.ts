import { generatorFrom } from "../../utils";

export const generateSkills = generatorFrom(function* (skills: string[]) {
  yield `
    <div class="common__skills">
  `;

  for (const skill of skills) {
    yield `
      <div class="common__skill">
        ${skill}
      </div>
    `;
  }

  yield `
    </div>
  `;
});
