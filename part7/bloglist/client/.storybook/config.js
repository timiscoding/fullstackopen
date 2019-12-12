import { configure, addDecorator } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../src/components/Theme";
import GlobalStyle from "../src/components/GlobalStyle";
import StoryRouter from "storybook-react-router";

// automatically import all files ending in *.stories.js
configure(require.context("../src/components", true, /\.stories\.js$/), module);

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
));

addDecorator(StoryRouter());
