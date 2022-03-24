import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "components/Button/Button.js";

import { FormattedMessage, injectIntl } from "react-intl";

import { performSignup } from "reducers/auth/action";

import {
  container,
  fxWithjustifyContentCenter,
  Div,
  fx1WithfxColumn,
  Input
} from "constants/Emotion-css";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class Signup extends Component {
  state = { passwordRetype: null, password: null, email: null };
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    const { intl } = this.props;
    if (error) {
      if (this.props.error !== error) {
        alert(
          intl.formatMessage({ id: error.message || "errorDefaultMessage" })
        );
      }
    }
  }

  validateEmail = email => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  onClickSignup = event => {
    const { passwordRetype, password, email } = this.state;
    const { intl } = this.props;

    if (!this.validateEmail(email) || !email || email === "") {
      alert(intl.formatMessage({ id: "wrongEmail" }));
    } else if (
      !passwordRetype ||
      passwordRetype === "" ||
      !password ||
      password === ""
    ) {
      alert(intl.formatMessage({ id: "wrongPassword" }));
    } else if (passwordRetype !== password) {
      alert(intl.formatMessage({ id: "wrongPassword" }));
    } else {
      this.props.performSignup(email, password);
    }
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  navigateToLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    const { status } = this.props;
    return (
      <div
        className="container"
        css={[
          fx1WithfxColumn,
          css`
            background-color: white;
          `
        ]}
      >
        <Div
          primary
          columnGap="12px"
          className="title"
          css={[fxWithjustifyContentCenter]}
        >
          <FormattedMessage id="createNewAccount" defaultMessage="E-mail" />
        </Div>
        <Div
          columnGap="12px"
          className="container-username"
          css={[fx1WithfxColumn]}
        >
          <Div columnGap="12px">
            <FormattedMessage id="email" defaultMessage="E-mail" />
          </Div>
          <Input
            type="text"
            placeholder="user@example.com"
            onChange={this.handleInputChange}
            name="email"
            onKeyPress={event => event.key === "Enter" && this.onClickSignup()}
          />
        </Div>
        <Div
          columnGap="22px"
          className="container-password"
          css={[fx1WithfxColumn]}
        >
          <Div columnGap="12px" css={[fx1WithfxColumn]}>
            <FormattedMessage id="password" defaultMessage="Password" />
          </Div>
          <Div columnGap="12px" css={[fx1WithfxColumn]}>
            <Input
              type="password"
              placeholder="password"
              onChange={this.handleInputChange}
              name="password"
              onKeyPress={event =>
                event.key === "Enter" && this.onClickSignup()
              }
            />
          </Div>
          <Div columnGap="12px" css={[fx1WithfxColumn]}>
            <Input
              type="password"
              placeholder="password"
              onChange={this.handleInputChange}
              name="passwordRetype"
              onKeyPress={event =>
                event.key === "Enter" && this.onClickSignup()
              }
            />
          </Div>
        </Div>
        <Div columnGap="12px" css={[fx1WithfxColumn]}>
          <Button
            loading={status === "Pending"}
            primary
            round
            onClick={this.onClickSignup}
          >
            <FormattedMessage
              id="createNewAccount"
              defaultMessage="Create a new account"
            />
          </Button>
        </Div>
        <Div columnGap="12px" css={[fx1WithfxColumn]}>
          <Button round onClick={this.navigateToLogin}>
            <FormattedMessage id="login" defaultMessage="Log in" />
          </Button>
        </Div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => {
  return { status: user.status, error: user.error };
};

const mapDispatchToProps = dispatch => {
  return { performSignup: bindActionCreators(performSignup, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Signup));
