export const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(":");
  return `${hour}:${minute}`;
};
