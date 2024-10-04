import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "react-native-feather";

interface BackButtonProps {
  class?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ class: customClass }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} className={`px-3 ${customClass}`}>
      <ArrowLeft stroke="white" width={24} height={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
