import { addParameters, configure, addDecorator } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import React, { useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../src/components/Theme";
import GlobalStyle from "../src/components/GlobalStyle";
import StoryRouter from "storybook-react-router";
import { ModalProvider } from "../src/hooks";

// automatically import all files ending in *.stories.js
configure(require.context("../src/components", true, /\.stories\.js$/), module);

addDecorator((storyFn) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
));

addDecorator((storyFn) => {
  const [showModal, setShowModal] = useState(false);

  const modals = {
    modal: {
      show: showModal,
      onOpen: () => setShowModal(true),
      onClose: useCallback(() => setShowModal(false), []),
    },
    deleteBlogs: {
      show: showModal,
      onOpen: () => setShowModal(true),
      onClose: useCallback(() => setShowModal(false), []),
    },
  };
  return <ModalProvider value={modals}>{storyFn()}</ModalProvider>;
});

addDecorator(StoryRouter());

addParameters({
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
});
