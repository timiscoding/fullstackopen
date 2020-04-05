import React from "react";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import Skeleton from "react-loading-skeleton";
import * as propTypes from "../../../constants/propTypes";
import { formatTimestamp, formatNum } from "../../utils";
import { useMatchMobile } from "../../../hooks";
import FadeOverflow from "../../FadeOverflow";
import {
  ListItemSkeleton,
  Item,
  Likes,
  ListItem,
  Title,
  Author,
  BlogInfo,
  Time,
  CircleIcon,
  CommentIcon,
  BlogCheckbox,
  LikeButton
} from "./styled";

const BlogItemSkeleton = () => (
  <ListItemSkeleton>
    <Item>
      <Likes>
        <Skeleton />
        <Skeleton width="1.5em" height="1.5em" circle />
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
  pending,
  checkboxStyle
}) => {
  const isMobile = useMatchMobile();
  const transition = useTransition(selectable, null, {
    from: {
      transform: "translateX(100%)",
      opacity: 0
    },
    enter: {
      transform: "translateX(0%)",
      opacity: 1
    },
    leave: {
      transform: "translateX(100%)",
      opacity: 0
    },
    immediate: !isMobile
  });
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
          <LikeButton onClick={onLike} disabled={isMobile && selectable} />
        </Likes>
        <div>
          <Title
            to={`/blogs/${blog.id}`}
            isLink={isMobile === false || (isMobile === true && !selectable)}
          >
            {blog.title}
          </Title>
          <FadeOverflow>
            <BlogInfo>
              {blog.createdAt ? (
                <Time dateTime={blog.createdAt}>
                  {formatTimestamp(blog.createdAt)}
                </Time>
              ) : (
                "Time unknown"
              )}
              <CircleIcon />
              <Author>{blog.author}</Author>
              <CircleIcon />
              <span>{blog.commentCount}</span>
              <CommentIcon />
            </BlogInfo>
          </FadeOverflow>
        </div>
      </Item>
      {transition.map(
        ({ item, props: style, key }) =>
          item && (
            <animated.div style={style} key={key}>
              <BlogCheckbox
                onChange={handleSelect}
                value={blog.id}
                checked={selected}
                style={checkboxStyle}
              />
            </animated.div>
          )
      )}
    </ListItem>
  );
};

BlogItemView.propTypes = {
  blog: propTypes.blog,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  pending: PropTypes.bool,
  checkboxStyle: PropTypes.object,
  onLike: PropTypes.func,
  onSelect: PropTypes.func
};

export default BlogItemView;
