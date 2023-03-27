import React, { useContext, useEffect, useRef, useState } from "react";
import { ButtonsWrapper, Container } from "./Scene.styled";
import { Scene } from "./class/Scene";

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
    console.log("clicked");
  };

  return (
    <>
      <Container ref={rendererWrapper}></Container>
      {/* <ButtonsWrapper onClick={() => releaseControls()}></ButtonsWrapper> */}
    </>
  );
};

export default Environment;
