import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import * as propTypes from "../../constants/propTypes";
import FadeOverflow from "../FadeOverflow";
import {
  Wrapper,
  BlogWrapper,
  Title,
  Author,
  LinkIcon,
  Likes,
  Metadata,
  BlogInfo,
  BlogLink,
  GarbageIcon,
  Time,
  CircleIcon,
  Creator,
  CommentIcon,
  LikeButton,
  DeleteButton
} from "./styled";
import Button from "../Button";
import Modal from "../Modal";
import Row from "../Row";
import { useModal } from "../../hooks";
import { formatTimestamp, formatNum } from "../utils";

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
  <BlogInfo style={{ width: "100%" }}>
    <Title>
      <Skeleton width="75%" />
    </Title>
    <div style={{ width: "30%" }}>
      <Skeleton count={2} />
    </div>
  </BlogInfo>
);

const LikesSkeleton = () => (
  <Likes>
    <Skeleton width="75%" />
    <Skeleton width="1.3em" height="1.3em" circle />
  </Likes>
);

const MetadataSkeleton = () => (
  <Metadata>
    <Skeleton width="40%" />
  </Metadata>
);

const BlogView = ({ blog, onActions = {}, pending }) => {
  const modals = useModal();
  const handleDelete = () => {
    onActions.delete();
    modals.deleteBlogs.onClose();
  };
  if (pending.blog) {
    return <BlogSkeleton />;
  }
  const { likes, title, author, url, user, createdAt, commentCount } = blog;
  return (
    <Wrapper>
      <BlogWrapper>
        <Likes>
          <div>{formatNum(likes)}</div>
          <LikeButton
            onClick={() => onActions.like(blog)}
            disabled={pending.like}
          />
        </Likes>
        <BlogInfo>
          <Title>{title}</Title>
          <Author>{author}</Author>
          <BlogLink href={url}>
            <LinkIcon />
            {new URL(url).hostname}
          </BlogLink>
        </BlogInfo>
        {onActions.delete && (
          <DeleteButton
            onClick={modals.deleteBlogs.onOpen}
            disabled={pending.delete}
            appearance="danger"
            round
          >
            <GarbageIcon />
          </DeleteButton>
        )}
      </BlogWrapper>
      <FadeOverflow>
        <Metadata>
          <Time>
            {createdAt ? (
              <time dateTime={createdAt}>{formatTimestamp(createdAt)}</time>
            ) : (
              "Time unknown"
            )}
          </Time>
          <CircleIcon />
          <Creator>
            {user ? (
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            ) : (
              <Skeleton width={100} />
            )}
          </Creator>
          <CircleIcon />
          <span>{formatNum(commentCount)}</span>
          <CommentIcon />
        </Metadata>
      </FadeOverflow>
      <Modal
        show={modals.deleteBlogs.show}
        onClose={modals.deleteBlogs.onClose}
      >
        <Modal.Header>Confirm deletion</Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Row cols={2} justify="end">
            <Button onClick={handleDelete} appearance="danger">
              Delete
            </Button>
            <Button onClick={modals.deleteBlogs.onClose}>Cancel</Button>
          </Row>
        </Modal.Footer>
      </Modal>
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
