// utils/countdownFunction.js
export default function countdownFunction(counting, timeOut, remaining) {
  // Chuyển timeOut sang dạng Date
  const targetTime = new Date(timeOut);

  const countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = targetTime - now;

    // Tính số phút và giây còn lại
    const minutes = Math.floor(timeRemaining / 1000 / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timeRemaining / 1000) % 60)
      .toString()
      .padStart(2, "0");

    counting.value = `${minutes}:${seconds}`;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      counting.value = "out";
    }
  }, 1000);

  function countdownEnd() {
    clearInterval(countdownInterval);
    remaining.value = counting.value;
    counting.value = "out";
  }

  return countdownEnd;
}
