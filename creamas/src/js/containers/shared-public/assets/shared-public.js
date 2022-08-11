import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';

import accessDeneidContainer from './../accesoDenegado.vue';
import RegisterVolunteerContainer from './../registerVolunteerContainer.vue';
import FormRegisterForProjectContainer from './../formRegisterForProjectContainer.vue';
import RegisterCertificateContainer from './../registerCertificateContainer.vue';
import FormGeneralCertificateContainer from './../FormGeneralCertificateContainer.vue';
import FormRecoverPasswordContainer from './../formRecoverPasswordContainer.vue';

Vue.use(VeeValidate);
Vue.use(VuePaginate);

validateMount(accessDeneidContainer,'accessDeniedContainerMount')(Vue);
validateMount(RegisterVolunteerContainer,'RegisterVolunteerContainerMount')(Vue);
validateMount(FormRegisterForProjectContainer,'FormRegisterForProjectContainerMount')(Vue);
validateMount(RegisterCertificateContainer,'RegisterCertificateContainerMount')(Vue);
validateMount(FormGeneralCertificateContainer,'FormGeneralCertificateMount')(Vue);
validateMount(FormRecoverPasswordContainer,'FormRecoverPasswordContainerMount')(Vue);

import WorkshopsHistoryContainer from '../workshopsHistory.vue';
validateMount(WorkshopsHistoryContainer,'WorkshopsHistoryContainerMount')(Vue);