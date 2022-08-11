<template>
<div class="row">
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="card">
      <div class="card-header">
      <h4
      style="
          padding-top: 10px;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 5px;
      "
      >Regístrate para formar parte del equipo de especialistas</h4>
      
        <div class="clearfix"></div>
      </div>


              <div class="card" style=" margin-top: 30px;">

                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombres:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.name" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido Paterno:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.lastName" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido Materno:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.surName" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.documentNumber" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5"   v-model="form.birthdate"  ></Datetime>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Distrito de vivienda:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.idDistrict" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección domiciliaria:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.address" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Correo electrónico:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.email" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirmar Correo electrónico:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="confirmEmail" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12"> Contraseña:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.password" type="password" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Confirmar contraseña:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="confirmPassword" type="password" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Teléfono/celular:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.phone" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Número de colegiatura:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form.colegiatureNumber" type="text" class="form-control col-md-12 col-xs-12" >
                    </div>
                </div>
                <div class="form-group row">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Especialidades:</label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <treeselect v-model="form.specialtiesArray"
                      :disable-branch-nodes="true"
                      :value-consists-of="valueConsistsOf"
                      :multiple="true"
                      :options="specialties" />
                  </div>
                </div>
              </div>

      <div class="modal-footer">
          <button type="button" @click="register()" class="btn btn-primary"> Registrar </button>
      </div>

    </div>
  </div>

  <!--Modal not-->
  <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-cat">
      <div class="modal-content">
        <div class="modal-header">

            <h3 class="modal-title" > <center> {{formNot.title}}  </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>

        </div>
        <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.message}} </center> </h4></div>
            <div class="modal-footer">
              <center>
                      <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
              </center>
            </div>
      </div>
    </div>
  </div>
<!--Modal not-->

</div>
</template>
<script>
import consultServices from './../utilities/consultServices.js';
import LoadingComponent from "./../components/loadingComponent.vue";
import inputMaf from "./../components/inputMaf.vue";
import Treeselect, { ASYNC_SEARCH } from '@riophae/vue-treeselect';
import _ from 'lodash';
import moment from 'moment';
import {
  Datetime
} from 'vue-datetime';
export default {
  name: "RegisterContainer",
  components: {
    LoadingComponent,
    Datetime,
    inputMaf,
    Treeselect,
  },
  data: () => ({
    isLoading: false,
    message: {
      titulo: 'Registro de riders',
      message: 'Mensaje',

    },
    //
    valueConsistsOf: 'LEAF_PRIORITY',
    showOnlyMessage: false,
    formRegister: {},
    confirmPassword:'',
    confirmEmail : '',
    //notificaciones
    formNot:{title:'',message:'',},
    form:{},
    specialties:[],
  }),
  async created() {
    console.log('entró a register')
    this.arrayForTree();
  },

  async mounted() {

  },

  methods: {


    async setStep() {

    },
    async arrayForTree(){
      const response =  await consultServices('listSpecialties','POST',{})
      var optionsTree = []

      for (var j = 0; j <response.length; j++) {
        var obj={}
        obj.id = response[j]._id
        // obj.code = search[j].Code
        // obj.name = search[j].Name
        // obj.lastName = search[j].LastName
        obj.label = response[j].name
        optionsTree.push(obj)
      }

      this.specialties = _.cloneDeep(optionsTree)
    },

    async showNotification(){
      $('.bs-example-modal-not').modal('show');
    },    
    /**
     * register() : usada en el paso 1 , utiliza la función para registrar o actualizar los datos personales de un rider 
     * y se actualiza el estado de los pasos
     */
    async register(){
      this.isLoading =false
      if(
        this.form.name != '' && this.form.name != null &&
        this.form.lastName != '' && this.form.lastName != null &&
        this.form.surName != '' && this.form.surName != null &&
        this.form.documentNumber != '' && this.form.documentNumber != null &&
        this.form.birthdate != '' && this.form.birthdate != null &&
        this.form.idDistrict != '' && this.form.idDistrict != null &&
        this.form.address != '' && this.form.address != null &&
        this.form.colegiatureNumber != '' && this.form.colegiatureNumber != null &&
        this.form.phone != '' && this.form.phone != null && 
        this.form.email != '' && this.form.email != null 
      ){
        if(this.form.specialtiesArray.length == 0){
              this.formNot.title="Campos incompletos"
              this.formNot.message = "Por favor selecciones al menos una especialidad para registrar un especialista";
        }
        else{
          
         var form={}
         form.documentNumber = this.form.documentNumber 
         form.phone = this.form.phone 
         form.email = this.form.email 

         const userValidate = true // await consultServices('validateUser','POST',form);         

         if(userValidate == true){//!userValidate.message){
           //Validar correos y contraseñas
           if(this.confirmPassword == this.form.password && this.confirmEmail == this.form.email){
             //Registrar
               const userUpdated = await consultServices('registerUser','POST',this.form);
                if(userUpdated.message ){
                  this.formNot.title = "Error en operación";
                  this.formNot.message = "No se pudo completar el registro";  
                }else{
                  this.formNot.title="Operación exitosa";
                  this.formNot.message = 'Nuevo especialista registrado con éxito';  
                  this.clearForm()
                }              
           }else{
            this.formNot.title="No se puede completar el registro";
            this.formNot.message="Los correos o contraseñas ingresadas no coinciden";                           
           }
         }else{
          this.formNot.title="No se pudo completar el registro";
          this.formNot.message=userValidate.message; 
         }
        }
       }else{
        this.formNot.title = "Campos incompletos";
        this.formNot.message = "Complete todos los campos para registrar un nuevo especialista";          
       }
       this.showNotification()  
       this.isLoading = false     
    },

    async clearForm(){
      this.form = {}
      this.confirmPassword = ""
      this.confirmEmail = ""
    }

 
  }
}
</script>
