import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  BeginPasswordResetForm,
  Submission,
} from "../../Components/Forms/BeginPasswordResetForm";
import { routes } from "../../Routes";
import { beginPasswordReset } from "../../Utilities/Api/Account";
import { logError } from "../../Utilities/Logging";

export const BeginPasswordReset = () => {
  const history = useHistory();

  const handleSubmit = async (submission: Submission) => {
    const passwordResetResult = await beginPasswordReset(
      submission.emailOrUsername
    );
    console.log(passwordResetResult);
  };

  const handleSubmitFailure = (error: any) => {
    logError("Password reset beginning failed.", error);
  };

  const handleSubmitSuccess = () => {
    history.push(routes.sendPasswordReset);
  };

  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      <BeginPasswordResetForm
        handleSubmit={handleSubmit}
        handleSubmitFailure={handleSubmitFailure}
        handleSubmitSuccess={handleSubmitSuccess}
      />
    </>
  );
};
