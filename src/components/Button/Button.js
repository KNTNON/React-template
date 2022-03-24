import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "@emotion/styled";

const Button = styled.button`
  padding: 4px 32px;
  background-color: white;
  font-size: 24px;
  border-radius: 4px;
  color: ${props => props.theme.color.primary};
  font-weight: bold;
  border: 1px solid ${props => props.theme.color.primary};
  border-radius: ${props => props.round && `24px`};
  outline: none;
  &:hover {
    background-color: lightgray;
  }
  width: 100%;
  ${props =>
    props.primary &&
    `
    color: white;
    background-color: ${props.theme.color.primary};
    &:hover {
      background-color: ${props.theme.color.secondary};
      border-color: ${props.theme.color.secondary};
    }
  `}
  ${props => props.pointer && `cursor:pointer;`}
`;

class LoginButton extends Component {
  render() {
    const { children, loading, ...rest } = this.props;
    return (
      <Button {...rest} pointer>
        {loading ? "Loading..." : children}
      </Button>
    );
  }
}

export default LoginButton;
