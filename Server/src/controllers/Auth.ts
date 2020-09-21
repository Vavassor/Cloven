import { RequestHandler } from "express";
import { getAccountAdo } from "../mapping/AccountAdo";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import { getTokenAdo } from "../mapping/TokenAdo";
import { Account } from "../models/Account";
import { ErrorAdo } from "../models/ErrorAdo";
import { TokenAdo } from "../models/TokenAdo";
import { TokenGrantAdo } from "../models/TokenGrantAdo";
import { urlRoot } from "../server";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { readTextFile } from "../utilities/File";
import { compareHash } from "../utilities/Password";
import { generateToken } from "../utilities/Token";

export const grantToken: RequestHandler<
  ParamsDictionary,
  TokenAdo | ErrorAdo,
  TokenGrantAdo,
  ParsedQs
> = async (request, response, next) => {
  switch (request.body.grant_type) {
    case "password": {
      const account = await Account.findOne({
        username: request.body.username,
      });
      if (!account) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(
            getErrorAdoFromMessage(
              request.t("token.invalid_grant_error_message")
            )
          );
      }

      const { password } = account.toObject();
      if (!compareHash(request.body.password, password)) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json(
            getErrorAdoFromMessage(
              request.t("token.invalid_grant_error_message")
            )
          );
      }

      const expiresIn = 3600;
      const privateKey = await readTextFile("jwtRS256.key");
      const accessToken = await generateToken(
        getAccountAdo(account),
        expiresIn,
        privateKey,
        urlRoot
      );

      response.header("Cache-Control", "no-store");
      response.header("Pragma", "no-cache");
      response.json(getTokenAdo(accessToken, expiresIn));
      break;
    }

    default: {
      response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          getErrorAdoFromMessage(
            request.t("token.unsupported_grant_type_error_message")
          )
        );
      break;
    }
  }
  next();
};
