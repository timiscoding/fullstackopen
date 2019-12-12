import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormState, useInputErrorHeights } from "../../../hooks";
import { required } from "../../../hooks/utils";
import Button from "../../Button";
import Input, { Label, InputError, InputDiv, Fieldset } from "../../Input";

const Wrapper = styled.div`
  padding: 12px;
  ${({ theme }) => `
    --btn-color: ${theme.fontLight};
    --btn-border-color: ${theme.green}
    --btn-bg-color: ${theme.green};
    --btn-fg-color-hover: ${theme.fontLight};
    --btn-bg-color-hover: ${theme.greenLight};
    --btn-bg-color-active: ${theme.greenDark};
    `}
  & h3 {
    margin: 0;
  }
`;

const BlogFormView = ({ blogAdded, addBlog, pending, toggleableOpen }) => {
  const formRef = useRef();
  const errorRefs = {
    title: useRef(),
    author: useRef(),
    url: useRef()
  };
  const [{ validity, errors, clear, values, submit }, { text }] = useFormState(
    formRef
  );
  const errorHeights = useInputErrorHeights(errorRefs, errors);
  useEffect(() => {
    if (toggleableOpen) {
      formRef.current.elements.title.focus();
    }
  }, [toggleableOpen]);

  const handleSubmit = async event => {
    event.preventDefault();

    const action = await addBlog({
      title: values.title.trim(),
      author: values.author.trim(),
      url: values.url.trim()
    });

    if (action.type.endsWith("SUCCESS")) {
      clear();
      blogAdded();
    }
  };

  return (
    <Wrapper>
      <h3>Create blog</h3>

      <form onSubmit={handleSubmit} ref={formRef}>
        <Fieldset disabled={pending}>
          <InputDiv>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...text("title", required())}
              valid={validity.title}
            />
            <InputError ref={errorRefs.title} height={errorHeights.title}>
              {errors.title}
            </InputError>
          </InputDiv>
          <InputDiv>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              {...text("author", required())}
              valid={validity.author}
            />
            <InputError ref={errorRefs.author} height={errorHeights.author}>
              {errors.author}
            </InputError>
          </InputDiv>
          <InputDiv>
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...text("url", required())} valid={validity.url} />
            <InputError ref={errorRefs.url} height={errorHeights.url}>
              {errors.url}
            </InputError>
          </InputDiv>
          <Button type="submit" onClick={submit}>
            Create
          </Button>
        </Fieldset>
      </form>
    </Wrapper>
  );
};

BlogFormView.propTypes = {
  blogAdded: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default BlogFormView;
