import React, { Component } from "react";

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
  alignItemsCenter,
  SelectOption
} from "constants/Emotion-css";

import { injectIntl } from "react-intl";

class Select extends Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;
    this.state = {
      selected: this.props.selected
    };
  }

  handleChange = event => {
    event.persist();

    const { onChange } = this.props;
    if (onChange !== undefined) {
      onChange(event);
    }
  };

  componentDidMount() {}

  render() {
    const { children, items, loading, selected, intl, ...rest } = this.props;
    return (
      <Div
        css={[
          css`
            height: 37px;
            flex: 1 1 auto;
            box-sizing: border-box;
            flex-direction: column;
            display: flex;
            min-height: auto;
          `
        ]}
      >
        <SelectOption
          value={selected}
          onChange={event => this.handleChange(event)}
        >
          {items.length > 0 &&
            items.map((prop, key) => {
              return (
                <option value={prop.code} key={key}>
                  {prop.name}
                </option>
              );
            })}
        </SelectOption>
      </Div>
    );
  }
}

export default injectIntl(Select);
