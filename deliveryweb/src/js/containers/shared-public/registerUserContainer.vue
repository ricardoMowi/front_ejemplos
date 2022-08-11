<template>
<div class="row">
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="card">
      <div class="card-header">
      <h4>Regístrate para ser parte del proceso de selección</h4>
      <h5>(*) Campos requeridos</h5>
        <div class="clearfix"></div>
      </div>
      <div class="card">
          <div class="card-body">
            <div class="row">
                <inputMaf type='text' v-model="formRegister.name" :valueInput="formRegister.name" label="Nombres: *" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="name" etiqueta='true' ref="inputName">
                </inputMaf>                
            </div>
          </div>  
          <div class="card-body">
            <div class="row">
                <inputMaf type='text' v-model="formRegister.lastName" :valueInput="formRegister.lastName" label="Apellido: *" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="lastName" etiqueta='true' ref="inputLastName">
                </inputMaf>              
            </div>
          </div> 
          <div class="card-body">
            <div class="row">
                <inputMaf type='text' v-model="formRegister.secondLastName" :valueInput="formRegister.secondLastName" label="Segundo Apellido: *" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="secondLastName" etiqueta='true' ref="inputSecondLastName">
                </inputMaf>               
            </div>
          </div> 
          <div class="card-body">
            <div class="row">
                <inputMaf type='text' v-model="formRegister.documentNumber"  :valueInput="formRegister.documentNumber" label="DNI o carnet de extranjería: *" :validation="{required:true}" nameInput="documentNumber" etiqueta='true' ref="inputDocumentNumber">
                </inputMaf>             
            </div>
          </div>  
          <div class="card-body">
            <div class="row">
                <inputMaf type='text' v-model="formRegister.ruc" :valueInput="formRegister.ruc" label="RUC:" :validation="{required:true, numeric:true, max:20}" nameInput="ruc" etiqueta='true' ref="inputRuc">
                </inputMaf>            
            </div>
          </div> 
          <div class="card-body">
              <div class="row">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12" style="padding-left: 0px;">Fecha de nacimiento: </label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                        <Datetime  v-model="formRegister.birthdate" format="yyyy/MM/dd" value-zone="UTC-5"  type="date"  ></Datetime>
                  </div>
              </div>
          </div>

          <div class="card-body">
            <div class="row">
                  <inputMaf type='text' v-model="formRegister.secondPhone" :valueInput="formRegister.secondPhone" label="Teléfono fijo:" :validation="{required:true, numeric:true, max:50}" nameInput="homePhone" etiqueta='true' ref="inputHomePhone">
                  </inputMaf>        
            </div>
          </div> 
          <div class="card-body">
            <div class="row">
                  <inputMaf type='text' v-model="formRegister.phone" :valueInput="formRegister.phone" label="Celular: *" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone">
                  </inputMaf>      
            </div>
          </div>                                           
          <div class="card-body">
            <div class="row">
                  <inputMaf type='text' v-model="formRegister.address" :valueInput="formRegister.address" label="Domicilio:" :validation="{required:true, max:250}" nameInput="address" etiqueta='true' ref="inputAddress">
                  </inputMaf>  
            </div>
          </div> 
          <div class="card-body">
            <div class="row">
                  <inputMaf type='text' v-model="formRegister.email" :valueInput="formRegister.email" label="Correo: *" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail">
                  </inputMaf>
            </div>
          </div> 
          <div class="card-body">
            <div class="row">
                  <inputMaf type='text' v-model="confirmEmail" :valueInput="confirmEmail" label="Confirme su correo: *" :validation="{required:false}" nameInput="email" etiqueta='true' ref="inputConfirmEmail">
                  </inputMaf>
            </div>
          </div> 
          <!--Contraseña-->
          <div class="card-body" >
              <div class="row">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12" style="padding-left: 0px;">Contraseña: (*)</label>
                  <div class="col-md-7 col-sm-6 col-xs-12">
                      <input type="password" autocomplete="off" v-model="formRegister.password" required="required" class="form-control col-md-12 col-xs-12"   >
                  </div>
              </div>
          </div>
          <div class="card-body" >
              <div class="row">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12" style="padding-left: 0px;">Confirma la contraseña: (*)</label>
                  <div class="col-md-7 col-sm-6 col-xs-12">
                      <input  type="password"  v-model="confirmPassword" required="required" class="form-control col-md-12 col-xs-12"  autocomplete="off" ref="inputConfirmPassword">
                  </div>
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
import consultServices from './../../utilities/consultServices.js';
import LoadingComponent from "./../../components/loadingComponent.vue";
import inputMaf from "./../../components/inputMaf.vue";
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
  },
  data: () => ({
    isLoading: false,
    message: {
      titulo: 'Registro de riders',
      message: 'Mensaje',

    },
    //
    showOnlyMessage: false,
    formRegister: {},
    confirmPassword:'',
    confirmEmail : '',
    //notificaciones
    formNot:{title:'',message:'',},
  }),
  async created() {
  },

  async mounted() {

  },

  methods: {


    async setStep() {

    },
    

    async showNotificacion(){
      $('.bs-example-modal-not').modal('show');
    },    
    /**
     * register() : usada en el paso 1 , utiliza la función para registrar o actualizar los datos personales de un rider 
     * y se actualiza el estado de los pasos
     */
    async register(){
      this.isLoading =true
      //  console.log("registera", this.formRegister)
       
       this.formRegister.source  = "FORM_RIDER"
       //Validar campos incompletos
       var name = this.formRegister.name?  name =  this.formRegister.name : name = null
       var lastName = this.formRegister.lastName?  lastName =  this.formRegister.lastName : lastName = null
       var secondLastName = this.formRegister.secondLastName?  name =  this.formRegister.secondLastName : secondLastName = null
       var email = this.formRegister.email?  email =  this.formRegister.email : email = null
       var documentNumber = this.formRegister.documentNumber?  documentNumber =  this.formRegister.documentNumber : documentNumber = null
       var phone = this.formRegister.phone?  phone =  this.formRegister.phone : phone = null
       var password = this.formRegister.password?  password =  this.formRegister.phone : phone = null
     

       if(name == null || name == "" || lastName == null || lastName == "" ||  secondLastName == null || secondLastName == "" || 
       email == null || email == "" || document == null || documentNumber == "" || phone == null || phone == "" || 
       this.confirmEmail ==  "" || password == null || password == ""|| this.confirmPassword ==  "" ){
          this.formNot.title="Campos Obligatorios incompletos";
          this.formNot.message="Complete todos los campos obligatorios";  
       }else{
         //Validar campos únicos: Documento de identidad, correo y celular
         var form={}
         form.documentNumber = documentNumber
         form.phone = phone
         form.email = email

         const userValidate = await consultServices('validateUser','POST',form);
         
        //  console.log('userValidate VUE: ', userValidate)
         if(!userValidate.message){
           //Validar correos y contraseñas
           if(this.confirmPassword == this.formRegister.password && this.confirmEmail == this.formRegister.email){
             //Registrar
               const userUpdated = await consultServices('registerUser','POST',this.formRegister);
                if(userUpdated.message ){
                  this.formNot.title = "Error en operación";
                  this.formNot.message = "No se pudo completar el registro";  
                }else{
                  this.formNot.title="Operación exitosa";
                  this.formNot.message = userUpdated.message;  
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
       this.showNotificacion()  
       this.isLoading = false     
    },

    async clearForm(){
      this.formRegister = {}
      this.confirmPassword = ""
      this.confirmEmail = ""
      await this.$refs.inputName.clearValue();
      await this.$refs.inputDocumentNumber.clearValue()
      await this.$refs.inputLastName.clearValue()
      await this.$refs.inputSecondLastName.clearValue()
      await this.$refs.inputEmail.clearValue()
      await this.$refs.inputAddress.clearValue()
      await this.$refs.inputRuc.clearValue()
      await this.$refs.inputPhone.clearValue()
      await this.$refs.inputHomePhone.clearValue()
      await this.$refs.inputConfirmEmail.clearValue();
    }

 
  }
}
</script>
