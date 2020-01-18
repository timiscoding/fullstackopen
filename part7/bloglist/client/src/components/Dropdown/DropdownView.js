import React, { useState } from "react";
import styled, { css } from "styled-components";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import { ReactComponent as DownChevronIcon } from "../../icons/down-chevron.svg";
import { ReactComponent as UpChevronIcon } from "../../icons/up-chevron.svg";

const defaults = {
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: css`
    ${({ theme }) => theme.primary}
  `,
  padding: "5px",
  width: "100px",
  listBg: "#fff",
  fontSize: ".8em"
};

const Wrapper = styled.div`
  cursor: default;
  user-select: none;
  position: relative;
  width: var(--dd-width, defaults.width);
  font-size: var(--dd-font-size, ${defaults.fontSize});
`;

const borderWidth = `var(--dd-border-width, ${defaults.borderWidth})`;

const borderStyles = css`
  border-width: ${borderWidth};
  border-style: var(--dd-border-style, ${defaults.borderStyle});
  border-color: var(--dd-border-color, ${defaults.borderColor});
`;

const Title = styled.div`
  ${borderStyles}
  color: var(--dd-title-fg, ${({ theme }) => theme.fontLight});
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--dd-padding, ${defaults.padding});
  background-color: var(--dd-title-bg, ${({ theme }) => theme.primaryLight});
`;

const List = styled.ul`
  ${borderStyles}
  background-color: var(--dd-list-bg, ${defaults.listBg});
  min-width: calc(100% - 2 * ${borderWidth});
  display: inline-block;
  position: absolute;
  list-style-type: none;
  padding: 0;
  margin: 0;
  top: calc(100% - ${borderWidth});
  left: 0;
  z-index: 1;
`;

const ListItem = styled.li`
  padding: var(--dd-padding, ${defaults.padding});
  background-color: ${({ highlighted, theme }) =>
    highlighted
      ? `
    var(
      --dd-item-highlight-bg,
      ${theme.secondary}
    );
  `
      : "transparent"};
`;

const StyledDownChevronIcon = styled(DownChevronIcon)`
  width: var(--dd-font-size, ${defaults.fontSize});
  height: var(--dd-font-size, ${defaults.fontSize});
  fill: var(--dd-title-fg, ${({ theme }) => theme.fontLight});
`;

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
      <Title>
        {options?.[selected]?.title ?? defaultTitle}
        <StyledDownChevronIcon as={listOpen && UpChevronIcon} />
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
