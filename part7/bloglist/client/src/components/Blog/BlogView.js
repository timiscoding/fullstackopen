import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ellipsis, clearFix } from "polished";
import Skeleton from "react-loading-skeleton";
import * as propTypes from "../../constants/propTypes";
import { ReactComponent as LikeIcon } from "../../icons/like.svg";
import { ReactComponent as LinkIcon } from "../../icons/link.svg";
import { ReactComponent as GarbageIcon } from "../../icons/garbage.svg";
import { ReactComponent as CircleIcon } from "../../icons/filled-circle.svg";
import { ReactComponent as CommentIcon } from "../../icons/message.svg";
import Button from "../Button";
import { formatTimestamp, formatNum } from "../utils";

const Likes = styled.div`
  margin-right: 10px;
  font-size: 1.6em;
  text-align: center;
  width: 70px;
  display: inline-block;
  float: left;
`;

const BlogInfo = styled.div`
  width: calc(100% - 80px);
  display: inline-block;
`;

const StyledLikeIcon = styled(LikeIcon)`
  width: 1.3em;
  height: 1.3em;
  fill: ${({ theme }) => theme.blue};
`;

const StyledLinkIcon = styled(LinkIcon)`
  width: 1em;
  height: 1em;
  margin-right: 5px;
  vertical-align: middle;
`;

const StyledGarbageIcon = styled(GarbageIcon)`
  width: 1.5em;
  height: 1.5em;
  fill: ${({ theme }) => theme.red};
`;

const StyledCircleIcon = styled(CircleIcon)`
  width: 0.5em;
  height: 0.5em;
  vertical-align: middle;
  fill: ${({ theme }) => theme.greyLight};
  margin: 0 7px;
`;

const Title = styled.div`
  font-weight: 700;
  text-transform: capitalize;
`;

const Author = styled.div`
  font-size: 0.8em;
  margin-top: 5px;
  min-width: 100%;
  text-transform: capitalize;
  ${ellipsis("100%")};
  &:before {
    content: "by ";
  }
`;

const Metadata = styled.div`
  color: ${({ theme }) => theme.greyDark};
  font-size: 0.8em;
  margin-top: 5px;
`;

const StyledLink = styled.a`
  ${ellipsis("100%")};
`;

const LikeButton = styled(Button)`
  ${({ theme }) => `
    --btn-border-color: ${theme.blue};
    --btn-bg-color-hover: ${theme.blueLight};
    --btn-bg-color-active: ${theme.blueDark};
    padding: 5px;
    &:hover svg {
      fill: ${theme.fontLight};
    }
  `}
`;

const DeleteButton = styled(Button)`
  ${({ theme }) => `
    --btn-border-color: ${theme.red};
    --btn-bg-color-hover: ${theme.redLight};
    --btn-bg-color-active: ${theme.redDark};
    padding: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    &:hover svg {
      fill: ${theme.fontLight};
    }
  `}
`;

const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.greyDark};
`;

const StyledCommentIcon = styled(CommentIcon)`
  height: 0.8em;
  width: 0.8em;
  fill: ${({ theme }) => theme.grey};
  margin-left: 5px;
`;

const Creator = styled.span`
  &:before {
    content: "added by ";
  }
`;

const BlogWrapper = styled.div`
  ${clearFix()}
`;

const shorten = title =>
  title.length > 100 ? title.slice(0, 100) + "..." : title;

const BlogSkeleton = () => (
  <Wrapper>
    <BlogWrapper>
      <LikesSkeleton />
      <BlogInfoSkeleton />
    </BlogWrapper>
    <MetadataSkeleton />
  </Wrapper>
);

const BlogInfoSkeleton = () => (
  <BlogInfo>
    <Skeleton width="75%" />
    <div style={{ width: "30%" }}>
      <Skeleton count={2} />
    </div>
  </BlogInfo>
);

const LikesSkeleton = () => (
  <Likes>
    <Skeleton width="75%" />
    <Skeleton width="1.3em" height="1.3em" />
  </Likes>
);

const MetadataSkeleton = () => (
  <Metadata>
    <Skeleton width="40%" />
  </Metadata>
);

const BlogView = ({ blog, onActions = {}, pending }) => {
  if (pending.blog) {
    return <BlogSkeleton />;
  }
  const { likes, title, author, url, user, createdAt, commentCount } = blog;
  return (
    <Wrapper>
      <BlogWrapper>
        <Likes>
          <div>{formatNum(likes)}</div>
          {onActions.like ? (
            <LikeButton onClick={onActions.like} disabled={pending.like}>
              <StyledLikeIcon />
            </LikeButton>
          ) : (
            <StyledLikeIcon />
          )}
        </Likes>
        <BlogInfo>
          <Title>{shorten(title)}</Title>
          <Author>{author}</Author>
          <StyledLink href={url}>
            <StyledLinkIcon />
            {url}
          </StyledLink>
        </BlogInfo>
      </BlogWrapper>
      <Metadata>
        <span>
          {createdAt ? (
            <time dateTime={createdAt}>{formatTimestamp(createdAt)}</time>
          ) : (
            "Time unknown"
          )}
        </span>
        <StyledCircleIcon />
        <Creator>
          {user ? (
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          ) : (
            <Skeleton width={100} />
          )}
        </Creator>
        <StyledCircleIcon />
        <span>{formatNum(commentCount)}</span>
        <StyledCommentIcon />
      </Metadata>
      {onActions.delete && (
        <DeleteButton onClick={onActions.delete} disabled={pending.delete}>
          <StyledGarbageIcon />
        </DeleteButton>
      )}
    </Wrapper>
  );
};

BlogView.propTypes = {
  blog: propTypes.blog,
  onActions: PropTypes.shape({
    delete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    like: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  }).isRequired,
  pending: PropTypes.objectOf(PropTypes.bool).isRequired
};

export default BlogView;
