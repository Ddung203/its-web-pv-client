<script setup>
  import { ref } from "vue";
  import * as XLSX from "xlsx";

  const questions = ref([]);
  const emit = defineEmits(["questions-updated"]);

  const defaultImageURL =
    "https://firebasestorage.googleapis.com/v0/b/upload-images-42481.appspot.com/o/logos%2FLogo_bo%203%20goc.png?alt=media&token=aeb9dfc2-e57d-403a-a884-9ffd9ed2fb53";

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        questions.value = transformData(jsonData);

        emit("questions-updated", questions.value);

        event.target.value = "";
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const transformData = (data) => {
    console.log("data :>> ", data);
    return data.map((row) => ({
      code: Math.floor(100000 + Math.random() * 900000),
      imageURL: row.imageURL || defaultImageURL,
      content: row.content || "ERROR",
      options: [
        { numbering: 1, answer: row.option1 || "ERROR" },
        { numbering: 2, answer: row.option2 || "ERROR" },
        { numbering: 3, answer: row.option3 || "ERROR" },
        { numbering: 4, answer: row.option4 || "ERROR" },
      ],
      correctAnswer: row.correctAnswer.toString().toLowerCase(),
      level: row?.level?.toString().toLowerCase() || "normal",
    }));
  };
</script>

<template>
  <div
    class="border border-[#ccc] min-h-[244px] flex flex-col items-center justify-center bg-c"
  >
    <div class="flex flex-col gap-3 px-5 banner">
      <h2 class="font-f">Nhập danh sách câu hỏi từ file Excel</h2>
      <p class="text-base font-medium font-f">
        Tải xuống file mẫu 👉
        <a
          class="font-medium text-blue-700"
          href="https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/filesToDownload%2FQuestions%20Example.xlsx?alt=media&token=bc1dd29c-7254-4ed0-a146-6ecc5f8515a4"
          >Questions Example.xlsx</a
        >👈
      </p>
    </div>

    <!-- INPUT -->
    <div class="flex flex-col items-center pt-6">
      <div class="">
        <input
          class="i-none"
          id="fileUpload"
          name="fileUpload"
          type="file"
          accept=".xlsx"
          @change="handleFileUpload"
        />
        <Button> <label for="fileUpload"> Nhập file câu hỏi </label></Button>
      </div>

      <p
        class="mt-1 text-sm text-black"
        id="file_input_help"
      >
        Lưu ý: Chỉ nhận các file *.xlsx
      </p>
    </div>
  </div>
</template>

<style scoped>
  .banner {
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    margin: 0px 0px 7.5px;
    text-align: left;
  }

  .p-c {
    color: #fff;
    font-size: 15px;
    line-height: 21.75px;
    margin: 0px 0px 15px;
    text-align: left;
  }

  .bg-c {
    background-image: linear-gradient(to left, #e9ff97, #ffa38f);
  }

  .i-none {
    display: none;
  }

  .font-f {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
