import axios from "axios";
import type {
  CreateNote,
  Note,
  NotesListResponse,
} from "../types/notehfdghdfgh";
const apiKey = import.meta.env.VITE_NOTE_TOKEN;
const token = `Bearer ${apiKey}`;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (page: number): Promise<NotesListResponse> => {
  const res = await axios.get<NotesListResponse>("/notes", {
    headers: {
      Authorization: token,
    },
    params: {
      page,
      perPage: 10,
    },
  });

  return res.data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>("/notes", note, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const deleteNote = async (id: number) => {
  await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const searchNote = async (
  query: string,
  page: number
): Promise<NotesListResponse> => {
  const res = await axios.get<NotesListResponse>("/notes", {
    headers: {
      Authorization: token,
    },
    params: {
      search: query,
      page,
      perPage: 10,
    },
  });
  return res.data;
};
