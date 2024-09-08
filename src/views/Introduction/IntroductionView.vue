<script setup>
  import { ref } from "vue";
  import HeaderThird from "../../components/Header/HeaderThird.vue";
  import ScrollToTop from "@/components/Button/ScrollToTop.vue";
  import { useToast } from "primevue/usetoast";
  import { errorNoti, successNoti } from "../../utils/showNotification";
  import HTTP from "../../helper/axiosInstance";

  const toast = useToast();

  const curYear = new Date().getFullYear();

  const senderName = ref("");
  const senderEmail = ref("");
  const senderSubject = ref("");
  const senderMessage = ref("");

  const isFormValid = () => {
    if (!senderName.value.trim()) {
      errorNoti(toast, "Vui lòng nhập tên");
      return false;
    }
    if (!senderEmail.value.trim()) {
      errorNoti(toast, "Vui lòng nhập email");
      return false;
    }
    if (!senderSubject.value.trim()) {
      errorNoti(toast, "Vui lòng nhập tiêu đề");
      return false;
    }
    if (!senderMessage.value.trim()) {
      errorNoti(toast, "Vui lòng nhập tin nhắn");
      return false;
    }
    return true;
  };

  const submitFormHandler = async () => {
    if (!isFormValid()) return;

    if (localStorage.getItem("nextTime")) {
      const nextTime = localStorage.getItem("nextTime");
      const currentTime = new Date().getTime();
      if (currentTime < nextTime) {
        errorNoti(
          toast,
          "Bạn đã gửi quá số lượng email được cho phép. Thử lại sau 10 phút!"
        );
        return;
      } else {
        localStorage.removeItem("nextTime");
      }
    }

    try {
      let data = {
        senderName: senderName.value,
        senderEmail: senderEmail.value,
        senderSubject: senderSubject.value,
        senderMessage: senderMessage.value,
      };

      const response = await HTTP.post("/email/feedback", data);

      if (response.success) {
        successNoti(toast, "Đã gửi");

        senderName.value = "";
        senderEmail.value = "";
        senderSubject.value = "";
        senderMessage.value = "";

        // Lấy thời gian hiện tại
        const now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        const timestamp = now.getTime();

        localStorage.setItem("nextTime", timestamp);
      }
    } catch (error) {
      errorNoti(toast, "Xảy ra lỗi, vui lòng thử lại sau!");
    }
  };
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <HeaderThird></HeaderThird>
  <Toast />
  <div class="wrapper">
    <div class="main">
      <div class="get__started">
        <div
          class="lg:flex lg:justify-between gap-[60px] lg:items-center w-[100%] h-[530px] mt-[40px] lg:my-[40px] lg:mx-[80px]"
        >
          <div class="px-6 lg:px-0 lg:w-1/2">
            <p class="text-[#fff] font-bold text-4xl leading-[50px] uppercase">
              Câu lạc bộ Hỗ trợ kỹ thuật <br />
              IT Supporter – HaUI
            </p>

            <p
              class="text-[#fff] mt-4 text-center lg:text-start font-medium text-lg"
            >
              Được thành lập vào ngày <strong>29/08/2014</strong>, qua
              <span class="">10</span> năm hình thành và phát triển CLB Hỗ trợ
              kỹ thuật IT Supporter đã có những bước tiến lớn trong quá trình
              trưởng thành của mình. CLB được thành lập với mục đích hỗ trợ
              những vấn đề liên quan đến kỹ thuật khoa CNTT.
            </p>
            <div
              class="w-[100%] lg:w-[150px] mt-16 lg:mt-6 py-2 px-7 rounded text-white bg-[#49b5e7] leading-6 font-medium hover:opacity-60 uppercase cursor-pointer tracking-tight transition-all ease duration-400 flex items-center justify-center"
            >
              <router-link to="previous-registration">
                <button class="block text-center text-white">
                  Tham gia
                </button></router-link
              >
            </div>
          </div>

          <div
            class="hidden lg:w-1/2 lg:flex lg:justify-end lg:items-center col50"
          >
            <!-- <img
              class="block max-w-[400px] rounded-2xl"
              src="../../public/assets/imgs/g4.jpg"
              alt="Logo kỉ niệm 10 năm"
            /> -->
          </div>
        </div>
      </div>

      <!--  -->
      <div class="pb-16 lg:py-16">
        <div class="flex lg:gap-36 flex-col lg:flex-row px-[10px] lg:px-20">
          <div class="flex flex-col items-center justify-start lg:w-2/5">
            <img
              src="../../public/assets/imgs/b1.png"
              alt=""
            />
          </div>
          <div class="flex flex-col items-start justify-start lg:w-3/5">
            <p
              class="text-[#0f394c] text-[32px] font-bold leading-[38.4px] mb-5 text-center uppercase"
            >
              Các ban hoạt động
            </p>

            <div class="w-full mt-10 grid grid-cols-[66px_auto]">
              <div class="icon-desc">
                <i class="fa-solid fa-fingerprint"></i>
              </div>
              <!-- !LOOP -->

              <div class="ml-[30px]">
                <p class="font-bold">BAN KỸ THUẬT</p>
                <p class="text-[#0f394c] text-base">
                  Ban kỹ thuật với mục đích hỗ trợ kỹ thuật nói chung và giúp đỡ
                  các bạn sinh viên vấn đề liên quan đến máy tính nói riêng
                  như:<br />
                  🧰 Cài đặt phần mềm <br />💻 Tư vấn máy tính, laptop <br />🧹
                  Vệ sinh, nâng cấp, bảo trì máy tính <br />🔧 Hỗ trợ bảo trì,
                  cài đặt phòng máy của khoa <br />📡 Hỗ trợ kỹ thuật trong các
                  chương trình, sự kiện của khoa CNTT
                </p>
              </div>
            </div>
            <div class="w-full mt-10 grid grid-cols-[66px_auto]">
              <div class="icon-desc">
                <i class="fa-solid fa-gift"></i>
              </div>
              <div class="ml-[30px]">
                <p class="font-bold">BAN TRUYỀN THÔNG</p>
                <p class="text-[#0f394c] text-base">
                  Ban truyền thông: Với mục đích truyền thông đến bạn các tin
                  tức về công nghệ mới nhất, các hoạt động, sự kiện của CLB Hoạt
                  động thường niên: <br />📡Mỗi tuần: bài news theo hình thức
                  video ngắn <br />🔥Trong tuần: theo dõi, cập nhật tình hình
                  trong ngày để lên hot new <br />💡Trong tháng: Chia sẻ kiến
                  thức, kinh nghiệm về phần cứng, kiến thức về công nghệ, code
                  <br />🥳Bài sinh nhật thành viên
                </p>
              </div>
            </div>
            <div class="w-full mt-10 grid grid-cols-[66px_auto]">
              <div class="icon-desc">
                <i class="fa-solid fa-atom"></i>
              </div>
              <div class="ml-[30px]">
                <p class="font-bold">BAN TỔ CHỨC SỰ KIỆN</p>
                <p class="text-[#0f394c] text-base">
                  Ban TCSK với mục đích hậu cần, lên kế hoạch, sắp xếp các hoạt
                  động học tập cũng như vui chơi giải trí của câu lạc bộ, tổ
                  chức các sự kiện, các chương trình. Hoạt động thường niên:
                  <br />🎂Tổ chức sinh nhật thường niên cho các thành viên
                  <br />⚽️Hoạt động vui chơi giải trí (bóng rổ, bóng đá, cầu
                  lông) <br />✏️Lên kế hoạch cho hoạt động học tập<br />
                  🛠️Chuẩn bị hậu cần các sự kiện <br />🖥️Theo dõi và hướng dẫn
                  các bạn tham dự các cuộc thi phần cứng (Expert Challenges, IT
                  Festival)
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="right"></div> -->
      </div>
      <!-- Achieved -->

      <!-- SERVICES -->
      <div
        id="services"
        class="services"
      >
        <div class="services-top layout-top">
          <h2>Hoạt động chính</h2>
          <p class="px-3">
            CLB Hỗ trợ kỹ thuật IT Supporter có nhiều hoạt động nhằm thúc đẩy sự
            phát triển kỹ năng của các thành viên và đem đến cho tất cả các bạn
            sinh viên một địa chỉ tin cậy để giao phó sự tin tưởng của mình
          </p>
        </div>
        <div class="services__inner px-[80px] lg:pb-[60px]">
          <ul class="services__inner-list">
            <li class="services__inner-item">
              <div class="right">
                <span>Tech Support</span>
                <p class="bottom">
                  Tech Support thường niên với nhiều hạng mục nhằm hỗ trợ những
                  vấn đề về máy tính cho giảng viên sinh viên trong toàn trường
                </p>
              </div>
            </li>
            <li class="services__inner-item">
              <div class="right">
                <span>Bảo trì, cài đặt phòng máy ở khoa CNTT</span>
                <p class="bottom">
                  Giúp cho những phòng máy cập nhật kịp thời những phần mềm mới
                  nhất, hoạt động mượt mà nhất cho những giờ thực hành trên lớp.
                </p>
              </div>
            </li>
            <li class="services__inner-item">
              <div class="right">
                <span>Tech news</span>
                <p class="bottom">
                  Giúp tất cả mọi người đều được cập nhật những thông tin công
                  nghệ nóng hổi, giúp bạn nắm bắt được xu thế công nghệ hiện
                  đại.
                </p>
              </div>
            </li>
            <li class="services__inner-item">
              <div class="right">
                <span>Họp đội hàng tuần, tổ chức sự kiện hàng năm,...</span>
                <p class="bottom">
                  Các hoạt động giúp gắn kết các thành viên, cộng tác viên trong
                  câu lạc bộ
                </p>
              </div>
            </li>
            <li class="services__inner-item">
              <div class="right">
                <span>Tổ chức các lớp học, nhóm học tập</span>
                <p class="bottom">
                  Giúp các thành viên, cộng tác viên của CLB trau dồi kỹ năng
                  của bản thân, trao đổi tài liệu học tập,...
                </p>
              </div>
            </li>
            <li class="services__inner-item">
              <div class="p-6 right">
                <span>Tuyển cộng tác viên khóa mới</span>
                <p class="bottom">
                  Đây là hoạt động hàng năm của CLB, tổ chức tại cả 2 cơ sở,
                  dành cho <strong>tất cả</strong> sinh viên HaUI có đam mê
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- PORTFOLIO -->

      <!-- Chu nhiem -->
      <div
        id="slider"
        class="slider"
      >
        <div class="slider__inner">
          <div class="slider__inner-top">
            <div class="person-img">
              <a
                href="https://www.facebook.com/tieuuvuongg.dii"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../../public/assets/imgs/ChuNhiem.jpg"
                  alt="2"
                />
              </a>
            </div>
            <h3>Chị Vũ Thị Thái Hà</h3>
            <h4>Chủ nhiệm</h4>
          </div>

          <div class="quote">
            <p>
              <!-- <i class="bx bxs-quote-alt-left kep1"></i> -->
              <span
                >"ĐỪNG CHỈ LÀM VIỆC VÌ TRÁCH NHIỆM, HÃY LÀM VIỆC BẰNG CẢ SỰ ĐAM
                MÊ"</span
              >
              <!-- <i class="bx bxs-quote-alt-right kep2"></i> -->
            </p>
          </div>
        </div>
      </div>
      <!-- TEAM -->
      <div class="team">
        <div class="layout-top">
          <h2>THÀNH VIÊN BAN PHỤ TRÁCH</h2>
          <p>Các "sếp" 😁</p>
        </div>

        <!-- BPT -->
        <div
          class="team__content2 max-w-full px-[10px] lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_25px_1fr_25px_1fr_25px_1fr]"
        >
          <div class="bg-white team__content-item group">
            <img
              src="../../public/assets/imgs/TrinhNgocHai.jpg"
              alt=""
              height="305.65"
            />
            <div class="team-i4">
              <h3>Anh Trịnh Ngọc Hải</h3>
              <p>Phó chủ nhiệm</p>
            </div>
            <!-- Show Link Icon -->
            <div
              class="absolute z-10 hidden w-full top-60 group-hover:flex group-hover:justify-center group-hover:items-center"
            >
              <ul class="flex">
                <li
                  class="text-white bg-[#49b5e7] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <a
                    target="_blank"
                    href="https://www.facebook.com/trinhhai.1208"
                  >
                    <i class="text-white fa-brands fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="div"></div>
          <div class="bg-white team__content-item group">
            <img
              src="../../public/assets/imgs/HoangDung.jpg"
              alt=""
            />
            <div class="team-i4">
              <h3>Anh Hoàng Trung Dũng</h3>
              <p>Phó chủ nhiệm</p>
            </div>
            <!-- Show Link Icon -->
            <div
              class="absolute z-10 hidden w-full top-60 group-hover:flex group-hover:justify-center group-hover:items-center"
            >
              <ul class="flex">
                <li
                  class="text-white bg-[#49b5e7] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <a
                    target="_blank"
                    href="https://www.facebook.com/Kritsirious"
                  >
                    <i class="text-white fa-brands fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="div"></div>
          <div class="bg-white team__content-item group">
            <img
              src="../../public/assets/imgs/PhuongNu.jpg"
              alt=""
            />
            <div class="team-i4">
              <h3>Chị Trần Thu Phương</h3>
              <p>Ủy viên</p>
            </div>
            <!-- Show Link Icon -->
            <div
              class="absolute z-10 hidden w-full top-60 group-hover:flex group-hover:justify-center group-hover:items-center"
            >
              <ul class="flex">
                <li
                  class="text-white bg-[#49b5e7] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100090678160830"
                  >
                    <i class="text-white fa-brands fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="div"></div>
          <div class="bg-white team__content-item group">
            <img
              src="../../public/assets/imgs/DoPhuong.jpg"
              alt=""
            />
            <div class="team-i4">
              <h3>Anh Đỗ Triệu Đức Phương</h3>
              <p>Ủy viên</p>
            </div>
            <!-- Show Link Icon -->

            <div
              class="absolute z-10 hidden w-full top-60 group-hover:flex group-hover:justify-center group-hover:items-center"
            >
              <ul class="flex">
                <li
                  class="text-white bg-[#49b5e7] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100034244050065"
                  >
                    <i class="text-white fa-brands fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- GALLERY -->
      <div
        id="gallery"
        class="gallery"
      >
        <div class="layout-top">
          <h2>Thư viện ảnh</h2>
          <p>Một số hình ảnh kỉ niệm của chúng mình</p>
        </div>

        <div
          class="grid grid-cols-1 gap-3 px-4 lg:gap-3 lg:px-0 lg:grid-cols-4 lg:grid-rows-2"
        >
          <div class="gallery-img">
            <img
              class="block max-w-full"
              src="../../public/assets/imgs/g1.jpg"
              alt="gallery-1"
            />
          </div>

          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g2.jpg"
              alt="gallery-2"
            />
          </div>

          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g3.jpg"
              alt="gallery-3"
            />
          </div>

          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g4.jpg"
              alt="gallery-4"
            />
          </div>
          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g9.jpg"
              alt="gallery-5"
            />
          </div>

          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g6.jpg"
              alt="gallery-6"
            />
          </div>

          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g7.jpg"
              alt="gallery-7"
            />
          </div>

          <div class="gallery-img">
            <img
              src="../../public/assets/imgs/g8.jpg"
              alt="gallery-8"
            />
          </div>
        </div>
      </div>
      <!-- contact -->
      <div
        id="contact"
        class="contact"
      >
        <div class="layout-top">
          <h2>Liên hệ</h2>
          <p>Để lại lời nhắn cho chúng mình!</p>
        </div>
        <div class="contact-content">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.470791359761!2d105.7324846750253!3d21.053850786916833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1725046736642!5m2!1svi!2s"
            width="1296"
            height="270"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="contact-content-i4">
            <div class="cc-i4-left">
              <div class="w-full my-10 grid grid-cols-[66px_auto]">
                <div class="icon-desc">
                  <!-- <i class="bx bx-current-location"></i> -->
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="ml-[30px]">
                  <a href="#">Địa chỉ:</a>
                  <p class="bottom">
                    Văn phòng Đoàn Thanh Niên, Tầng 8, nhà A1, trường Đại Học
                    Công nghiệp Hà Nội Hà Nội
                  </p>
                </div>
              </div>
              <div class="w-full my-10 grid grid-cols-[66px_auto]">
                <div class="icon-desc">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="ml-[30px]">
                  <a href="#">Email:</a>
                  <p class="bottom">it.supporter@fit-haui.edu.vn</p>
                </div>
              </div>
              <div class="w-full my-10 grid grid-cols-[66px_auto]">
                <div class="icon-desc">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div class="ml-[30px]">
                  <a href="#">Hotline:</a>
                  <p class="bottom">0965 530 897</p>
                </div>
              </div>
            </div>
            <div class="cc-i4-right">
              <form
                autocomplete="off"
                @submit.prevent="submitFormHandler"
                id="form-send-mess"
              >
                <div class="i4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    v-model="senderName"
                    maxlength="30"
                  />
                  <div class=""></div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    v-model="senderEmail"
                    maxlength="50"
                  />
                </div>
                <div class="subject">
                  <input
                    type="text"
                    placeholder="Subject"
                    maxlength="200"
                    v-model="senderSubject"
                  />
                </div>
                <div class="message">
                  <textarea
                    name="mess"
                    id="message"
                    rows="7"
                    placeholder="Message"
                    maxlength="1000"
                    v-model="senderMessage"
                  >
                  </textarea>
                </div>
                <button
                  id="submit-btn"
                  type="submit"
                >
                  <span> Gửi lời nhắn</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="newsletter">
        <div class="newsletter__inner">
          <h2 class="font-semibolds">Tham gia cùng chúng mình</h2>
          <p>Đăng ký trở thành cộng tác viên</p>
          <div class="newsletter__inner-search">
            <div class="newsletter__inner-input">
              <input
                class="input-hidden"
                type="text"
                value="https://its.ddung203.id.vn/previous-registration"
                readonly
              />
            </div>
            <div class="search-box">
              <a
                target="_blank"
                href="https://its.ddung203.id.vn/previous-registration"
              >
                <span>Đăng ký</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="footer__top">
        <div class="f1">
          <!-- <h3>IT Supporter</h3> -->
          <img
            class="block h-[40px] mb-2"
            src="/src/public/assets/logos/logofull.png"
            alt="Logo"
          />
          <p>
            Văn phòng Đoàn Thanh Niên, <br />Tầng 8, nhà A1, trường Đại Học Công
            nghiệp Hà Nội Hà Nội, Hanoi, Vietnam <br /><br />
            <strong>Phone:</strong> 0965 530 897 (Chị Vũ Thị Thái Hà - Chủ
            nhiệm)<br />
            <strong>Email:</strong> it.supporter@fit-haui.edu.vn<br />
          </p>
        </div>

        <div class="f2">
          <h4 class="mb-5 font-semibold">Liên kết</h4>
          <ul>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <a href="#"> Home</a>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <a href="#services"> Hoạt động</a>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <a href="#slider"> Ban phụ trách</a>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <a href="#gallery"> Thư viện ảnh</a>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <a href="#contact"> Liên hệ</a>
            </li>
          </ul>
        </div>
        <div class="f2">
          <h4 class="mb-5 font-semibold">Hoạt động chính</h4>
          <ul>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <span> Tech Support</span>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <span> Bảo trì, cài đặt phòng máy ở khoa CNTT</span>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <span> Tech news</span>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <span> Họp đội</span>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <span> Tổ chức lớp học</span>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
              <span> Tuyển cộng tác viên</span>
            </li>
          </ul>
        </div>
        <div class="f2 our-social-networks">
          <h4 class="mb-5 font-semibold">Mạng xã hội</h4>
          <p>Kết nối với chúng mình qua <br /></p>
          <ul class="flex">
            <li
              class="text-white bg-[#49b5e7] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            >
              <a
                target="_blank"
                href="https://www.facebook.com/itsupporter.haui"
                class="flex items-center justify-center"
              >
                <Button
                  icon="pi pi-facebook"
                  severity="info"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <div class="copyright-left">
          <p>
            <span style="font-family: Arial, Helvetica, sans-serif"
              >&copy; 2022 - {{ curYear }}</span
            >
            <span>. Made by </span>
            <a
              class="copyright-right"
              href="https://github.com/Ddung203"
              target="_blank"
              >DDung203</a
            >
          </p>
        </div>
        <div class="copyright-right">
          <span>Designed by </span>
          <a href="#">BootstrapMade</a>
        </div>
      </div>
    </div>
  </div>
  <ScrollToTop></ScrollToTop>
