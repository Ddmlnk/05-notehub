import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";

import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [page, setPage] = useState(1);
  const [openCreation, setOpenCreation] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 2000);

  const { data } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
    placeholderData: keepPreviousData,
  });
  const handleCreateNote = () => {
    if (!openCreation) {
      setOpenCreation(true);
    }
  };
  const handleModalClose = () => {
    setOpenCreation(false);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox debouncedSearch={debouncedSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            setPage={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>
      {data && <NoteList notes={data.notes} />}
      {openCreation && (
        <Modal onClose={handleModalClose}>
          {<NoteForm onClose={handleModalClose} />}
        </Modal>
      )}
    </div>
  );
}
