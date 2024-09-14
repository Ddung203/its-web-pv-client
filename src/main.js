import { createApp } from "vue";
import "./style.css";
import "animate.css";
import App from "./App.vue";
import router from "./routes";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-amber/theme.css";
import "primeicons/primeicons.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

//! Import PrimeVue Components
import AnimateOnScroll from "primevue/animateonscroll";
import ProgressBar from "primevue/progressbar";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Paginator from "primevue/paginator";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";
import Sidebar from "primevue/sidebar";
import Ripple from "primevue/ripple";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(ConfirmationService);

//! Register PrimeVue Components
app.directive("ripple", Ripple);
app.directive("animateonscroll", AnimateOnScroll);
app.component("ProgressBar", ProgressBar);
app.component("Paginator", Paginator);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("Toast", Toast);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("Textarea", Textarea);
app.component("Dropdown", Dropdown);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("Password", Password);
app.component("Sidebar", Sidebar);

app.mount("#app");
