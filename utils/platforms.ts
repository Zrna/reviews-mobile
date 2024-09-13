import appleTvLogo from "@/assets/images/platforms/apple-tv.png";
import disneyPlusLogo from "@/assets/images/platforms/disneyplus.png";
import hboMaxLogo from "@/assets/images/platforms/hbo-max.png";
import netflixLogo from "@/assets/images/platforms/netflix.png";
import spotifyLogo from "@/assets/images/platforms/spotify.png";
import youtubeLogo from "@/assets/images/platforms/youtube.png";

export const streamingAppsMap: { [key: string]: { link: string; img: any } } = {
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