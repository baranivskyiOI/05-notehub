export interface Note {
    id: number;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: number;
}

export interface NotesListResponse{
    notes: Note[];
    totalPages: number;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: string;
}