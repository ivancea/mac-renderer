import { Language } from "../../mac";
import { generatorFrom } from "../../utils";

export const generateLanguageGroup = generatorFrom(async function* (
  level: string | undefined,
  languages: Language[]
) {
  if (languages.length) {
    yield `
      <div class="left-column__language-group">
        <div class="left-column__language-level">
    `;

    if (level === "Native or bilingual proficiency") {
      yield "Native (C1/C2)";
    } else if (level === "Full professional proficiency") {
      yield "Fluid (B2)";
    } else if (level === "Professional working proficiency") {
      yield "Intermediate (B1)";
    } else if (level === "Limited working proficiency") {
      yield "Basic (A2/B1)";
    } else if (level === "Elementary proficiency") {
      yield "Beginner (A1/A2)";
    }

    yield `
      </div>
    `;

    for (const language of languages) {
      yield `
        <div class="left-column__language">
          ${language.fullName ?? language.name}
        </div>
      `;
    }

    yield `
      </div>
    `;
  }
});
