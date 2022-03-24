import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import mainRoutes from "routes/Main.js";

import Sidebar from "components/Sidebar/Sidebar";

import { performLogout, performVerifyToken } from "reducers/auth/action";
import { performChangeLanguage } from "reducers/setting/action";

import { FormattedMessage, injectIntl } from "react-intl";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import {
  fx1,
  fx0,
  justifyContentCenter,
  marginAuto,
  Div,
  fxRow,
  ContainerPage
} from "constants/Emotion-css";

const switchRoutes = (
  <Switch>
    {mainRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (this.props.user !== user) {
      this.changeLocale(user.language);
    }
  }

  changeLocale = locale => {
    this.props.performChangeLanguage(locale);
  };

  componentDidMount() {
    this.props.performVerifyToken();
  }

  onClickMenu = pathname => {
    const { intl } = this.props;
    if (pathname === "logout") {
      if (window.confirm(intl.formatMessage({ id: "confirmLogout" }))) {
        this.props.performLogout().then(response => {
          if (response.value.error) {
            alert(
              intl.formatMessage({
                id: response.value.error || "errorDefaultMessage"
              })
            );
          } else {
            window.location.reload();
          }
          return response;
        });
      }
    } else {
      this.props.history.push(pathname);
    }
  };
  render() {
    return (
      <Div className="container-auth" css={theme => [fx1, fxRow]}>
        <Sidebar
          location={this.props.location}
          history={this.props.history}
          onClickMenu={this.onClickMenu}
          css={theme => [
            fx0,
            css`
              max-width: 400px;
            `
          ]}
        />
        <Div
          css={theme => [
            fx1,
            css`
              background-color: ${theme.color.primary};
            `
          ]}
        >
          {switchRoutes}
        </Div>
      </Div>
    );
  }
}

Main.propTypes = {};

const mapStateToProps = ({ auth: { user }, setting: { lang } }) => {
  return { user: user.data.user, lang };
};

const mapDispatchToProps = dispatch => {
  return {
    performLogout: bindActionCreators(performLogout, dispatch),
    performVerifyToken: bindActionCreators(performVerifyToken, dispatch),
    performChangeLanguage: bindActionCreators(performChangeLanguage, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Main));
