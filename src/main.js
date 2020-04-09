import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueApexChart from 'vue-apexcharts'
// import FusionChart from 'fusioncharts';
// import VueFusionChart from 'vue-fusioncharts'
// import Column2D from 'fusioncharts/fusioncharts.charts';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
// import FusionMaps from 'fusioncharts/fusioncharts.maps'
// import World from 'fusioncharts/maps/fusioncharts.world'
// import WorldWithCountries from 'fusioncharts/maps/fusioncharts.worldwithcountries'
import MapChart from 'vue-map-chart';
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false
const requireComponent = require.context(
  './components',
  false,
  /[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName =>{
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').split('-').join('');

  Vue.component(componentName, componentConfig.default || componentConfig);
})
Vue.component('apexchart',VueApexChart)
Vue.component('mapchart', MapChart);
// Vue.use(VueFusionChart, FusionChart, Column2D, FusionMaps, World, WorldWithCountries, FusionTheme)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.axios = axios;
Vue.prototype.url = 'https://api.covid19api.com/'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
