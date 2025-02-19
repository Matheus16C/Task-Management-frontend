import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Toast, { POSITION, type PluginOptions } from 'vue-toastification';
import "vue-toastification/dist/index.css"; 
import { useAuthStore } from './store/auth';

const pinia = createPinia();
const app = createApp(App);

const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: "Vue-Toastification__bounce",
};

app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);

// 🔹 Certifique-se de carregar o token ao iniciar
const authStore = useAuthStore();
authStore.token = localStorage.getItem('token') || '';

app.mount('#app');
