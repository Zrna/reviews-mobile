import { TouchableOpacity } from "react-native";

interface IconWrapperProps {
  onPress: () => void;
  children: any;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ onPress, children }) => (
  <TouchableOpacity className="w-8 h-10 ml-1 items-center justify-center" onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default IconWrapper;
