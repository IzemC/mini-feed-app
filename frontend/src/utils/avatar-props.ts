export const getAvatarProps = (userName: string | null, userId: string) => {
  const colors = [
    "bg-red-400 text-white",
    "bg-blue-400 text-white",
    "bg-green-400 text-white",
    "bg-yellow-400 text-yellow-900",
    "bg-purple-400 text-white",
    "bg-pink-400 text-white",
    "bg-indigo-400 text-white",
    "bg-teal-400 text-white",
    "bg-orange-400 text-white",
    "bg-cyan-400 text-cyan-900",
    "bg-fuchsia-400 text-white",
    "bg-rose-400 text-white",
    "bg-violet-400 text-white",
    "bg-amber-400 text-amber-900",
    "bg-emerald-400 text-white",
    "bg-sky-400 text-white",
    "bg-lime-400 text-lime-900",
  ];

  const hash = Array.from(userId).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const colorIndex = hash % colors.length;
  const bgColor = colors[colorIndex];

  return {
    bgColor,
    initials: userName?.[0] || userId[0],
  };
};
