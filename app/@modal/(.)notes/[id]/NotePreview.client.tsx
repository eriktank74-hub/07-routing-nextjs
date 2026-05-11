'use client';

import css from "../../../../components/NotePreview/NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

interface NoteDetailsProps {
    id: string,
}

const NoteDetails = ({id}: NoteDetailsProps) => {
  const router = useRouter();
  
  const close = () => router.back();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false
  });
if (isLoading){
    return <p>Loading...</p>
}
if (isError){
    return <p>Something goes wrong</p>
}

  return (
    <Modal onClose={close}>
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
    </Modal>
  );
};

export default NoteDetails;
