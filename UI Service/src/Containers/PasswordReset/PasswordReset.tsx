import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Alert } from "../../Components/Alert";
import {
  PasswordResetForm,
  Submission,
} from "../../Components/Forms/PasswordResetForm";
import { routes } from "../../Routes";
import { updatePassword } from "../../Utilities/Api/Account";
import { logError } from "../../Utilities/Logging";
import { getQueryParameters } from "../../Utilities/Url";

export const PasswordReset: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const queryParameters = getQueryParameters(location.search);
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const { token } = queryParameters;

  const handleSubmit = async (submission: Submission) => {
    setHasSubmissionError(true);
    await updatePassword(submission.password, token);
  };

  const handleSubmitFailure = (error: any) => {
    logError("Password reset failed.", error);
    setHasSubmissionError(true);
  };

  const handleSubmitSuccess = () => {
    history.push(routes.login);
  };

  return (
    <>
      <h1>{t("password_reset.title")}</h1>
      {hasSubmissionError && (
        <Alert>{t("password_reset.submission_failure_error")}</Alert>
      )}
      <PasswordResetForm
        handleSubmit={handleSubmit}
        handleSubmitFailure={handleSubmitFailure}
        handleSubmitSuccess={handleSubmitSuccess}
      />
    </>
  );
};
