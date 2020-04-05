import React from "react";
import Header from "./Header";
import Body from "./BodyView";
import { Wrapper, Box } from "./styled";

const BoxView = ({ children }) => {
  return (
    <Wrapper>
      <Box>{children}</Box>
    </Wrapper>
  );
};

BoxView.Header = Header;
BoxView.Body = Body;

export default BoxView;
