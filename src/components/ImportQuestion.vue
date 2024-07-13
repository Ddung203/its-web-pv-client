<script setup>
  import { ref } from "vue";
  import * as XLSX from "xlsx";
  import HTTP from "../helper/axiosInstance";

  const questions = ref([]);

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
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const transformData = (data) => {
    return data.map((row) => ({
      imageURL: row.imageURL || "",
      content: row.content,
      options: [
        { numbering: 1, answer: row.option1 },
        { numbering: 2, answer: row.option2 },
        { numbering: 3, answer: row.option3 },
        { numbering: 4, answer: row.option4 },
      ],
      correctAnswer: row.correctAnswer.toString(),
      level: row.level || "easy",
    }));
  };

  const saveQuestionsHandle = async () => {
    const bodyData = { questions: questions.value };

    const response = await HTTP.post("/question/insert", bodyData);

    console.log("responsev :>> ", response);
  };
</script>

<template>
  <div>
    <Button @click="saveQuestionsHandle">Lưu câu hỏi</Button>
    <input
      type="file"
      @change="handleFileUpload"
      accept=".xlsx"
    />

    <pre>{{ questions }}</pre>
  </div>
</template>

<style scoped>
  /* Thêm style nếu cần */
</style>
