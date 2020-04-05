import styled from "styled-components/macro";
import { animated } from "react-spring";
import CheckboxBase from "../../Checkbox";

export const DeleteToggle = styled(CheckboxBase)`
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
`;

export const ActionPanel = styled.div`
  display: ${({ pending }) => (pending ? "block" : "flex")};
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  ${({ theme, pending }) => `
    border-bottom: 2px solid ${pending ? theme.greyLight : theme.primary};
  `};
  padding: 10px 0;
`;

export const DeletePanel = styled(animated.div)`
  white-space: nowrap;
`;

export const SelectAll = styled.span`
  margin-right: 10px;
  margin-left: 20px;
  & label {
    cursor: pointer;
    margin-right: 5px;
    user-select: none;
  }
`;

export const Checkbox = styled(CheckboxBase)`
  vertical-align: sub;
`;
