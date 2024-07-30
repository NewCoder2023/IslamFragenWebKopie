export const encodeTitle = (title: string) => {
  const cleanedTitle = title.trim().replace(/\n/g, "");
  return encodeURIComponent(cleanedTitle)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
};
