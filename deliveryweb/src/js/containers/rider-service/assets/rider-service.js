import "babel-polyfill";
import Vue from 'vue';
import validateMount from './../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
import VCalendar from 'v-calendar';

Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VCalendar);

/*Rider*/
import RiderManagementContainer from './../riderManagementContainer.vue';
/*Recargas*/
import RechargeManagementContainer from './../rechargeManagementContainer.vue';
/*Mis recargas*/
import myCreditsManagementContainer from './../myCreditsManagementContainer.vue';

/*Rider*/
validateMount(RiderManagementContainer,'riderManagementContainerMount')(Vue);
/*Recargas*/
validateMount(RechargeManagementContainer,'rechargeManagementContainerMount')(Vue);
/*Mis créditos*/
validateMount(myCreditsManagementContainer,'myCreditsManagementContainerMount')(Vue);