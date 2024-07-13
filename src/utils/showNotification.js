const showNotification = (toast, severity, summary, detail, life = 2000) => {
    toast.add({
      severity,
      summary,
      detail,
      life,
    });
  };
  
  export default showNotification;
