import React from "react";
import { LoginForm } from "../../Components/Forms/LoginForm";
import { Link } from "../../Components/Link";
import { routes } from "../../Routes";

export const Login = () => {
  return (
    <>
      <LoginForm />
      <Link to={routes.register}>Sign up</Link>
    </>
  );
};
