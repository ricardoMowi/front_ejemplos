import 'babel-polyfill';
import Vue from 'vue';
import validateMount from './utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
import { BProgress } from 'bootstrap-vue';
Vue.component('b-progress', BProgress);
import { BProgressBar } from 'bootstrap-vue';
Vue.component('b-progress-bar', BProgressBar);
import VCalendar from 'v-calendar';
//import CoreuiVueCharts from '@coreui/vue-chartjs'
//Vue.use(CoreuiVueCharts)
Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VCalendar);

/*Imports*/
/*Pedidos*/
import SpecialistsManagementContainer from './containers/specialistsManagementContainer.vue';
import SpecialityManagementContainer from './containers/specialityManagementContainer.vue';
import HcpbsManagementContainer from './containers/hcpbsManagementContainer.vue';
import HCPBContainer from './containers/HCPBContainer.vue';
import NewHCPBContainer from './containers/newHCPBContainer.vue';
import profileContainer from './containers/profileContainer.vue';
import desktopContainer from './containers/desktopContainer.vue';
import pregnantContainer from './containers/pregnantsManagementContainer.vue';
import prenatalControlContainer from './containers/prenatalControlContainer.vue';
import emergencyContainer from './containers/medicalPerinatalEmergencyContainer.vue';
import registerUserContainer from './containers/registerUserContainer.vue';



/*ValidateMount*/
/*Pedidos*/
validateMount(SpecialistsManagementContainer,'specialistsManagementContainerMount')(Vue);
validateMount(HcpbsManagementContainer,'hcpbsManagementContainerMount')(Vue);
validateMount(HCPBContainer,'hcpbContainerMount')(Vue);
validateMount(NewHCPBContainer,'newHcpbContainerMount')(Vue);
validateMount(profileContainer,'profileContainerMount')(Vue);
validateMount(desktopContainer,'desktopContainerMount')(Vue);
validateMount(pregnantContainer,'pregnantsContainerMount')(Vue);
validateMount(SpecialityManagementContainer,'specialityManagementContainerMount')(Vue);
validateMount(prenatalControlContainer,'prenatalControlContainerMount')(Vue);
validateMount(emergencyContainer,'emergencyContainerMount')(Vue);
validateMount(registerUserContainer,'registerContainerMount')(Vue);
