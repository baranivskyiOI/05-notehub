import css from "./NoteList.module.css";
import type { Note } from "../../types/notehfdghdfgh";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  tasks: Note[];
}

export default function NoteList({ tasks }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <ul className={css.list}>
      {tasks.map((task) => {
        return (
          <li className={css.listItem} key={task.id}>
            <h2 className={css.title}>{task.title}</h2>
            <p className={css.content}>{task.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>Note tag</span>
              <button
                onClick={() => mutation.mutate(task.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
