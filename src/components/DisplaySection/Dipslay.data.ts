const cameraData = [
  {
    child: "3D",
    description: "3D",
    onClick: (scene: any) => scene.current.set3dCamera(),
  },
  {
    child: "2D",
    description: "2D",
    onClick: (scene: any) => scene.current.set2dCamera(),
  },
];

const sensorData = [
  {
    child: "/icons/radioactive.svg",
    description: "Threat",
    onClick: () => {
      console.log("3d");
    },
  },
  {
    child: "/icons/people-fill.svg",
    description: "Population",
    onClick: () => {
      console.log("3d");
    },
  },
  {
    child: "public/icons/cash.svg",
    description: "Economy",
    onClick: () => {
      console.log("2d");
    },
  },
];

const jumpTunnelsData = [
  {
    child: "Big",
    description: "",
    onClick: () => {
      console.log("3d");
    },
  },
  {
    child: "Medium",
    description: "",
    onClick: () => {
      console.log("3d");
    },
  },
  {
    child: "Large",
    description: "",
    onClick: () => {
      console.log("2d");
    },
  },
];

const factions = [
  {
    child: "/icons/gemini.png",
    description: "Banu",
    onClick: (scene: any) => {
      scene.current.animateFactionVisibility("banu");
    },
  },
  {
    child: "/icons/capricorn.png",
    description: "Menx",
    onClick: (scene: any) => {
      scene.current.animateFactionVisibility("menx");
    },
  },
  {
    child: "/icons/libra.png",
    description: "Septor",
    onClick: (scene: any) => {
      scene.current.animateFactionVisibility("septor");
    },
  },
  {
    child: "/icons/sagittarius.png",
    description: "Namst'x",
    onClick: (scene: any) => {
      scene.current.animateFactionVisibility("namsxt");
    },
  },
  {
    child: "/icons/virgo.png",
    description: "KA",
    onClick: (scene: any) => {
      scene.current.animateFactionVisibility("ka");
    },
  },
  {
    child: "/icons/aquarius.png",
    description: "PX23T",
    onClick: (scene: any) => {
      scene.current.animateFactionVisibility("px23t");
    },
  },
];

export { cameraData, sensorData, jumpTunnelsData, factions };
