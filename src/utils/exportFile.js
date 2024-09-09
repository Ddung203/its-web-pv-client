export const exportPrivateKey = async (fileName, content) => {
  try {
    // Kiểm tra xem trình duyệt có hỗ trợ API không
    if (!window.showSaveFilePicker) {
      throw new Error("Trình duyệt không hỗ trợ tính năng này.");
    }

    const options = {
      types: [
        {
          description: "Text Document",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
    };

    const handle = await window.showSaveFilePicker({
      suggestedName: `${fileName}-its.ddung203.id.vn.txt`,
      ...options,
    });

    const writableStream = await handle.createWritable();

    await writableStream.write(content);

    await writableStream.close();

    console.log("Private key successfully exported!");
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("Quá trình lưu file đã bị hủy.");
    } else {
      console.error("An error occurred during export: ", error);
    }
  }
};
