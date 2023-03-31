import React, { useContext, useEffect, useState } from "react";
import SkewedContainer from "../SkewedContainer/SkewedContainer";
import {
  OnlySelectableSlot,
  SkewedWrapper,
  SlotName,
  Wrapper,
  SelectedCategory,
  NameWrapper,
} from "./OnlySelectable.styles";
import useApp from "../state/useApp";
import AppContext from "../state/AppContext";

interface Selectable {
  data: {
    onClick: (scene: any) => void;
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
  const { sceneRef } = useContext(AppContext);

  const renderSingularSelectionButtons = (
    onClick: (sceneRef: any) => void,
    child: any,
    description: string,
    i: number
  ) => (
    <SkewedContainer
      isChildImage={isChildImage}
      canSelectMultiple={false}
      onClick={(sceneRef) => {
        onClick(sceneRef);
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
                    onClick(sceneRef);
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
