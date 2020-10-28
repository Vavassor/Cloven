import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { RegistrationForm } from "../../Components/Forms/RegistrationForm";
import { routes } from "../../Routes";

export const Register = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmitSuccess = () => {
    history.push(routes.login);
  };

  return (
    <>
      <NavLink to={routes.login}>
        <h1>{t("app.title")}</h1>
      </NavLink>
      <RegistrationForm handleSubmitSuccess={handleSubmitSuccess} />
    </>
  );
};
