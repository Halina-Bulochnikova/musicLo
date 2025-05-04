import React from "react";
import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";



const SearchBox = () => {

  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={s.searchBlock}>
      <label className={s.searchLabel}>
        Find track  by name:
        <input
          className={s.searchField}
          type="text"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </div>
  );
};
export default SearchBox;
