import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
import { BProgress } from 'bootstrap-vue';
import VCalendar from 'v-calendar';
import { BProgressBar } from 'bootstrap-vue';
Vue.component('b-progress', BProgress);
Vue.component('b-progress-bar', BProgressBar);


Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VCalendar);

import ComponentsContainer from '../componentsContainer.vue';
import PagesContainer from '../pagesContainer.vue';
import RolesContainer from '../rolesContainer.vue';

validateMount(ComponentsContainer,'componentsContainerMount')(Vue);
validateMount(PagesContainer,'pagesContainerMount')(Vue);
validateMount(RolesContainer,'rolesContainerMount')(Vue);