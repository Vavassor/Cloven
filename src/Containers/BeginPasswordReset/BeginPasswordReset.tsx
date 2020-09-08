import React from "react";
import { NavLink } from "react-router-dom";
import { BeginPasswordResetForm } from "../../Components/Forms/BeginPasswordResetForm";
import { routes } from "../../Routes";

export const BeginPasswordReset = () => {
  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      <BeginPasswordResetForm />
    </>
  );
};
