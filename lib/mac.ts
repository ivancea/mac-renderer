import { ManfredAwesomicCV } from "../generated/mac";

export * from "../generated/mac";

export type Language = Exclude<
  Exclude<ManfredAwesomicCV["knowledge"], undefined>["languages"],
  undefined
>[0];

export type Job = Exclude<
  Exclude<ManfredAwesomicCV["experience"], undefined>["jobs"],
  undefined
>[0];

export type Project = Exclude<
  Exclude<ManfredAwesomicCV["experience"], undefined>["projects"],
  undefined
>[0];

export type Study = Exclude<
  Exclude<ManfredAwesomicCV["knowledge"], undefined>["studies"],
  undefined
>[0];

export type Highlight = Exclude<
  Exclude<ManfredAwesomicCV["experience"], undefined>["publicArtifacts"],
  undefined
>[0];
