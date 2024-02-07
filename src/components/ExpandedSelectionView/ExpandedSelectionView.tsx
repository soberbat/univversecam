import { factionConfig } from "../DisplaySection/Dipslay.data";
import {
  InnerWrapper,
  Wrapper,
  Selection,
  FactionName,
  FactionLogo,
} from "./ExpandedSelectionView.styles";

const ExpandedSelectionView = ({ onSelect }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        {factionConfig.map(({ description }, i) => (
          <Selection onClick={() => onSelect(description)}>
            <FactionName>{description}</FactionName>
          </Selection>
        ))}
      </InnerWrapper>
    </Wrapper>
  );
};

export default ExpandedSelectionView;
