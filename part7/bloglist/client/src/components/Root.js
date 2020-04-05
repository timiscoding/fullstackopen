import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components/macro";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import theme from "./Theme";
import { ModalProvider } from "../hooks/useModal";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <GlobalStyle />
          <App />
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
