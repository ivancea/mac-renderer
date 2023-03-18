import { generatorFrom } from "../../utils";

export const generateTypeLabels = generatorFrom(async function* (type: string | undefined) {
  if (type == "proBono") {
    yield `<span class="common__type-label">Pro bono</span>`;
  } else if (type == "openSource") {
    yield `<span class="common__type-label">Open source</span>`;
  } else if (type == "sideProject") {
    yield `<span class="common__type-label">Side project</span>`;
  } else if (type == "personalAchievement") {
    yield `<span class="common__type-label">Achievement</span>`;
  }
});
