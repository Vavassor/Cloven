import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "../../Components/Link";
import { routes } from "../../Routes";

export const RecoveryConfirmation: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("recovery_confirmation.title")}</h1>
      <p>{t("recovery_confirmation.message")}</p>
      <Link to={routes.home}>{t("recovery_confirmation.return_link")}</Link>
    </>
  );
};
