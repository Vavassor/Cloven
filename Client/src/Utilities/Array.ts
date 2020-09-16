type Id = number | string;

interface HasId {
  id: Id;
}

export function add<T>(array: T[], value: T, index: number): T[] {
  return array.slice(0, index).concat(value, array.slice(index));
}

export function findById<T extends HasId>(array: T[], id: Id): T | undefined {
  return array.find((value) => value.id === id);
}

export const findIndexById = (array: HasId[], id: Id): number => {
  return array.findIndex((value) => value.id === id);
};

export function push<T>(array: T[] | undefined, value: T): T[] {
  return array ? array.concat(value) : [value];
}

export function remove<T>(array: T[], index: number): T[] {
  return array.slice(0, index).concat(array.slice(index + 1));
}

export function trimStart<T>(array: T[], limit: number): T[] {
  const extraLength = array.length - limit;
  if (extraLength > 0) {
    return array.slice(extraLength);
  }
  return array;
}
