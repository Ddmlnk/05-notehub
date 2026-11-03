import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (page: number, search?: string) => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: { page: page, search: search || undefined },
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};
