export const getUnixEpoch = (): number => {
  return Math.floor(Date.now() / 1000);
};