</template>

<style scoped>
  /* @import url("https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"); */
  /* ! Reset CSS */

  body {
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
  }
  li {
    list-style-type: none;
  }

  iframe {
    max-width: 100%;
  }

  .inner {
    margin: 0 80px;
  }
  .innerP {
    margin: 0 80px;
  }
  .col50 {
    width: 50%;
  }
  .layout-top {
    width: 100%;
    padding: 60px 80px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .layout-top h2 {
    color: #0f394c;
    font-size: 32px;
    font-weight: 700;
    line-height: 38.4px;
    margin: 0px 0px 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .layout-top p {
    color: #444444;
    line-height: 24px;
    text-align: center;
  }

  .img-black-and-white {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
  }
  .orange-cl {
    color: #e9bf06 !important;
  }
  .blue1-cl {
    color: #3fcdc7 !important;
  }
  .green1-cl {
    color: #41cf2e !important;
  }
  .green2-cl {
    color: #d6ff22 !important;
  }
  .blue2-cl {
    color: #4680ff !important;
  }
  /*! Main CSS */
  .header {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .header__inner {
    min-width: 1200px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-left {
    flex-basis: 40%;
  }
  .logo {
    max-width: 200px;
  }
  .header-right {
    flex-basis: 44%;
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item {
    text-transform: uppercase;
  }
  .item a {
    color: black;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
  }
  .item a:hover {
    color: #49e5e7;
  }
  .show {
    position: relative;
  }
  .show i {
    font-weight: 600;
  }
  .show i:hover {
    font-weight: 600;
    color: #49e5e7;
  }
  .dropdown {
    display: block;
    position: absolute;
    left: 14px;
    top: calc(100% + 30px);
    margin: 0;
    padding: 10px;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    background: #fff;
    box-shadow: 0px 0px 30px rgb(127 137 161 / 25%);
    transition: 0.3s;
  }
  .dropdown li {
    min-width: 200px;
    margin: 15px 0;
  }
  .dropdown li a {
    min-width: 200px;
    padding: 10px 20px;
    text-transform: capitalize;
  }
  .show:hover .dropdown {
    opacity: 1;
    visibility: unset;
  }
  /* Main */
  .main {
    width: 100%;
    min-height: 1000px;
  }

  /* .get__started {
    display: flex;
    width: 100%;
    background-color: #f9f9f9;
    background-image: url("../../public/assets/imgs/anh_nen.png");
    background-size: cover;
    background-attachment: fixed;
   
  } */

  .get__started {
    display: flex;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Màu nền tối */
    background-image: url("../../public/assets/imgs/anh_nen.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-blend-mode: darken; /* Trộn màu nền với ảnh nền */
  }

  .get__started-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .get__started-right img {
    max-width: 100%;
  }

  .t2 {
    color: #0f394c;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
    text-transform: uppercase;
  }

  .get-st-box {
    display: inline-block;
    margin: 25px 0px 0px;
    padding: 8px 28px;
    border-radius: 3px;
    color: #ffffff;
    background-color: #49b5e7;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 1px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all ease 0.4s;
  }
  .get-st-box a {
    color: #fff;
  }
  .get-st-box:hover {
    opacity: 0.6;
  }

  .desc {
    width: 100%;
    margin: 40px 0;
    display: grid;
    grid-template-columns: 66px auto;
  }
  .icon-desc {
    flex-basis: 66px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid rgba(73, 181, 231, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all ease 0.4s;
  }
  .icon-desc i {
    color: #49b5e7;
    font-size: 32px;
    line-height: 32px;
    transition: all ease 0.2s;
  }
  .icon-desc:hover {
    background-color: #49b5e7;
    color: #fff;
  }
  .icon-desc:hover i {
    color: #fff;
    font-size: 32px;
    line-height: 32px;
  }

  .title-desc a {
    margin-bottom: 10px;
    display: block;
    color: #343a40;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    transition: all ease 0.2s;
  }
  .title-desc a:hover {
    color: #49b5e7;
  }
  .title-desc p {
    color: #444444;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .achieved {
    width: 100%;
    height: 680px;
    margin-bottom: 60px;
    background-image: url(../img/counts-bg.png);
    background-size: cover;
    background-attachment: fixed;
    margin-bottom: 60px;
  }
  .achieved__top {
    max-width: 100%;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.6);
  }
  .achieved__statistical {
    width: 100%;
    height: 56%;
    padding: 0 80px;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }
  .achieved__statistical-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .achieved__top-title {
    color: #0f394c;
    text-align: center;
    padding-top: 80px;
    font-weight: 700;
    font-size: 36px;
  }
  .achieved__top-title-desc {
    text-align: center;
    color: #0f394c;
    line-height: 24px;
  }
  .achieved__statistical-content .n {
    color: #49b5e7;
    font-size: 44px;
    font-weight: 700;
    line-height: 66px;
    text-align: center;
  }
  .achieved__statistical-content .t {
    color: #444;
    font-size: 15px;
    text-align: center;
    line-height: 22.5px;
  }
  .achieved__bottom {
    width: 100%;
    height: 50%;
    background-color: rgb(255, 255, 255);
  }
  .achieved__bottom__inner {
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    padding: 0 80px;
  }
  .achieved__bottom__inner .list {
    max-width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 50% 50%;
  }
  .achieved__bottom__inner .item {
    max-width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.4s;
  }
  .achieved-logo {
    display: block;
    max-width: 90px;
    color: #ccc;
    transition: all ease 0.3s;
  }
  .achieved__bottom__inner .item:hover .achieved-logo {
    transform: scale(1.2);
  }

  .services {
    background-color: #f4fbfe;
  }

  .services__inner {
    width: 100%;
    background-color: #f4fbfe;
  }

  .services__inner-item {
    max-width: 396px;
    height: 169px;
    margin: 0 10px 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    box-shadow: 0 10px 29px 0 rgb(68 88 144 / 10%);
    transition: all 0.3s ease-in-out;
  }
  .services__inner-item:hover {
    width: 110%;
    padding-bottom: 15px;
  }
  .services__inner-item .left {
    flex-basis: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .services__inner-item .left i {
    margin-left: -18px;
    font-size: 64px;
    line-height: 64px;
    color: #ff689b;
  }
  .services__inner-item .right {
    margin-left: 0px;
    padding: 1.5rem;
  }
  .services__inner-item .right span {
    font-weight: 700;
    font-size: 18px;
    padding-bottom: 20px;
  }

  .services__inner-item .right a {
    color: #0f394c;
    display: inline-block;

    padding: 19px 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
  }
  .services__inner-item .right a:hover {
    color: #48b5d7;
  }
  .services__inner-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .portfolio-nav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .p-nav {
    width: 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .p-item {
    margin: 13px 0 25px;
  }
  .p-nav li a {
    font-weight: 500;
    transition: all ease 0.2s;
  }
  .portfolio-content {
    max-width: 100%;
    padding: 0 80px;
    margin-bottom: 60px;
    display: grid;
    grid-template-columns: 1fr 20px 1fr 20px 1fr;
  }
  .portfolio-img {
    margin-bottom: 25px;
  }
  .portfolio-img img {
    max-width: 100%;
  }
  .slider {
    position: relative;
    top: 0;
    background-image: url("https://img.freepik.com/free-vector/white-technology-background_23-2148403783.jpg?t=st=1725045246~exp=1725048846~hmac=4beb112d67a89c5fb0dba97a35c10491c058cc142e8303b804a914f2a83aece6&w=1060");
    background-position: 50% 50%;
    background-size: cover;
    color: #444444;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .slider .slider__inner {
    background-position: 50% 50%;
    background-size: cover;
    color: #444444;
    line-height: 24px;
    padding: 80px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .slider__inner-top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .person-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 6px solid rgba(0, 0, 0, 0.3);
  }
  .person-img img {
    width: 100%;
    height: auto;
  }
  .slider .slider__inner h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0 5px 0;
    color: #fff;
  }
  .slider .slider__inner h4 {
    font-size: 14px;
    color: #ddd;
    margin: 0 0 15px 0;
  }
  .slider__inner .quote {
    max-width: 970px;
    display: flex;
  }
  .slider::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(11, 41, 55, 0.9);
  }
  .quote p {
    text-align: center;
    position: relative;
  }
  .kep1 {
    font-size: 26px;
    position: absolute;
    top: -10%;
    left: -20px;
  }
  .kep2 {
    position: absolute;
    font-size: 26px;
    top: 23px;
    right: 234px;
    transform: translateY(40%);
  }
  .quote p span {
    color: #fff;
    line-height: 24px;
  }
  .team {
    background: #f4fbfe;
    padding-bottom: 60px;
  }

  .team__content-item {
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 2px 15px rgb(0 0 0 / 10%);
    transition: all ease 0.3s;
  }
  .team__content img {
    max-width: 100%;
    display: block;
  }
  .team-i4 h3 {
    padding-top: 20px;
    padding-bottom: 5px;
    padding-left: 15px;
    color: #0f394c;
  }
  .team-i4 p {
    padding-top: 5px;
    padding-bottom: 20px;
    padding-left: 15px;
    opacity: 0.4;
  }
  .gallery {
    padding: 0 80px;
    margin-bottom: 60px;
  }

  .contact-content {
    padding: 30px 80px 0;
  }
  .contact-content-i4 {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 60px;
    gap: 20px;
  }
  .cc-i4-left .desc .icon-desc {
    background-color: #ebf7fc;
    border: none;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .cc-i4-left .desc:hover .icon-desc {
    color: #fff;
    background-color: #49b5e7;
    border: none;
  }
  .cc-i4-left .desc .title-desc .bottom {
    color: #2079a1;
  }
  .cc-i4-left .desc .title-desc a:hover {
    color: #0f394c;
  }
  .cc-i4-left .desc .icon-desc i {
    display: block;
    margin: 0 auto;
    font-size: 20px;
    transition: all ease 0.3s;
  }
  .cc-i4-left .desc:hover .icon-desc i {
    color: white;
    background-color: #49b5e7;
    border: none;
  }
  .cc-i4-left .title-desc a {
    font-size: 22px;
    font-weight: 700;
  }
  #form-send-mess {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 40px;
    width: 100%;
  }
  #form-send-mess .i4 {
    display: grid;
    grid-template-columns: 1fr 12px 1fr;
  }
  #form-send-mess .subject {
    display: grid;
    grid-template-columns: 1fr;
  }

  #form-send-mess .message {
    display: grid;
    grid-template-columns: 1fr;
  }
  #message {
    display: block;
    padding: 10px 12px;
    outline: none;
    line-height: 21px;
    border: rgba(206, 212, 218, 0.5) 1px solid;
    margin-bottom: 20px;

    font-size: 14px;
  }
  #form-send-mess .i4 input {
    line-height: 21px;
    font-size: 14px;
    padding: 6px 12px;
    line-height: 21px;
    border: rgba(206, 212, 218, 0.5) 1px solid;
    outline: none;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  #form-send-mess .subject input {
    font-size: 14px;
    line-height: 21px;
    padding: 6px 12px;
    border: rgba(206, 212, 218, 0.5) 1px solid;
    outline: none;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  #form-send-mess .message input {
    height: 108px;
    font-size: 14px;
    line-height: 21px;
    padding: 6px 12px;
    border: rgba(206, 212, 218, 0.5) 1px solid;
    outline: none;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  #submit-btn {
    background-color: #1da2e0;
    opacity: 0.8;
    border-radius: 4px;
    color: #fff;
    display: block;
    font-size: 16px;
    line-height: 24px;
    padding: 10px 24px;
    text-align: center;
    border: #fff 1px solid;
    align-items: start;
    margin: 0 auto;
    transition: all ease 0.2s;
  }
  #submit-btn:hover {
    opacity: 1;
  }
  .newsletter__inner {
    padding: 40px 0;
    background-color: #f0f9fd;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .newsletter__inner p {
    margin-top: 20px;
  }
  .newsletter__inner-search {
    margin-top: 30px;
    display: flex;
  }
  .newsletter__inner-input {
    height: 45px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .newsletter__inner-input input {
    border: none;
    padding: 4px 8px;
    width: calc(525px - 10px);
    height: 35px;
    margin: 5px 0 5px 10px;
    line-height: 22.5px;
    font-size: 15px;
  }
  .search-box {
    width: 110px;
    height: 45px;
    margin-left: -2px;
    color: white;
    background-color: #1da2e0;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
    transition: all ease 0.2s;
  }
  .search-box:hover {
    opacity: 1;
  }
  #footer {
    width: 100%;
  }
  .f1 h3 {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .f1 p {
    opacity: 0.8;
    margin-bottom: 10px;
  }

  .f2 ul li {
    margin: 20px 10px;
  }
  .f2 i {
    color: #66c2ec;
    font-size: 15px;
  }
  .footer__top {
    padding: 60px 20px 30px;
    display: flex;
    justify-content: space-around;
  }

  .our-social-networks ul li {
    margin: 15px 10px 0 0;
  }
  .copyright {
    background-color: #ebf7fc;
    height: 80px;
    padding: 0 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .copyright-left {
    display: flex;
    align-items: center;
  }
  .copyright-left i {
    width: 10px;
    height: 10px;
    font-weight: 200 !important;
    margin: -4px 10px 0;
  }
  .copyright .copyright-left > p {
    font-size: 15px;
  }
  .copyright .copyright-right > span {
    font-size: 15px;
  }
  .copyright .copyright-right > a {
    font-size: 15px;
  }

  .copyright-right a {
    color: #49b5e7;
  }
  .copyright-right a:hover {
    opacity: 0.6;
  }

  .show-team-icon {
    position: absolute;
    top: 260px;
    width: 100%;
    height: 40px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .show-team-icon .our-social-networks-icon {
    border-radius: 50%;
  }
  .team__content-item:hover .show-team-icon {
    display: flex;
  }

  html {
    scroll-behavior: smooth;
  }

  .input-hidden {
    outline: none;
  }

  .text-uppercase {
    text-transform: uppercase;
  }

  /*! MOBILE */
  @media only screen and (max-width: 739px) {
    .inner {
      margin: 0;
    }
    .col50 {
      width: inherit;
    }
    .header__inner {
      padding: 0 20px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-right {
      display: none;
    }
    .main__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: max-content;
      padding: 0 10px;
      margin-top: 160px;
    }
    .get__started-left {
      margin-top: 20px;
      order: 2;
    }

    .get__started-right {
      order: 1;
    }
    .c1 {
      text-align: center;
    }
    .get-st-box {
      margin: 20px 90px 80px;
    }

    .achieved__statistical {
      width: 100%;
      height: 56%;
      padding: 0 10px;
      display: grid;
      grid-template-columns: auto auto;
    }
    .achieved__top-title {
      padding: 0;
    }
    .achieved__bottom__inner {
      padding: 0;
    }
    .achieved__bottom__inner .list {
      width: 100%;
      height: 56%;
      padding: 0 10px;
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 100px 100px 100px 100px;
    }

    .achieved {
      width: 100%;
      height: max-content;
      display: flex;
      flex-direction: column;
    }
    .achieved__top {
      padding: 80px 10px;
    }
    .achieved__bottom {
      width: 100%;
    }
    .layout-top {
      width: 100%;
      padding: 60px 10px;
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .services__inner {
      width: 100%;
      height: max-content;
      padding: 0 10px 60px;
      background-color: #f4fbfe;
    }
    .portfolio-content {
      max-width: 100%;
      padding: 0 10px;
      margin-bottom: 60px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 0px 1fr 0px 1fr 1fr 0px 1fr 0px 1fr;
    }
    .quote {
      padding: 0 10px;
      position: relative;
    }
    .quote i {
      display: none;
    }

    .team__content-item {
      margin-bottom: 20px;
    }
    .gallery {
      padding: 0;
      margin-bottom: 60px;
    }

    .contact-content {
      overflow: hidden;
      padding: 30px 10px 0;
    }
    .contact-content iframe {
      max-width: 100%;
    }
    .contact-content-i4 {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 60px;
    }

    .title-desc {
      margin-left: 10px;
    }
    #form-send-mess .i4 {
      display: grid;
      grid-template-columns: 1fr;
    }
    .newsletter__inner {
      padding: 40px 10px;
      background-color: #f0f9fd;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .newsletter__inner-input {
      width: 100%;

      height: 45px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 0 rgb(0 0 0 / 20%);
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    .newsletter__inner-input input {
      width: 100%;
      max-width: 100%;
    }
    .newsletter__inner-search {
      width: 100%;
    }
    .newsletter__inner p {
      text-align: center;
    }
    .footer__top {
      padding: 60px 20px 0;
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }
    .copyright {
      display: flex;
      flex-direction: column;
      padding: 20px 10px;
      width: 100%;
    }
  }

  /*! Ipad */
  @media only screen and (max-width: 1023px) and (min-width: 740px) {
    body {
      padding: 0 10px;
    }
  }

  /*! PC */
  @media only screen and (min-width: 1024px) {
  }
</style>
