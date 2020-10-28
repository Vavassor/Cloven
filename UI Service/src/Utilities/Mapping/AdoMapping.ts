import { IdAdo } from "../../Types/Ado/IdAdo";
import { IdentifyAccountAdo } from "../../Types/Ado/IdentifyAccountAdo";
import { Id } from "../../Types/Domain/IdentifyAccountResult";
import { IdType } from "../../Types/IdType";

export const getIdentifyAccountAdo = (query: string): IdentifyAccountAdo => {
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
