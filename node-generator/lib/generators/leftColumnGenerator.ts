import { ManfredAwesomicCV } from "../../generated/mac";
import { assets } from "../assets";
import { generatorFrom } from "../utils";

export const generateLeftColumn = generatorFrom(async function* (mac: ManfredAwesomicCV) {
  const profile = mac.aboutMe.profile;

  if (profile.avatar?.link) {
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
    yield `
        <!-- First, the public contact links -->
        {% if mac.careerPreferences.contact.publicProfiles %}
            {% assign public_profile_links = mac.careerPreferences.contact.publicProfiles %}
    
            {% for link in public_profile_links %}
            {% include left-column/contact-item.html link=link %}
            {% endfor %}
        {% else %}
            {% assign public_profile_links = "" | split: '' %}
        {% endif %}
    
        <!-- Filter relevant links that aren't contact ones -->
        {% assign public_profile_urls = public_profile_links | map: "URL" %}
        {% assign non_contact_links = "" | split: '' %}
        {% for link in mac.aboutMe.relevantLinks %}
            {% unless public_profile_urls contains link.URL %}
            {% assign non_contact_links = non_contact_links | push: link %}
            {% endunless %}
        {% endfor %}
    
        <!-- Second, the known links -->
        {% assign links = non_contact_links | where_exp: "link", "link.type != 'other'" %}
        {% for link in links %}
            {% include left-column/contact-item.html link=link %}
        {% endfor %}
    
        <!-- Then, others -->
        {% assign links = non_contact_links | where: "type", "other" %}
        {% for link in links %}
            {% include left-column/contact-item.html link=link %}
        {% endfor %}
    `;
  }

  yield `
    </div>
  `;

  if (mac?.knowledge?.languages) {
    yield `
      <div class="left-column__languages">
        <div class="left-column__languages-title">
            Languages
        </div>
    
        <div class="left-column__language-groups">
            {% assign languages = mac.knowledge.languages | where_exp: "language", "language.level == nil" | map: "name" %}
            {% include left-column/language-group.html level="" languages=languages %}
    
            {% assign languages = mac.knowledge.languages | where: "level", "Native or bilingual proficiency" | map: "name" %}
            {% include left-column/language-group.html level="Native or bilingual proficiency" languages=languages %}
    
            {% assign languages = mac.knowledge.languages | where: "level", "Full professional proficiency" | map: "name" %}
            {% include left-column/language-group.html level="Full professional proficiency" languages=languages %}
    
            {% assign languages = mac.knowledge.languages | where: "level", "Professional working proficiency" | map: "name" %}
            {% include left-column/language-group.html level="Professional working proficiency" languages=languages %}
    
            {% assign languages = mac.knowledge.languages | where: "level", "Limited working proficiency" | map: "name" %}
            {% include left-column/language-group.html level="Limited working proficiency" languages=languages %}
    
            {% assign languages = mac.knowledge.languages | where: "level", "Elementary proficiency" | map: "name" %}
            {% include left-column/language-group.html level="Elementary proficiency" languages=languages %}
        </div>
      </div>
    `;
  }
});
