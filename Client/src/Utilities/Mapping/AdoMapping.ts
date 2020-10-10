import { BeginPasswordResetAdo } from "../../Types/Ado/BeginPasswordResetAdo";
import { IdAdo } from "../../Types/Ado/IdAdo";
import { Id } from "../../Types/Domain/PasswordResetResult";
import { IdType } from "../../Types/IdType";

export const getBeginPasswordResetAdo = (
  query: string
): BeginPasswordResetAdo => {
  return {
    query,
  };
};

export const getIdAdo = (id: Id): IdAdo => {
  switch (id.type) {
    case IdType.Email: {
      const { type, email } = id;
      return {
        email,
        type,
      };
    }

    case IdType.Username: {
      const { type, username } = id;
      return {
        username,
        type,
      };
    }
  }
};
