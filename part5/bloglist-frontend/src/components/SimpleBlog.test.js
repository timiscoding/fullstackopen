import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
  let component;
  let blog;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();

    blog = {
      title: 'Making your UI tests resilient to change',
      author: 'Kent C. Dodds',
      likes: 1000,
    };
    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);
  });

  test('renders title and author', () => {
    const div = component.getByTestId('blog-info');
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);
  });

  test('renders likes', () => {
    const div = component.getByTestId('blog-likes');
    expect(div).toHaveTextContent(`${blog.likes} likes`);
  });

  test('when like button clicked twice, handler is called twice', () => {
    const likeButton = component.getByTestId('like-button');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
