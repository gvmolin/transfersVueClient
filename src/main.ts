import './assets/main.scss';
import 'element-plus/dist/index.css';

import { createApp, type Plugin } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';

import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);
const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
