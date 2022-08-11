<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="card" >
                    <div class="card-header">
                        <h2>Cambiar contraseña</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body"> <!--body-->
                        <div class="card-body">
                        <!-- <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad :</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="formPassword.documentNumber" required="required" class="form-control col-md-12 col-xs-12">
                            </div>
                        </div> -->
                        </div>  
                        <div class="card-body">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Nueva contraseña:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="formPassword.password" type="password" required="required" class="form-control col-md-12 col-xs-12">
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Reingrese contraseña:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <input v-model="formPassword.passwordII" type="password" required="required" class="form-control col-md-12 col-xs-12">
                            </div>
                        </div>
                        </div>
                    </div><!--body-->

                    <div class="card-footer">
                            <center>
                                <button  type="button" @click="changePassword(formPassword)" class="btn btn-success">Cambiar</button>
                            </center>
                    </div>
                </div> <!--card-body-->
        </div> <!--col 12 -->        

        <!--Modal not-->
        <div class="modal fade bs-example-modal-not" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
                <h3 class="modal-title" > <center>  {{formNot.tit}}  </center> </h3>
            </div>
            <div class="modal-body">                 
                <p> <center> {{formNot.not}} </center> </p>
            </div>   
            <div class="modal-footer">
                <center>                    
                    <a v-if="goToLogin == true"  :href="`/dashboard/login`"  target="_newtab"><button type="button" class="btn btn-primary" > Ir a login </button></a>
                    <button v-else type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button></center>
            </div>
            </div>
        </div>
        </div>
        <!--Modal not-->

    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import moment from 'moment';


    export default {
        name: "FormRecoverPasswordContainer",
        components: {
            LoadingComponent,
        },
        
        data: () => ({
            isLoading: false,
            formPassword: {},
            myToken: null,
            formNot: {
                tit: 'Default title',
                not: 'Default notification'
            },
            goToLogin: false
        }),
        async created () {          
          const urlParams = new URLSearchParams(window.location.search); 
          this.myToken = urlParams.get('idToken');
        },

        methods:{
            //Cambiamos la contraseña
            async changePassword(formPassword){
                this.isLoading = true;
                var form = _.cloneDeep(formPassword);
                form.myToken = this.myToken
                if(form.password == form.passwordII){
                    const response = await consultServices('changePasswordFromEmail','POST',form);
                    if(response.message){
                        this.formNot.tit = 'Error al cambiar la contraseña'
                        this.formNot.not = response.message
                        this.goToLogin = false
                    }else{
                        this.formNot.tit = 'Cambio de contraseña'
                        this.formNot.not = 'Se realizó el cambió de contraseña de manera exitosa.'
                        this.goToLogin = true
                    }
                }else{
                    //alert("Las contraseñas no coinciden");
                        this.formNot.tit = 'Error al cambiar la contraseña'
                        this.formNot.not = 'Las contraseñas no coinciden'
                        this.goToLogin = false                    
                }
                $('.modal').modal('hide');
                this.shownotificacion();
                this.isLoading = false;
            },

            async shownotificacion(){
                $('.bs-example-modal-not').modal('show'); 
            },
        }


    }
</script>

<style>
.inner {
  display: table;
  margin: 0 auto;

}

.outer {

  width:100%
}

.container-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.centered-div-header {
    width: 80%;
    height: 140px;
    margin: 10px;
    padding: 5px;
}

</style>
