import React, { Component } from "react";
import PropTypes from "prop-types";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import {
  fx0,
  Div,
  spaceBetween,
  fx1WithfxColumn,
  fx0WithfxColumn,
  fxColumn,
  alignItemsCenter
} from "constants/Emotion-css";

import Button from "components/Button/Button";

import { injectIntl } from "react-intl";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;

    this.state = {
      menuItems: [
        { name: intl.formatMessage({ id: "menuGeneral" }), id: "/main" },
        { name: intl.formatMessage({ id: "menuSetting" }), id: "/setting" }
      ],
      currentTab: null
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const pathname = location.pathname;
    this.setActiveMenu(pathname);
  }

  setActiveMenu = pathname => {
    this.setState({ currentTab: pathname });

    // emit onClickMenu to parent
    const { onClickMenu } = this.props;
    if (onClickMenu !== undefined) {
      onClickMenu(pathname);
    }
  };

  render() {
    const { children, loading, intl, ...rest } = this.props;
    const { menuItems, currentTab } = this.state;
    return (
      <Div
        className="container-sidebar"
        css={[
          fx0,
          fxColumn,
          css`
            min-width: 260px;
          `
        ]}
      >
        <Div
          css={[
            fx1WithfxColumn,
            spaceBetween,
            css`
              margin: 40px 24px;
            `
          ]}
        >
          <Div css={[fx1WithfxColumn, alignItemsCenter]}>
            {menuItems.map((prop, key) => {
              return (
                <Button
                  primary={prop.id === currentTab}
                  onClick={() => this.setActiveMenu(prop.id)}
                  key={key}
                  css={[
                    css`
                      margin-bottom: 8px;
                    `
                  ]}
                >
                  {prop.name}
                </Button>
              );
            })}
          </Div>
          <Div className="logout" css={[fx0WithfxColumn, alignItemsCenter]}>
            <Button
              onClick={() => this.setActiveMenu("logout")}
              primary={"logout" === currentTab}
            >
              {intl.formatMessage({ id: "menuLogout" })}
            </Button>
          </Div>
        </Div>
      </Div>
    );
  }
}

export default injectIntl(Sidebar);
