import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaView className="h-full justify-center items-center bg-black">
      <Text className="text-3xl font-pop-black text-white">Reviews</Text>
      <Link href="/home" className="text-blue-400">
        Go to Home
      </Link>
    </SafeAreaView>
  );
};

export default App;
