import React from "react";
import styled from "styled-components/macro";

const Group = styled.div`
  margin: 20px 0;
`;

const GroupView = ({ children, className }) => (
  <Group className={className}>{children}</Group>
);

export default GroupView;
