import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.css';
import VueResource from 'vue-resource';
import VueGapi from 'vue-gapi'
Vue.use(VueResource);

Vue.use(VueGapi, {
  apiKey: 'AIzaSyCT-hHy-K5jtUj3Ut-padF1w5QhunjdPWk',
  clientId: '224391035784-ec1noq292glf3nuanaifdi60jit4qfil.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
});

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
}).$mount('#app')
