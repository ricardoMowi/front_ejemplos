<template>
    <div :class="_styles.formGroup" class="mowi-master-item-search">
        <!--Etiqueta-->
        <label :class="_styles.label">{{_label}}</label>
        <!--Lista de Operadores-->
        <div v-if="_showOp == true" class="col-lg-4 col-md-6 col-12">
            <select class="form-control" v-model="opSelected">
                <option v-for="(op,index) in _operators" :key="index" v-on:input="returnDataOperator"
                :value="op.value">{{op.label}}</option>
            </select>
        </div>
        <!--Caja de texto, si se mostrarán operadores-->
        <div  v-if="_showOp == true" :class="_styles.container">
            <!--TextArea-->
            <textarea v-if="_textArea==true" :type="typeInput"
            v-model="variable"
            v-on:input="returnData"
            v-validate="$data._minimumCharacters"
            :name="_nameInput"
            class="form-control col-md-12 col-xs-12" spellcheck="false"  autocomplete="off"></textarea>

            <!--input obligatorio-->
            <input  v-if="_textArea==false && this.isRequired == true > 0" :type="_typeInput"
            v-model="variable"
            v-on:input="returnData"
            v-validate="'required|min:'+numberX"
            v-on:change="onSubmit"
            :name="_nameInput"
            class="form-control col-md-12 col-xs-12" spellcheck="false"  autocomplete="off">

            <!--input no obligatorio -->
            <input  v-if="_textArea==false && this.isRequired == false" :type="_typeInput"
            v-model="variable"
            v-on:input="returnData"
            v-on:change="onSubmit"
            :name="_nameInput"
            v-validate="'min:'+numberX"
            class="form-control col-md-12 col-xs-12" spellcheck="false"  autocomplete="off">


            <div id="input" class="invalid-feedback">
                {{errors.first(_nameInput)}}
            </div>
        </div>  
        <!--Caja de texto, si no se mostrarán operadores-->
        <div  v-if="_showOp == false"  class="col-md-8 col-sm-8 col-xs-12">
            <!--TextArea-->
            <textarea v-if="_textArea==true" :type="typeInput"
            v-model="variable"
            v-on:input="returnData"
            v-validate="$data._minimumCharacters"
            :name="_nameInput"
            class="form-control col-md-12 col-xs-12" spellcheck="false"  autocomplete="off"></textarea>

            <!--input obligatorio-->
            <input  v-if="_textArea==false && this.isRequired == true > 0" :type="_typeInput"
            v-model="variable"
            v-on:input="returnData"
            v-validate="'required|min:'+numberX"
            v-on:change="onSubmit"
            :name="_nameInput"
            class="form-control col-md-12 col-xs-12" spellcheck="false"  autocomplete="off">

            <!--input no obligatorio-->
            <input  v-if="_textArea==false && this.isRequired == false" :type="_typeInput"
            v-model="variable"
            v-on:input="returnData"
            v-on:change="onSubmit"
            :name="_nameInput"
            v-validate="'min:'+numberX"
            class="form-control col-md-12 col-xs-12" spellcheck="false"  autocomplete="off">

            <div id="input" class="invalid-feedback" >
                {{errors.first(_nameInput)}}
            </div>
        </div> 
    </div>  
</template>

