import { UserinfoAdo } from "../models/UserinfoAdo";
import { JwtPayload } from "../utilities/Token";

export const getUserinfoAdoFromJwtPayload = (
  jwtPayload: JwtPayload
): UserinfoAdo => {
  const { sub } = jwtPayload;
  return {
    sub,
  };
};
