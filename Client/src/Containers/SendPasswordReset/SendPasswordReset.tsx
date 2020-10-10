import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Alert } from "../../Components/Alert";
import {
  SendPasswordResetForm,
  Submission,
} from "../../Components/Forms/SendPasswordResetForm";
import { RadioOption } from "../../Components/RadioGroup";
import { AccountRecoveryContext } from "../../Contexts/AccountRecoverContext";
import { routes } from "../../Routes";
import { SideChannel } from "../../Types/Domain/PasswordResetResult";
import { SideChannelType } from "../../Types/SideChannelType";
import { sendPasswordReset } from "../../Utilities/Api/Account";
import { logError } from "../../Utilities/Logging";

const getRadioOption = (sideChannel: SideChannel): RadioOption => {
  switch (sideChannel.type) {
    case SideChannelType.Email: {
      const { email, id } = sideChannel;
      return {
        id,
        label: email,
        value: email,
      };
    }
  }
};

export const SendPasswordReset = () => {
  const { passwordResetResult } = useContext(AccountRecoveryContext);
  const { t } = useTranslation();
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const { results, id } = passwordResetResult!;
  const options = results.map(getRadioOption);

  const handleSubmit = async (submission: Submission) => {
    setHasSubmissionError(false);
    const result = results.find(
      (result) => result.email === submission.email.value
    );
    await sendPasswordReset(result!.id, SideChannelType.Email, id);
  };

  const handleSubmitFailure = (error: any) => {
    logError("Password reset request failed.", error);
    setHasSubmissionError(true);
  };

  const handleSubmitSuccess = () => {};

  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      {hasSubmissionError && (
        <Alert>{t("send_password_reset.submission_failure_error")}</Alert>
      )}
      <SendPasswordResetForm
        handleSubmit={handleSubmit}
        handleSubmitFailure={handleSubmitFailure}
        handleSubmitSuccess={handleSubmitSuccess}
        options={options}
      />
    </>
  );
};
