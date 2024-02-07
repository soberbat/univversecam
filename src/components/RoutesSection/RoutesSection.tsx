import React, { useContext, useState } from "react";
import {
  RoutesWrapper,
  SkewedSearch,
  SkewedSearchInner,
  SearchBarsWrapper,
} from "./RoutesSection.styles";

import AppContext from "../state/AppContext";
import Select from "../Select/Select";

export default function RoutesSection() {
  const { setIsFactionSearchVisible } = useContext(AppContext);

  const onClick = () => {
    setIsFactionSearchVisible(true);
  };

  return (
    <RoutesWrapper>
      <SkewedSearch onClick={onClick} isActive={false} disabled={false}>
        <SkewedSearchInner> Inspect </SkewedSearchInner>
      </SkewedSearch>

      <SearchBarsWrapper>
        <Select />
      </SearchBarsWrapper>
    </RoutesWrapper>
  );
}
