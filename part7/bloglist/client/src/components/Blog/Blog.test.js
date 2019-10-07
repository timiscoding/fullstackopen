import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogItem from "./BlogItem";

describe("<BlogItem />", () => {
  let blog, component;

  beforeEach(() => {
    const noop = () => {};
    blog = {
      title: "Making your UI tests resilient to change",
      author: "Kent C. Dodds",
      url:
        "https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change",
      likes: 1000
    };
    component = render(
      <BlogItem blog={blog} onLike={noop} onDelete={noop} canDelete />
    );
  });

  test("only title and author are displayed by default", () => {
    const div = component.getByTestId("blog-body");
    expect(div).toHaveTextContent(new RegExp(`${blog.title} ${blog.author}`));
  });

  test("when clicked, the content is opened", () => {
    const div = component.getByTestId("blog-body");
    fireEvent.click(div);

    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
    expect(div).toHaveTextContent(`${blog.likes} likes`);
    expect(div).toHaveTextContent(blog.url);
  });
});
