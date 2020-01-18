import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { CSSTransition } from "react-transition-group";
import { clearFix } from "polished";
import BlogList from "../BlogList";
import Checkbox from "../Checkbox";
import Button from "../Button";
import Pager from "../Pager";
import { SortBlogsDropdown } from "../Dropdown";
import * as propTypes from "../../constants/propTypes";

const StyledActionPanel = styled.div`
  display: ${({ pending }) => (pending ? "block" : "flex")};
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  height: 2em;
  ${({ theme, pending }) => `
    border-bottom: 2px solid ${pending ? theme.greyLight : theme.primary};
  `};
  padding: 5px;
`;

const DeletePanel = styled.div`
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
  & > * {
    margin-left: 10px;
  }

  &.panel-enter {
    transform: translateX(100%);
    opacity: 0;
  }

  &.panel-enter-active {
    transform: translateX(0%);
    opacity: 1;
  }

  &.panel-exit {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const SelectAll = styled.span`
  margin-right: 10px;
  & label {
    cursor: pointer;
    margin-right: 5px;
    user-select: none;
  }
`;

const DeleteButton = styled(Button)`
  --btn-border-color: ${({ theme }) => theme.error};
  --btn-bg-color: ${({ theme }) => theme.redLighter};
  --btn-bg-color-hover: ${({ theme }) => theme.red};
  --btn-fg-color-hover: ${({ theme }) => theme.fontLight};
  --btn-bg-color-active: ${({ theme }) => theme.error};
  --btn-fg-color-active: ${({ theme }) => theme.fontLight};
`;

const Link = styled.button`
  cursor: pointer;
`;

const SortWrapper = styled.div`
  ${clearFix()}
`;

const UserInfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: -10px;
`;

const UserInfoItem = styled.li`
  display: inline;
  font-size: 0.9em;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  &:not(:first-child) {
    margin-left: 10px;
  }
  &:not(:first-child):before {
    content: "❘";
    padding-right: 10px;
  }
`;

const UserInfoName = styled(UserInfoItem)`
  text-transform: capitalize;
`;

const UserInfoTitle = styled.h2`
  text-transform: capitalize;
`;

const ActionPanel = ({
  onClickMode,
  deleteMode,
  onClickCheckAll,
  checkAll,
  onClickDelete,
  disableDelete,
  pending
}) => {
  if (pending) {
    return (
      <StyledActionPanel pending={pending}>
        <div style={{ lineHeight: "2em" }}>
          <Skeleton width="20%" />
        </div>
      </StyledActionPanel>
    );
  }
  return (
    <StyledActionPanel>
      <div>
        <ToggleLink isLink={deleteMode} onClick={onClickMode}>
          View mode
        </ToggleLink>{" "}
        |{" "}
        <ToggleLink
          isLink={!deleteMode}
          onClick={onClickMode}
          pending={pending}
        >
          Delete mode
        </ToggleLink>
      </div>
      <CSSTransition
        in={deleteMode}
        classNames="panel"
        timeout={250}
        mountOnEnter
        unmountOnExit
      >
        <DeletePanel>
          <DeleteButton onClick={onClickDelete} disabled={disableDelete}>
            Delete
          </DeleteButton>
          <SelectAll>
            <label htmlFor="checkAll">Select all</label>
            <Checkbox
              id="checkAll"
              onChange={onClickCheckAll}
              checked={checkAll}
            />
          </SelectAll>
        </DeletePanel>
      </CSSTransition>
    </StyledActionPanel>
  );
};

const ToggleLink = ({ children, isLink, onClick }) => {
  return isLink ? (
    <Link as="a" onClick={onClick}>
      {children}
    </Link>
  ) : (
    <span>{children}</span>
  );
};

const UserHeader = ({ user, pending }) => {
  return (
    <div>
      <UserInfoTitle>
        {!pending ? user.username : <Skeleton width="30%" />}
      </UserInfoTitle>
      {!pending ? (
        <UserInfoList>
          <UserInfoName>{user.name}</UserInfoName>
          <UserInfoItem>{`${user?.blogs?.length} blogs`}</UserInfoItem>
        </UserInfoList>
      ) : (
        <UserInfoList>
          <Skeleton width="10%" />
        </UserInfoList>
      )}
    </div>
  );
};

const UserView = ({
  user,
  onDeleteBlogs,
  showActions,
  pending,
  blogPage,
  onSortBlogsChange,
  sortBlogs
}) => {
  const [selected, setSelected] = useState(new Set());
  const [deleteMode, setDeleteMode] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const handleClickMode = e => {
    e.preventDefault();
    setDeleteMode(!deleteMode);
  };
  const handleDelete = () => {
    if (selected.size === 0) return;
    onDeleteBlogs(Array.from(selected));
  };
  const handleClickCheckAll = () => {
    const next = !checkAll;
    setCheckAll(next);
    setSelected(new Set(next ? blogPage.items.map(({ id }) => id) : null));
  };
  const handleSelect = blogId => {
    const blogCount = blogPage.items.length;
    const next = new Set(selected);
    next.has(blogId) ? next.delete(blogId) : next.add(blogId);
    setCheckAll(next.size === blogCount);
    setSelected(next);
  };
  const handleChange = (type, value) => {
    setCheckAll(false);
    setSelected(new Set());
    if (type === "sort") {
      onSortBlogsChange(value);
    }
    if (type === "page") {
      blogPage.onPageChange(value);
    }
  };

  return (
    <div>
      <UserHeader user={user} pending={pending.user} />
      <SortWrapper>
        <SortBlogsDropdown
          onChange={v => handleChange("sort", v)}
          defaultValue={sortBlogs}
        />
      </SortWrapper>
      {showActions && (
        <ActionPanel
          onClickMode={handleClickMode}
          deleteMode={deleteMode}
          onClickCheckAll={handleClickCheckAll}
          checkAll={checkAll}
          onClickDelete={handleDelete}
          disableDelete={selected.size === 0}
          pending={pending.blogs}
        />
      )}
      <BlogList
        blogs={blogPage?.items}
        pending={pending.blogs}
        selectable={deleteMode}
        onSelect={handleSelect}
        selected={selected}
      />
      <Pager
        onClick={v => handleChange("page", v)}
        currentPage={blogPage?.currentPage}
        lastPage={blogPage?.lastPage}
        pending={pending.blogs}
      />
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.string)
  }),
  onDeleteBlogs: PropTypes.func,
  showActions: PropTypes.bool,
  pending: PropTypes.objectOf(PropTypes.bool),
  blogPage: PropTypes.shape({
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    lastPage: PropTypes.number,
    items: PropTypes.arrayOf(propTypes.blog)
  })
};

export default UserView;
