import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { CSSTransition } from "react-transition-group";
import * as propTypes from "../../../constants/propTypes";
import { Link } from "react-router-dom";
import { clearFix } from "polished";
import { formatTimestamp, formatNum } from "../../utils";
import Button from "../../Button";
import Checkbox from "../../Checkbox";
import { ReactComponent as LikeIcon } from "../../../icons/like.svg";
import { ReactComponent as CommentIcon } from "../../../icons/message.svg";
import { ReactComponent as CircleIcon } from "../../../icons/filled-circle.svg";

const ListItem = styled.li`
  overflow: hidden;
  list-style-type: none;
  padding: 5px;
  text-transform: capitalize;
  ${clearFix()}
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.grey};
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${({ selectable }) => (selectable ? "pointer" : "default")};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #747c86;
  font-weight: 700;
`;

const BlogInfo = styled.div`
  font-size: 0.75em;
`;

const Author = styled.span`
  &::before {
    content: "by ";
    text-transform: none;
  }
`;

const Likes = styled.div`
  float: left;
  width: 40px;
  margin-right: 10px;
  text-align: center;
`;

const StyledLikeIcon = styled(LikeIcon)`
  height: 1.2rem;
  width: 1.2rem;
  fill: ${({ theme }) => theme.blueLight};
`;

const StyledCircleIcon = styled(CircleIcon)`
  height: 0.5em;
  width: 0.5em;
  vertical-align: middle;
  fill: ${({ theme }) => theme.grey};
  padding: 0 5px;
`;

const StyledCommentIcon = styled(CommentIcon)`
  height: 0.8em;
  width: 0.8em;
  padding-left: 5px;
`;

const LikeButton = styled(Button)`
  --btn-bg-color: transparent;
  --btn-bg-color-hover: transparent;
  --btn-bg-color-active: transparent;
  border: none;
  padding: 0 5px;
`;

const Item = styled.div`
  flex: 1;
  & * {
    user-select: ${({ selectable }) => (selectable ? "none" : "auto")};
  }
`;

const BlogCheckbox = styled(Checkbox)`
  display: block;
  margin-right: 10px;
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;

  &.select-enter {
    transform: translateX(100%);
    opacity: 0;
  }

  &.select-enter-active {
    transform: translateX(0%);
    opacity: 1;
  }

  &.select-exit {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ListItemSkeleton = styled(ListItem)`
  &:hover {
    background-color: transparent;
  }
`;

const BlogItemSkeleton = () => (
  <ListItemSkeleton>
    <Item>
      <Likes>
        <Skeleton />
        <Skeleton width="1.3em" height="1.3em" />
      </Likes>
      <div>
        <Skeleton width="75%" />
        <Skeleton width="25%" />
      </div>
    </Item>
  </ListItemSkeleton>
);

const BlogItemView = ({
  className,
  blog,
  onLike,
  selectable,
  onSelect,
  selected,
  pending
}) => {
  if (pending) return <BlogItemSkeleton />;

  const handleSelect = () => {
    onSelect(blog.id);
  };
  return (
    <ListItem
      className={className}
      data-testid="blog-body"
      onClick={selectable ? handleSelect : null}
      selectable={selectable}
    >
      <Item selectable={selectable}>
        <Likes>
          <div>{formatNum(blog.likes)}</div>{" "}
          <LikeButton as={selectable ? "div" : LikeButton} onClick={onLike}>
            <StyledLikeIcon />
          </LikeButton>
        </Likes>
        <div>
          <StyledLink
            as={selectable ? "span" : StyledLink}
            to={`/blogs/${blog.id}`}
          >
            {blog.title}
          </StyledLink>
          <BlogInfo>
            {blog.createdAt ? (
              <time dateTime={blog.createdAt}>
                {formatTimestamp(blog.createdAt)}
              </time>
            ) : (
              "Time unknown"
            )}
            <StyledCircleIcon />
            <Author>{blog.author}</Author>
            <StyledCircleIcon />
            <span>{blog.commentCount}</span>
            <StyledCommentIcon />
          </BlogInfo>
        </div>
      </Item>
      <CSSTransition
        in={selectable}
        timeout={250}
        classNames="select"
        mountOnEnter
        unmountOnExit
      >
        <BlogCheckbox
          onChange={handleSelect}
          value={blog.id}
          checked={selected}
        />
      </CSSTransition>
    </ListItem>
  );
};

BlogItemView.propTypes = {
  blog: propTypes.blog,
  onLike: PropTypes.func
};

export default BlogItemView;
