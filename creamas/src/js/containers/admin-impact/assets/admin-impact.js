import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VeeValidate from 'vee-validate';
import VuePaginate from 'vue-paginate';
import VCalendar from 'v-calendar';

import EvaluarSolicitudInasistenciaContainer from './../evaluarSolicitudInasistencia.vue';
import DesktopManagementContainer from './../desktopManagementContainer.vue';
import EvaluarSolicitudConstanciaContainer from './../evaluarSolicitudConstancia.vue';
import workshopRoutesContainer from './../workshopRoutes.vue';
import AdministrarSalonContainer from './../administrarSalones.vue';
import ManagementLocalsContainer from './../managementLocals.vue';
import GestionarFirmasContainer from './../updateSignature.vue';

Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VCalendar);

validateMount(EvaluarSolicitudConstanciaContainer,'EvaluarSolicitudConstanciaContainerMount')(Vue);
validateMount(DesktopManagementContainer,'DesktopManagementContainerMount')(Vue);
validateMount(EvaluarSolicitudInasistenciaContainer,'EvaluarSolicitudInasistenciaContainerMount')(Vue);
validateMount(workshopRoutesContainer,'workshopRoutesContainerMount')(Vue);
validateMount(AdministrarSalonContainer,'AdministrarSalonContainerMount')(Vue);
validateMount(ManagementLocalsContainer,'ManagementLocalsContainerMount')(Vue);
validateMount(GestionarFirmasContainer,'GestionarFirmasContainerMount')(Vue);
import EvaluationContainer from './../pendienteEvaluacionReclutamiento.vue';
validateMount(EvaluationContainer,'EvaluationContainerMount')(Vue);
import FocusContainer from './../focalizadoReclutamiento.vue';
validateMount(FocusContainer,'FocusContainerMount')(Vue);
import TrainningContainer from './../charlaReclutamiento.vue';
validateMount(TrainningContainer,'TrainningContainerMount')(Vue);
import exportResultsByAttendanceContainer from './../exportResultsByAttendance.vue';
validateMount(exportResultsByAttendanceContainer,'exportResultsByAttendanceContainerMount')(Vue);
import inscritosPorFechaContainer from './../inscritosPorFecha.vue';
validateMount(inscritosPorFechaContainer,'inscritosPorFechaContainerMount')(Vue);
import retentionRateContainer from './../retentionRate.vue';
validateMount(retentionRateContainer,'retentionRateContainerMount')(Vue);
import reportRegisterVolunteersBySumateContainer from './../reportRegisterVolunteersBySumate.vue';
validateMount(reportRegisterVolunteersBySumateContainer,'reportRegisterVolunteersBySumateContainerMount')(Vue);
import reportRegisterVolunteersByEventsContainer from './../reportRegisterVolunteersByEvents.vue';
validateMount(reportRegisterVolunteersByEventsContainer,'reportRegisterVolunteersByEventsContainerMount')(Vue);
import CreandosCentroEstudiosContainer from './../creandosCentroEstudios.vue';
validateMount(CreandosCentroEstudiosContainer,'CreandosCentroEstudiosContainerMount')(Vue);

