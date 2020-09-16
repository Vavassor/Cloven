export const joinClassNames = (
  ...classNames: (string | null | undefined | false)[]
): string => {
  return classNames
    .filter((className): className is string => !!className)
    .join(" ");
};

export const joinIds = (
  ...ids: (string | null | undefined | false)[]
): string => {
  return ids.filter((id): id is string => !!id).join(" ");
};
