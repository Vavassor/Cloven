import React from "react";
import { NavLink } from "react-router-dom";
import { RegistrationForm } from "../../Components/Forms/RegistrationForm";
import { routes } from "../../Routes";

export const Register = () => {
  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      <RegistrationForm />
    </>
  );
};
