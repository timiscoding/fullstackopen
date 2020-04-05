import styled from "styled-components/macro";
import Footer from "../Footer";
import { styling } from "../../constants";

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const ContentInner = styled.div`
  max-width: ${styling.maxPageWidth};
  flex: 1;
  min-width: 0;
  margin: 0 10px;
  ${styling.mobile(`
    margin: 10px 5px;
  `)}
`;

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  :before {
    content: "";
    height: ${styling.navbarHeight};
    flex-shrink: 0;
  }
`;

export const StyledFooter = styled(Footer)`
  flex-shrink: 0;
`;
