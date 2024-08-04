import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";

import Navbar from "./Navbar";

const Skeleton = (props: any) => {
  return (
    <ContentLoader
      viewBox="0 0 350 900"
      height={900}
      width={350}
      {...props}
      backgroundColor="#262626"
      foregroundColor="#404040"
      speed={1.5}
    >
      <View className="pl-3">
        <Navbar showSearch={false} />
      </View>

      <Rect x="12" y="60" rx="0" ry="0" width="130" height="30" />
      <Rect x="12" y="100" rx="0" ry="0" width="200" height="300" />
      <Rect x="220" y="100" rx="0" ry="0" width="200" height="300" />

      <Rect x="12" y="430" rx="0" ry="0" width="130" height="30" />
      <Rect x="12" y="470" rx="0" ry="0" width="110" height="160" />
      <Rect x="130" y="470" rx="0" ry="0" width="110" height="160" />
      <Rect x="248" y="470" rx="0" ry="0" width="110" height="160" />

      <Rect x="12" y="660" rx="0" ry="0" width="130" height="30" />
      <Rect x="12" y="700" rx="0" ry="0" width="110" height="160" />
      <Rect x="130" y="700" rx="0" ry="0" width="110" height="160" />
      <Rect x="248" y="700" rx="0" ry="0" width="110" height="160" />
    </ContentLoader>
  );
};

export default Skeleton;
