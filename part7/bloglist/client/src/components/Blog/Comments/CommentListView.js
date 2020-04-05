import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import * as propTypes from "../../../constants/propTypes";
import { formatTimestamp } from "../../utils";
import { Comment, Body, Time, CommentList } from "./styled/CommentsListView";

const CommentListView = ({ comments, pending }) => {
  if (pending) {
    comments = Array(5)
      .fill()
      .map(_ => ({}));
  }
  if (!pending && comments.length === 0) {
    return <p>There are no comments</p>;
  }
  return (
    <div>
      <CommentList>
        {comments.map(({ body, createdAt }, i) => (
          <Comment key={i}>
            <Body>{body || <Skeleton width="70%" />}</Body>
            <Time dateTime={createdAt}>
              {createdAt ? (
                formatTimestamp(createdAt)
              ) : (
                <Skeleton width="25%" />
              )}
            </Time>
          </Comment>
        ))}
      </CommentList>
    </div>
  );
};

CommentListView.propTypes = {
  comments: propTypes.comments,
  pending: PropTypes.bool
};

export default CommentListView;
