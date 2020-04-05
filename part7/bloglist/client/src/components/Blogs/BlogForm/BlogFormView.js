import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import Button from "../../Button";
import Form from "../../Form";
import * as validators from "../../Form/validators";
import Row from "../../Row";

const Wrapper = styled.div`
  padding: 10px;
  & h3 {
    margin: 0;
    margin-top: 10px;
  }
`;

const BlogFormView = ({ blogAdded, addBlog, pending, toggleableOpen }) => {
  const formRef = useRef();
  useEffect(() => {
    if (toggleableOpen) {
      formRef.current.focus();
    }
  }, [toggleableOpen]);

  const handleSubmit = async ({ title, author, url }) => {
    url = url.trim();
    if (!validators.isValidUrlScheme(url)) {
      url = "http://" + url;
    }
    const action = await addBlog({
      title: title.trim(),
      author: author.trim(),
      url,
    });
    if (action.type.endsWith("SUCCESS")) {
      formRef.current.clear();
      blogAdded();
    }
  };
  const handleClickClear = (event) => {
    event.preventDefault();
    formRef.current.clear();
    formRef.current.focus();
  };

  return (
    <Wrapper>
      <h3>Create blog</h3>
      <Form onSubmit={handleSubmit} pending={pending} ref={formRef}>
        {({ errors, validity, clearInput, submit }, { text }) => {
          return (
            <>
              <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  {...text("title", validators.required())}
                  valid={validity.title}
                  error={errors.title}
                  onClear={clearInput("title")}
                  placeholder="How to do thing"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="author">Author</Form.Label>
                <Form.Control
                  {...text("author", validators.required())}
                  valid={validity.author}
                  error={errors.author}
                  onClear={clearInput("author")}
                  placeholder="Thing Maker"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="url">URL</Form.Label>
                <Form.Control
                  {...text("url", validators.matchUrl)}
                  valid={validity.url}
                  error={errors.url}
                  onClear={clearInput("url")}
                  placeholder="http://dothething.com"
                />
              </Form.Group>
              <Row cols={2}>
                <Button
                  type="submit"
                  onClick={submit}
                  pending={pending}
                  appearance="add"
                >
                  Create
                </Button>
                <Button onClick={handleClickClear}>Clear</Button>
              </Row>
            </>
          );
        }}
      </Form>
    </Wrapper>
  );
};

BlogFormView.propTypes = {
  blogAdded: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  toggleableOpen: PropTypes.bool,
};

export default BlogFormView;
