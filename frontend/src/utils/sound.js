export const playNotificationSound = () => {
  const audio = new Audio("/assets/sound/alertsound.wav");
  audio
    .play()
    .then(() => {})
    .catch((error) => {
      console.error("Error playing sound:", error);
    });

  const intervalId = setInterval(() => {
    audio.play();
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 20000);
};
