import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';


Vue.use(VuePaginate);
Vue.use(VeeValidate);

import MatriculaEstudiantes from './../matriculaEstudiantes.vue';
validateMount(MatriculaEstudiantes,'MatriculaEstudiantesContainerMount')(Vue);


