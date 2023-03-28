import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, SceneContainer } from "./Scene.styled";
import { Scene } from "./class/Scene";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Environment = () => {
  const rendererWrapper = useRef<HTMLDivElement | null>(null);
  const scene = useRef<Scene | null>(null);

  useEffect(() => {
    !scene.current &&
      (async () => {
        scene.current = new Scene({
          rendererContainer: rendererWrapper.current,
        });

        await scene.current.init();
        scene.current.animate();
      })();
  }, []);

  const releaseControls = () => {
    scene.current?.releaseControls();
  };

  return (
    <Container>
      <SceneContainer ref={rendererWrapper}></SceneContainer>
      <Header></Header>
      <Footer></Footer>
    </Container>
  );
};

export default Environment;
