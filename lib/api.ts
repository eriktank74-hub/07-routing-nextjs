import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
   
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
  
};

export type NewNote = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};


export const fetchNotes = async (
  page: number,
  query: string,
  slug: string,
): Promise<FetchNotesResponse> => {

  const tag = slug === 'all' ? '' : `&tag=${slug}`;  
  
   
  const response = await axios.get<FetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes?search=${query}&page=${page}&perPage=12${tag}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
  
};

export const createNote = async({ title, content, tag }: NewNote): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    {
      title,
      content,
      tag,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
};
export const deleteNote = async(id: string): Promise<Note>  => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,

    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );
  return response.data;
};