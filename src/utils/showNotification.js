const showNotification = (toast, severity, summary, detail, life = 2000) => {
  toast.add({
    severity,
    summary,
    detail,
    life,
  });
};
const successNoti = (toast, detail) => {
  toast.add({
    severity: "success",
    summary: "Thông báo",
    detail,
    life: 2000,
  });
};
const errorNoti = (toast, detail) => {
  toast.add({
    severity: "error",
    summary: "Thông báo lỗi",
    detail,
    life: 3000,
  });
};

const infoNoti = (toast, detail) => {
  toast.add({
    severity: "info",
    summary: "Thông báo",
    detail,
    life: 3000,
  });
};

export { successNoti, errorNoti, infoNoti };
export default showNotification;
