import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

const Modal = ({ onClose, show, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const showHideClassName = show
    ? `${styles.modal} ${styles.modal_show}`
    : `${styles.modal} ${styles.modal_hide}`;

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <div className={showHideClassName}>
        <section className={styles.modalMain}>
          {children}
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;