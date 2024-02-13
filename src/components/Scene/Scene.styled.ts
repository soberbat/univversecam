import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  button {
    position: absolute;
    top: 30px;
    z-index: 1000;
  }

  #id {
    position: absolute;
    top: 200px;
    left: 150px;
    z-index: 1000;
  }
`;

export const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;
