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

interface ISelect {
  selectedFaction: string | null;
  setSelectedFaction: React.Dispatch<React.SetStateAction<string | null>>;
}

const Select = ({ selectedFaction, setSelectedFaction }: ISelect) => {
  const { setSearchedFaction } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);

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
          <Selection>{selectedFaction ?? "Choose A Faction"}</Selection>
          <Caret onClick={handleClick} isExpanded={isExpanded} />
        </InputFieldWrap>
      </SkewedSearchInner>
    </SkewedSearch>
  );
};

export default Select;
