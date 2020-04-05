import styled from "styled-components/macro";
import { styling } from "../../../constants";
import { CloseButton } from "../../Button";

const padding = "10px";

export const BorderlessInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  padding: ${padding};
  min-width: 0px;
`;

export const Wrapper = styled.div`
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  background-color: #fff;
  display: flex;
  ${({ theme, valid, noValidStyle }) => `
    border-color: ${
      valid === true && noValidStyle !== true
        ? `var(--input-valid-color, ${theme.valid})`
        : valid === false
        ? `var(--input-invalid-color, ${theme.error})`
        : theme.grey
    };

  `}
  ${styling.mobile(`
    border-width: 1px;
    padding: 0;
  `)}
  ${styling.focusCorner}
`;

export const ClearButton = styled(CloseButton)`
  --color: ${({ theme }) => theme.greyDarker};
  font-size: 0;
`;
