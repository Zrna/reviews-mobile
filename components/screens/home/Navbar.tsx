import { Link } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Search } from "react-native-feather";

import logoSmall from "@/assets/images/logo-small.png";

interface NavbarProps {
  showSearch?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSearch = true }) => {
  return (
    <View
      className="flex-row items-center justify-between py-3 px-1 w-full"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Image source={logoSmall} className="w-14 h-6" resizeMode="contain" />
      {showSearch && (
        <Link href="/search">
          <Search stroke="white" width={24} height={24} />
        </Link>
      )}
    </View>
  );
};

export default Navbar;
