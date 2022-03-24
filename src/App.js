import React from "react";
import "./App.css";

import { Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "emotion-theming";

import { Provider } from "react-redux";
import store from "./store/store";

import indexRoutes from "routes/index.js";

import IntlProviderWrapper from "lang/intl";

import { createBrowserHistory } from "history";

import { theme } from "theme/theme";

const hist = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProviderWrapper>
          <Router history={hist}>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </Router>
        </IntlProviderWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
