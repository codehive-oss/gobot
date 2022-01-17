export const convertTimeToDate = (timeArg: string) => {
  const milliseconds = convertTimeToMilliseconds(timeArg);
  if (!milliseconds) return;
  return new Date(Date.now() + milliseconds);
};

export const convertTimeToMilliseconds = (timeArg: string) => {
  // convert time to milliseconds
  // 3D -> 3 days
  // 1H -> 1 hour
  // 1M -> 1 minute

  const timeRegex = /(\d+)([DHMdhm])/;
  const timeMatch = timeArg.match(timeRegex);
  if (!timeMatch) {
    return;
  }

  const [, amount, unit] = timeMatch;
  const time =
    parseInt(amount) * (unit === "D" ? 86400 : unit === "H" ? 3600 : 60) * 1000;

  return time;
};
