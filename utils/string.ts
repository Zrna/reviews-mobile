export const truncateString = (value: string, charLimit: number) => {
  if (value.length <= charLimit) {
    return value;
  }

  return `${value.substring(0, charLimit)}...`;
};
