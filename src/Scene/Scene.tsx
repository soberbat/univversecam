import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, SceneContainer } from "./Scene.styled";
import { AnimatePresence } from "framer-motion";
import { Scene } from "./class/Scene";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AppContext from "../components/state/AppContext";
import PlanetDetail from "../components/PlanetDetail/PlanetDetail";
const Environment = () => {
  const { sceneRef } = useContext(AppContext);
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
        sceneRef!.current.animate();
      })();
  }, []);

  useEffect(() => {}, [planetFocus]);

  const handlePlanetFocus = (focusedPlanet: string | undefined) => {
    setPlanetFocus(focusedPlanet);
  };

  const releaseControls = () => {
    sceneRef!.current.releaseControls();
  };

  return (
    <Container>
      <SceneContainer ref={rendererWrapper} />
      <Header />
      <Footer />
      <AnimatePresence>
        {isFocusedOnPlanet && <PlanetDetail planetFocus={planetFocus} />}
      </AnimatePresence>
    </Container>
  );
};

export default Environment;
