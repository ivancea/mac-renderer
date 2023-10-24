import {
  Competence,
  OrganizationType,
  ProjectType,
  PublicArtifactType,
  PublicEntityDetails,
  Role,
  StudyType,
  Tags,
} from "../generated/mac";

export * from "../generated/mac";

export type Job = {
  organization: PublicEntityDetails;
  type?: OrganizationType;
  roles: [Role, ...Role[]];
};

export type Project = {
  details?: PublicEntityDetails;
  type?: ProjectType;
  roles: Role[];
};

export type Study = {
  studyType?: StudyType;
  degreeAchieved: boolean;
  name: string;
  startDate: string;
  institution?: PublicEntityDetails;
  finishDate?: string;
  linkedCompetences?: Competence[];
};

export type Highlight = {
  details: PublicEntityDetails;
  type?: PublicArtifactType;
  publishingDate?: string;
  relatedCompetences?: Competence[];
  tags?: Tags;
};
