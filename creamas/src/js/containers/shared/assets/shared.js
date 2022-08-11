import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VeeValidate from 'vee-validate';
import VuePaginate from 'vue-paginate';

import irEscritorio from './../irEscritorio.vue';
import CancioneroCreaContainer from './../cancioneroCrea.vue';
import LideresCreaContainer from './../lideresCrea.vue';
import ColegiosNivelNacionalContainer from './../colegiosNivelNacional.vue';
import CumpleaniosContainer from './../cumpleanios.vue';
import RecursosDigitalesContainer from './../recursosDigitales.vue';
import creandoProfileContainer from './../creandoProfile.vue';
import DesktopContainer from './../desktopContainer.vue';
import SolicitudMejorasWebContainer from './../solicitudMejorasWeb.vue';

Vue.use(VuePaginate);
Vue.use(VeeValidate);

validateMount(irEscritorio,'goDesktopContainerMount')(Vue);
validateMount(CancioneroCreaContainer,'CancioneroCreaContainerMount')(Vue);
validateMount(LideresCreaContainer,'LideresCreaContainerMount')(Vue);
validateMount(ColegiosNivelNacionalContainer,'ColegiosNivelNacionalContainerMount')(Vue);
validateMount(CumpleaniosContainer,'CumpleaniosContainerMount')(Vue);
validateMount(RecursosDigitalesContainer,'RecursosDigitalesContainerMount')(Vue);
validateMount(SolicitudMejorasWebContainer,'SolicitudMejorasWebContainerMount')(Vue);
validateMount(DesktopContainer,'DesktopContainerMount')(Vue);
validateMount(creandoProfileContainer,'creandoProfileContainerMount')(Vue);