export function getUrlDomain(url: string | URL) {
  try {
    const urlObject = new URL(url);
    let domain = urlObject.hostname.replace(/^www\./, "");

    // Split domain into parts
    const parts = domain.split(".");

    // Common TLDs to check against (can be expanded)
    const commonTlds = ["com", "org", "net", "edu", "gov", "io", "co", "me"];

    // Filter out TLDs
    const validParts = parts.filter((part) => !commonTlds.includes(part.toLowerCase()));

    return validParts.join(".");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Invalid URL:", error.message);
    } else {
      console.error("Invalid URL:", error);
    }
    return "";
  }
}

export const addUrlProtocol = (url: string) => {
  return url.startsWith("http") ? url : `https://${url}`;
};
