export const formatTimestamp = ts => {
  const d = new Date(ts);
  return `${d.getHours()}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

export const formatNum = num => {
  if (num / 1000 < 1) return num;
  if (num % 1000 >= 100) return Number(num / 1000).toFixed(1) + "k";
  return Math.floor(num / 1000) + "k";
};
