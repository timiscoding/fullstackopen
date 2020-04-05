import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import styled from "styled-components/macro";
import Lorem from "react-lorem-component";
import Modal from "./";
import Button from "../Button";
import Row from "../Row";
import { useModal } from "../../hooks";

const StyledPage = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Page = () => {
  const { modal } = useModal();
  const overflow = boolean("modal overflow", false);
  return (
    <StyledPage>
      <button onClick={modal.onOpen}>Open modal</button>
      <Lorem count={8} />
      <button onClick={modal.onOpen}>Open modal</button>
      <Lorem count={9} />
      <button onClick={modal.onOpen}>Open modal</button>
      <Modal show={modal.show} onClose={modal.onClose}>
        <Modal.Header>This is a header</Modal.Header>
        <Modal.Body>
          {overflow ? <Lorem count={12} /> : <p>This is modal content</p>}
        </Modal.Body>
        <Modal.Footer>
          <Row cols={2} justify="end">
            <Button onClick={modal.onClose} appearance="primary">
              Okay
            </Button>
            <Button onClick={modal.onClose}>Cancel</Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </StyledPage>
  );
};

export default {
  title: "Modal",
  decorators: [withKnobs],
};

// indirectly render component otherwise modal provider context isn't passed to the story
export const normal = () => <Page />;
