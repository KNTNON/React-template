import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import authRoutes from "routes/Auth.js";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import {
  fx1,
  justifyContentCenter,
  marginAuto,
  Div,
  ContainerPage
} from "constants/Emotion-css";

const switchRoutes = (
  <Switch>
    {authRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Auth extends Component {
  render() {
    return (
      <Div
        className="container-auth"
        css={theme => [
          fx1,
          css`
            background-color: ${theme.color.primary};
          `
        ]}
      >
        <ContainerPage
          css={[
            marginAuto,
            css`
              padding: 24px;
              background-color: white;
              min-width: 320px;
            `
          ]}
        >
          {switchRoutes}
        </ContainerPage>
      </Div>
    );
  }
}

Auth.propTypes = {};

export default Auth;
