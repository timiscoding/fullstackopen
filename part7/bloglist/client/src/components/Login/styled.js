import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { styling } from "../../constants";

export const RegisterLink = styled(Link)`
  font-size: 0.8rem;
  ${styling.mobile(`
    font-size: 1rem;
  `)}
`;
