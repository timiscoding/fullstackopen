import styled from "styled-components/macro";
import { styling } from "../../../constants";

export const TextArea = styled.textarea`
  width: 100%;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.greyLight};
  font-size: 1rem;
  ${styling.focusCorner}
`;
