import { factionConfig } from "../DisplaySection/Dipslay.data";
import {
  InnerWrapper,
  Wrapper,
  Selection,
  FactionName,
  FactionLogo,
} from "./ExpandedSelectionView.styles";

interface IExpandedSelectionView {
  onSelect: (description: string) => void;
}

const ExpandedSelectionView = ({ onSelect }: IExpandedSelectionView) => {
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
