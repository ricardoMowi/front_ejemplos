import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';


Vue.use(VuePaginate);
Vue.use(VeeValidate);


import CalendarContainer from './../calendarioGDC.vue';
validateMount(CalendarContainer,'CalendarContainerMount')(Vue);
import AsignacionCreandos from './../asignacionCreandos.vue';
validateMount(AsignacionCreandos,'AsignacionCreandosContainerMount')(Vue);
import indicadoresGDCContainer from './../indicadoresGDC.vue';
validateMount(indicadoresGDCContainer,'indicadoresGDCContainerMount')(Vue);
import indicadoresGDCAdminContainer from './../indicadoresGDCAdmin.vue';
validateMount(indicadoresGDCAdminContainer,'indicadoresGDCAdminContainerMount')(Vue);
import reportsXLSContainer from './../reportsXLS.vue';
validateMount(reportsXLSContainer,'reportsXLSContainerMount')(Vue);
import UploadDiverimateMaterialContainer from './../UploadDiverimateMaterial.vue';
validateMount(UploadDiverimateMaterialContainer,'UploadDiverimateMaterialContainerMount')(Vue);
import studentsEnrollmentsReportContainer from './../studentsEnrollmentsReport.vue';
validateMount(studentsEnrollmentsReportContainer,'studentsEnrollmentsReportContainerMount')(Vue);
import masterProjectsContainer from './../masterProjects.vue';
validateMount(masterProjectsContainer,'masterProjectsContainerMount')(Vue);