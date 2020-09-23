import { RequestHandler } from "express";
import { getAccountAdo } from "../mapping/AccountAdo";
import { getAccountFromAccountSpecAdo } from "../mapping/AccountSpecAdo";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import { Account } from "../models/Account";
import { AccountAdo } from "../models/AccountAdo";
import { AccountSpecAdo } from "../models/AccountSpecAdo";
import { ErrorAdo } from "../models/ErrorAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";

export const createAccount: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  AccountSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  try {
    const accountQuery = await getAccountFromAccountSpecAdo(request.body);
    const account = await Account.create(accountQuery);
    response.json(getAccountAdo(account));
  } catch (error) {
    next(error);
  }
};

export const deleteAccount: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  try {
    await Account.deleteOne({ _id: request.params.id });
    response.status(HttpStatus.NoContent).end();
  } catch (error) {
    next(error);
  }
};

export const getAccountById: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  try {
    const account = await Account.findById(request.params.id);
    if (!account) {
      response
        .status(HttpStatus.NotFound)
        .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
    } else {
      response.json(getAccountAdo(account));
    }
  } catch (error) {
    next(error);
  }
};
