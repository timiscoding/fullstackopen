import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as propTypes from "../../constants/propTypes";
import { useFormState, useInputErrorHeights } from "../../hooks";
import { required } from "../../hooks/utils";
import { InputError, Fieldset, InputDiv } from "../Input";
import PrimaryButton from "../PrimaryButton";
import { formatTimestamp } from "../utils";
import { ReactComponent as CommentIcon } from "../../icons/message.svg";

const Textarea = styled.textarea`
  width: 600px;
  height: 70px;
  border: 2px solid ${({ theme }) => theme.greyLight};
  font-family: inherit;
`;

const StyledCommentIcon = styled(CommentIcon)`
  width: 1em;
  height: 1em;
  fill: white;
  margin-right: 5px;
  vertical-align: middle;
`;

const CommentForm = ({ onComment, pending }) => {
  const formRef = useRef();
  const errorRefs = {
    comment: useRef()
  };
  const [{ errors, submit, clear, values }, { textarea }] = useFormState(
    formRef
  );
  const errorHeights = useInputErrorHeights(errorRefs, errors);

  const handleSubmit = async event => {
    event.preventDefault();
    const action = await onComment(values.comment);
    if (action.type.endsWith("SUCCESS")) {
      clear();
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Fieldset disabled={pending}>
        <InputDiv>
          <Textarea
            {...textarea("comment", required())}
            placeholder="Comment on this blog"
          />
          <InputError ref={errorRefs.comment} height={errorHeights.comment}>
            {errors.comment}
          </InputError>
        </InputDiv>
        <PrimaryButton onClick={submit}>
          <StyledCommentIcon />
          {pending ? "Submitting..." : "Add comment"}
        </PrimaryButton>
      </Fieldset>
    </form>
  );
};

CommentForm.propTypes = {
  onComment: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

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

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.length !== 0 ? (
        <StyledCommentList>
          {comments.map(
            ({ body, createdAt = "2019-01-01T00:00:00.000Z" }, i) => (
              <Comment key={i}>
                <div>{body}</div>
                <Time dateTime={createdAt}>{formatTimestamp(createdAt)}</Time>
              </Comment>
            )
          )}
        </StyledCommentList>
      ) : (
        <p>There are no comments</p>
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: propTypes.comments
};

const CommentsView = ({ comments, onComment, pending }) => {
  return (
    <div>
      <h3>Comments</h3>
      <CommentForm onComment={onComment} pending={pending} />
      <CommentList comments={comments} />
    </div>
  );
};

CommentsView.propTypes = {
  comments: propTypes.comments,
  onComment: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default CommentsView;
