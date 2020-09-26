import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { Alert } from "../../Components/Alert";
import type { Submission } from "../../Components/Forms/LoginForm";
import { LoginForm } from "../../Components/Forms/LoginForm";
import { Link } from "../../Components/Link";
import { AuthDispatch, logIn } from "../../Contexts/AuthDispatch";
import { routes } from "../../Routes";
import { exchangePassword, getUserinfo } from "../../Utilities/Api/Auth";
import { logError } from "../../Utilities/Logging";
import { createStoredAccount, storeAccount } from "../../Utilities/Storage";

export const Login = () => {
  const dispatch = useContext(AuthDispatch);
  const history = useHistory();
  const { t } = useTranslation();
  const [hasSubmissionError, setHasSubmissionError] = useState(false);

  const handleSubmit = async (submission: Submission) => {
    setHasSubmissionError(false);
    const token = await exchangePassword(
      submission.username,
      submission.password
    );
    const userinfo = await getUserinfo(token);
    storeAccount(createStoredAccount(token, userinfo));
    dispatch(logIn(token, userinfo.accountId));
  };

  const handleSubmitFailure = (error: any) => {
    logError("Login failed.", error);
    setHasSubmissionError(true);
  };

  const handleSubmitSuccess = () => {
    history.push(routes.home);
  };

  return (
    <>
      <NavLink to={routes.login}>
        <h1>{t("app.title")}</h1>
      </NavLink>
      {hasSubmissionError && (
        <Alert>{t("login.submission_failure_error")}</Alert>
      )}
      <LoginForm
        handleSubmit={handleSubmit}
        handleSubmitFailure={handleSubmitFailure}
        handleSubmitSuccess={handleSubmitSuccess}
      />
      <Link to={routes.register}>{t("login.register_link")}</Link>
    </>
  );
};
