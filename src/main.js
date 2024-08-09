import { createApp } from "vue";
import { createI18n } from 'vue-i18n'
import Vant from 'vant';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n"
import 'vant/lib/index.css';

const app = createApp(App);
app.use(i18n).use(Vant);
app.use(store).use(router).mount("#app");
