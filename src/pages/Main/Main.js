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
  fx,
  ContainerPage,
  fx1WithfxColumn,
  fx1WithfxRow,
  fx0WithfxRow
} from "constants/Emotion-css";

import { injectIntl } from "react-intl";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { performVerifyToken } from "reducers/auth/action";

import { performSaveGeneralSetting } from "reducers/setting/action";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageList: [
        { name: "English", code: "en" },
        { name: "French", code: "fr" },
        { name: "German", code: "de" },
        { name: "Japanese", code: "ja" },
        { name: "Chinese", code: "zh" },
        { name: "Korean", code: "ko" },
        { name: "Thai", code: "th" }
      ],
      language: "en",
      privacy: "public"
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (this.props.user !== user) {
      this.setState({ privacy: user.privacy, language: user.language });
    }
  }

  onClickSaveSetting = () => {
    const { language, privacy } = this.state;
    const { user, intl } = this.props;
    this.props
      .performSaveGeneralSetting(user._id, language, privacy)
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
          this.props.performVerifyToken();
        }
        return response;
      });
  };

  languageOnChange = event => {
    this.setState({ language: event.target.value });
  };

  render() {
    const { intl } = this.props;
    const { languageList, language, privacy } = this.state;
    return (
      <ContainerPage
        css={[
          css`
            max-width: 50%;
          `
        ]}
      >
        <Div className="container" css={[fx1WithfxColumn]}>
          <Div className="language" columnGap="20px">
            <Div columnGap="10px">{intl.formatMessage({ id: "language" })}</Div>
            <Select
              items={languageList}
              selected={language}
              onChange={event => this.languageOnChange(event)}
            />
          </Div>
          <Div className="privacy" columnGap="20px">
            <Div className="title" columnGap="10px">
              {intl.formatMessage({ id: "privacy" })}
            </Div>
            <Div className="radio-container" css={[fx1WithfxColumn]}>
              <Div className="radio-sub-container" css={[fx1WithfxRow]}>
                <Div
                  className="public"
                  rowGap="8px"
                  css={[
                    fx,
                    fxRow,
                    css`
                      flex: 0 1 32%;
                    `
                  ]}
                >
                  <input
                    value="public"
                    checked={privacy === "public"}
                    type="radio"
                    onChange={() => this.setState({ privacy: "public" })}
                  />
                  <Div css={[justifyContentCenter]}>
                    {intl.formatMessage({ id: "public" })}
                  </Div>
                </Div>
                <Div className="private" css={[fx1WithfxRow]}>
                  <input
                    value="private"
                    checked={privacy === "private"}
                    type="radio"
                    onChange={() => this.setState({ privacy: "private" })}
                  />
                  <Div css={[justifyContentCenter]}>
                    {intl.formatMessage({ id: "private" })}
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
          <Div className="submit">
            <Button
              primary
              round
              columnGap="6px"
              onClick={this.onClickSaveSetting}
            >
              {intl.formatMessage({ id: "saveChanges" })}
            </Button>
          </Div>
        </Div>
      </ContainerPage>
    );
  }
}

Main.propTypes = {};

const mapStateToProps = ({ auth: { user }, setting: { lang } }) => {
  return { user: user.data.user, lang };
};

const mapDispatchToProps = dispatch => {
  return {
    performSaveGeneralSetting: bindActionCreators(
      performSaveGeneralSetting,
      dispatch
    ),
    performVerifyToken: bindActionCreators(performVerifyToken, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Main));
