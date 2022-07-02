import { useWindowDimensions } from "react-native";
const useLayout = () => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};
export default useLayout;
