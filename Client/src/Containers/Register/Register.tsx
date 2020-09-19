import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { RegistrationForm } from "../../Components/Forms/RegistrationForm";
import { routes } from "../../Routes";

export const Register = () => {
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push(routes.login);
  };

  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      <RegistrationForm handleSubmitSuccess={handleSubmitSuccess} />
    </>
  );
};
