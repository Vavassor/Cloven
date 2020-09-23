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
import { Register } from "./Containers/Register";
import { SendPasswordReset } from "./Containers/SendPasswordReset";
import { Settings } from "./Containers/Settings";
import {
  AuthContext,
  authReducer,
  initialAuthState,
} from "./Contexts/AuthContext";
import { AuthDispatch } from "./Contexts/AuthDispatch";
import {
  initialThemeState,
  ThemeContext,
  themeReducer,
} from "./Contexts/ThemeContext";
import { ThemeDispatch } from "./Contexts/ThemeDispatch";
import { routes } from "./Routes";
import { useLocaleSetup } from "./Utilities/Hooks/useLocaleSetup";
import { useThemeSetup } from "./Utilities/Hooks/useThemeSetup";

const App = () => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );

  useLocaleSetup(themeDispatch);

  return (
    <ThemeContext.Provider value={themeState}>
      <ThemeDispatch.Provider value={themeDispatch}>
        <AuthContext.Provider value={authState}>
          <AuthDispatch.Provider value={authDispatch}>
            <MainRoutes />
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
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          exact
          path={routes.beginPasswordReset}
          component={BeginPasswordReset}
        />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.register} component={Register} />
        <Route
          exact
          path={routes.sendPasswordReset}
          component={SendPasswordReset}
        />
        <PrivateRoute exact path={[routes.home, routes.settings]}>
          <MainNav />
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.settings} component={Settings} />
          </Switch>
        </PrivateRoute>
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
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
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
