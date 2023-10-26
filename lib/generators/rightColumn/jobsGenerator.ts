import { assets } from "../../assets";
import { Job } from "../../mac";
import { generatorFrom, sortByDates } from "../../utils";
import { generateRoles } from "../common/rolesGenerator";

export const generateJobs = generatorFrom(async function* (jobs: Job[]) {
  if (jobs.length) {
    yield `
      <div class="right-column__jobs">
    `;

    for (const job of sortByDates(jobs)) {
      const organization = job.organization;

      yield `
        <div class="right-column__job">
          <div class="right-column__job-organization">
            <div class="right-column__job-organization-title">
      `;

      const organizationImage = organization.image;

      if (organizationImage && "link" in organizationImage) {
        yield `<img class="right-column__job-organization-image" src="${
          organizationImage.link
        }" alt="${organizationImage.alt || ""}"/>`;
      } else {
        yield `<img class="right-column__job-organization-image" src="${await assets.jobDefaultIcon}" alt="Job">`;
      }

      yield `
              <div class="right-column__job-organization-name">
                ${organization.name}
              </div>
            </div>
      `;

      if (organization.URL) {
        yield `
          <a class="right-column__job-organization-url" href="${organization.URL}" target="_blank">
            <img class="right-column__job-organization-url-icon" src="${await assets.linkIcon}" alt="Link">
            ${decodeURI(organization.URL.replace(/https?:\/\//, ""))}
          </a>
        `;
      }

      yield `
          </div>

          ${await generateRoles(job.roles)}
        </div>
      `;
    }

    yield `
      </div>
    `;
  }
});
