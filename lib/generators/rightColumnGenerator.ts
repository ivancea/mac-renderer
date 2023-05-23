import { marked } from "marked";
import { Competence, ManfredAwesomicCV } from "../../generated/mac";
import { generatorFrom } from "../utils";
import { generateHighlights } from "./rightColumn/highlightsGenerator";
import { generateJobs } from "./rightColumn/jobsGenerator";
import { generateProjects } from "./rightColumn/projectsGenerator";
import { generateSection } from "./rightColumn/sectionGenerator";
import { generateSkillGroup } from "./rightColumn/skillGroupGenerator";
import { generateStudies } from "./rightColumn/studiesGenerator";

export const generateRightColumn = generatorFrom(async function* (mac: ManfredAwesomicCV) {
  if (mac.aboutMe.profile.description) {
    yield await generateSection(
      "About me",
      `
        <div class="right-column__about-me">
          ${await marked(mac.aboutMe.profile.description)}
        </div>
      `
    );
  }

  if (mac.knowledge?.hardSkills) {
    const skillsByLevel = mac.knowledge.hardSkills.reduce((acc, skill) => {
      if (skill.skill) {
        const level = skill.level;
        const languages = acc.get(level) || [];
        languages.push(skill.skill);
        acc.set(level, languages);
      }
      return acc;
    }, new Map<string | undefined, Competence[]>());

    yield await generateSection(
      "Skills",
      `
        <div class="right-column__skills">
          ${await generateSkillGroup(undefined, skillsByLevel.get(undefined) || [])}
          ${await generateSkillGroup("Expert", skillsByLevel.get("expert") || [])}
          ${await generateSkillGroup("High", skillsByLevel.get("high") || [])}
          ${await generateSkillGroup("Intermediate", skillsByLevel.get("intermediate") || [])}
          ${await generateSkillGroup("Basic", skillsByLevel.get("basic") || [])}
        </div>
      `
    );
  }

  if (mac.experience?.jobs?.length) {
    yield await generateSection("Work experience", await generateJobs(mac.experience.jobs));
  }

  if (mac.knowledge?.studies?.length) {
    yield await generateSection("Studies", await generateStudies(mac.knowledge.studies));
  }

  if (mac.experience?.projects?.length) {
    yield await generateSection("Projects", await generateProjects(mac.experience.projects));
  }

  if (mac.experience?.publicArtifacts?.length) {
    yield await generateSection(
      "Highlights",
      await generateHighlights(mac.experience.publicArtifacts)
    );
  }
});
