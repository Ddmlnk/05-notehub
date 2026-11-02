import { type ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  debouncedSearch: (x: string) => void;
}

export default function SearchBox({ debouncedSearch }: SearchBoxProps) {
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearchInput}
    />
  );
}
