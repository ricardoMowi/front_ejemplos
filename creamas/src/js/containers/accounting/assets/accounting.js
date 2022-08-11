import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VeeValidate from 'vee-validate';
import VuePaginate from 'vue-paginate';

import NuevaRendicionContableContainer from './../nuevaRendicionContable.vue';
import GestionarActividadesContainer from './../administrarActividades.vue';
import GestionarCentrosDeCostosContainer from './../administrarCentrosCostos.vue';
import GestionarPeriodosContablesContainer from './../administrarPeriodosContables.vue';
import GestionarCuentasContablesContainer from './../administrarCuentasContables.vue';
import GestionarRendicionContableContainer from './../administrarRendicionContable.vue';
import GestionarRubrosContainer from './../administrarRubros.vue';
import GestionarSubRubrosContainer from './../administrarSubRubros.vue';

Vue.use(VuePaginate);
Vue.use(VeeValidate);

validateMount(GestionarCentrosDeCostosContainer,'GestionarCentrosDeCostosContainerMount')(Vue);
validateMount(GestionarPeriodosContablesContainer,'GestionarPeriodosContablesContainerMount')(Vue);
validateMount(GestionarCuentasContablesContainer,'GestionarCuentasContablesContainerMount')(Vue);
validateMount(GestionarRendicionContableContainer,'GestionarRendicionContableContainerMount')(Vue);
validateMount(NuevaRendicionContableContainer,'NuevaRendicionContableContainerMount')(Vue);
validateMount(GestionarActividadesContainer,'GestionarActividadesContainerMount')(Vue);
validateMount(GestionarRubrosContainer,'GestionarRubrosContainerMount')(Vue);
validateMount(GestionarSubRubrosContainer,'GestionarSubRubrosContainerMount')(Vue);