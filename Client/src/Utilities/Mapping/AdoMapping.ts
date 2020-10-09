import { BeginPasswordResetAdo } from "../../Types/Ado/BeginPasswordResetAdo";

export const getBeginPasswordResetAdo = (
  query: string
): BeginPasswordResetAdo => {
  return {
    query,
  };
};
