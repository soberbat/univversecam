import React from "react";
import Selectable from "../OnlySelectable/OnlySelectable";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  RoutesWrapper,
  SkewedSearch,
  SkewedSearchInner,
} from "./RoutesSection.styles";

import data from "./Routes.data";

export default function RoutesSection() {
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
    </RoutesWrapper>
  );
}
