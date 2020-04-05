import React, { useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import BlogList from "../BlogList";
import Pager from "../Pager";
import Modal from "../Modal";
import Button from "../Button";
import { SortBlogsDropdown } from "../Dropdown";
import ActionPanel from "./ActionPanel";
import Row from "../Row";
import * as propTypes from "../../constants/propTypes";
import { useMatchMobile, useModal } from "../../hooks";
import {
  UserInfoTitle,
  UserInfoList,
  UserInfoItem,
  SortWrapper
} from "./styled";

const UserHeader = ({ user, pending }) => {
  return (
    <div>
      <UserInfoTitle>
        {!pending ? user.username : <Skeleton width="30%" />}
      </UserInfoTitle>
      {!pending ? (
        <UserInfoList>
          <UserInfoItem>{user.name}</UserInfoItem>
          <UserInfoItem>
            {user?.blogs?.length !== undefined ? (
              `${user.blogs.length} blogs`
            ) : (
              <Skeleton width="10%" />
            )}
          </UserInfoItem>
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
  sortBlogs,
  onLikeBlog
}) => {
  const [selected, setSelected] = useState(new Set());
  const [checkAll, setCheckAll] = useState(false);
  const isMobile = useMatchMobile();
  const [deleteMode, setDeleteMode] = useState(false);
  const modals = useModal();

  const handleToggleMode = () => {
    setDeleteMode(!deleteMode);
  };
  const handleDelete = () => {
    if (selected.size === 0) return;
    onDeleteBlogs(Array.from(selected));
    setSelected(new Set());
    modals.deleteBlogs.onClose();
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
    <>
      <UserHeader user={user} pending={pending.user} />
      <SortWrapper>
        <SortBlogsDropdown
          onChange={v => handleChange("sort", v)}
          defaultValue={sortBlogs}
        />
      </SortWrapper>
      {showActions && blogPage?.items?.length > 0 && (
        <ActionPanel
          onToggleMode={handleToggleMode}
          deleteMode={isMobile === false ? true : deleteMode}
          onClickCheckAll={handleClickCheckAll}
          checkAll={checkAll}
          onClickDelete={modals.deleteBlogs.onOpen}
          disableDelete={selected.size === 0}
          pending={pending.blogs}
          deleteCount={selected.size}
          isMobile={isMobile}
        />
      )}
      <BlogList
        blogs={blogPage?.items}
        pending={pending.blogs}
        selectable={
          !showActions ? false : isMobile === false ? true : deleteMode
        }
        onSelect={handleSelect}
        selected={selected}
        onLike={onLikeBlog}
      />
      <Pager
        onClick={v => handleChange("page", v)}
        currentPage={blogPage?.currentPage}
        lastPage={blogPage?.lastPage}
        pending={pending.blogs}
      />
      <Modal
        show={modals.deleteBlogs.show}
        onClose={modals.deleteBlogs.onClose}
      >
        <Modal.Header>Confirm deletion</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete {selected.size} blog
            {selected.size === 1 ? "" : "s"}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Row cols={2} justify="end">
            <Button onClick={handleDelete} appearance="danger">
              Delete
            </Button>
            <Button onClick={modals.deleteBlogs.onClose}>Cancel</Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(propTypes.blog)
  }),
  onDeleteBlogs: PropTypes.func,
  onSortBlogsChange: PropTypes.func,
  onLikeBlog: PropTypes.func,
  sortBlogs: PropTypes.string,
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
