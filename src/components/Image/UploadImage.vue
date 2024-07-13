<script setup>
  import { ref } from "vue";
  import { uploadImageHandle } from "../../helper/uploadImageHandle.js";

  const uploadStatus = ref(null);
  const imageURL = ref(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      uploadStatus.value = "error";
      imageURL.value = null;
      console.log("No file selected");
      return;
    }

    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      uploadStatus.value = "error";
      imageURL.value = null;
      console.log("Invalid file type. Only images are allowed.");
      return;
    }

    const fileName = "image" + Date.now() + "." + file.type.split("/")[1];

    const result = await uploadImageHandle(file, fileName);

    uploadStatus.value = result.status;
    if (result.status === "success") {
      imageURL.value = result.url;
    } else {
      imageURL.value = null;
    }
  };
</script>

<template>
  <div>
    <input
      type="file"
      @change="handleFileUpload"
    />
    <p v-if="uploadStatus">Status: {{ uploadStatus }}</p>
    <p v-if="imageURL">
      Image URL:
      <a
        :href="imageURL"
        target="_blank"
        >{{ imageURL }}</a
      >
    </p>
  </div>
</template>
