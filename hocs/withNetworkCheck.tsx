import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

import cowImg from "@/assets/images/cow/schocked-cow.png";

const withNetworkCheck = (WrappedComponent: React.ElementType) => {
  const NetworkCheckComponent = (props: any) => {
    const [isConnected, setIsConnected] = useState<null | boolean>(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    if (isConnected === null) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <ActivityIndicator color="#23C06B" size="large" />
        </View>
      );
    }

    if (!isConnected) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <Image className="w-full h-[35%]" source={cowImg} />
          <Text className="text-dimmed text-2xl font-bold">No Internet Connection</Text>
          <Text className="text-dimmed text-lg">Please check your internet settings.</Text>
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };

  NetworkCheckComponent.displayName = "HOC-Network-Check";

  return NetworkCheckComponent;
};

export default withNetworkCheck;
