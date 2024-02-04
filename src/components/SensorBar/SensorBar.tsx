import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Bar, ProgressBar } from "./SensorBar.styles";

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
  }, [percentage]);

  return (
    <ProgressBar>
      <Bar
        initial={false}
        animate={controls}
        style={{ width: `${percentage}%` }}
        transition={{ duration: 4, type: "spring", damping: 30 }}
      />
    </ProgressBar>
  );
};

export default SensorBar;
