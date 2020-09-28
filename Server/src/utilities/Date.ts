export const getUnixEpoch = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const isPastTimestamp = (timestamp: number): boolean => {
  const currentTimestamp = getUnixEpoch();
  return currentTimestamp - timestamp <= 0;
};
