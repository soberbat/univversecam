import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, SceneContainer } from "./Scene.styled";
import { AnimatePresence } from "framer-motion";
import { Scene } from "./class/Scene";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AppContext from "../../state/AppContext";
import PlanetDetail from "../PlanetDetail/PlanetDetail";
import FactionSearch from "../FactionSearch/FactionSearch";
const Environment = () => {
  const { sceneRef, isFactionSearchVisible } = useContext(AppContext);
  const rendererWrapper = useRef<HTMLDivElement | null>(null);
  const [planetFocus, setPlanetFocus] = useState<undefined | string>(undefined);
  const isFocusedOnPlanet = planetFocus !== undefined;

  useEffect(() => {
    !sceneRef!.current &&
      (async () => {
        sceneRef!.current = new Scene({
          rendererContainer: rendererWrapper.current,
          handlePlanetFocus,
        });
        await sceneRef!.current.init();
        console.log("---- animate should start");
        sceneRef!.current.animate();
        console.log("---- animate started");
      })();
  }, []);

  const handlePlanetFocus = (focusedPlanet: string | undefined) => {
    setPlanetFocus(focusedPlanet);
  };

  return (
    <Container>
      <SceneContainer ref={rendererWrapper} />
      <Header />
      <Footer />
      <AnimatePresence>
        {isFocusedOnPlanet && <PlanetDetail planetFocus={planetFocus} />}
        {isFactionSearchVisible && <FactionSearch />}
        {/* <FactionSearch /> */}
      </AnimatePresence>
    </Container>
  );
};

export default Environment;
