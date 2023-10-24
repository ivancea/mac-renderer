import { Highlight, Job, Project, Study } from "./mac";

export function generatorFrom<T extends unknown[]>(
  generator: (...args: T) => AsyncGenerator<string>
): (...args: T) => Promise<string> {
  return async (...args: T) => {
    const parts = [];

    for await (const part of generator(...args)) {
      parts.push(part);
    }

    return parts.join("");
  };
}

export function sortByDates(elements: Job[]): Job[];
export function sortByDates(elements: Study[]): Study[];
export function sortByDates(elements: Project[]): Project[];
export function sortByDates(elements: Highlight[]): Highlight[];
export function sortByDates(
  elements: Job[] | Study[] | Project[] | Highlight[]
): Job[] | Study[] | Project[] | Highlight[] {
  if (elements.length === 0) {
    return elements;
  }

  if (isArrayOfType<Job[] | Project[]>(elements, (e) => "roles" in e)) {
    return sortByDatesInternal(
      elements,
      (e) => e.roles[0].startDate,
      (e) => e.roles[0].finishDate
    );
  }

  if (isArrayOfType<Highlight[]>(elements, (e) => "publishingDate" in e)) {
    return sortByDatesInternal(elements, (e) => e.publishingDate);
  }

  return elements.sort((a, b) => {
    if (a.startDate === b.startDate) {
      if (!a.finishDate) {
        return -1;
      }

      if (!b.finishDate) {
        return 1;
      }

      return a.finishDate < b.finishDate ? 1 : -1;
    }

    return a.startDate < b.startDate ? 1 : -1;
  });
}

function isArrayOfType<T extends object[]>(
  elements: object[],
  typeGuard: (element: object) => boolean
): elements is T {
  return elements.length === 0 || typeGuard(elements[0]);
}

function sortByDatesInternal<T extends object[]>(
  elements: T,
  startDateGetter: (element: T[0]) => string | undefined,
  finishDateGetter: (element: T[0]) => string | undefined = () => undefined
): T {
  return elements.sort((a, b) => {
    const aStartDate = startDateGetter(a);
    const bStartDate = startDateGetter(b);

    if (!aStartDate) {
      return -1;
    }

    if (!bStartDate) {
      return 1;
    }

    if (aStartDate === bStartDate) {
      const aFinishDate = finishDateGetter(a);
      const bFinishDate = finishDateGetter(b);

      if (!aFinishDate) {
        return -1;
      }

      if (!bFinishDate) {
        return 1;
      }

      return aFinishDate < bFinishDate ? 1 : -1;
    }

    return aStartDate < bStartDate ? 1 : -1;
  });
}
