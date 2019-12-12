import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { clearFix } from "polished";
import * as propTypes from "../../../constants/propTypes";
import { formatTimestamp, formatNum } from "../../utils";
import Button from "../../Button";
import { ReactComponent as LikeIcon } from "../../../icons/like.svg";
import { ReactComponent as CommentIcon } from "../../../icons/message.svg";
import { ReactComponent as CircleIcon } from "../../../icons/filled-circle.svg";

const ListItem = styled.div`
  padding: 5px;
  text-transform: capitalize;

  ${clearFix()}
`;

const StyledLink = styled(Link)`
  display: block;
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
  height: 1.5em;
  width: 1.5em;
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

const BlogItem = ({ blog, onLike }) => {
  return (
    <ListItem data-testid="blog-body">
      <Likes>
        <div>{formatNum(blog.likes)}</div>{" "}
        <LikeButton onClick={onLike}>
          <StyledLikeIcon />
        </LikeButton>
      </Likes>
      <div>
        <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
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
          <span>{blog.comments ? blog.comments.length : 0}</span>
          <StyledCommentIcon />
        </BlogInfo>
      </div>
    </ListItem>
  );
};

BlogItem.propTypes = {
  blog: propTypes.blog,
  onLike: PropTypes.func
};

const blogItemHeight = 50;

const StyledBlogItemSkeleton = styled.li`
  list-style-type: none;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.grey};
  }

  &:empty:before {
    --blog-item-height: ${blogItemHeight}px;
    --blog-item-padding: 5px;
    --element-color: ${({ theme }) => theme.greyLight};
    --text-padding: 10px;

    --likes-height: 40px;
    --likes-width: 40px;
    --likes-position: var(--blog-item-padding) var(--blog-item-padding);
    --likes-skeleton: linear-gradient(
      var(--element-color) var(--likes-height),
      transparent 0
    );

    --title-height: 20px;
    --title-width: calc(75% - var(--likes-width) - var(--text-padding));
    --title-position: calc(
        var(--blog-item-padding) + var(--likes-width) + var(--text-padding)
      )
      var(--blog-item-padding);
    --title-skeleton: linear-gradient(
      var(--element-color) var(--title-height),
      transparent 0
    );

    --author-height: 15px;
    --author-width: calc(50% - var(--likes-width) - var(--text-padding));
    --author-position: calc(
        var(--blog-item-padding) + var(--likes-width) + var(--text-padding)
      )
      calc(var(--blog-item-padding) + var(--title-height) + 2px);
    --author-skeleton: linear-gradient(
      var(--element-color) var(--author-height),
      transparent 0
    );

    content: "";
    display: block;
    height: var(--blog-item-height);
    background-color: white;
    background-image: var(--likes-skeleton), var(--title-skeleton),
      var(--author-skeleton);
    background-size: var(--likes-width) var(--likes-height),
      var(--title-width) var(--title-height),
      var(--author-width) var(--author-height);
    background-position: var(--likes-position), var(--title-position),
      var(--author-position);
    background-origin: content-box;
    background-repeat: no-repeat;
  }
`;

const BlogItemSkeleton = ({ children }) => {
  return <StyledBlogItemSkeleton>{children}</StyledBlogItemSkeleton>;
};

const flash = keyframes`
  50% {
    opacity: .5;
  }
  to {
    opacity: 1;
  }
`;

const List = styled.ul`
  padding-left: 0;
  margin-top: 0;
  flex-grow: 1;
  position: relative;
  animation: 1.5s ease-in-out infinite
    ${({ pending }) => (pending ? flash : "none")};
`;

const BlogListView = ({ blogs, onLike, pending }) => {
  const listRef = useRef();
  if (pending) {
    blogs = Array(10)
      .fill()
      .map(_ => ({}));
  }
  return (
    <List ref={listRef} pending={pending}>
      {blogs.map((blog, key) => (
        <BlogItemSkeleton pending={pending} key={blog.id || key}>
          {!pending && <BlogItem blog={blog} onLike={() => onLike(blog)} />}
        </BlogItemSkeleton>
      ))}
    </List>
  );
};

BlogListView.propTypes = {
  blogs: PropTypes.arrayOf(propTypes.blog),
  onLike: PropTypes.func
};

export default BlogListView;
