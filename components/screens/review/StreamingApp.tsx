import { Link } from "expo-router";
import { Image, Platform, Text } from "react-native";

import { streamingAppsMap } from "@/utils/platforms";
import { addUrlProtocol } from "@/utils/url";

interface StreamingAppProps {
  name: string | null | undefined;
  link?: string | null | undefined;
  showName?: boolean;
}

const StreamingApp: React.FC<StreamingAppProps> = ({ name, link, showName = false }) => {
  if (!name) {
    return null;
  }

  const app = streamingAppsMap[name];

  if (app) {
    const isIOS = Platform.OS === "ios";

    return (
      <Link href={link ? addUrlProtocol(link) : app.link} className={`h-[70px] ${isIOS ? "mt-[15%]" : ""} text-center`}>
        <Image source={app.img} className="w-[100px] h-12" resizeMode="contain" />
      </Link>
    );
  }

  if (name && showName) {
    return (
      <Link href={link ? addUrlProtocol(link) : ""} className="mt-2">
        <Text className="font-pop-regular text-white">{name}</Text>
      </Link>
    );
  }

  return null;
};

export default StreamingApp;
