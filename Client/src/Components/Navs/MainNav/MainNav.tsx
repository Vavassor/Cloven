import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthDispatch, logOut } from "../../../Contexts/AuthDispatch";
import { routes } from "../../../Routes";
import { Button } from "../../Button";
import { Link } from "../../Link";

export const MainNav = () => {
  const { t } = useTranslation();
  const dispatch = useContext(AuthDispatch);
  const history = useHistory();

  const handleClick = () => {
    dispatch(logOut());
    history.push(routes.login);
  };

  return (
    <nav>
      <Link to={routes.home} type="Nav">
        {t("home.title")}
      </Link>
      <Link to={routes.settings} type="Nav">
        {t("settings.title")}
      </Link>
      <Button onClick={handleClick}>Log out</Button>
    </nav>
  );
};
