import React, { createContext, useContext, useState } from "react";

const ConfirmModalContext = createContext();

export const useConfirmModal = () => useContext(ConfirmModalContext);

export const ConfirmModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const openModal = ({ title, message, onConfirm }) => {
    setTitle(title);
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setMessage("");
    setOnConfirm(() => () => {});
  };
  return (
    <>
      <ConfirmModalContext.Provider
        value={{ isOpen, title, message, onConfirm, openModal, closeModal }}
      >
        {children}
      </ConfirmModalContext.Provider>
    </>
  );
};
