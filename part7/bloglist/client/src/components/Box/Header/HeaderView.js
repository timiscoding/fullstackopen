import React from "react";
import { Header } from "./styled";

const HeaderView = ({ children, ...props }) => {
  return <Header {...props}>{children}</Header>;
};

export default HeaderView;
