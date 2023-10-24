import { assets } from "../assets";
import { Language, ManfredAwesomicCV } from "../mac";
import { generatorFrom } from "../utils";
import { generateContactItem } from "./leftColumn/contactItemGenerator";
import { generateLanguageGroup } from "./leftColumn/languageGroupGenerator";

export const generateLeftColumn = generatorFrom(async function* (mac: ManfredAwesomicCV) {
  const profile = mac.aboutMe.profile;

  if (profile.avatar && "link" in profile.avatar) {
    yield `
      <div class="left-column__image-holder">
        <img src="${profile.avatar.link}" alt="${profile.avatar.alt}" class="left-column__image">
      </div>
    `;
  }

  yield `
    <div>
      <div class="left-column__name">
        ${profile.name}
      </div>
      <div class="left-column__surnames">
        ${profile.surnames}
      </div>
    </div>
  `;

  yield `
    <div class="left-column__contact">
  `;

  if (profile.location) {
    yield `
      <div class="left-column__location">
        <img src="${await assets.locationIcon}" alt="Location">
        <span>${profile.location.municipality}, ${profile.location.country}</span>
      </div>
    `;
  }

  // Links
  if (mac.aboutMe.relevantLinks?.length) {
    // First, the public contact links
    const contact = mac.careerPreferences?.contact;

    const publicProfileLinks =
      (contact && "publicProfiles" in contact && contact?.publicProfiles) || [];

    if (publicProfileLinks.length) {
      for (const link of publicProfileLinks) {
        yield await generateContactItem(link);
      }
    }

    // Filter relevant links that aren't contact ones
    const publicProfileUrls = publicProfileLinks.map((link) => link.URL);

    const nonContactLinks =
      mac.aboutMe.relevantLinks?.filter((link) => !publicProfileUrls.includes(link.URL)) ?? [];

    // Second, the known links
    const knownLinks = nonContactLinks.filter((link) => link.type !== "other");

    for (const link of knownLinks) {
      yield await generateContactItem(link);
    }

    // Then, others
    const otherLinks = nonContactLinks.filter((link) => link.type === "other");

    for (const link of otherLinks) {
      yield await generateContactItem(link);
    }
  }

  yield `
    </div>
  `;

  const languages = mac.knowledge?.languages ?? [];
  if (languages.length) {
    yield `
      <div class="left-column__languages">
        <div class="left-column__languages-title">
            Languages
        </div>
    
        <div class="left-column__language-groups">
    `;

    const levels: (string | undefined)[] = [
      undefined,
      "Native or bilingual proficiency",
      "Full professional proficiency",
      "Professional working proficiency",
      "Limited working proficiency",
      "Elementary proficiency",
    ];

    const languagesByLevel = languages.reduce((acc, language) => {
      const level = language.level && levels.includes(language.level) ? language.level : undefined;
      const languages = acc.get(level) || [];
      languages.push(language);
      acc.set(level, languages);
      return acc;
    }, new Map<string | undefined, Language[]>());

    for (const level of levels) {
      yield await generateLanguageGroup(level, languagesByLevel.get(level) ?? []);
    }

    yield `
        </div>
      </div>
    `;
  }
});
