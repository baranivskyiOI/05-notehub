import type React from "react";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal}>{children}</div>
      </div>
    </>
  );
}
