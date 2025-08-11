import css from "./App.module.css";
// import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import ErrorMessage from "../Error/Error";
import Loader from "../Loader/Loader";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = useDebouncedCallback((newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const [isModalOpen, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const nbPages: number = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
          {isSuccess && (
            <Pagination
              page={currentPage}
              total={nbPages}
              onChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create Note +
          </button>
          {isModalOpen && <Modal onClose={closeModal} />}
        </header>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        {data && !isLoading && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default App;
