<template>
  <div class="mowi-master-filters" style="padding-top: 20px;" > 
    <!--se renderizan los campos para la búsqueda -->
    <div v-for="(item, i) in filtersApply" :key="`A-${item.name}`" class="mowi-master-filter-content">
      <!-- <div  style="margin-top: 10px;" v-if="item.filterType == 'dateComponent' && item.selectField == true">
         <dateComponent :label="item.label" :isRequired="item.isRequired" :dateRange="item.dateRange"  :styles="item.styles" :mode="item.mode" v-model="item.vModel" :isVisible="item.isVisible" :selectDate="item.selectedDate" :ref="item.name" />      
      </div>
      <div  style="margin-top: 10px;" v-if="item.filterType == 'listComponent' && item.selectField == true"> <listComponent :label="item.label" :isRequired="item.isRequired" :multipleSelection="item.multipleSelection" :value="item.value" :content="item.content" :styles="item.styles" v-model="item.vModel" :isVisible="item.isVisible" :selectedValue="item.selectedValue" :ref="item.name" /> </div>
      <div  style="margin-top: 10px;" v-if="item.filterType == 'searchComponent' && item.selectField == true"> <searchComponent :label="item.label" :isRequired="item.isRequired" :value="item.value" :arrayData="item.arrayData" :displayNameKey="item.displayNameKey" v-model="item.vModel" :service="item.service" :callBackData="item.callBackData" :addNewValue="item.addNewValue" :ref="item.name" /> </div>
      <div  style="margin-top: 10px;" v-if="item.filterType == 'inputComponent' && item.selectField == true">
         <inputComponent :showOp="item.showOp"  :type="item.type" :isRequired="item.isRequired" :valueInput="item.valueInput"  :label="item.label" :validation="item.validation" :minimumCharacters="item.minimumCharacters" :nameInput="item.nameImput" :callbackData="item.callbackData"  :ref="item.name"
          :textArea="item.textArea" :styles="item.styles" 
          v-model="item.vModel" /> 
      </div>      -->
        
         <dateComponent v-if="item.filterType == 'dateComponent' && item.selectField == true" :label="item.label" :isRequired="item.isRequired"
         :dateRange="item.dateRange"  :styles="item.styles" :mode="item.mode" v-model="item.vModel" :isVisible="item.isVisible" 
         :selectDate="item.selectedDate" :ref="item.name" />              
        
         <listComponent v-if="item.filterType == 'listComponent' && item.selectField == true" :label="item.label" :isRequired="item.isRequired" 
         :multipleSelection="item.multipleSelection" :value="item.value" :content="item.content" :styles="item.styles" v-model="item.vModel" 
         :isVisible="item.isVisible" :selectedValue="item.selectedValue" :ref="item.name" /> 
         
         <searchComponent v-if="item.filterType == 'searchComponent' && item.selectField == true" :label="item.label" 
         :isRequired="item.isRequired" :value="item.value" :arrayData="item.arrayData" :displayNameKey="item.displayNameKey" v-model="item.vModel" 
         :service="item.service" :callBackData="item.callBackData" :addNewValue="item.addNewValue" :ref="item.name" /> 
     
         <inputComponent  v-if="item.filterType == 'inputComponent' && item.selectField == true" :showOp="item.showOp"  :type="item.type" 
         :isRequired="item.isRequired" :valueInput="item.valueInput"  :label="item.label" :validation="item.validation" 
         :minimumCharacters="item.minimumCharacters" :nameInput="item.nameImput" :callbackData="item.callbackData"  :ref="item.name"
         :textArea="item.textArea" :styles="item.styles" 
         v-model="item.vModel" /> 


    </div>
  </div>
</template>

<script>
import dateComponent from "./dateComponentContainer.vue";
import listComponent from "./listComponentContainer.vue";
import inputComponent from "./inputComponentContainer.vue";
import searchComponent from "./searchComponentContainer.vue";
import moment from "moment";
import _ from 'lodash';
const Value = ({ props }) => {
  //buton filter
  //return <div>{props.data}</div>;
};
export default {
  name: "masterAdministrator",
  components: {
    dateComponent,
    listComponent,
    inputComponent,
    searchComponent,
    Value,
  },
  props: ["filters","customActions"],
  created () {
  },
  computed:{
    filtersApply: function () {
      var newFilter =_.filter(this.filters, function(o) { return o.selectField; });
      return newFilter
    }
  },
  methods: {
    async setContentListComponent(data, nameRef){
       this.$refs[nameRef][0].updateContent(data);      
    },
    async clearValue( nameRef){
       console.log("name clear ", nameRef)
       this.$refs[nameRef][0].clearValue();  
    },
     
  }
}
</script>