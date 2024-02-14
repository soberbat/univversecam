import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container, SceneContainer } from "./Scene.styled";
import { AnimatePresence } from "framer-motion";
import { Scene } from "./class/Scene";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AppContext from "../../state/AppContext";
import PlanetDetail from "../PlanetDetail/PlanetDetail";
import FactionSearch from "../FactionSearch/FactionSearch";
import LoadingPage from "../LoadingPage/LoadingPage";
const Environment = () => {
  const rendererWrapper = useRef<HTMLDivElement | null>(null);
  const [planetFocus, setPlanetFocus] = useState<undefined | string>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canUseApp, setCanUseApp] = useState(false);
  const isFocusedOnPlanet = planetFocus !== undefined;
  const { sceneRef, isFactionSearchVisible, searchedFaction } =
    useContext(AppContext);

  useEffect(() => {
    !sceneRef!.current &&
      (async () => {
        sceneRef!.current = new Scene({
          rendererContainer: rendererWrapper.current,
          handlePlanetFocus,
        });
        await sceneRef!.current.init();
        sceneRef!.current.animate();
        setIsLoaded(true);
      })();
  }, []);

  const handlePlanetFocus = (focusedPlanet: string | undefined) => {
    setPlanetFocus(focusedPlanet);
  };

  const onClick = useCallback(() => {
    setCanUseApp(true);
  }, []);

  return (
    <Container>
      <SceneContainer isVisible={canUseApp} ref={rendererWrapper} />
      <Header />
      <Footer />
      <AnimatePresence>
        {isFocusedOnPlanet && <PlanetDetail planetFocus={planetFocus} />}
      </AnimatePresence>
      <AnimatePresence>
        {isFactionSearchVisible && (
          <FactionSearch searchedFaction={searchedFaction} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!canUseApp && <LoadingPage isLoaded={isLoaded} onClick={onClick} />}
      </AnimatePresence>
    </Container>
  );
};

export default Environment;
