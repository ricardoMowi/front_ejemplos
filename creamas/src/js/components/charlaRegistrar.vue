<template>
    <div class="card">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
            <div class="card">   
                    <div class="card-header">
                            <h4>Inscríbete para asistir a una charla</h4>
                        <div class="clearfix"></div>
                    </div>

                    <div class="card-body">
                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de Identidad(*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text"   v-model="attendance.documentNumberVolunteer"  required="required" class="form-control col-md-7 col-xs-12" v-on:keyup.enter="searchVolunteer">
                                </div>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Turno de la charla (*)</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">                                 
                                    <input type="text" id="name" v-model="attendance.idEventTurn" required="required" class="form-control col-md-7 col-xs-12" >
                                </div>
                            </div>   
                        </div>          
                        
                        <div class="modal-footer">
                            <button type="button" @click="createNewAttendance()" class="btn btn-primary"> Inscribir </button>
                        </div>
                    </div> <!--card-body-->
                
                 <!--Modal not-->              
                <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                     <div class="modal-header">
                        <h4 class="modal-title">{{formNot.tit}} </h4>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>    
                    <div class="modal-body">                 
                        <p> <center> {{formNot.not}} </center> </p>
                    </div>    
                        <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                            </center>
                        </div>
                    </div>
                </div>
                </div>       
                <!--Modal not-->
            </div> <!--col 12 -->  
    </div> <!--row-->
</template>

<script>
   import consultServices from './../utilities/consultServices.js';
    import LoadingComponent from "./../components/loadingComponent.vue";
    import _ from 'lodash';
    import modalEvaluatedComponent from "./../components/modalEvaluatedComponent.vue";
    import moment from 'moment';
    //import * as lang from "vuejs-datepicker/src/locale";    
    import { Datetime } from 'vue-datetime';

    export default {
        name: "RegisterVolunteerContainer",
        components: {
            LoadingComponent, 
            modalEvaluatedComponent,          
            Datetime,
        },
        data: () => ({
            isLoading: false,
            formNot:{not:'',tit:'',},
           
            ///////////////////////////
            attendance:{
                    documentNumberVolunteer:'',
                    idEventTurn: '',
            },
            message:{tittle:'Bienvenido.', content:'Este es un mensaje personalizado'},
           
            /////////////////////////////

        
        }),
        created () {
          
            this.initLoad();
        },
        
        methods: {

            ////////////////////////////////////////
            async initLoad() {  
            },
           
             async createNewAttendance() { 
                var form = _.cloneDeep(this.volunteer);
                if(!this.attendance.documentNumberVolunteer || !this.attendance.idEventTurn  )
                 {
                     this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete los campos obligatorios (*)"
                 }
                else{
                        var form = _.cloneDeep(this.attendance);
                        form.documentNumber=this.attendance.documentNumberVolunteer;
                        form.idEventTurn=this.attendance.idEventTurn;
                        const response = await consultServices('createNewAttendance','POST',form);
                        console.log(response);
                        if(response.status == 400){  
                            this.formNot.tit="Error en el registro"; this.formNot.not=response.message;}
                        else if(response.status == 200){this.formNot.tit="Registro exitoso"; this.formNot.not="Registro realizado de manera satisfactoria";  this.ClearForm();}
                   
                }

               
                   $('.modal').modal('hide');
                    this.shownotificacion();

            },
            async ClearForm(){
                     this.attendance.documentNumberVolunteer="";
                     this.attendance.idEventTurn="";


            },
            async shownotificacion(){
            $('.bs-example-modal-not').modal('show'); },
 
           
            
        }
      

    }
</script>

              


