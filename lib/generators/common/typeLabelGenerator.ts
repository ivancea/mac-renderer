import { ProjectType, PublicArtifactType, StudyType } from "../../mac";
import { generatorFrom } from "../../utils";

export const generateTypeLabels = generatorFrom(function* (
  type: StudyType | ProjectType | PublicArtifactType | undefined,
) {
  switch (type) {
    case "proBono":
      yield `<span class="common__type-label">Pro bono</span>`;
      break;
    case "openSource":
      yield `<span class="common__type-label">Open source</span>`;
      break;
    case "sideProject":
      yield `<span class="common__type-label">Side project</span>`;
      break;
    case "personalAchievement":
      yield `<span class="common__type-label">Achievement</span>`;
      break;
    case "officialDegree":
      yield `<span class="common__type-label">Official Degree</span>`;
      break;
    case "certification":
      yield `<span class="common__type-label">Certification</span>`;
      break;
    case "selfTraining":
      yield `<span class="common__type-label">Self Training</span>`;
      break;
    case "unaccredited":
      yield `<span class="common__type-label">Unaccredited</span>`;
      break;
    case "post":
      yield `<span class="common__type-label">Post</span>`;
      break;
    case "talk":
      yield `<span class="common__type-label">Talk</span>`;
      break;
    case "achievement":
      yield `<span class="common__type-label">Achievement</span>`;
      break;
    case "launch":
      yield `<span class="common__type-label">Launch</span>`;
      break;
    case "video":
      yield `<span class="common__type-label">Video</span>`;
      break;
    case "other":
      yield `<span class="common__type-label">Other</span>`;
      break;
    case undefined:
  }
});
