import galacticData from "./galacticData";

const {
  descriptions,
  factionNames,
  headquarters,
  economies,
  distances,
  leaders,
} = galacticData;

const getRandomIndex = (array: string[]) => {
  return Math.floor(Math.random() * array.length);
};

export default {
  factionName: () => {
    return factionNames[getRandomIndex(factionNames)];
  },
  description: () => {
    return descriptions[getRandomIndex(descriptions)];
  },
  leader: () => {
    return leaders[getRandomIndex(leaders)];
  },
  mainHeadquarters: () => {
    return headquarters[getRandomIndex(headquarters)];
  },
  economy: () => {
    return economies[getRandomIndex(economies)];
  },
  distanceFromPlanet: () => {
    return distances[getRandomIndex(distances)];
  },
};
