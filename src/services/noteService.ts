import axios from "axios";
import type { Note } from "../types/note";
const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const token = `Bearer ${apiKey}`;

export interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

export interface NotesListResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  query: string = "",
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

export const createNote = async (note: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>("/notes", note, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
