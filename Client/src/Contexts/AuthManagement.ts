import { Dispatch } from "react";
import { exchangeRefreshToken } from "../Utilities/Api/Auth";
import { isAfterDate } from "../Utilities/Date";
import {
  createStoredAccessToken,
  loadAccount,
  storeAccount,
} from "../Utilities/Storage";
import { AccessToken, Account, AuthAction } from "./AuthContext";
import { refreshAccessToken } from "./AuthDispatch";

export const getRefreshedAccessToken = async (
  activeAccount: Account,
  dispatch: Dispatch<AuthAction>
): Promise<AccessToken> => {
  const { accessToken } = activeAccount;

  if (isAfterDate(accessToken.expirationDate)) {
    const storedAccount = loadAccount(activeAccount.id);
    if (!storedAccount) {
      throw new Error(
        "Missing a stored account while refreshing an access token."
      );
    }

    const newAccessToken = await exchangeRefreshToken(
      storedAccount.refresh_token
    );
    storedAccount.access_token = createStoredAccessToken(newAccessToken);
    storeAccount(storedAccount);
    dispatch(refreshAccessToken(newAccessToken, activeAccount.id));

    return newAccessToken;
  }

  return accessToken;
};
