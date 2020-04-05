import styled from "styled-components/macro";
import { styling } from "../../constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  ${styling.mobile(`
    display: block;
    margin: 10px 0;
  `)}
`;

export const Box = styled.div`
  width: 450px;
  margin: 0 auto;
  padding: 20px 20px 40px;
  border: 2px solid ${({ theme }) => theme.primaryLighter};
  box-shadow: 0 8px 8px -5px ${({ theme }) => theme.primaryDark};
  h2 {
    text-align: center;
  }
  ${styling.mobile(`
    width: 100%;
  `)}
`;
