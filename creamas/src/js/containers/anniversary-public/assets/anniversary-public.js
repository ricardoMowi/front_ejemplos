import Vue from 'vue';
import validateMount from '../../../utilities/validateMount';
import VeeValidate from 'vee-validate';

import RegisterSpecialEventContainer from '../registerSpecialEvent.vue';
import RegisterAlumniContainer from '../registerAlumni.vue';
import ScopeRegistrationContainer from '../scopeRegistration.vue';

Vue.use(VeeValidate);

validateMount(RegisterSpecialEventContainer,'RegisterSpecialEventContainerMount')(Vue);
validateMount(RegisterAlumniContainer,'RegisterAlumnisContainerMount')(Vue);
validateMount(ScopeRegistrationContainer,'ScopeRegistrationContainerMount')(Vue);

