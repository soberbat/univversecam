import React, { FC, useContext, useState } from "react";
import {
  SkewedSearch,
  SkewedSearchInner,
  Selection,
  SearchIcon,
  InputFieldWrap,
  Caret,
} from "./Select.styles";
import AppContext from "../../state/AppContext";
import ExpandedSelectionView from "../ExpandedSelectionView/ExpandedSelectionView";

const Select: FC = () => {
  const { setSearchedFaction } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState("Choose A Faction");

  const handleClick = () => setIsExpanded(!isExpanded);
  const onSelect = (faction: string) => {
    setIsExpanded(false);
    setSelectedFaction(faction);
    setSearchedFaction(faction);
  };

  return (
    <SkewedSearch isInputField={true}>
      {isExpanded && <ExpandedSelectionView onSelect={onSelect} />}

      <SkewedSearchInner>
        <InputFieldWrap>
          <Selection>{selectedFaction}</Selection>
          <Caret onClick={handleClick} isExpanded={isExpanded} />
        </InputFieldWrap>
      </SkewedSearchInner>
    </SkewedSearch>
  );
};

export default Select;
