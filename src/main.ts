import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
// @ts-ignore
import { Modal, modalPlugin } from '@kouts/vue-modal';
// @ts-ignore
import router from './router/index.js';

import '@kouts/vue-modal/dist/vue-modal.css';
import 'primevue/resources/themes/viva-dark/theme.css';
import 'animate.css';

const app = createApp(App)
app.use(modalPlugin)
app.component('Modal', Modal)
app.use(PrimeVue)
app.use(router);
app.mount('#app')