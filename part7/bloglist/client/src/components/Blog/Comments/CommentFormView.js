import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useFormState, useInputErrorHeights } from "../../../hooks";
import { required } from "../../../hooks/utils";
import { InputError, Fieldset, InputDiv } from "../../Input";
import PrimaryButton from "../../PrimaryButton";
import { ReactComponent as CommentIcon } from "../../../icons/message.svg";

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

export default CommentForm;
