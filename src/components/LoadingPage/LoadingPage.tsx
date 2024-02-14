import { Container, Continue, InnerContainer } from "./LoadingPage.styles";

interface ILoadingPage {
  isLoaded: boolean;
  onClick: () => void;
}
const LoadingPage = ({ isLoaded, onClick }: ILoadingPage) => {
  return (
    <Container>
      <InnerContainer></InnerContainer>
      <Continue isLoaded={isLoaded} onClick={onClick}>
        Enter
      </Continue>
    </Container>
  );
};

export default LoadingPage;
