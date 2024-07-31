<script setup>
  import { computed, onMounted, ref, watch } from "vue";
  import OnlineStatus from "@/components/OnlineStatus/OnlineStatus.vue";
  import useIntervieweeStore from "../../stores/interviewee";
  import useInterviewerStore from "../../stores/interviewer";
  import HTTP from "../../helper/axiosInstance";
  import showNotification from "../../utils/showNotification";
  import { useToast } from "primevue/usetoast";
  import Header from "../../components/Header/Header.vue";

  const toast = useToast();
  const comment = ref("");
  const interviewScorePart1 = ref(25);
  const interviewScorePart2 = ref(25);

  const interviewScore = computed(() => {
    return interviewScorePart1.value + interviewScorePart2.value;
  });

  function increaseValue1() {
    if (interviewScorePart1.value < 50) {
      interviewScorePart1.value += 5;
    }
  }
  function decreaseValue1() {
    if (interviewScorePart1.value > 0) {
      interviewScorePart1.value -= 5;
    }
  }
  function increaseValue2() {
    if (interviewScorePart2.value < 50) {
      interviewScorePart2.value += 5;
    }
  }
  function decreaseValue2() {
    if (interviewScorePart2.value > 0) {
      interviewScorePart2.value -= 5;
    }
  }

  // Call API
  const intervieweeStore = useIntervieweeStore();
  const interviewerStore = useInterviewerStore();

  const selectedStudent = ref(null);

  const selectedInterviewer = ref({ name: "Phong van 1", code: "2021602111" });

  async function load() {
    await intervieweeStore.getIntervieweesHandle();
    await interviewerStore.getInterviewersHandle();
  }

  const intervieweeInformation = ref({});

  const endInterviewHandle = async () => {
    const data = {
      interviewScore: interviewScore.value,
      comment: comment.value,
      interviewer: selectedInterviewer.name,
    };

    try {
      const response = await HTTP.post(
        `/play/interview/${intervieweeInformation.value.playID}`,
        data
      );
      if (response.success) {
        showNotification(
          toast,
          "success",
          "Thông báo",
          "Lưu thông tin phỏng vấn thành công!",
          2000
        );
      }

      // Reset data to default
      try {
        await load();
      } catch (loadError) {
        console.error("Error loading data:", loadError);
        showNotification(
          toast,
          "error",
          "Thông báo",
          "Có lỗi xảy ra khi lấy dữ liệu phỏng vấn. Vui lòng thử lại sau!",
          3000
        );
      }

      selectedStudent.value = null;
    } catch (error) {
      console.error("Error during endInterviewHandle:", error);

      showNotification(
        toast,
        "error",
        "Thông báo",
        "Có lỗi xảy ra khi gửi dữ liệu phỏng vấn. Vui lòng thử lại sau!",
        3000
      );
    }
  };

  watch(selectedStudent, async () => {
    try {
      if (selectedStudent.value?.code) {
        const response = await HTTP.get(
          `/user/infor/${selectedStudent.value.code}`
        );

        intervieweeInformation.value = response?.payload?.user;

        const response2 = await HTTP.get(
          `/play/user/${intervieweeInformation.value._id}`
        );

        intervieweeInformation.value = {
          ...intervieweeInformation.value,
          score: response2?.payload?.play?.score,
          playID: response2?.payload?.play?._id,
        };

        // console.log(intervieweeInformation.value);
      }
    } catch (error) {
      console.log(error);
    }
  });

  onMounted(load);
</script>

