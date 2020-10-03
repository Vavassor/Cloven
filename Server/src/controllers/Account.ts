import { RequestHandler } from "express";
import { join } from "path";
import { getAccountAdoFromAccount } from "../mapping/AccountAdo";
import { getAccountSpecFromAccountSpecAdo } from "../mapping/domain/AccountSpec";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import * as AccountRepository from "../repositories/AccountRepository";
import { deviceDetector, emailTransporter, pathRoot } from "../server";
import { AccountAdo } from "../types/ado/AccountAdo";
import { AccountSpecAdo } from "../types/ado/AccountSpecAdo";
import { ErrorAdo } from "../types/ado/ErrorAdo";
import { PasswordResetAdo } from "../types/ado/PasswordResetAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { sendMail } from "../utilities/Email";
import { readTextFile } from "../utilities/File";
import { fillTemplate } from "../utilities/Template";
import { parseUserAgent } from "../utilities/UserAgent";

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

export const beginPasswordReset: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  PasswordResetAdo,
  ParsedQs
> = async (request, response, next) => {
  const userAgent = request.header("User-Agent");
  const { client, os } = parseUserAgent(userAgent, deviceDetector);

  const emailTemplate = await readTextFile(
    join(pathRoot, "assets/password_reset_email.template")
  );

  const emailBody = fillTemplate(emailTemplate, {
    browser_name: client.name,
    operating_system: os.name,
    password_reset_link: "http://localhost:3001/whoa",
    product_name: "Cloven",
    recipient_name: "Copernicus",
  });

  await sendMail(emailTransporter, {
    body: emailBody,
    sender: "Homie <homie@100.7.10.64>",
    subject: "Success",
    recipients: [request.body.email],
  });

  response.status(HttpStatus.NoContent).header("Content-Length", "0").end();
};
