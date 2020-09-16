import React from "react";
import { NavLink } from "react-router-dom";
import { LoginForm } from "../../Components/Forms/LoginForm";
import { Link } from "../../Components/Link";
import { routes } from "../../Routes";

export const Login = () => {
  return (
    <>
      <NavLink to={routes.login}>
        <h1>Cloven</h1>
      </NavLink>
      <LoginForm />
      <Link to={routes.register}>Sign up</Link>
    </>
  );
};
