export function getUrlDomain(url: string | URL) {
  if (url.toString().includes("tv.apple")) {
    return "appleTv";
  }

  return url.toString().replace(/.+\/\/|www.|\..+/g, "");
}

export const addUrlProtocol = (url: string) => {
  return url.startsWith("http") ? url : `https://${url}`;
};
