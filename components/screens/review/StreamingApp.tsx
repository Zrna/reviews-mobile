import { Link } from "expo-router";
import { Image, Platform, Text } from "react-native";

import appleTvLogo from "@/assets/images/platforms/apple-tv.png";
import disneyPlusLogo from "@/assets/images/platforms/disneyplus.png";
import hboMaxLogo from "@/assets/images/platforms/hbo-max.png";
import netflixLogo from "@/assets/images/platforms/netflix.png";
import spotifyLogo from "@/assets/images/platforms/spotify.png";
import youtubeLogo from "@/assets/images/platforms/youtube.png";
import { addUrlProtocol } from "@/utils/url";

const streamingAppsMap: { [key: string]: { link: string; img: any } } = {
  netflix: {
    link: "https://www.netflix.com/",
    img: netflixLogo,
  },
  hbomax: {
    link: "https://play.hbomax.com/",
    img: hboMaxLogo,
  },
  disneyplus: {
    link: "https://www.disneyplus.com",
    img: disneyPlusLogo,
  },
  appleTv: {
    link: "https://tv.apple.com/",
    img: appleTvLogo,
  },
  youtube: {
    link: "https://www.youtube.com/",
    img: youtubeLogo,
  },
  spotify: {
    link: "https://www.spotify.com/",
    img: spotifyLogo,
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
