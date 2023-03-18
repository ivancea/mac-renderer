import { OrganizationType, PublicEntityDetails, Role } from "../../../generated/mac";
import { assets } from "../../assets";
import { generatorFrom } from "../../utils";
import { generateRoles } from "../common/rolesGenerator";

export const generateJobs = generatorFrom(async function* (
  jobs: {
    organization: PublicEntityDetails;
    type?: OrganizationType;
    roles: [Role, ...Role[]];
  }[]
) {
  if (jobs.length) {
    yield `
      <div class="right-column__jobs">
    `;

    for (const job of jobs) {
      const organization = job.organization;

      yield `
        <div class="right-column__job">
          <div class="right-column__job-organization">
            <div class="right-column__job-organization-title">
      `;

      if (organization.image && "link" in organization.image) {
        yield `<img class="right-column__job-organization-image" src="${
          organization.image.link
        }" alt="${("alt" in organization.image && organization.image.alt) || ""}"/>`;
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
