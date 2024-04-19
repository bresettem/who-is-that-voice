import { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "next-themes";

const SkeletonDarkTheme = ({ children }) => {
  const { theme } = useTheme();

  // Determine base and highlight colors based on the current theme
  const baseColor = theme === "dark" ? "#030c1f" : "#1c5dc8";
  const highlightColor = theme === "dark" ? "#09265e" : "#dbdfff";

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonDarkTheme;
