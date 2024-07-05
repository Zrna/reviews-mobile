import { Link } from "expo-router";
import { Text, View } from "react-native";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pop-black">Reviews</Text>
      <Link href="/profile" className="text-blue-400">
        Go to Profile
      </Link>
    </View>
  );
};

export default App;
