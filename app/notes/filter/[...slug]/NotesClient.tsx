'use client';
import { notFound } from "next/navigation";
import css from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Modal from "../../../../components/Modal/Modal";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteForm from "../../../../components/NoteForm/NoteForm";


function Notes({ slug }: { slug: string }) {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query, slug],
    queryFn: () => fetchNotes(currentPage, query, slug),
    placeholderData: (prev) => prev,
  });
  
  
  const onSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setCurrentPage(1)
  }, 1000);

  const handleOpen = () => {
    setShowModal(true);
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const totalPages = data?.totalPages || 1;
  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onChange={onSearch} />}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        )}
        {
          <button className={css.button} onClick={handleOpen}>
            Create note +
          </button>
        }
      </header>
      {showModal && (
        <Modal onClose={handleClose}>
          <NoteForm onClose={handleClose} />
        </Modal>
      )}
      {!!data?.notes?.length && <NoteList notes={data?.notes} />}
    </div>
  );
}

export default Notes;
