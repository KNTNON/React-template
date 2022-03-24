import React, { Component } from "react";

import Select from "components/Select/Select";
import Button from "components/Button/Button";

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
  ContainerPage,
  fx1WithfxColumn,
  fx1WithfxRow,
  fx0WithfxRow,
  Input
} from "constants/Emotion-css";

import { injectIntl } from "react-intl";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { performDeleteAccount } from "reducers/setting/action";
import { performUpdatePassword } from "reducers/auth/action";

class Setting extends Component {
  state = { newPasswordRetype: null, newPassword: null, oldPassword: null };

  componentWillReceiveProps(nextProps) {
    const { intl } = this.props;

    const { user } = nextProps;
    if (this.props.user !== user) {
    }

    // Error message
    const { error } = nextProps;
    if (error) {
      if (this.props.error !== error) {
        alert(
          intl.formatMessage({ id: error.message || "errorDefaultMessage" })
        );
      }
    }
  }

  onClickUpdatePassword = () => {
    const { newPasswordRetype, newPassword, oldPassword } = this.state;
    const { intl } = this.props;

    if (
      !newPasswordRetype ||
      newPasswordRetype === "" ||
      !newPassword ||
      newPassword === "" ||
      !oldPassword ||
      oldPassword === ""
    ) {
      alert(intl.formatMessage({ id: "wrongPassword" }));
    } else if (newPasswordRetype !== newPassword) {
      alert(intl.formatMessage({ id: "wrongPassword" }));
    } else {
      this.props
        .performUpdatePassword(oldPassword, newPassword)
        .then(response => {
          if (response.value.error) {
            alert(
              intl.formatMessage({
                id: response.value.error || "errorDefaultMessage"
              })
            );
          } else {
            alert(
              intl.formatMessage({
                id: "submitSuccessDefault"
              })
            );
          }
          return response;
        });
    }
  };
  onClickDeleteAccount = () => {
    const { intl } = this.props;
    if (window.confirm(intl.formatMessage({ id: "confirmDeleteAccount" }))) {
      this.props.performDeleteAccount();
    }
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { intl } = this.props;
    return (
      <Div
        css={[
          marginAuto,
          css`
            max-width: 50%;
          `
        ]}
      >
        <ContainerPage columnGap="16px !important">
          <Div
            columnGap="20px"
            className="old-password"
            css={[fx1WithfxColumn]}
          >
            <Div columnGap="12px">
              {intl.formatMessage({ id: "oldPassword" })}
            </Div>
            <Input
              onChange={this.handleInputChange}
              name="oldPassword"
              type="password"
              placeholder={intl.formatMessage({ id: "password" })}
              onKeyPress={event =>
                event.key === "Enter" && this.onClickUpdatePassword()
              }
            />
          </Div>
          <Div
            columnGap="20px"
            className="new-password"
            css={[fx1WithfxColumn]}
          >
            <Div columnGap="12px" css={[fx1WithfxColumn]}>
              {intl.formatMessage({ id: "newPassword" })}
            </Div>
            <Div columnGap="12px" css={[fx1WithfxColumn]}>
              <Input
                type="password"
                onChange={this.handleInputChange}
                name="newPassword"
                placeholder={intl.formatMessage({ id: "password" })}
                onKeyPress={event =>
                  event.key === "Enter" && this.onClickUpdatePassword()
                }
              />
            </Div>
            <Div columnGap="12px" css={[fx1WithfxColumn]}>
              <Input
                type="password"
                onChange={this.handleInputChange}
                name="newPasswordRetype"
                placeholder={intl.formatMessage({ id: "password" })}
                onKeyPress={event =>
                  event.key === "Enter" && this.onClickUpdatePassword()
                }
              />
            </Div>
          </Div>
          <Div className="submit">
            <Button
              primary
              round
              columnGap="6px"
              onClick={this.onClickUpdatePassword}
            >
              {intl.formatMessage({ id: "saveChanges" })}
            </Button>
          </Div>
        </ContainerPage>
        <ContainerPage>
          <Div columnGap="20px">
            {intl.formatMessage({ id: "deleteAccountTitle" })}
          </Div>
          <Div className="submit">
            <Button
              primary
              round
              columnGap="6px"
              onClick={this.onClickDeleteAccount}
            >
              {intl.formatMessage({ id: "deleteAccount" })}
            </Button>
          </Div>
        </ContainerPage>
      </Div>
    );
  }
}

Setting.propTypes = {};

const mapStateToProps = ({ auth: { user } }) => {
  return { user: user.data.user, error: user.error };
};

const mapDispatchToProps = dispatch => {
  return {
    performDeleteAccount: bindActionCreators(performDeleteAccount, dispatch),
    performUpdatePassword: bindActionCreators(performUpdatePassword, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Setting));
