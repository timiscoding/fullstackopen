import React from "react";
import { useSpring } from "react-spring";
import PropTypes from "prop-types";
import { Fieldset } from "../../Form";
import {
  ActionPanel,
  DeleteToggle,
  DeletePanel,
  SelectAll,
  Checkbox
} from "./styled";
import Button from "../../Button";

const ActionPanelView = ({
  onToggleMode,
  deleteMode,
  onClickCheckAll,
  checkAll,
  onClickDelete,
  disableDelete,
  pending,
  deleteCount,
  isMobile
}) => {
  const style = useSpring({
    opacity: deleteMode ? 1 : 0,
    transform: deleteMode ? "translateX(0%)" : "translateX(100%)",
    immediate: !isMobile
  });

  return (
    <ActionPanel>
      <DeleteToggle
        isToggle
        onChange={onToggleMode}
        checked={deleteMode}
        isHidden={isMobile === false}
      />
      <DeletePanel style={style}>
        <Fieldset disabled={pending}>
          <Button
            onClick={onClickDelete}
            disabled={disableDelete || pending}
            appearance="danger"
          >
            Delete {deleteCount ? `(${deleteCount})` : ""}
          </Button>
          <SelectAll>
            <label htmlFor="checkAll">Select all</label>
            <Checkbox
              id="checkAll"
              onChange={onClickCheckAll}
              checked={checkAll}
            />
          </SelectAll>
        </Fieldset>
      </DeletePanel>
    </ActionPanel>
  );
};

ActionPanelView.propTypes = {
  onToggleMode: PropTypes.func,
  onClickCheckAll: PropTypes.func,
  onClickDelete: PropTypes.func,
  deleteMode: PropTypes.bool,
  checkAll: PropTypes.bool,
  disableDelete: PropTypes.bool,
  pending: PropTypes.bool,
  deleteCount: PropTypes.number,
  isMobile: PropTypes.bool
};

export default ActionPanelView;
