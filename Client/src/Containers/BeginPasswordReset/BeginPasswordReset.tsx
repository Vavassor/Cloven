import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  BeginPasswordResetForm,
  Submission,
} from "../../Components/Forms/BeginPasswordResetForm";
import {
  AccountRecoveryDispatch,
  setIdentifyAccountResult,
} from "../../Contexts/AccountRecoveryDispatch";
import { routes } from "../../Routes";
import { identifyAccount } from "../../Utilities/Api/Account";
import { logError } from "../../Utilities/Logging";

export const BeginPasswordReset = () => {
  const dispatch = useContext(AccountRecoveryDispatch);
  const history = useHistory();

  const handleSubmit = async (submission: Submission) => {
    const identifyAccountResult = await identifyAccount(
      submission.emailOrUsername
    );
    dispatch(setIdentifyAccountResult(identifyAccountResult));
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
