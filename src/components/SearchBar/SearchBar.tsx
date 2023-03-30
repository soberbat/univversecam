import React from "react";
import {
  SkewedSearch,
  SkewedSearchInner,
  InputField,
  SearchIcon,
  Skew,
  InputFieldWrap,
} from "./SearchBar.styles";

const SearchBar = () => {
  return (
    <SkewedSearch isInputField={true}>
      <SkewedSearchInner>
        <InputFieldWrap>
          <InputField />
          <SearchIcon />
        </InputFieldWrap>
      </SkewedSearchInner>
    </SkewedSearch>
  );
};

export default SearchBar;
