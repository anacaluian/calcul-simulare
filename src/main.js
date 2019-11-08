import Vue from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
Vue.use(VueToast);
Vue.prototype.$collect = require('collect.js');
Vue.config.productionTip = false;
import Vuetify, {
  VCard,
  VChip,
  VImg,
  VCardTitle,
  VBtn,
  VCardActions,
  VContainer,
  VCardText,
  VProgressCircular,
  VSpacer,
  VDialog,
  VDivider,
  VAlert,
  VRow,
  VCol,
  VSimpleTable,
  VCheckbox,
  VSelect,
  VApp,
} from 'vuetify/lib';


Vue.use(Vuetify, {
  components: {
      VCard,
      VChip,
      VImg,
      VCardTitle,
      VBtn,
      VCardActions,
      VContainer,
      VCardText,
      VProgressCircular,
      VSpacer,
      VDialog,
      VDivider,
      VAlert,
      VRow,
      VCol,
      VSimpleTable,
      VCheckbox,
      VSelect,
      VApp,
  },
})


const opts = {}


new Vue({
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');

export default new Vuetify(opts)