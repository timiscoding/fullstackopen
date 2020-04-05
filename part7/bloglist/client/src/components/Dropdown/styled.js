import styled, { css } from "styled-components/macro";
import { ReactComponent as DownChevronGlyph } from "../../icons/down-chevron.svg";
import { filterProps } from "../utils";
import { styling } from "../../constants";

const defaults = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: css`
    ${({ theme }) => theme.primary}
  `,
  padding: { desktop: "5px", mobile: "10px" },
  width: "auto",
  listBg: "#fff",
  fontSize: "0.8rem",
};

const borderWidth = `var(--dd-border-width, ${defaults.borderWidth})`;

const borderStyles = css`
  border-width: ${borderWidth};
  border-style: var(--dd-border-style, ${defaults.borderStyle});
  border-color: var(--dd-border-color, ${defaults.borderColor});
`;

export const Wrapper = styled.div`
  cursor: default;
  user-select: none;
  position: relative;
  display: inline-block;
  width: var(--dd-width, ${defaults.width});
  font-size: var(--dd-font-size, ${defaults.fontSize});
  ${styling.focusAround}
  ${styling.mobile(`
    &:focus-within {
      box-shadow: none;
    }
  `)}
`;

export const Title = styled.div`
  ${borderStyles}
  color: var(--dd-title-fg, ${({ theme }) => theme.fontLight});
  padding: var(--dd-padding, ${defaults.padding.desktop});
  background-color: var(--dd-title-bg, ${({ theme }) => theme.primaryLight});
  line-height: 1.15;
  ${styling.mobile(`
    padding: var(--dd-padding-mobile, ${defaults.padding.mobile});
  `)}
`;

export const List = styled.ul`
  ${borderStyles}
  background-color: var(--dd-list-bg, ${defaults.listBg});
  display: inline-block;
  list-style-type: none;
  padding: 0;
  margin: 0;
  min-width: 100%;
  overflow: hidden;
  position: absolute;
  top: calc(100% - ${borderWidth});
  left: 0;
  z-index: 1;
  min-width: 100%;
`;

export const ListItem = styled.li`
  padding: var(--dd-padding, ${defaults.padding.desktop});
  white-space: nowrap;
  background-color: ${({ highlighted, theme }) =>
    highlighted
      ? `
    var(
      --dd-item-highlight-bg,
      ${theme.secondary}
    );
  `
      : "transparent"};
  &:active {
    background-color: ${({ theme }) => theme.secondaryDark};
  }
  ${styling.mobile(`
    padding: var(--dd-padding-mobile, ${defaults.padding.mobile});
  `)}
`;

export const DownChevronIcon = styled(
  filterProps(DownChevronGlyph, ["collapse"])
)`
  margin-left: 10px;
  width: var(--dd-font-size, ${defaults.fontSize});
  height: var(--dd-font-size, ${defaults.fontSize});
  fill: var(--dd-title-fg, ${({ theme }) => theme.fontLight});
  vertical-align: sub;
  float: right;
  ${({ collapse }) => collapse && "transform: scaleY(-1);"}
  transition: transform .2s;
`;
