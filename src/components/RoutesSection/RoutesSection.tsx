import React, { useState } from "react";
import Selectable from "../OnlySelectable/OnlySelectable";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  RoutesWrapper,
  SkewedSearch,
  SkewedSearchInner,
  SearchBarsWrapper,
} from "./RoutesSection.styles";

import data from "./Routes.data";
import SearchBar from "../SearchBar/SearchBar";

export default function RoutesSection() {
  const [destination, setDestination] = useState({ from: "", to: "araba" });

  return (
    <RoutesWrapper>
      <SkewedSearch isActive={false} disabled={true}>
        <SkewedSearchInner> CALCULATE </SkewedSearchInner>
      </SkewedSearch>

      <Selectable
        data={data}
        isChildImage={false}
        canSelectMultiple={false}
        selectionCategory="Ship Size"
      />

      <SearchBarsWrapper>
        <SearchBar />
      </SearchBarsWrapper>
    </RoutesWrapper>
  );
}
