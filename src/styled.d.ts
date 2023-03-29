import "styled-components";
interface IPalette {
  main: string;
}
declare module "styled-components" {
  export interface DefaultTheme {
    fadedBlue: string;
    glowyBlue: string;
    fadedBlueSecondary: string;
    blueDefault: string;
    blueHover: string;
  }
}
