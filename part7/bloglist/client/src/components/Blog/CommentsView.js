import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as propTypes from "../../constants/propTypes";
import { useFormState } from "../../hooks";
import { required } from "../../hooks/utils";

const CommentForm = ({ onComment, pending }) => {
  const formRef = useRef();
  const [{ validity, errors, submit, clear, values }, { text }] = useFormState(
    formRef
  );

  const handleSubmit = async event => {
    event.preventDefault();
    const action = await onComment(values.comment);
    if (action.type.endsWith("SUCCESS")) {
      clear();
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <fieldset disabled={pending}>
        {!validity.comment ? <div>{errors.comment}</div> : null}
        <input {...text("comment", required())} />
        <button onClick={submit}>
          {pending ? "Submitting..." : "Add comment"}
        </button>
      </fieldset>
    </form>
  );
};

CommentForm.propTypes = {
  onComment: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.length !== 0 ? (
        <ul>
          {comments.map(({ body }, i) => (
            <li key={i}>{body}</li>
          ))}
        </ul>
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
