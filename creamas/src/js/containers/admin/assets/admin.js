import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VeeValidate from 'vee-validate';
import VuePaginate from 'vue-paginate';

import AdministrarCreandosContainer from './../administrarCreandos.vue';
import CreandoRXContainer from './../radiografiaCreando.vue';
import CreandoDetailContainer from './../detalleCreando.vue';
import GestionarOrganizacionesContainer from './../administrarOrganizaciones.vue';
import EvaluarSolicitudMejoraWebContainer from './../evaluarSolicitudMejoraWeb.vue';

Vue.use(VuePaginate);
Vue.use(VeeValidate);

validateMount(AdministrarCreandosContainer,'AdministrarCreandosContainerMount')(Vue);
validateMount(CreandoRXContainer,'CreandoRXContainerMount')(Vue);
validateMount(CreandoDetailContainer,'CreandoDetailContainerMount')(Vue);
validateMount(GestionarOrganizacionesContainer,'GestionarOrganizacionesContainerMount')(Vue);
validateMount(EvaluarSolicitudMejoraWebContainer,'EvaluarSolicitudMejoraWebContainerMount')(Vue);