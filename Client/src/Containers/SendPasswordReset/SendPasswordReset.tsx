import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { Alert } from "../../Components/Alert";
import {
  SendPasswordResetForm,
  Submission,
} from "../../Components/Forms/SendPasswordResetForm";
import { RadioOption } from "../../Components/RadioGroup";
import { AccountRecoveryContext } from "../../Contexts/AccountRecoverContext";
import { routes } from "../../Routes";
import { RecoveryMethod } from "../../Types/Domain/IdentifyAccountResult";
import { RecoveryMethodType } from "../../Types/RecoveryMethodType";
import { sendPasswordReset } from "../../Utilities/Api/Account";
import { logError } from "../../Utilities/Logging";

const getRadioOption = (recoveryMethod: RecoveryMethod): RadioOption => {
  switch (recoveryMethod.type) {
    case RecoveryMethodType.Email: {
      const { email, id } = recoveryMethod;
      return {
        id,
        label: email,
        value: email,
      };
    }
  }
};

const findRecoveryMethod = (
  recoveryMethods: RecoveryMethod[],
  radioOption: RadioOption
) => {
  return recoveryMethods.find((recoveryMethod) => {
    switch (recoveryMethod.type) {
      case RecoveryMethodType.Email:
        return recoveryMethod.email === radioOption.value;
      default:
        return false;
    }
  });
};

export const SendPasswordReset = () => {
  const { identifyAccountResult } = useContext(AccountRecoveryContext);
  const { t } = useTranslation();
  const history = useHistory();
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const { recoveryMethods, id } = identifyAccountResult!;
  const options = recoveryMethods.map(getRadioOption);

  const handleSubmit = async (submission: Submission) => {
    setHasSubmissionError(false);
    const recoveryMethod = findRecoveryMethod(
      recoveryMethods,
      submission.recoveryMethod
    );
    await sendPasswordReset(recoveryMethod!.id, recoveryMethod!.type, id);
  };

  const handleSubmitFailure = (error: any) => {
    logError("Password reset request failed.", error);
    setHasSubmissionError(true);
  };

  const handleSubmitSuccess = () => {
    history.push(routes.recoveryConfirmation);
  };

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
