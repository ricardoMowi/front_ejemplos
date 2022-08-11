import "babel-polyfill";
import Vue from 'vue';
import validateMount from './../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
// import VCalendar from 'v-calendar';

Vue.use(VuePaginate);
Vue.use(VeeValidate);
// Vue.use(VCalendar);

/*Cliente*/
import CustomerManagementContainer from './../customerManagementContainer.vue';

/*Servicio*/
import ServiceManagementContainer from './../serviceManagementContainer.vue';

/*Cliente*/
validateMount(CustomerManagementContainer,'customerManagementContainerMount')(Vue);
/*Servicio*/
validateMount(ServiceManagementContainer,'serviceManagementContainerMount')(Vue);