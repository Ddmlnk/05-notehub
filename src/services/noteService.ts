import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface createNote {
  title: string;
  content: string;
  tag: string;
}
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (page: number, search?: string) => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: { page: page, search: search || undefined },
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};

export const createNote = async (newNote: NoteFormValues): Promise<void> => {
  await axios.post("/notes", newNote, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
};
