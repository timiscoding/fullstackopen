import styled from "styled-components/macro";
import { clearFix } from "polished";
import Dropdown from "../../../Dropdown";
import ToggleableBase from "../../../Toggleable";
import { styling } from "../../../../constants";

export const SortDropdown = styled(Dropdown)`
  float: right;
`;

export const Toggleable = styled(ToggleableBase)`
  margin-bottom: 10px;
  & > button {
    border: 1px solid ${({ theme }) => theme.grey};
  }
`;

export const Actions = styled.div`
  ${clearFix()}
`;

export const Heading = styled.h3`
  margin-top: 30px;
  font-weight: 600;
  font-size: 1.2rem;
  ${styling.mobile(`
    font-weight: 550;
    font-size: 1.1rem;
  `)}
`;