<script>
import Vue from 'vue'
import _ from 'lodash';
import es from 'vee-validate/dist/locale/es'
// Importa VeeValidate y el Validator
import VeeValidate, { Validator } from "vee-validate";
Vue.use(VeeValidate);
// Indicar uso de idioma español
Validator.localize("es", es);


    const Value = ({ props }) => {
        return <div>{props.data}</div>
    }

    export default {
        name: "inputComponent",
        props: ['type','valueInput','label','validation','nameInput','callbackData','textArea','styles','operador','isRequired','showOp','minimumCharacters'],
        
        components: {
          Value,
        },

        data: () => ({

         
          //acá se definen todos los atributos customizables del componente en este objeto default
          default:{            
            type:"",
            valueInput: "default",
            label: "",
            validation:{},            
            nameInput:"",
            callbackData:"",
            textArea:false,
            isRequired:false,
            showOp: true,
            styles:{ formGroup:'form-group col-md-6 ', label:'control-label col-md-4 col-sm-3 col-xs-12', container:'col-md-4 col-sm-6 col-xs-12'},       
            styles:{ formGroup:'form-group col-md-6 col-sm-12 col-xs-12', label:'control-label col-md-4 col-sm-4 col-xs-12', container:'col-md-4 col-sm-8 col-xs-12'},  
          },
         
          //variables declaradas para el funcionamiento del componente
          _operators:[],
          opSelected:'',
          variable:'',  
          tag:'',
          style: 'col-md-6 col-sm-6 col-xs-12',
          validationValue:false,


          //acá se definen todos los atributos usados en el html
           
            _type:"",
            _valueInput: "",
            _label: "",
            _validation:{},
            _nameInput:"",
            _callbackData:"",
            _textArea:false,          
            _styles:{},            
            _isVisible:true,
            _typeInput:'',
            _isRequired:'',
            _showOp:'',
            numberX: 3,
        }),


        watch: {
          valueInput(newValue){
            if(newValue){
                this.onSubmit();
                if (newValue!=null){
                    this.variable = newValue;
                }
            }
          }
        },

        created () {
            

          this.label? this._label = this.label : this._label = this.default.label
          this.type? this._type = this.type : this._type = this.default.type
          this.styles? this._styles = this.styles : this._styles = this.default.styles
          this.vModel? this._vModel = this.vModel : this._vModel = this.default.vModel
          this.textArea? this._textArea = this.textArea : this._textArea = this.default.textArea
          this.isVisible? this._isVisible = this.isVisible : this._isVisible = this.default.isVisible
          this.valueInput? this._valueInput = this.valueInput : this._valueInput = this.default.valueInput
          this.callbackData? this._callbackData = this.callbackData : this._callbackData = this.default.callbackData
          this.minimumCharacters? this.numberX = this.minimumCharacters : null
          this._nameInput = this.label 
          this.isRequired? this._isRequired = this.isRequired : this._isRequired = this.default.isRequired
          if(this.label){
              if(this._isRequired == true){
                  this._label = this.label + "*:"
              }
              else{
                  this._label = this.label + ":"
              }
          }
          this.validation? this._validation = this.validation : this._validation = this.default.validation
          this.showOp != null? this._showOp = this.showOp : this._showOp = this.default.showOp  
          //operadores
          if(this._type == 'numeric'){
            this._operators = [
                {label:'Igual a',value:'='},
                {label:'Mayor que', value:'>'},
                {label:'Menor que', value:'<'}, 
                {label:'Mayor igual', value:'>='}, 
                {label:'Menor igual',value:'<=' }]
            this.opSelected = '='
          }else{
            this._operators=[
                {label:'Contiene',value:'include'},
                {label:'Es igual a', value:'equals'},
                {label:'Empieza con', value:'%like'}, 
                {label:'Termina con', value:'like%'}, 
                {label:'Vacío',value:'null' }]
            this.opSelected = 'include'
          }

         
          //this.$validator.localize('es', this.dict);
          this._typeInput = this._type;
          this.dataInput(this.valueInput);
         
        },

        methods: {
            returnData(){
                var data={}
                data.operator=this.opSelected
                data.variable=this.variable
                this.$emit('input', data);
                if(data.variable == "" && this.isRequired == false){
                    this.clearValue()
                }
                console.log('seleccionado 1 ', data)
            },
            returnDataOperator(){
                console.log('seleccionado  ', this.opSelected)
            },

            dataInput(valueData){
                this.variable = valueData;
            },
            returnValidation(){
              return this.validationValue;
            },
            async returnValidationAsync(){
               await this.$validator.validate().then(valid => {
                if (!valid) {
                    this.validationValue = false;
                }
                else {
                    this.validationValue = true;
                }
                });
              return this.validationValue;
            },
            refreshValue(){
                this.variable = this.valueInput;
            },
            onSubmit () {
                this.$validator.validate().then(valid => {
                if (!valid) {
                    this.validationValue = false;
                }
                else {
                    this.validationValue = true;
                }
                });
            },
            async clearValue(){
                this.variable = undefined             
                this.errors.clear();
                this.$emit('input', undefined);
            },  

        },

        computed:{
        }

    }
</script>



<style>
.invalid-feedback {
    display: block;
}

input.form-control {
    display: block;
    width: 100%;
    min-width: 100%;
    }

textarea.form-control {
    display: block;
    width: 100%;
    min-width: 100%;
    }

small.form-text.text-muted{
    color: #ec0000 !important;
    }


</style>