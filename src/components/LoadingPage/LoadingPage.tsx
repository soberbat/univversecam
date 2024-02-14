import { defaultTheme } from "../../utils/theme";
import { Container, Continue, InnerContainer } from "./LoadingPage.styles";

interface ILoadingPage {
  isLoaded: boolean;
  onClick: () => void;
}
const LoadingPage = ({ isLoaded, onClick }: ILoadingPage) => {
  const color = isLoaded
    ? defaultTheme.glowyBlue
    : defaultTheme.fadedBlueSecondary;
  return (
    <Container>
      <InnerContainer></InnerContainer>
      <Continue color={color} onClick={onClick}>
        Enter
      </Continue>
    </Container>
  );
};

export default LoadingPage;
