import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs.js');

// Stop warning from displaying in react 16.8.x
// https://github.com/facebook/react/issues/14769
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) return;
    originalError.call(console, ...args);
  };
});

describe('<App />', () => {
  test('when user not logged in, notes are not rendered', async () => {
    const component = render(<App />);
    await waitForElement(() => component.getByText('login'));
    const note = component.container.querySelector('.note');
    expect(note).toBeNull();
  });

  test('when user is logged in, notes are rendered', async () => {
    const user = {
      username: 'hfield',
      name: 'Holden Caulfield',
      token: '1234.eyJpZCI6IjEyMyIsInVzZXJuYW1lIjoiaGNhdWxmaWVsZCJ9.1234',
    };
    localStorage.setItem('loggedInBlogappUser', JSON.stringify(user));

    const component = render(<App />);

    await waitForElement(() => component.getByText(/blogs/i));
    const blogs = component.getAllByTestId('blog-body');

    expect(blogs.length).toBe(3);
    expect(component.container).toHaveTextContent('Flowers for Algernon');
    expect(component.container).toHaveTextContent('toggleable');
    expect(component.container).toHaveTextContent('Enders Game');
  });
});

afterAll(() => {
  console.error = originalError;
});
