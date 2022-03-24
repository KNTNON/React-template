/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

export const fx = css`
  display: flex;
`;

export const fx1 = css`
  ${fx};
  flex: 1;
`;

export const fx0 = css`
  ${fx};
  flex: 0;
`;

export const fxColumn = css`
  flex-direction: column;
`;

export const fxRow = css`
  flex-direction: row;
`;

export const fx1WithfxColumn = css`
  ${fx1};
  ${fxColumn};
`;

export const fx0WithfxColumn = css`
  ${fx0};
  ${fxColumn};
`;

export const fx1WithfxRow = css`
  ${fx1};
  ${fxRow};
`;

export const fx0WithfxRow = css`
  ${fx0};
  ${fxRow};
`;

export const marginAuto = css`
  margin: auto;
`;

export const justifyContentCenter = css`
  justify-content: center;
`;

export const alignItemsCenter = css`
  align-items: center;
`;

export const fxWithAlignItemsCenter = css`
  ${fx1};
  ${alignItemsCenter};
`;

export const fxWithjustifyContentCenter = css`
  ${fx1};
  ${justifyContentCenter};
`;

export const columnGap = css`
  margin-bottom: ;
`;

export const spaceBetween = css`
  justify-content: space-between;
`;

export const container = css`
  ${fxWithjustifyContentCenter};
`;

/** Styled */

export const Div = styled.div`
  margin-right: ${props => (props.rowGap ? `${props.rowGap}` : ``)};
  margin-bottom: ${props => (props.columnGap ? `${props.columnGap}` : ``)};
  ${props =>
    props.primary &&
    `
    color: ${props.theme.color.primary};
    font-size: 32px;
    font-weight: bold;
  `}
`;

export const Input = styled.input`
  outline: 0;
  border: 1px solid #d3d3d3;
  border-radius: 0 !important;
  padding: 8px !important;
  &:focus {
    border-color: ${props => props.theme.color.primary};
  }
`;

export const ContainerPage = styled(Div)`
  ${marginAuto};
  padding: 24px;
  background-color: white;
  min-width: 320px;
`;

export const SelectOption = styled.select`
  outline: 0;
  border: 1px solid #d3d3d3;
  border-radius: 0 !important;
  padding: 8px !important;
  &:focus {
    border-color: ${props => props.theme.color.primary};
  }
  -webkit-appearance: none;
`;
