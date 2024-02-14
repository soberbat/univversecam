import React from "react";
import {
  Container,
  InnerContainer,
  PlanetInfo,
  Title,
  TitleWrap,
  PlanetDescription,
} from "./PlanetDetail.styles";
import PlanetDetailRow from "../PlanetDetailRow/PlanetDetailRow";

interface IPlanetDetail {
  planetFocus: string;
}

const PlanetDetail = ({ planetFocus }: IPlanetDetail) => {
  return (
    <Container>
      <InnerContainer>
        <TitleWrap>
          <Title> Banu </Title>
        </TitleWrap>
        <PlanetInfo>
          <PlanetDetailRow data={{ title: "Planet Code", info: "Banu" }} />
          <PlanetDetailRow data={{ title: "Planet Type", info: "Exoplanet" }} />
          <PlanetDetailRow
            data={{ title: "Planet Class", info: "Hot Jupiter" }}
          />
          <PlanetDetailRow data={{ title: "Wind Speed", info: "8.7000KM/H" }} />
          <PlanetDescription>
            At the heart of Xylovaria's enigmatic allure lies its sentient
            flora, a collection of bioluminescent plants that not only sustain
            themselves through photosynthesis but also communicate through
            intricate patterns of light. These radiant beings form vast,
            interconnected networks, exchanging information and energy in a
            harmonious symphony that transcends the conventional boundaries of
            communication.
          </PlanetDescription>

          <PlanetDescription>
            At the heart of Xylovaria's enigmatic allure lies its sentient
            flora, a collection of bioluminescent plants that not only sustain
            themselves through photosynthesis but also communicate through
            intricate patterns of light. These radiant beings form vast,
            interconnected networks, exchanging information and energy in a
            harmonious symphony that transcends the conventional boundaries of
            communication.
          </PlanetDescription>
        </PlanetInfo>
      </InnerContainer>
    </Container>
  );
};

export default PlanetDetail;
