import "babel-polyfill";
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import validateMount from './../../../utilities/validateMount';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
import VCalendar from 'v-calendar';

Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VCalendar);
Vue.use(VueGoogleMaps, {
    load:{
        key: 'AIzaSyC68nmXUGm6R5kmvtlpgEf-RZ1mEifbSPk',
        libraries: 'places',
      },
    installComponents: true,
  });

/*Imports*/

/*Map*/
import MapContainer from './../mapContainer.vue';
/*Noticias*/
import NewsManagementContainer from './../newsManagementContainer.vue';
/*Configuracion*/
import ConfigurationContainer from './../configurationContainer.vue';
/*Preguntas Frecuentes */
import FrequentQuestionsContainer from './../frequentQuestionsManagementContainer.vue';


/*Map*/
validateMount(MapContainer,'mapContainerMount')(Vue);
/*Noticias*/
validateMount(NewsManagementContainer,'newsManagementContainerMount')(Vue);
/*Configuración */
validateMount(ConfigurationContainer,'configurationContainerMount')(Vue);
/*Preguntas Frecuentes */
validateMount(FrequentQuestionsContainer,'frequentQuestionsContainerMount')(Vue);