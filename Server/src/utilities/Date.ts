const MILLISECONDS_PER_SECOND = 1000;

export const addSecondsToDate = (date: Date, seconds: number): Date => {
  const unixEpoch = MILLISECONDS_PER_SECOND * (getUnixEpoch(date) + seconds);
  return new Date(unixEpoch);
};

export const getUnixEpoch = (date: Date): number => {
  return Math.floor(date.getTime() / MILLISECONDS_PER_SECOND);
};
