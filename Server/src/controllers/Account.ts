import { RequestHandler } from "express";
import { join } from "path";
import isEmail from "validator/lib/isEmail";
import { getAccountAdoFromAccount } from "../mapping/AccountAdo";
import { getAccountSpecFromAccountSpecAdo } from "../mapping/domain/AccountSpec";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import {
  getPasswordResetResultAdoFromEmail,
  getPasswordResetResultAdoFromUsername,
} from "../mapping/PasswordResetResultAdo";
import * as AccountRepository from "../repositories/AccountRepository";
import { config, deviceDetector, emailTransporter } from "../server";
import { AccountAdo } from "../types/ado/AccountAdo";
import { AccountSpecAdo } from "../types/ado/AccountSpecAdo";
import { BeginPasswordResetAdo } from "../types/ado/BeginPasswordResetAdo";
import { ErrorAdo } from "../types/ado/ErrorAdo";
import { PasswordResetResultAdo } from "../types/ado/PasswordResetResultAdo";
import { SendPasswordResetAdo } from "../types/ado/SendPasswordResetAdo";
import { Account } from "../types/domain/Account";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { IdType } from "../types/IdType";
import { getPrivateKey } from "../utilities/Config";
import { sendMail } from "../utilities/Email";
import { readTextFile } from "../utilities/File";
import { obscureEmail } from "../utilities/Obscure";
import { hash } from "../utilities/Password";
import { fillTemplate } from "../utilities/Template";
import { createPasswordResetToken } from "../utilities/Token";
import { parseUserAgent } from "../utilities/UserAgent";

const PASSWORD_RESET_TOKEN_LIFETIME_SECONDS = 3600;

export const beginPasswordReset: RequestHandler<
  ParamsDictionary,
  PasswordResetResultAdo | ErrorAdo,
  BeginPasswordResetAdo,
  ParsedQs
> = async (request, response, next) => {
  const { query } = request.body;
  const isQueryEmail = isEmail(query);

  let account: Account | null;
  if (isQueryEmail) {
    account = await AccountRepository.findAccountByEmail(query);
  } else {
    account = await AccountRepository.findAccountByUsername(query);
  }

  if (!account) {
    response
      .status(HttpStatus.UnprocessableEntity)
      .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
    return;
  }

  const obscuredEmail = obscureEmail(account.email);

  let passwordResetResult: PasswordResetResultAdo;
  if (isQueryEmail) {
    passwordResetResult = getPasswordResetResultAdoFromEmail(
      account.email,
      obscuredEmail
    );
  } else {
    passwordResetResult = getPasswordResetResultAdoFromUsername(
      account.username,
      obscuredEmail
    );
  }
  response.json(passwordResetResult);
};

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

export const sendPasswordReset: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  SendPasswordResetAdo,
  ParsedQs
> = async (request, response, next) => {
  let account: Account | null;
  switch (request.body.type) {
    case IdType.Email:
      account = await AccountRepository.findAccountByEmail(request.body.email);
      break;

    case IdType.Username:
      account = await AccountRepository.findAccountByUsername(
        request.body.username
      );
      break;
  }

  if (!account) {
    response
      .status(HttpStatus.UnprocessableEntity)
      .json(getErrorAdoFromMessage(request.t("account.id_not_found_error")));
    return;
  }

  const doubleHashedPassword = await hash(account.password);
  const key = doubleHashedPassword.slice(0, 10);
  const privateKey = await getPrivateKey(config);
  const passwordResetToken = createPasswordResetToken(
    key,
    account.id,
    PASSWORD_RESET_TOKEN_LIFETIME_SECONDS,
    privateKey,
    config.urlRoot
  );

  const userAgent = request.header("User-Agent");
  const { client, os } = parseUserAgent(userAgent, deviceDetector);

  const emailTemplate = await readTextFile(
    join(config.fileRoot, "assets/password_reset_email.template")
  );

  const emailBody = fillTemplate(emailTemplate, {
    browser_name: client.name,
    operating_system: os.name,
    password_reset_link: `http://localhost:3001/reset_password?token=${passwordResetToken}`,
    product_name: "Cloven",
    recipient_name: account.username,
  });

  await sendMail(emailTransporter, {
    body: emailBody,
    sender: "Homie <homie@100.7.10.64>",
    subject: "Password Reset Requested",
    recipients: [account.email],
  });

  response.status(HttpStatus.NoContent).header("Content-Length", "0").end();
};
