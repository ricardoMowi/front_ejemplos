//import 'babel-polyfill';
//import Vue from 'vue';
// import masterTemplateContainer from './masterTemplateContainer.vue';
// //Vue.component('masterTemplate', masterTemplate)
// export default {
//     masterTemplateContainer,
//     version:1,
// }





import masterTemplateContainer from './masterTemplateContainer.vue';
module.exports = {
  install: function (Vue, options) {
	Vue.component('masterTemplateContainer', masterTemplateContainer);
  }
};