const getLocalTime = () => {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};
export default getLocalTime;
