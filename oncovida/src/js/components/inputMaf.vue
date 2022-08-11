<template>

    <div class="row">

        <label :class="labelStyle" v-if="etiqueta=='true'"  >{{label}} </label> 
        <label :class="labelStyle" v-if="etiqueta=='false'"  >  </label> 

        <div :class="style">
            <!--TextArea-->
            <textarea v-if="textArea=='textArea'" :type="typeInput"
            v-model="valueInputData"
            v-on:input="returnData"
            v-on:change="onSubmit"
            v-validate="validation"
            :name="nameInput"
            class="form-control col-md-7 col-xs-12" spellcheck="false"  autocomplete="off"></textarea>
            <!--input-->
            <input v-else :type="typeInput"
            v-model="valueInputData"
            v-on:input="returnData"
            v-on:change="onSubmit"
            v-validate="validation"
            :name="nameInput"
            class="form-control col-md-7 col-xs-12" spellcheck="false"  autocomplete="off">
                <div v-if="validate" id="input" class="invalid-feedback">
                    {{errors.first(nameInput)}}
                </div>
        </div>

    </div>

</template>

<script>
    import _ from 'lodash';
    const Value = ({ props }) => {
        return <div>{props.data}</div>
    }

    export default {
        props: ['validate', 'classLabel','classInput', 'type','valueInput','etiqueta','label','validation','nameInput','callbackData','textArea'],

        components: {
          Value,
        },

        data: () => ({
            typeInput:'',
            valueInputData:'',
            tag:'',
            style: 'col-md-6 col-sm-6 col-xs-12',
            labelStyle: 'control-label col-md-3 col-sm-3 col-xs-12',
            validationValue: false,
            showValidation: false,
            dict:{
                custom: {
                    email:{
                        required: 'Campo obligatorio',
                        email: 'Ingrese un email válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    name:{
                        required: 'Campo obligatorio',
                        alpha: 'Ingrese un nombre válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    text:{
                        required: 'Campo obligatorio',
                        alpha_spaces: 'Ingrese un texto válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    number:{
                        required: 'Campo obligatorio',
                        numeric: 'Ingrese un número válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    celular:{
                        required: 'Campo obligatorio',
                        min: 'Ingrese un celular válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    password:{
                        required: 'Campo obligatorio',
                        min: 'Ingrese 6 caracteres como mínimo',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    phone:{
                        required: 'Campo obligatorio',
                        numeric: 'Ingrese un celular válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    address:{
                        required: 'Campo obligatorio',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                    document:{
                        required: 'Campo obligatorio',
                        digits: 'Ingrese un documento válido',
                        min: 'Ingrese un documento válido',
                        alpha_num: 'Ingrese un documento válido',
                        max:(name,condition)=>'Este campo debe tener ' + condition + ' caracteres como máximo.',
                    },
                }
            }
        }),
        watch: {
          valueInput(newValue){
            if(newValue){
            this.onSubmit();
                if (newValue!=null){
                    this.valueInputData = newValue;
                }
            }
          }
        },

        created () {
            // this.$validator.localize('es', this.dict);
            this.typeInput = this.type;
            this.classInput ? this.style = this.classInput : null;
            this.classLabel ? this.labelStyle = this.classLabel : null;
            this.validate ? this.showValidation = this.validate : null;
            this.dataInput(this.valueInput);
            this.onSubmit();
        },

        methods: {
            returnData(){
                this.$emit('input', this.valueInputData);
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
            dataInput(valueData){
                this.valueInputData = valueData;
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
                this.valueInputData = this.valueInput;
            },
            async clearValue(){
                this.valueInputData= ""
            }


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

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    label{
    text-align: right;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    label{
    text-align: right;
    }
}
</style>