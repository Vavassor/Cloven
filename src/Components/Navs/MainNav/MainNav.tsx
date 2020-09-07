import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "../../Link";

export const MainNav = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <Link to="/home" type="Nav">
        {t("home.title")}
      </Link>
      <Link to="/register" type="Nav">
        {t("register.title")}
      </Link>
    </nav>
  );
};