<template>
  <div>
    <Toast />
    <OnlineStatus></OnlineStatus>
    <Header></Header>
  </div>
  <div class="pt-8 px-[30px] bg-[#f6f7fb]">
    <div class="grid grid-cols-1 grid-rows-1 gap-5 lg:grid-cols-3">
      <!-- 1 -->
      <div>
        <h2 class="mb-2 font-semibold text-center uppercase">
          Thông tin sinh viên
        </h2>
        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <!-- Chọn SV -->
        <div class="flex justify-center card py-7">
          <FloatLabel class="w-full md:w-14rem">
            <Dropdown
              v-model="selectedStudent"
              inputId="dd-city"
              :options="intervieweeStore.getStudents"
              optionLabel="name"
              class="w-full"
            />
            <label for="dd-city">Sinh viên</label>
          </FloatLabel>
        </div>

        <!-- Thông tin -->
        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <div class="px-6 py-5">
          <!-- Ma sinh vien -->
          <div class="flex items-center pb-3 gap-7">
            <div class="left">
              <Button
                icon="pi pi-code"
                rounded
                outlined
              />
            </div>
            <div class="flex flex-col right">
              <span class="text-lg">{{
                intervieweeInformation?.studentCode
                  ? intervieweeInformation?.studentCode
                  : "None"
              }}</span>
              <span class="text-sm">Mã sinh viên</span>
            </div>
          </div>

          <!-- Ho ten -->
          <div class="flex items-center pb-3 gap-7">
            <div class="left">
              <Button
                icon="pi pi-user"
                rounded
                outlined
              />
            </div>
            <div class="flex flex-col right">
              <span class="text-lg">{{
                intervieweeInformation?.studentName
                  ? intervieweeInformation?.studentName
                  : "None"
              }}</span>
              <span class="text-sm">Họ tên</span>
            </div>
          </div>

          <!-- Lớp -->
          <div class="flex items-center pb-3 gap-7">
            <div class="left">
              <Button
                icon="pi pi-briefcase"
                rounded
                outlined
              />
            </div>
            <div class="flex flex-col right">
              <span class="text-lg">{{
                intervieweeInformation?.studentClass
                  ? intervieweeInformation?.studentClass
                  : "None"
              }}</span>
              <span class="text-sm">Lớp</span>
            </div>
          </div>

          <!-- Địa chỉ -->
          <div class="flex items-center pb-3 gap-7">
            <div class="left">
              <Button
                icon="pi pi-map-marker"
                rounded
                outlined
              />
            </div>
            <div class="flex flex-col right">
              <span class="text-lg">{{
                intervieweeInformation?.studentHometown
                  ? intervieweeInformation?.studentHometown
                  : "None"
              }}</span>
              <span class="text-sm">Địa chỉ</span>
            </div>
          </div>

          <!-- Diem bai thi -->
          <div class="flex items-center pb-3 gap-7">
            <div class="left">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
              />
            </div>
            <div class="flex flex-col right">
              <span class="text-lg">{{
                intervieweeInformation?.score >= 0
                  ? intervieweeInformation?.score
                  : "None"
              }}</span>
              <span class="text-sm">Điểm bài test</span>
            </div>
          </div>
        </div>

        <!-- Điểm phỏng vấn -->
        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <div class="mt-4 md:mt-0 md:px-6 md:py-5">
          <!-- !Thái độ -->
          <div class="mb-5">
            <div class="mb-2">
              <span>Thái độ</span>
            </div>
            <div class="progress-bar">
              <div class="relative w-[330px] md:w-[380px] h-[20px]">
                <div class="w-full h-full bg-gray-200 rounder-c">
                  <div
                    class="h-full bg-[#f59e0b] rounder-c"
                    :style="{ width: interviewScorePart1 * 2 + '%' }"
                  >
                    <p class="text-center text-white">
                      {{ interviewScorePart1 }}
                    </p>
                  </div>
                </div>
                <div
                  class="absolute top-0 left-0 w-2/5 h-full cursor-pointer"
                  @click="decreaseValue1"
                ></div>
                <div
                  class="absolute top-0 right-0 w-3/5 h-full cursor-pointer"
                  @click="increaseValue1"
                ></div>
              </div>
            </div>
          </div>

          <!-- !Kiến thức -->
          <div class="mb-5">
            <div class="mb-2">
              <span>Kiến thức</span>
            </div>
            <div class="progress-bar">
              <div class="relative w-[330px] md:w-[380px] h-[20px]">
                <div class="w-full h-full bg-gray-200 rounder-c">
                  <div
                    class="h-full bg-[#f59e0b] rounder-c"
                    :style="{ width: interviewScorePart2 * 2 + '%' }"
                  >
                    <p class="text-center text-white">
                      {{ interviewScorePart2 }}
                    </p>
                  </div>
                </div>
                <div
                  class="absolute top-0 left-0 w-2/5 h-full cursor-pointer"
                  @click="decreaseValue2"
                ></div>
                <div
                  class="absolute top-0 right-0 w-3/5 h-full cursor-pointer"
                  @click="increaseValue2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <div>
        <h2 class="mb-2 font-semibold text-center uppercase">
          Câu hỏi phỏng vấn
        </h2>
        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <!-- Chọn SV -->
        <div class="flex justify-center card py-7">
          <FloatLabel class="w-full md:w-14rem">
            <Dropdown
              v-model="selectedInterviewer"
              inputId="dd-city"
              :options="interviewerStore.getInterviewers"
              optionLabel="name"
              class="w-full"
            />
            <label for="dd-city">Người phỏng vấn</label>
          </FloatLabel>
        </div>

        <!-- Câu hỏi -->
        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <div class="mb-16 mt-[20px] flex flex-col gap-4">
          <div>
            <span class="text-[#ff9700] font-semibold uppercase"
              >A. Giới thiệu bản thân
            </span>
            <p class="text-justify">
              1. Bạn có thể giới thiệu đôi chút về bản thân không?<br />
              2. Lý do bạn muốn gia nhập câu lạc bộ là gì?<br />
              3. Bạn có sở thích hoặc đam mê gì ngoài việc học và công việc
              không?<br />
              4. Bạn biết đến câu lạc bộ qua đâu?<br />
              5. Bạn đã từng tham gia câu lạc bộ hoặc muốn tham gia câu lạc bộ
              nào chưa? Nếu có, hãy chia sẻ kinh nghiệm của bạn.<br />
              6. Bạn có thể mô tả một ngày bình thường của bạn không?<br />
              7. Bạn nghĩ gì về việc làm việc nhóm và bạn đã từng làm việc nhóm
              trước đây chưa?<br />
              8. Bạn mong muốn đóng góp gì cho câu lạc bộ nếu được chấp nhận?<br />
            </p>
          </div>

          <div>
            <span class="text-[#ff9700] font-semibold uppercase">
              B. Kỹ năng và kinh nghiệm
            </span>
            <p class="text-justify">
              1. Bạn đánh giá kỹ năng hiện tại của bản thân như thế nào?<br />
              2. Bạn đã từng tham gia các hoạt động của câu lạc bộ chúng tôi
              chưa?<br />
              3. Bạn có kinh nghiệm tổ chức sự kiện hoặc tham gia vào việc quản
              lý sự kiện không?<br />
              4. Bạn có kỹ năng nào liên quan đến công nghệ, thiết kế, hoặc
              truyền thông không?<br />
              5. Bạn có thể kể về một lần bạn giải quyết một vấn đề khó khăn
              trong công việc hoặc học tập không?<br />
              6. Bạn có kỹ năng giao tiếp như thế nào?<br />
              7. Bạn có thể kể về một tình huống bạn đã thuyết phục thành công
              ai đó không?<br />
            </p>
          </div>

          <div>
            <span class="text-[#ff9700] font-semibold uppercase"
              >C. Thái độ và mong đợi</span
            >
            <p class="text-justify">
              1. Bạn mong đợi gì từ việc tham gia câu lạc bộ ?<br />
              2. Bạn nghĩ bạn có thể dành bao nhiêu thời gian mỗi tuần cho các
              hoạt động của câu lạc bộ?<br />
              3. Bạn có thể kể về một lần bạn phải đối mặt với mâu thuẫn trong
              nhóm và cách bạn giải quyết nó?<br />
              4. Bạn có sẵn sàng học hỏi và tham gia vào các hoạt động mới mà
              bạn chưa có kinh nghiệm không?<br />
              5. Bạn có khả năng thích ứng với sự thay đổi và tình huống mới như
              thế nào?<br />
              6. Bạn nghĩ gì về việc cân bằng giữa cuộc sống cá nhân và các hoạt
              động của câu lạc bộ?<br />
              7. Bạn mong muốn nhận được hỗ trợ và đào tạo như thế nào từ các
              thành viên kỳ cựu của câu lạc bộ?<br />
              8. Bạn có mục tiêu dài hạn nào liên quan đến việc tham gia câu lạc
              bộ không?<br />
            </p>
          </div>
        </div>
      </div>
      <!-- 3 -->

      <div>
        <h2 class="mb-2 font-semibold text-center uppercase">Nhận xét</h2>
        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <!-- NOTE -->
        <div class="flex justify-center my-8">
          <Textarea
            v-model="comment"
            rows="10"
            cols="42"
            placeholder="Nhận xét..."
          />
        </div>

        <div class="w-full h-[1px] mb-1 bg-[#ff9700]"></div>
        <div class="flex justify-center mt-4 mb-8 md:justify-end">
          <Button
            @click="endInterviewHandle"
            label="Kết thúc phỏng vấn"
            :disabled="!selectedStudent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .rounder-c {
    border-radius: 50px;
  }
</style>
