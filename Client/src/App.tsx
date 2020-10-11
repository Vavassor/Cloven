import React, { useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { MainNav } from "./Components/Navs/MainNav";
import { BeginPasswordReset } from "./Containers/BeginPasswordReset";
import { Home } from "./Containers/Home";
import { Login } from "./Containers/Login";
import { PageNotFound } from "./Containers/PageNotFound";
import { RecoveryConfirmation } from "./Containers/RecoveryConfirmation";
import { Register } from "./Containers/Register";
import { SendPasswordReset } from "./Containers/SendPasswordReset";
import { Settings } from "./Containers/Settings";
import {
  AccountRecoveryContext,
  accountRecoveryReducer,
  initialAccountRecoveryState,
} from "./Contexts/AccountRecoverContext";
import { AccountRecoveryDispatch } from "./Contexts/AccountRecoveryDispatch";
import {
  AuthContext,
  authReducer,
  initialAuthState,
  isLoggedIn,
} from "./Contexts/AuthContext";
import { AuthDispatch } from "./Contexts/AuthDispatch";
import {
  initialThemeState,
  ThemeContext,
  themeReducer,
} from "./Contexts/ThemeContext";
import { ThemeDispatch } from "./Contexts/ThemeDispatch";
import { routes } from "./Routes";
import { useAuthSetup } from "./Utilities/Hooks/useAuthSetup";
import { useErrorHandler } from "./Utilities/Hooks/useErrorHandler";
import { useLocaleSetup } from "./Utilities/Hooks/useLocaleSetup";
import { useThemeSetup } from "./Utilities/Hooks/useThemeSetup";

const App = () => {
  const loadedAuthState = useAuthSetup(initialAuthState);
  const [accountRecoveryState, accountRecoveryDispatch] = useReducer(
    accountRecoveryReducer,
    initialAccountRecoveryState
  );
  const [authState, authDispatch] = useReducer(authReducer, loadedAuthState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );

  useErrorHandler();
  useLocaleSetup(themeDispatch);

  return (
    <ThemeContext.Provider value={themeState}>
      <ThemeDispatch.Provider value={themeDispatch}>
        <AuthContext.Provider value={authState}>
          <AuthDispatch.Provider value={authDispatch}>
            <AccountRecoveryContext.Provider value={accountRecoveryState}>
              <AccountRecoveryDispatch.Provider value={accountRecoveryDispatch}>
                <MainRoutes />
              </AccountRecoveryDispatch.Provider>
            </AccountRecoveryContext.Provider>
          </AuthDispatch.Provider>
        </AuthContext.Provider>
      </ThemeDispatch.Provider>
    </ThemeContext.Provider>
  );
};

const MainRoutes = () => {
  useThemeSetup();

  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path={[routes.home, routes.settings]}
          component={MainNav}
        />
      </Switch>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.register} component={Register} />
        <Route
          exact
          path={routes.beginPasswordReset}
          component={BeginPasswordReset}
        />
        <Route
          exact
          path={routes.recoveryConfirmation}
          component={RecoveryConfirmation}
        />
        <Route
          exact
          path={routes.sendPasswordReset}
          component={SendPasswordReset}
        />
        <PrivateRoute exact path={routes.home} component={Home} />
        <PrivateRoute exact path={routes.settings} component={Settings} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

const PrivateRoute: React.FC<RouteProps> = ({
  children,
  component: Component,
  render,
  ...rest
}) => {
  const authState = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn(authState) ? (
          children ||
          (Component ? <Component {...props} /> : render ? render(props) : null)
        ) : (
          <Redirect
            to={{
              pathname: routes.login,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default App;
