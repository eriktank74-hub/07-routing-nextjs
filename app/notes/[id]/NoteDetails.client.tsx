'use client'

import css from "./page.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";


const NoteDetails = () => {
  const {id} = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    placeholderData: (prev) => prev,
    refetchOnMount: false
  });
if (isLoading){
    return <p>Loading...</p>
}
if (isError){
    return <p>Something goes wrong</p>
}

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
