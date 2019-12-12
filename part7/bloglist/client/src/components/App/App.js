import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import Header from "../Header";
import Footer from "../Footer";

const Content = styled.div`
  max-width: 980px;
  width: 100%;
  border: 1px solid transparent;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  &:before {
    content: "";
    min-height: 45px;
    display: block;
  }
`;

function App() {
  return (
    <Router>
      <Header />
      <Page>
        <Content>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.main}
              exact={route.exact}
            />
          ))}
        </Content>
        <Footer />
      </Page>
    </Router>
  );
}

export default App;
