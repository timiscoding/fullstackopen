import React, { useState, useContext, useCallback } from "react";

const ModalContext = React.createContext();

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used inside a ModalProvider");
  }
  return context;
};

const ModalProvider = props => {
  const [showDeleteBlogs, setDeleteBlogs] = useState(false);
  const onDeleteBlogsClose = useCallback(() => setDeleteBlogs(false), []);
  const onDeleteBlogsOpen = useCallback(() => setDeleteBlogs(true), []);

  const modals = {
    deleteBlogs: {
      show: showDeleteBlogs,
      onClose: onDeleteBlogsClose,
      onOpen: onDeleteBlogsOpen
    }
  };

  return <ModalContext.Provider value={modals} {...props} />;
};

export { useModal as default, ModalProvider };
