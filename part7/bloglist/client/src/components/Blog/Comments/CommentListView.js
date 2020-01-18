import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Skeleton from "react-loading-skeleton";
import * as propTypes from "../../../constants/propTypes";
import { formatTimestamp } from "../../utils";

const border = css`
  1px solid ${({ theme }) => theme.greyLight}
`;

const StyledCommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  border-top: ${border};
`;

const Time = styled.time`
  font-size: 0.75em;
  color: ${({ theme }) => theme.greyDarker};
`;

const Comment = styled.li`
  padding: 5px 0;
  border-bottom: ${border};
`;

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
      <StyledCommentList>
        {comments.map(({ body, createdAt }, i) => (
          <Comment key={i}>
            <div>{body || <Skeleton width="70%" />}</div>
            <Time dateTime={createdAt}>
              {createdAt ? (
                formatTimestamp(createdAt)
              ) : (
                <Skeleton width="25%" />
              )}
            </Time>
          </Comment>
        ))}
      </StyledCommentList>
    </div>
  );
};

CommentListView.propTypes = {
  comments: propTypes.comments,
  pending: PropTypes.bool.isRequired
};

export default CommentListView;
