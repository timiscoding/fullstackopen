import styled from "styled-components/macro";
import { styling } from "../../constants";
import { ReactComponent as NextGlyph } from "../../icons/right-chevron.svg";

const pagePadding = "padding: 10px";

export const NextIcon = styled(NextGlyph)`
  width: 1em;
  height: 1em;
  vertical-align: sub;
`;

export const PrevIcon = styled(NextIcon)`
  transform: scaleX(-1);
`;

export const Link = styled.a`
  ${pagePadding};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  color: ${({ disabled, theme }) => (disabled ? theme.greyLight : null)};
  border: 1px solid ${({ theme }) => theme.grey};
  display: inline-block;
  &:hover {
    transition: border 0.5s;
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.primary};
  }
  &:active {
    text-decoration: none;
    background-color: ${({ theme }) => theme.primaryLight};
    color: ${({ theme }) => theme.secondaryDark};
    ${NextIcon} {
      fill: ${({ theme }) => theme.secondaryDark};
    }
  }
  &:focus {
    outline: 1px solid ${({ theme }) => theme.secondary};
  }
  & ${NextIcon} {
    fill: ${({ theme, disabled }) =>
      disabled ? theme.greyLight : theme.primaryLight};
  }
`;

export const Page = styled.div`
  ${pagePadding};
`;

export const ListItem = styled.li`
  list-style-type: none;
  text-align: center;
  &:not(:first-child) {
    margin-left: 5px;
  }
  & span span {
    border-radius: 0;
  }
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;

  ${ListItem}:nth-child(2),
  ${ListItem}:nth-last-child(2) {
    ${styling.mobile(`
      flex-grow: 1;
      ${Link} {
        width: 100%;
      }
    `)}
  }
`;
