import React from "react";
import { Provider } from "react-redux";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import styled from "styled-components/macro";
import configureStore from "../../store/configureStore";
import Header from "./HeaderView";

const Link = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 1em;
`;

const user = {
  id: "an1di0tabr0ad",
  username: "Orange",
  name: "Karl Pilkington",
};

const Wrapper = (storyFn) => {
  return (
    <Provider store={configureStore()}>
      <div>
        {storyFn()}
        <div style={{ marginTop: 50, paddingLeft: 20 }}>
          <h2>Blogs</h2>
          {Array(10)
            .fill()
            .map((_, i) => (
              <p key={i}>
                <Link>{`Blog ${i}`}</Link>
              </p>
            ))}
        </div>
      </div>
    </Provider>
  );
};

export default {
  title: "Header",
  decorators: [Wrapper, withKnobs],
};

export const normal = () => {
  return (
    <Header
      currentUser={boolean("Logged in", false) ? user : null}
      onLogout={action("Log out")}
    />
  );
};
