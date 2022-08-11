import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';


Vue.use(VuePaginate);
Vue.use(VeeValidate);

import AsistenciaEventosContainer from './../asistenciaEventos.vue';
validateMount(AsistenciaEventosContainer,'AsistenciaEventosContainerMount')(Vue);
import AsistenciaContainer from './../asistenciaReclutamiento.vue';
validateMount(AsistenciaContainer,'AsistenciaContainerMount')(Vue);


