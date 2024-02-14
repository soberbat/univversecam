import React, { useContext, useState } from "react";
import {
  RoutesWrapper,
  SkewedSearch,
  SkewedSearchInner,
  SearchBarsWrapper,
} from "./RoutesSection.styles";

import AppContext from "../../state/AppContext";
import Select from "../Select/Select";

export default function RoutesSection() {
  const [selectedFaction, setSelectedFaction] = useState<null | string>(null);
  const { setIsFactionSearchVisible, isFactionSearchVisible } =
    useContext(AppContext);

  const onClick = () => {
    if (!selectedFaction) return;
    setIsFactionSearchVisible((prev) => !prev);
  };

  return (
    <RoutesWrapper>
      <SkewedSearch onClick={onClick} isActive={false} disabled={false}>
        <SkewedSearchInner>
          {!isFactionSearchVisible ? "Inspect" : "X"}
        </SkewedSearchInner>
      </SkewedSearch>

      <SearchBarsWrapper>
        <Select
          selectedFaction={selectedFaction}
          setSelectedFaction={setSelectedFaction}
        />
      </SearchBarsWrapper>
    </RoutesWrapper>
  );
}
