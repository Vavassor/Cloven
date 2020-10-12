import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Link } from "../../Components/Link";
import { routes } from "../../Routes";
import { getQueryParameters } from "../../Utilities/Url";

export const RecoveryConfirmation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParameters = getQueryParameters(location.search);
  const { email } = queryParameters;
  return (
    <>
      <h1>{t("recovery_confirmation.title")}</h1>
      <p>{t("recovery_confirmation.message", { email })}</p>
      <Link to={routes.home}>{t("recovery_confirmation.return_link")}</Link>
    </>
  );
};
