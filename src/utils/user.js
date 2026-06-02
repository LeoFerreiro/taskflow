export function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);

  if (!parts.length) {
    return "TF";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
