import styled from "styled-components/macro";
import { clearFix } from "polished";

export const SortWrapper = styled.div`
  ${clearFix()}
  margin-bottom: 10px;
`;

export const UserInfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: -10px;
`;

export const UserInfoItem = styled.li`
  display: inline;
  font-size: 0.9em;
  font-weight: 400;
  text-transform: capitalize;
  color: ${({ theme }) => theme.primary};
  &:not(:first-child) {
    margin-left: 5px;
  }
  &:not(:first-child):before {
    content: "•";
    padding-right: 5px;
  }
`;

export const UserInfoTitle = styled.h2`
  text-transform: capitalize;
`;
