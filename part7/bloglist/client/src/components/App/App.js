import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import routes from "../../routes";
import Header from "../Header";
import { Content, ContentInner, Page, StyledFooter } from "./styled";

function App() {
  return (
    <Router>
      <Helmet defaultTitle="BlogList" titleTemplate="%s | BlogList">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Helmet>
      <Header />
      <Page>
        <Content>
          <ContentInner>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.main}
                exact={route.exact}
              />
            ))}
          </ContentInner>
        </Content>
        <StyledFooter />
      </Page>
    </Router>
  );
}

export default App;
