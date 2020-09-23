import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Link } from "../../Components/Link";

export const PageNotFound: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  
  return (
    <>
      <h1>{t("page_not_found.title")}</h1>
      <p>{history.location.pathname}</p>
      <p>{t("page_not_found.message")}</p>
      <p>
        <Trans>
          Return to the <Link to="/">main page</Link>.
        </Trans>
      </p>
    </>
  );
};
