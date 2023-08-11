import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'
import Button from "primevue/button"
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import axios from 'axios';

import './assets/main.css'
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'ol/ol.css';

const app = createApp(App)

app.use(PrimeVue,axios)
app.component('Button', Button);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Menubar', Menubar);
app.component('InputText', InputText);

app.mount('#app');
