export const getRatingTitle = (rating: number | null): string => {
  switch (rating) {
    case 5:
      return "⭐️ Top Rated";
    case 4:
      // return "👍 Worth a Watch";
      return "Worth a Watch";
    case 3:
      // return "🤔 Not Bad";
      return "Not Bad";
    case 2:
      // return "😕 Kinda Skippable";
      return "Kinda Skippable";
    case 1:
      // return "💩 Hard Pass";
      return "Hard Pass";
    default:
      return "🎯 Ready to rate?";
  }
};
