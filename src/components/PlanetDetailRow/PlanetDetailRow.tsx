import React from "react";
import { Container, Info, InfoTitle } from "./PlanetDetailRow.styles";

interface IPlanetDetailRow {
  data: {
    title: string;
    info: string;
  };
}
const PlanetDetailRow = ({ data: { title, info } }: IPlanetDetailRow) => {
  return (
    <Container>
      <InfoTitle>{title}</InfoTitle>
      <Info> {info}</Info>
    </Container>
  );
};

export default PlanetDetailRow;
