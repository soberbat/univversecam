import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, SceneContainer } from "./Scene.styled";
import { Scene } from "./class/Scene";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AppContext from "../components/state/AppContext";

const Environment = () => {
  const rendererWrapper = useRef<HTMLDivElement | null>(null);

  const { sceneRef } = useContext(AppContext);

  useEffect(() => {
    !sceneRef.current &&
      (async () => {
        sceneRef.current = new Scene({
          rendererContainer: rendererWrapper.current,
        });
        await sceneRef.current.init();
        sceneRef.current.animate();
      })();
  }, []);

  const releaseControls = () => {
    sceneRef.current?.releaseControls();
  };

  const changeCamera = (is3DCam: any) => {
    sceneRef.current?.changeCamera(is3DCam);
  };

  return (
    <Container>
      <SceneContainer ref={rendererWrapper}></SceneContainer>
      <Header />
      <Footer />
    </Container>
  );
};

export default Environment;
