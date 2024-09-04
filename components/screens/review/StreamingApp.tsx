import { Link } from "expo-router";
import { Image, Platform, Text } from "react-native";

import appleTvLogo from "@/assets/images/apple-tv.png";
import disneyPlusLogo from "@/assets/images/disneyplus.png";
import hboMaxLogo from "@/assets/images/hbo-max.png";
import netflixLogo from "@/assets/images/netflix.png";
import { addUrlProtocol } from "@/utils/url";

const streamingAppsMap: { [key: PropertyKey]: { link: string; img: any; showBorder: boolean } } = {
  netflix: {
    link: "https://www.netflix.com/",
    img: netflixLogo,
    showBorder: false,
  },
  hbomax: {
    link: "https://play.hbomax.com/",
    img: hboMaxLogo,
    showBorder: false,
  },
  disneyplus: {
    link: "https://www.disneyplus.com",
    img: disneyPlusLogo,
    showBorder: true,
  },
  appleTv: {
    link: "https://tv.apple.com/",
    img: appleTvLogo,
    showBorder: true,
  },
};

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
      <Link href={link ? addUrlProtocol(link) : app.link} className={`h-[80%] ${isIOS ? "mt-[15%]" : ""}`}>
        <Image
          source={app.img}
          className={`w-12 h-12 ${app.showBorder ? "border border-gray-500 rounded-full p-2" : ""}`}
        />
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
