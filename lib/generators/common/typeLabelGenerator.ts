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
  } else if (type == "officialDegree") {
    yield `<span class="common__type-label">Official Degree</span>`;
  } else if (type == "certification") {
    yield `<span class="common__type-label">Certification</span>`;
  } else if (type == "selfTraining") {
    yield `<span class="common__type-label">Self Training</span>`;
  }
});
