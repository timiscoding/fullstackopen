import styled from "styled-components/macro";
import { ReactComponent as ErrorGlyph } from "../../icons/round-error-symbol.svg";

export const ErrorIcon = styled(ErrorGlyph)`
  width: 1em;
  height: 1em;
  fill: ${({ theme }) => theme.red};
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
`;
