import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { MainNav } from "./Components/Navs/MainNav";
import { Home } from "./Containers/Home";
import { Register } from "./Containers/Register";
import {
  initialThemeState,
  ThemeContext,
  themeReducer,
} from "./Contexts/ThemeContext";
import { ThemeDispatch } from "./Contexts/ThemeDispatch";
import { useLocaleSetup } from "./Utilities/Hooks/useLocaleSetup";
import { useThemeSetup } from "./Utilities/Hooks/useThemeSetup";

const App = () => {
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );

  useLocaleSetup(themeDispatch);

  return (
    <ThemeContext.Provider value={themeState}>
      <ThemeDispatch.Provider value={themeDispatch}>
        <MainRoutes />
      </ThemeDispatch.Provider>
    </ThemeContext.Provider>
  );
};

const MainRoutes = () => {
  useThemeSetup();

  return (
    <Router>
      <MainNav />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
