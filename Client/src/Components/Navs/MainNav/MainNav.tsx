import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthContext, getActiveAccount } from "../../../Contexts/AuthContext";
import { AuthDispatch, logOut } from "../../../Contexts/AuthDispatch";
import { routes } from "../../../Routes";
import { removeAccount } from "../../../Utilities/Storage";
import { Button } from "../../Button";
import { Link } from "../../Link";

export const MainNav = () => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const activeAccount = getActiveAccount(authState);
  const dispatch = useContext(AuthDispatch);
  const history = useHistory();

  const handleClick = () => {
    if (activeAccount) {
      removeAccount(activeAccount.id);
    }
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
