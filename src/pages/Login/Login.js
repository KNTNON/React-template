import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "components/Button/Button.js";

import { FormattedMessage, injectIntl } from "react-intl";

import {
  container,
  fxWithjustifyContentCenter,
  Div,
  fx1WithfxColumn,
  Input
} from "constants/Emotion-css";

import { performSignIn } from "reducers/auth/action";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

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

  navigateToSignup = () => {
    this.props.history.push("/signup");
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateEmail = email => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  onClickSignIn = () => {
    const { email, password } = this.state;
    const { intl } = this.props;
    if (!this.validateEmail(email) || !email || email === "") {
      alert(intl.formatMessage({ id: "wrongEmail" }));
    } else if (!password || password === "") {
      alert(intl.formatMessage({ id: "wrongPassword" }));
    } else {
      this.props.performSignIn(email, password);
    }
  };

  render() {
    const { loginStatus } = this.props;
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
          Fancy App
        </Div>
        <Div
          columnGap="12px"
          className="container-username"
          css={[fx1WithfxColumn]}
        >
          <Div className="email" columnGap="12px">
            <FormattedMessage id="email" defaultMessage="E-mail" />
          </Div>
          <Input
            onChange={this.handleInputChange}
            className="input-email"
            name="email"
            type="text"
            placeholder="user@example.com"
            onKeyPress={event => event.key === "Enter" && this.onClickSignIn()}
          />
        </Div>
        <Div
          columnGap="22px"
          className="container-password"
          css={[fx1WithfxColumn]}
        >
          <Div columnGap="12px">
            <FormattedMessage id="password" defaultMessage="Password" />
          </Div>
          <Input
            onChange={this.handleInputChange}
            name="password"
            type="password"
            placeholder="password"
            onKeyPress={event => event.key === "Enter" && this.onClickSignIn()}
          />
        </Div>
        <Div columnGap="12px" css={[fx1WithfxColumn]}>
          <Button
            className="signin"
            loading={loginStatus === "Pending"}
            round
            primary
            onClick={this.onClickSignIn}
          >
            <FormattedMessage id="login" defaultMessage="Log in" />
          </Button>
        </Div>
        <Div columnGap="12px" css={[fx1WithfxColumn]}>
          <Button round onClick={this.navigateToSignup}>
            <FormattedMessage
              id="createNewAccount"
              defaultMessage="Create a new account"
            />
          </Button>
        </Div>
      </div>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = ({ auth: { user } }) => {
  return { loginStatus: user.status, error: user.error };
};

const mapDispatchToProps = dispatch => {
  return { performSignIn: bindActionCreators(performSignIn, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Login));
