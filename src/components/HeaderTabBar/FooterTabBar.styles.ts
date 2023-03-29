import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: -35%;
  right: -0.2%;
  width: 30%;
  height: 35%;
  display: flex;
`;

//SKEWED BUTTON

//#1c445a
//#3bb2da
export const ButtonWrapper = styled.div<{ activeTab: boolean }>(
  ({ activeTab, theme }) => css`
    height: ${activeTab ? "120%" : "100%"};
    width: 100%;
    border-top: 1px solid ${theme.fadedBlue};
    border-right: 1px solid ${theme.fadedBlue};
    background-color: black;
    align-self: flex-end;

    position: relative;
    flex: ${activeTab ? "0.9" : "1"};

    margin-left: -3px;
    z-index: ${activeTab ? 3 : 1};

    ${activeTab &&
    css`
      ::after {
        content: " ";
        position: absolute;
        display: block;
        width: 100%;
        height: 1px;

        bottom: -1px;
        background-color: black;
      }
    `}
  `
);

export const SkewedView = styled.div<{ activeTab: boolean }>(
  ({ activeTab, theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
      display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    background-color: black;
    display: flex;
    justify-content: ${activeTab ? "flex-end" : "center"};
    color: #fff;
    transform-origin: top right;
    transform: skew(-43deg, 0deg);

    ::before {
      content: " ";
      position: absolute;
      display: block;
      width: 4%;
      height: 104%;
      bottom: -1px;
      left: -2px;
      color: ${theme.glowyBlue};
      border-left: 1px solid
      z-index: 1;
        ${activeTab ? `${theme.glowyBlue}` : `${theme.fadedBlue}`};

      background-color: ${
        activeTab ? `${theme.glowyBlue}` : `${theme.fadedBlue}`
      };
      box-shadow: ${activeTab ? "0px 0px 20px 4px rgb(68, 237, 247, 0.4)" : ""};
    }

    ${
      activeTab &&
      css`
        ::after {
          content: " ";
          position: absolute;
          display: block;
          width: 100%;
          height: 2px;
          bottom: -2px;
          background-color: black;
        }
      `
    }
  `
);

export const TabItem = styled.span<{ activeTab: boolean }>(
  ({ activeTab, theme }) => css`
    transform: skew(43deg, 0);
    font-weight: 300;
    font-size: 0.6rem;
    color: ${theme.fadedBlue};
    margin-top: 0.5rem;

    ${activeTab &&
    css`
      color: orange;
      text-shadow: 0px 0px 13px rgba(241, 110, 110, 1);
      font-weight: 800;
      font-size: 0.8rem;
    `}
  `
);
