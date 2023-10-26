import { generatorFrom } from "../../utils";

export const generateSection = generatorFrom(function* (title: string, content: string) {
  yield `
    <div class="right-column__section">
      <div class="right-column__section-title">
        ${title}
      </div>
      <div class="right-column__section-content">
        ${content}
      </div>
    </div>
  `;
});
