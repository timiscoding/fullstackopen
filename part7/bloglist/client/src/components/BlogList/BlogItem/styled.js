import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { clearFix } from "polished";
import Checkbox from "../../Checkbox";
import { LikeButton as LikeButtonBase } from "../../Button";
import { ReactComponent as CommentGlyph } from "../../../icons/message.svg";
import { ReactComponent as CircleGlyph } from "../../../icons/filled-circle.svg";
import { filterProps } from "../../utils";
import { styling } from "../../../constants";

export const ListItem = styled.li`
  overflow: hidden;
  list-style-type: none;
  padding: 5px 0;
  text-transform: capitalize;
  ${clearFix()}

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.grey};
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${({ selectable }) => (selectable ? "pointer" : "default")};
  background: #fff;
`;

export const Title = styled(filterProps(Link, ["isLink"]))`
  pointer-events: ${({ isLink }) => (isLink ? "auto" : "none")};
  font-weight: ${({ isLink }) => (isLink ? "auto" : "normal")};
  text-decoration: none;
  color: ${({ theme }) => theme.fontDark};
  font-size: 1.1rem;
`;

export const BlogInfo = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 5px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.fontDarkLighter};

  ${styling.mobile(`
    font-size: 0.85rem;
  `)}
`;

export const Author = styled.span`
  &::before {
    content: "by ";
    text-transform: none;
  }
`;

export const Likes = styled.div`
  font-weight: 500;
  float: left;
  margin-right: 10px;
  text-align: center;
  min-width: 4ch;
`;

export const CircleIcon = styled(CircleGlyph)`
  height: 1rem;
  width: 1rem;
  vertical-align: middle;
  fill: ${({ theme }) => theme.greyDarker};
  padding: 0 5px;
`;

export const CommentIcon = styled(CommentGlyph)`
  height: 1rem;
  width: 1rem;
  padding-left: 5px;
  vertical-align: text-top;
  fill: ${({ theme }) => theme.greenDark};
`;

export const Item = styled.div`
  flex: 1;
  min-width: 0; // override flex item default min width which is min content width
  & * {
    user-select: ${({ selectable }) => (selectable ? "none" : "auto")};
  }
`;

export const BlogCheckbox = styled(Checkbox)`
  display: block;
  margin-right: 10px;
`;

export const ListItemSkeleton = styled(ListItem)`
  &:hover {
    background-color: transparent;
  }
`;

export const Time = styled.time`
  text-transform: uppercase;
`;

export const LikeButton = styled(LikeButtonBase)`
  margin-top: 3px;
`;
