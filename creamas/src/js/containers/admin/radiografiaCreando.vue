<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Radiografia - Busqueda del creando</h2>
                    <br/>
               
                    
                           
                    <div class="clearfix"></div>
                         <small>Ingrese uno o más campos </small>
                </div>

                <div class="card-body">
                    <div class="card">

                        <div class="card-body">
                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.documentNumber" :valueInput="formCrea.documentNumber" label="DNI:" :validation="{required:false, digits:8}" nameInput="document" etiqueta='true' ref="inputDocument">
                                </inputMaf>

                                

                            </div>

                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.name" label="Nombres:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputName">
                                </inputMaf>

                            </div>

                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.lastName" label="Apellido Paterno:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputLastName">
                                </inputMaf>

                            </div>

                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.secondLastName" label="Apellido Materno:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputSecondLastName">
                                </inputMaf>

                            </div>

                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.email" label="Email:" :validation="{required:false, email:true}" nameInput="email" etiqueta='true' ref="inputEmail">
                                </inputMaf>

                            </div>
                    
                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.phone" label="Celular:" :validation="{required:false, min:6}" nameInput="celular" etiqueta='true' ref="inputPhone">
                                </inputMaf>

                            </div>
                            
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="searchVolunteer()"><i class="fa fa-search"></i> Buscar </button>
                        </div>

                    </div>

                    <div class="card">
                    <TableMaf :header="colum" :data="creando" :tableTitle="titleTable" ref="tableMaf">                    
                    </TableMaf>  
                      
                    </div>

                </div> <!--card-body-->

            </div> <!--card-->
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
            <!--Modal sta-->
            <div class="modal fade bs-example-modal-sta" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-cat">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Cambiar estado de usuario</h4>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>    
                        <div class="modal-body">       
                                <div class="card-body">              
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado actual del usuario:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input  v-model="actualValue" type="text" readonly="readonly" class="form-control col-md-7 col-xs-12">
                                    </div>
                                </div>
                                <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Actividades:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control"  v-model="newStatus" >
                                                <option v-for="item in optionsStatus" v-bind:value="item.code" >
                                                {{item.displayValue}} 
                                                </option>
                                            </select>
                                        </div>
                                </div>
                                </div>
                        </div>    
                        <div class="modal-footer">
                                <center>
                                    <button type="button" data-dismiss="modal" class="btn btn-default" >Cancelar</button>
                                      <button @click="changeState()" type="button" data-dismiss="modal" class="btn btn-success" >Guardar cambio</button>
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
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import Treeselect from '@riophae/vue-treeselect';
    import TableMaf from "./../../components/TableMaf.vue";
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import inputMaf from "./../../components/inputMaf.vue";


  export default {
        name: "RadiografíaCreando",
        components: {
            LoadingComponent,
            TableMaf,
            inputMaf,
            Treeselect
        },

        data: () => ({
            valueConsistsOf: 'ALL_WITH_INDETERMINATE',
            isLoading: true,
            readonly: window.INITIAL_STATE.readonly,
            creando:[],
            formVolunteer:{},
            formCrea:{documentNumber:'', name:'',lastName:'',secondLastName:'',email:'', phone:'',},
            formNot:{not:'',tit:'',},
            colum:[],
            titleTable:'',
            actualValue:'',
            newStatus:'',
            volunteerStatus:[],
            idVolunteer:'',
            status:[],
            formEditStatus:[],
            optionsStatus: [ ],
            semester:{},
            volunteerStatusActions:[{code:'VOLUNTEER_SEPARATED',displayValue:'Desvincular'},{code:'VOLUNTEER_PENALIZED',displayValue:'Sancionar'},{code:'VOLUNTEER_INACTIVE',displayValue:'Dar de baja'},{code:'VOLUNTEER_ACTIVE',displayValue:'Reactivar'}]
       

           
        }),

        created () {
            
            this.getSessionStorage();
            this.setHeadTable();
            },
        
        methods: {
            async getSessionStorage(){                
                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagVolunteerStatus = false;
                if(!window.sessionStorage.volunteerStatus){
                  ids.push(6);
                  flagVolunteerStatus = true;
                }
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección      

                if( ids.length > 0){

                //Hacer consulta única de masterValues 
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagVolunteerStatus == true){
                       this.volunteerStatus = _.filter(arrayMasters, function(master) {return master.idMaster == 6; });                       
                       window.sessionStorage.volunteerStatus  = JSON.stringify(this.volunteerStatus);
                      
                    }                                                       
                }
                ////si los datos existen cargarlos en los arreglos definidos para la patalla

                this.volunteerStatus =JSON.parse( window.sessionStorage.volunteerStatus );
                this.semester= await consultServices('getCurrentSemester','POST', {});
                

                ////fin de la carga de arreglos para la pantalla 

                this.isLoading = false;
            }, 
            async searchVolunteer() { 
                 var form=this.formCrea;
                
                 if(!this.formCrea.documentNumber && !this.formCrea.name  && !this.formCrea.lastName  && !this.formCrea.secondLastName && !this.formCrea.email  && !this.formCrea.phone){
                        this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete un campo para realizar la búsqueda"
                        $('.modal').modal('hide');
                        this.shownotificacion();
                 }
                 else{
                     if((this.formCrea.documentNumber.length<3 && this.formCrea.documentNumber.length >0 || this.formCrea.name.length<3 && this.formCrea.name.length>0)||(this.formCrea.lastName.length<3 && this.formCrea.lastName.length>0)||(this.formCrea.secondLastName.length<3 && this.formCrea.secondLastName.length>0)){
                         this.formNot.tit="Cantidad mínima de carcateres"; this.formNot.not="Por favor ingrese al menos 3 caracteres para la búsqueda."
                        $('.modal').modal('hide');
                        this.shownotificacion();

                     }else{
                        !form.semesterCode ? form.semesterCode = this.semester.id : null
                         console.log('Vamos a buscar: ', form)
                       const response = await consultServices('searchVolunteer','POST',form);
                       this.setDataTable(response);
                       }
                 }     
            } ,

             async changeState(){      
                  var success= true;
                  var flag= confirm("¿Cambiar el estado actual del usuario?");
                  if(flag==true){
                    this.isLoading =true  
                    var form = {
                        id:this.idVolunteer,
                        semesterCode:this.semester.id
                    }
                    console.log("form changeState", form)
                    if(this.newStatus == 'VOLUNTEER_PENALIZED'){
                       const response1 = await consultServices('setAsSanctioned','POST',form);
                       response1.length > 0 ? success= true: success =false 
                    }
                    if(this.newStatus == 'VOLUNTEER_INACTIVE'){
                       const response2 = await consultServices('setAsRetired','POST',form);
                       response2.length > 0 ? success = true: success =false 
                    }
                    if(this.newStatus == 'VOLUNTEER_SEPARATED'){
                       const response3 = await consultServices('setAsSeparated','POST',form); 
                       response3.length > 0 ? success = true: success =false 
                    }
                    if(this.newStatus == 'VOLUNTEER_ACTIVE'){
                       const response3 = await consultServices('setAsActive','POST',form); 
                       response3.length > 0 ? success = true: success =false 
                    }
                    
                    this.isLoading=false
                    if(success == false){ 
                    this.formNot.tit="Actualización de estado "; this.formNot.not="No se pudo actualizar el estado del usuario"}
                    else{ this.formNot.tit="Actualización de estado "; this.formNot.not="Se actualizó el estado del usuario de manera correcta"}
                    $('.modal').modal('hide');
                    this.shownotificacion();
                    this.newStatus='';
                    this.searchVolunteer();
                  }
            },
            

            

            redirectToDetail(crea){
                console.log(crea);
                if(this.readonly==true){ window.location.href = "/dashboard/detalleCreandoLectura/" + crea.documentNumber;}
                if(this.readonly==false){ window.location.href = "/dashboard/detalleCreando/" + crea.documentNumber;}
               
                
            },

           async shownotificacion(){   
            $('.bs-example-modal-not').modal('show');
            },
            setHeadTable() {
            this.colum = [
                {label:'Resultado' ,name:'name' ,find:1 ,sort:1},
                {label:'Estado' ,name:'state' ,find:0 ,sort:0},
                {label:'Apto/No Apto' ,name:'updateFinalResult' ,find:0 ,sort:0},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},
                ];
            this.titleTable = "Resultados";
            },
             refreshData() {
                this.$refs.tableMaf.formatData(this.creando);
            },
            async showPasswordEdit(item){
                var flag= confirm("¿Cambiar la contraseña  actual a una asignada por defecto?");
                if(flag==true){
                    const response = await consultServices('resetPassword','POST',{documentNumber:item.documentNumber});
                    if(response.status == 200){
                    this.formNot.tit="Modificación de contraseña "; this.formNot.not="Se actualizó la contraseña del usuario de manera correcta"
                    }  
                    else{ 
                    this.formNot.tit="Modificación de contraseña "; this.formNot.not="No se pudo actualizar la contraseña del usuario";}
                    $('.modal').modal('hide');
                    this.shownotificacion();
                }
            },
            async  showEditModal(item){          
                this.optionsStatus=[];       
                var statusOptions=[];
                this.idVolunteer= item.id
                this.actualValue=this.getDisplayValue(item.statusCode,6) 
                console.log('volunteerStatusActions ',this.volunteerStatusActions)
                for( var i = 0; i < this.volunteerStatusActions.length; i++){ 
                    if ( this.volunteerStatusActions[i].code != item.statusCode) {
                        statusOptions.push( this.volunteerStatusActions[i]);
                    }
                }
                this.optionsStatus = statusOptions   
            },
   
            setDataTable(arrayData){ 
                console.log("entró");
                var ctx = this;
                this.creando = [];
               
                arrayData.forEach(item => {
                    var crea = {};
                     
                        var name = item.name;
                        var lastName = item.lastName;
                        var secondLastName = (item.secondLastName != null ? item.secondLastName : "");                      
                        crea.name = name.concat(" ", lastName," ", secondLastName);

                        if(item.statusCode != null && item.statusCode) {
                            //var statusCodeaux = 'VOLUNTEER_ACTIVE';
                            var aux = _.find(this.volunteerStatus , (vs) => { return vs.code == item.statusCode });
                            crea.state=aux.displayValue;
                        }
                        crea.updateFinalResult=<div class="d-flex justify-content-around"> 
                        <i onClick={()=>ctx.updateFinalResult(item.id, true)} class="fa fa-thumbs-o-up"></i>/<i onClick={()=>ctx.updateFinalResult(item.id, false)} class="fa fa-thumbs-o-down"></i> 
                        </div>;


                        crea.actions=<div class="d-flex justify-content-around"> 
                        
                        <div> <button onClick={()=>ctx.redirectToDetail(item)} type="button" class="btn btn-info btn-xs">Ver historial</button></div>
                        <div> <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.showPasswordEdit(item)} data-toggle="modal" data-target=".modal-not">Reiniciar contraseña</button> </div>
                        </div>;

                    this.creando.push(crea);
                });

                    this.refreshData();
            },
            async updateFinalResult(id, finalResult){
                console.log("result ::::::::::::::: "+ id +" ::::::::::::::::: "+ finalResult)
                const response = await consultServices('getRecordVolunteerJobs','POST',{id:id,semesterCode:'' });
                console.log("reponse::::::::::: ", response )
                var semesters= [];
                for (let index = 0; index < response.length; index++) {
                  semesters.push(response[index].semesterCode)                    
                }
                semesters.sort(function(a, b) { return a - b; });
                console.log("response 2::::::::: ", semesters[semesters.length-1])    
                
                if(finalResult == true){
                   var flag = confirm("¿El voluntario es apto al cierre del semestre?");
                    if(flag == true){
                        const response = await consultServices('updateFinalResult','POST',{id:id, semesterCode: semesters[semesters.length-1], finalResult: 'VOLUNTEER_SUITABLE'});
                        if(response.status == 200){   
                        this.formNot.tit="Actualización exitosa";  this.formNot.not="Creando apto al cierre del semestre"
                        $('.modal').modal('hide');
                        this.shownotificacion();
                        }else{
                            this.formNot.tit="Error en la actualización"; this.formNot.not="No se pudo actualizar el registro"
                            $('.modal').modal('hide');
                            this.shownotificacion();
                        } 
                    }                   
                }

                if(finalResult == false){
                   var flag = confirm("¿El voluntario no es apto al cierre del semestre?");
                    if(flag == true){
                        const response = await consultServices('updateFinalResult','POST',{id:id, semesterCode: semesters[semesters.length-1], finalResult: 'VOLUNTEER_NOT_SUITABLE'});
                        if(response.status == 200){   
                        this.formNot.tit="Actualización exitosa";  this.formNot.not="Creando no apto al cierre del semestre"
                        $('.modal').modal('hide');
                        this.shownotificacion();
                        }else{
                            this.formNot.tit="Error en la actualización"; this.formNot.not="No se pudo actualizar el registro"
                            $('.modal').modal('hide');
                            this.shownotificacion();
                        } 
                    }                   
                }   
            
               
            },

            getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 6){
                array= this.volunteerStatus
            }
            for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }
            }
            return display;
            },
        }
        
    };

</script>

<style scoped>
.fa {cursor:pointer}
</style>