<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Mis Solicitudes de cambios de inasistencia </h2>
                <div class="card-header-actions" align-items: center>
                    <button type="button"  @click="showModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Nueva solicitud
                    </button>
                </div>
                <div class="clearfix"></div>

          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <TableMaf :header="colum" :data="requests" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

        </div>

        <div class="card-body">
            <TableMaf :header="allColum" :data="allRequests" :tableTitle="allTitleTable" ref="tableMafAll">
                    </TableMaf>

        </div>
      </div>




      <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Registrar nueva solicitud</h3>              
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body"> 

                    <div class="card-body">     
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento del solicitante:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.documentNumber" class="form-control col-md-7 col-xs-12" >
                                    </div>
                        </div> 
                    </div>
                    <div class="card-body">     
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha en la que sí asistió:</label>
                            <div class="col-md-6 col-sm-6 col-xs-12">                       
                                <select class="form-control"  v-model="event" @change="onChangeEvent()">
                                <option disabled="disabled" value="">Fechas del calendario del colegio</option>
                                <option v-for="item in eventsxSchool" v-bind:value="item" >
                                {{ getDisplayValue(item.SchoolManagementEventType.descriptionCod,20) }} || {{item.startDate}} 
                                </option>
                                </select>
                            </div>
                        </div> 
                    </div>
                   <div class="card-body">     
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">¿LLegó puntual o tarde?:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">                                
                                        <select class="form-control"  v-model="formRequest.isLate">
                                                <option value="false">Puntual</option> 
                                                <option value="true" selected>Tarde</option>                                      
                                        </select>
                                </div>        
                        </div> 
                    </div>                      
                    <div class="card-body">     
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">                       
                                                <textarea  v-model="formRequest.reason" maxlength="100" cols="50" rows="2"></textarea>
                                            </div>
                            </div> 
                    </div>
                  


                    
                    
                </div>                  

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>                  
                  <button @click="sendRequest()" type="button" class="btn btn-primary">Enviar esta solicitud</button>
                </div>
            
            </div>
          </div>
        </div>
      <!-- Modal Fin -->



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


    </div>
  </div>
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";


  export default {
      name: "solicitudContainer",
      components: {
      LoadingComponent,     
      TableMaf,
   
     },
      data: () => ({
          id: window.INITIAL_STATE.id,          
          documentNumber: window.INITIAL_STATE.documentNumber,          
          isLoading: false,
          formRequest:{typeCode:'', idEvent:'', documentNumber:''},          
          requests:[],
          typeRequest:[],          
          titleTable:'',
          allTitleTable:'',
          colum:[],
          allColum:[],
          formNot:{not:'',tit:'',},
          eventsxSchool:[],
          stateRequest:[],
          semester:[],
          events:[],
          school:[],
          dateEvent:'',
          event:{},
          allRequests:[],


          //push

      }),
     async  created () {

          this.isLoading=true;
          await this.getSessionStorage();
          var getSchool =  await consultServices('getSchool','POST',{id:this.id, semesterCode:this.semester.id});
          console.log("school ", getSchool);
          this.school = getSchool.AssignmentRecords[0].School;
          var eventsxSchoolArray=[];            
          eventsxSchoolArray = await consultServices('getSchoolEvents','POST',{id: this.school.id, semesterCode:this.semester.id,});
          this.eventsxSchool= eventsxSchoolArray.SchoolManagementEvents.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate);  });
          await this.listRequests();
          await this.setHeadTable(); 
         
          this.isLoading=false;

  		},
      methods: {
        async shownotificacion()
        {
            $('.bs-example-modal-not').modal('show');

        },
        
        async getSessionStorage(){                
                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagSemester = false;
                 var flagStateRequest = false;
                 var flagTypeRequest = false;
                 var flagEvents = false;

                if(!window.sessionStorage.semester){
                  ids.push(15);
                  flagSemester = true;
                }
                if(!window.sessionStorage.events){
                  ids.push(20);
                  flagEvents = true;
                }
                if(!window.sessionStorage.stateRequest){
                  ids.push(21);
                  flagStateRequest = true;
                }
                if(!window.sessionStorage.typeRequest){
                  ids.push(22);
                  flagTypeRequest = true;
                }
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección      
                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }

                if( ids.length > 0){

                //Hacer consulta única de masterValues 
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla

                    if(flagEvents == true){
                       this.events = _.filter(arrayMasters, function(master) {return master.idMaster == 20; }) 
                       window.sessionStorage.events  = JSON.stringify(this.events);  
                    }   
                    if(flagStateRequest == true){
                       this.stateRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 21; }) 
                       window.sessionStorage.stateRequest  = JSON.stringify(this.stateRequest);  
                    } 
                    if(flagTypeRequest == true){
                       this.typeRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 22; }) 
                       window.sessionStorage.typeRequest  = JSON.stringify(this.typeRequest);  
                    }                                                        
                }

                    // //si los datos existen cargarlos en los arreglos definidos para la patalla

                    this.semester =JSON.parse( window.sessionStorage.semester );
                    this.events =JSON.parse( window.sessionStorage.events );
                    this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                    this.typeRequest =JSON.parse( window.sessionStorage.typeRequest );
                    // //fin de la carga de arreglos para la pantalla  

                this.isLoading = false;
        }, 
      


        async listRequests() {
            console.log("entramos :::::::::::::::::::::::::")
            const response = await consultServices('listRequestsxSchool','POST',{semesterCode: this.semester.id, typeCode: 'REQUEST_ATTENDANCE',id:this.school.id});
            //const response = await consultServices('listRequestsxVolunteer','POST',{semesterCode:this.semester.id, typeCode: 'REQUEST_ATTENDANCE', idVolunteer:this.id});
            var pendings=[]
            var historical=[]
            for (let index = 0; index < response.length; index++) {
               if(response[index].statusCode == 'REQUEST_PENDING'){
                   pendings.push(response[index])
               }else{
                   historical.push(response[index])
               }
                
            }
            this.setDataTable(pendings,'PENDINGS');    
            this.setDataTable(historical,'ALL');                  
        },
        onChangeEvent(){
            console.log("entró a onChangeEvent")            
            this.dateEvent= " ";
            this.dateEvent = this.event.startDate;
            this.formRequest.idEvent = this.event.id;
        },
        showModal(){
            this.formRequest = {}
            this.event ={}
        },
        async sendRequest() {

            var currentDate= moment(new Date()).format("YYYY-MM-DD")
            var date1 = moment();
            var date2 = moment(this.dateEvent);
            console.log("actual ", date1)
            console.log("evento ",date2)
            var diff = date1.diff(date2, 'days')
            console.log("diferencia ", diff)
         
            if(diff <5 && diff >= 0){
            //if(diff < 100){    
                if(!this.formRequest.idEvent || !this.formRequest.reason || !this.formRequest.documentNumber){
                    alert("Debe completar todos los campos para una nueva solicitud.");
                }
                else{
                        var response0=  await consultServices('getVolunteer','POST',{id:this.formRequest.documentNumber}); 
                        if(!response0.id){
                            alert("No existe Creando registrado  con el número de documento ingresado.");
                        }
                        else{ 
                            console.log("response ", response0)        
                            var getSchool =  await consultServices('getSchool','POST',{id:response0.id, semesterCode:this.semester.id});
                            if(getSchool.message ){
                                 alert("El documento ingresado no pertenece a un creando registrado en este colegio.")
                            }else{
                                var idSchool = getSchool.AssignmentRecords[0].School.id;
                                if(this.school.id == idSchool){
                                    this.isLoading=true;
                                    var form ={}
                                    var flag = confirm("¿Enviar nueva solicitud?");
                                        if(flag == true){
                                        
                                            form.dateEvent = this.dateEvent;             
                                            form.idVolunteer = response0.id;
                                            form.semesterCode = this.semester.id;
                                            form.typeCode = 'REQUEST_ATTENDANCE';
                                            form.idSchoolManagementEvent = this.formRequest.idEvent;
                                            form.reason = this.formRequest.reason;
                                            form.isLate = this.formRequest.isLate;
                                            console.log("solicitud",form);    
                                            const response=  await consultServices('createRequest','POST',form);
                                            if(response.id){
                                                this.formNot.tit="Solicitud enviada"; this.formNot.not="Se ha enviado la solicitud de manera exitosa."
                                                this.listRequests();
                                                this.formRequest={};
                                                this.dateEvent = " ";
                                            }else{
                                                this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo enviar la solicitud de manera exitosa."
                                            }
                                            $('.modal').modal('hide');
                                            this.showModal();
                                            this.shownotificacion();

                                        }
                                    this.isLoading=false;   
                                }else{
                                    alert("El documento ingresado no pertenece a un creando registrado en este colegio.")
                                }

                            }


                        } 
                }

            }else{
               alert("Solo puede solicitar una regularización de asistencia máximo cuatro días despues de la fecha seleccionada");
            }

         },


         async removeRequest(item) {
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la solicitud seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeRequest','POST',form);
                        this.listRequests(); 
                        this.isLoading=false;                    

                } 
         },




        setHeadTable(){
            this.colum = [              
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},       
                {label:'Fecha de cierre de solicitud' ,name:'closeDate' ,find:1 ,sort:1}, 
                {label:'Tipo' ,name:'isLate' ,find:1 ,sort:1},
                {label:'Razón de inasistencia' ,name:'reason' ,find:1 ,sort:1},
                {label:'Creando solicitante' ,name:'creando' ,find:1 ,sort:1},
                {label:'Documento del creando' ,name:'documentNumber' ,find:1 ,sort:1},                    
                {label:'Estado de solicitud' ,name:'state' ,find:1 ,sort:1},  
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Solicitudes pendientes del semestre";

            this.allColum = [              
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},       
                {label:'Fecha de cierre de solicitud' ,name:'closeDate' ,find:1 ,sort:1}, 
                {label:'Tipo' ,name:'isLate' ,find:1 ,sort:1},
                {label:'Razón de inasistencia' ,name:'reason' ,find:1 ,sort:1},  
                {label:'Creando solicitante' ,name:'creando' ,find:1 ,sort:1},
                {label:'Documento del creando' ,name:'documentNumber' ,find:1 ,sort:1},                  
                {label:'Estado de solicitud' ,name:'state' ,find:1 ,sort:1}];
            this.allTitleTable = "Tabla histórica de solicitudes de regularización de Asistencias del semestre";
        },
        refreshData(type) {
            if(type == 'PENDING'){
                console.log("pendingggggggggggggggg:: ", this.requests)
                this.$refs.tableMaf.formatData(this.requests);
            }
            if(type == 'ALL'){
                this.$refs.tableMafAll.formatData(this.allRequests);
            } 
        },
        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 21){
                array= this.stateRequest
            }
            if(master == 22){
                array= this.typeRequest
                
            }
            if(master == 20){
                array= this.events
                
            }
           

                for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }
                    
                }
            return display;
            


        },

        setDataTable(arrayData, type){
                var ctx = this;

                if(type == 'PENDINGS'){
                    this.requests = []; 
                    arrayData.forEach(item => {
                        var request = {};
                        var varActionsPending="";
                        var varActionFinishedAproveed="";
                        var varActionFinishedDisapprove="";  
                        var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
                        var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
                        var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;                                        
                                                   
                            request.creando=name.concat(" ", lastName," ", secondLastName);
                            request.documentNumber=item.Volunteer.documentNumber;
                            request.state=
                                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}                    
                                {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud desaprobada</button> :null}
                                {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}                 
                                </font></font>; 
                            request.creationDate = moment(item.creationDate).format('DD/MM/YYYY');
                            
                            request.closeDate=item.closeDate == null ? request.closeDate = "Aún no finalizada" : request.closeDate = moment(item.closeDate).format('DD/MM/YYYY');
                            request.reason = item.reason == null? request.reason="" : request.reason= item.reason;
                            request.isLate =  item.isLate == true? request.isLate = 'Tarde': request.isLate ='Puntual';
                            request.actions=
                                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                {item.statusCode == 'REQUEST_APPROVED'? "":null}                    
                                {item.statusCode == 'REQUEST_DISAPPROVED'? " " :null}
                                {item.statusCode == 'REQUEST_PENDING'?  <button onClick={()=>ctx.removeRequest(item)}   type="button" class="btn btn-danger btn-xs"> Eliminar solicitud</button>:null}                 
                                </font></font>;


                        this.requests.push(request);
                    });
                    this.refreshData('PENDING');
                }
                if(type == 'ALL'){
                    this.allRequests = []; 
                    arrayData.forEach(item => {
                        var request = {};
                        var varActionsPending="";
                        var varActionFinishedAproveed="";
                        var varActionFinishedDisapprove="";                 
                        var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
                        var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
                        var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;                                        
                                                   
                            request.creando=name.concat(" ", lastName," ", secondLastName);
                            request.documentNumber=item.Volunteer.documentNumber;                                                  
                        
                            request.state=
                                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}                    
                                {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud desaprobada</button> :null}
                                {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}                 
                                </font></font>; 
                            request.creationDate = moment(item.creationDate).format('DD/MM/YYYY');
                            request.isLate =  item.isLate == true? request.isLate = 'Tarde': request.isLate ='Puntual';
                            request.closeDate=item.closeDate == null ? request.closeDate = "Aún no finalizada" : request.closeDate = moment(item.closeDate).format('DD/MM/YYYY');
                            request.reason = item.reason == null? request.reason="" : request.reason= item.reason;



                        this.allRequests.push(request);
                    });
                    this.refreshData('ALL');
                }    
                
                

            },


      }
  }
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    margin: 0px;
}

</style>