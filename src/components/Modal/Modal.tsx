import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  return (
    <>
      <div className={css.backdrop} role="dialog" aria-modal="true">
        <div className={css.modal}>
          <NoteForm onClose={onClose} />
        </div>
      </div>
    </>
  );
}
