import Vue from 'vue';
//import MainContent from './main-content.vue';
import CompetitionsCategoriesPdf from './pdf/competitionsCategoriesPdf.vue';
//let MainComponent = Vue.extend(MainContent);

let CompetitionsCategoriesPdfComponent = Vue.extend(CompetitionsCategoriesPdf);

//new MainComponent().$mount("#mainContent");
new CompetitionsCategoriesPdfComponent().$mount("#competitionsCategoriesPdfComponentMount");
