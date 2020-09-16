import React from "react";
import { NavLink } from "react-router-dom";
import { SendPasswordResetForm } from "../../Components/Forms/SendPasswordResetForm";
import { routes } from "../../Routes";

export const SendPasswordReset = () => {
  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      <SendPasswordResetForm />
    </>
  );
};
