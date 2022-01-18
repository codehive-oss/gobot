export const convertTimeToDate = (timeArg: string) => {
  const milliseconds = convertTimeToMilliseconds(timeArg);
  if (!milliseconds) return undefined;
  var date = new Date(new Date().getTime() + milliseconds);
  return date;
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
    parseInt(amount) *
    (unit.toLowerCase() === "d"
      ? 86400
      : unit.toLowerCase() === "h"
      ? 3600
      : 60) *
    1000;

  return time;
};
