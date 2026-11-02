import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import { useState, type ComponentType } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [page, setPage] = useState(1);
  const [openCreation, setOpenCreation] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 2000);

  const { data } = useQuery({
    queryKey: ["tasks", page, query],
    queryFn: () => fetchNotes(page, query),
    placeholderData: keepPreviousData,
  });
  const handleCreateNote = () => {
    if (!openCreation) {
      setOpenCreation(true);
    }
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox debouncedSearch={debouncedSearch} />
        {data && data.totalPages > 1 && (
          <ReactPaginate
            pageCount={data.totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>
      {data && <NoteList notes={data.notes} />}
      {openCreation && (
        <Modal onClose={setOpenCreation}>
          {<NoteForm onClose={setOpenCreation} />}
        </Modal>
      )}
    </div>
  );
}
