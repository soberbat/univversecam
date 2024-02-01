import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Bar, ProgressBar, SensorName } from "./SensorBar.styles";

interface ISensorBar {
  percentage: number;
}

const SensorBar = ({ percentage }: ISensorBar) => {
  const controls = useAnimation();

  const getColor = (percentage: number) => {
    const hue = (percentage / 100) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  useEffect(() => {
    controls.start({
      width: `${percentage}%`,
      backgroundColor: getColor(percentage),
    });
  }, [percentage, controls]);

  return (
    <ProgressBar>
      <Bar
        animate={controls}
        transition={{ duration: 2, type: "spring", damping: 30 }}
      />
    </ProgressBar>
  );
};

export default SensorBar;
