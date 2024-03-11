export function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours}:${String(
    Math.floor((totalSeconds % 3600) / 60),
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return formattedTime;
}
