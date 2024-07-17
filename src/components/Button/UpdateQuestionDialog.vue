<script setup>
  import { ref } from "vue";
</script>

<template>
  <div>
    <div class="flex card justify-content-center">
      <Dialog
        v-model:visible="visible"
        modal
        header="Chỉnh sửa câu hỏi"
        :style="{ width: '25rem' }"
      >
        <!--  -->
        <div class="flex items-center gap-3 mb-3">
          <label
            for="content"
            class="font-semibold w-6rem"
            >Nội dung</label
          >
          <InputText
            id="content"
            class="flex-auto"
            autocomplete="off"
            :value="question.content"
          />
        </div>
        <!--  -->
        <div
          v-for="(option, index) in question.options"
          :key="index"
        >
          <div class="flex items-center gap-3 mb-3">
            <label
              for="ans1"
              class="font-semibold w-6rem"
              >Ans.{{ option.numbering }}</label
            >
            <InputText
              :id="'ans' + option.numbering"
              class="flex-auto"
              autocomplete="off"
              :value="option.answer"
            />
          </div>
        </div>
        <!-- Dropbow Correct Answer -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn đáp án đúng*</span>
          <Dropdown
            v-model="selectedCorrectAnswer"
            :options="correctAnswers"
            optionLabel="name"
            placeholder="-"
            class="w-full md:w-14rem"
          />
        </div>

        <!-- Dropbow Level Answer -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold text-red-500">Chọn cấp độ</span>
          <Dropdown
            v-model="selectedLevel"
            :options="levels"
            optionLabel="name"
            placeholder="-"
            class="w-full md:w-14rem"
          />
        </div>

        <!-- Ảnh -->
        <div class="flex flex-col items-start justify-center pb-3">
          <span class="pb-2 font-semibold">Chọn ảnh</span>

          <input
            type="file"
            @change="handleFileUpload"
          />

          <p
            class="py-1 text-sm text-[#16a34a] uppercase"
            v-if="uploadStatus === 'success'"
          >
            Tải ảnh thành công!
          </p>
          <p
            class="py-1 text-sm text-red-500 uppercase"
            v-else
          >
            Nếu không chọn ảnh, ảnh mặc định sẽ được sử dụng.
          </p>
        </div>
        <!-- Dialog Bottom -->
        <div class="flex justify-end gap-6">
          <Button
            type="button"
            label="Hủy bỏ"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button
            type="button"
            label="Cập nhật"
            severity="success"
            @click="updateQuestionHandle"
          ></Button>

          <!-- ! UPDATE BUTTON COMPONENT -->
          <UpdateQuestionButton
            :questionWillUpdate="question"
          ></UpdateQuestionButton>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
  /*  */
</style>
