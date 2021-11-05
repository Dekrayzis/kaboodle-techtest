import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
  const [toggleModal, setToggleModal] = useState({
    modalOpen: false
  });
  return (
    <ModalContext.Provider value={[toggleModal, setToggleModal]}>
      {props.children}
    </ModalContext.Provider>
  );
};