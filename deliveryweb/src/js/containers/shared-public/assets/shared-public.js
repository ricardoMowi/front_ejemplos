import "babel-polyfill";
import Vue from 'vue';
import validateMount from './../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
import VCalendar from 'v-calendar';

Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VCalendar);

/*Admisión*/
import desktopContainer from './../desktopContainer.vue';
import SuggestionsManagementContainer from './../suggestionsManagementContainer.vue';
import TrackingManagementContainer from './../trackingManagementContainer.vue';
import accessDeneidContainer from './../accesoDenegado.vue';
import registerUserContainer from './../registerUserContainer.vue';
import confirmEmailContainer from './../confirmEmailContainer.vue';

/*Admisión*/
validateMount(confirmEmailContainer,'confirmEmailContainerMount')(Vue);
validateMount(registerUserContainer,'registerUserContainerMount')(Vue);
validateMount(accessDeneidContainer,'accessDeniedContainerMount')(Vue);
validateMount(desktopContainer,'desktopContainerMount')(Vue);
validateMount(SuggestionsManagementContainer,'suggestionsManagementContainerMount')(Vue);
validateMount(TrackingManagementContainer,'trackingManagementContainerMount')(Vue);
