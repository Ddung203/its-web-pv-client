import { VITE_2FA_KEY } from "../config";

const verifyOTP = async (token) => {
  const response = await fetch("https://its-2fa.onrender.com/verify-2fa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, secret: VITE_2FA_KEY }),
  });

  const data = await response.json();

  return data.success;
};

export default verifyOTP;
