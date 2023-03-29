import React, { useEffect, useState } from "react";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  OnlySelectableSlot,
  SkewedWrapper,
  SlotName,
  Wrapper,
  SelectedCategory,
  NameWrapper,
} from "./OnlySelectable.styles";

interface Selectable {
  data: {
    onClick: () => void;
    description: string;
    child: any;
  }[];
  selectionCategory: string;
  canSelectMultiple?: boolean;
  isChildImage: boolean;
}

const Selectable = ({
  data,
  canSelectMultiple,
  selectionCategory,
  isChildImage,
}: Selectable) => {
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [hoveredSection, setHoveredSection] = useState("");
  const [isHovered, setisHovered] = useState(Boolean);
  const [selectedSection, setSelectedSection] = useState("");

  const renderSingularSelectionButtons = (
    onClick: () => void,
    child: any,
    description: string,
    i: number
  ) => (
    <SkewedContainer
      isChildImage={isChildImage}
      canSelectMultiple={false}
      onClick={() => {
        onClick();
        setActiveSlot(i);
        setSelectedSection(`/ ${description}`);
      }}
      isActiveSlot={activeSlot === i}
    >
      {child}
    </SkewedContainer>
  );

  return (
    <Wrapper>
      <OnlySelectableSlot>
        {data.map(({ onClick, child, description }, i) => {
          return (
            <SkewedWrapper
              onMouseEnter={() => {
                setisHovered(true);
                setHoveredSection(`/ ${description}`);
              }}
              onMouseLeave={() => setisHovered(false)}
            >
              {!canSelectMultiple ? (
                renderSingularSelectionButtons(onClick, child, description, i)
              ) : (
                <SkewedContainer
                  isChildImage={isChildImage}
                  canSelectMultiple={true}
                  onClick={() => {
                    onClick();
                    setSelectedSection(`/ ${description}`);
                  }}
                >
                  {child}
                </SkewedContainer>
              )}
            </SkewedWrapper>
          );
        })}
      </OnlySelectableSlot>
      <NameWrapper>
        <SlotName>{selectionCategory}</SlotName>
        <SelectedCategory>
          {isHovered
            ? hoveredSection
            : !canSelectMultiple
            ? selectedSection
            : ""}
        </SelectedCategory>
      </NameWrapper>
    </Wrapper>
  );
};

export default Selectable;
