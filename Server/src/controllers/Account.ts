import { RequestHandler } from "express";
import { getAccountAdoFromAccount } from "../mapping/AccountAdo";
import { getAccountSpecFromAccountSpecAdo } from "../mapping/domain/AccountSpec";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import * as AccountRepository from "../repositories/AccountRepository";
import { AccountAdo } from "../types/ado/AccountAdo";
import { AccountSpecAdo } from "../types/ado/AccountSpecAdo";
import { ErrorAdo } from "../types/ado/ErrorAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";

export const createAccount: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  AccountSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const accountSpec = getAccountSpecFromAccountSpecAdo(request.body);
  const account = await AccountRepository.createAccount(accountSpec);
  response.json(getAccountAdoFromAccount(account));
};

export const deleteAccount: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  await AccountRepository.deleteAccount(request.params.id);
  response.status(HttpStatus.NoContent).end();
};

export const getAccountById: RequestHandler<
  ParamsDictionary,
  AccountAdo | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const account = await AccountRepository.findAccountById(request.params.id);
  if (!account) {
    response
      .status(HttpStatus.NotFound)
      .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
  } else {
    response.json(getAccountAdoFromAccount(account));
  }
};
