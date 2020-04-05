import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import { Wrapper, Title, List, ListItem, DownChevronIcon } from "./styled";

const SPACE_KEY = 32;
const ESCAPE_KEY = 27;
const ARROW_DOWN_KEY = 40;
const ARROW_UP_KEY = 38;
const ARROW_RIGHT_KEY = 39;
const ARROW_LEFT_KEY = 37;
const ENTER_KEY = 13;
const TAB_KEY = 9;

const DropdownView = ({
  className,
  defaultTitle,
  options,
  onChange = () => {},
  defaultValue
}) => {
  useEffect(() => {
    setSelected(options.findIndex(o => o.value === defaultValue));
  }, [defaultValue, options]);
  const [listOpen, setListOpen] = useState(false);
  const [selected, setSelected] = useState(
    defaultValue && options.findIndex(o => o.value === defaultValue)
  );
  const [highlighted, setHighlighted] = useState();

  const handleClick = () => setListOpen(!listOpen);
  DropdownView.handleClickOutside = () => setListOpen(false);
  const selectItem = id => {
    setSelected(id);
    setListOpen(false);
    onChange(options[id].value);
  };
  const clamp = index =>
    isNaN(index) ? 0 : Math.min(options.length - 1, Math.max(0, index));

  const handleKeyDown = event => {
    const { keyCode } = event;
    if (keyCode === TAB_KEY) {
      return;
    }
    event.preventDefault();
    if (keyCode === SPACE_KEY && !listOpen) {
      setListOpen(true);
    }
    if (
      (keyCode === SPACE_KEY || keyCode === ENTER_KEY) &&
      listOpen &&
      highlighted !== null
    ) {
      selectItem(highlighted);
    }
    if (keyCode === ESCAPE_KEY) {
      setListOpen(false);
    }
    if (keyCode === ARROW_DOWN_KEY && listOpen) {
      setHighlighted(clamp(highlighted + 1));
    }
    if (keyCode === ARROW_DOWN_KEY && !listOpen) {
      setListOpen(true);
    }
    if (keyCode === ARROW_UP_KEY) {
      setHighlighted(clamp(highlighted - 1));
    }
    if (keyCode === ARROW_RIGHT_KEY) {
      selectItem(clamp(selected + 1));
    }
    if (keyCode === ARROW_LEFT_KEY) {
      selectItem(clamp(selected - 1));
    }
  };

  const handleMouseOver = id => setHighlighted(id);
  return (
    <Wrapper
      className={className}
      onClick={handleClick}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <Title listOpen={listOpen}>
        {options?.[selected]?.title ?? defaultTitle}
        <DownChevronIcon collapse={listOpen} />
      </Title>
      {listOpen && (
        <List>
          {options.map(({ title }, id) => (
            <ListItem
              key={id}
              onClick={() => selectItem(id)}
              onMouseMove={() => handleMouseOver(id)}
              highlighted={highlighted === id}
            >
              {selected === id && "✓"} {title}
            </ListItem>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

/* workaround fix for react-onclickoutside
  https://github.com/Pomax/react-onclickoutside/issues/327 */
DropdownView.prototype = {};

export default onClickOutside(DropdownView, {
  handleClickOutside: () => DropdownView.handleClickOutside
});

DropdownView.propTypes = {
  className: PropTypes.string,
  defaultTitle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func,
  defaultValue: PropTypes.string
};
