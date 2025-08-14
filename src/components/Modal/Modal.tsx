import type React from "react";
import css from "./Modal.module.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const closeModalByClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.classList.contains("_backdrop_f2ytl_1")
      ) {
        onClose();
      }
    };
    document.addEventListener("click", closeModalByClick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("click", closeModalByClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div onClick={(e) => e.stopPropagation()} className={css.modal}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
}
