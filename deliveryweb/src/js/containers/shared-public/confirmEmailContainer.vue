<template>
<div class="row">
  <LoadingComponent v-if="isLoading"></LoadingComponent>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="card">
          <center>
            <img src="/logo_desktop.png" alt="img" class="img-responsive" width="100" heigth="100">
          </center>
          <div class="card" style="margin-top: 40px;">
            <center>
            <div class="separator"></div>
            <h2>{{message}}</h2>
            <div v-if="isConfirmed== true">              
              <a href="/shared/login">Ir a login</a>
            </div>           
            <div class="separator"></div>
            </center>
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

export default {
  name: "RegisterContainer",
  components: {
    LoadingComponent,
  },
  data: () => ({
    isLoading: false,
    //notificaciones
    formNot:{title:'',message:'',},
    id:window.INITIAL_STATE.id,
    message:'Confirmación de registro',
    isConfirmed:false,
  }),
  async created() {

  },

  async mounted() {
    console.log('id:::::::', this.id)
    await this.confirmEmail()
  },

  methods: {

    async showNotificacion(){
      $('.bs-example-modal-not').modal('show');
    },    

    async confirmEmail(){
       this.isLoading =true

         //Validar campos únicos: Documento de identidad, correo y celular
         var form={}
         form.id = this.id

         const userValidate = await consultServices('confirmEmail','POST',form);

         if(!userValidate.message ){
           //Validar correos y contraseñas
           this.formNot.title="Operación exitosa";
           this.formNot.message="Se ha confirmado tu registro de manera correcta";  
           this.message = "Se ha confirmado tu registro en Byclo"
           this.isConfirmed = true                 
         }
         else if(userValidate.message == "Registro ya confirmado"){
           this.formNot.title="Notificación";
           this.formNot.message=userValidate.message; 
           this.message = "Registro ya confirmado"
           this.isConfirmed = true   
         }else{
           this.formNot.title="No se pudo confirmar el registro";
           this.formNot.message=userValidate.message; 
           this.message = "No se pudo confirmar el registro"
         }
       
       this.showNotificacion()    
       this.isLoading =false   
    },



 
  }
}
</script>
