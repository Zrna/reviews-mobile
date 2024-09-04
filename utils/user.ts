export const getUserInitials = (firstName: string, lastName: string): string => {
  const fullName = `${firstName} ${lastName}`;

  // filter(Boolean) removes empty strings, if have multiple spaces
  const nameParts = fullName.split(" ").filter(Boolean);

  if (nameParts.length === 0) {
    return "";
  }

  const firstInitial = nameParts[0][0];
  const lastInitial = nameParts[nameParts.length - 1][0];

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
