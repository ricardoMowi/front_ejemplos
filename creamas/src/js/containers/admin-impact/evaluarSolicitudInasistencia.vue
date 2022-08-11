<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">

        <div class="card-body">
            <TableMaf :header="colum" :data="requests" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

        </div>
      </div>
      <div class="card">

        <div class="card-body">
            <TableMaf :header="allColum" :data="allRequests" :tableTitle="allTitleTable" ref="tableMafAll">
                    </TableMaf>

        </div>
      </div>




      <!-- Modal -->
        <!-- <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Resolver solicitud</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Creando solicitante:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.fullname" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de solicitud:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.typeCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado de la solicitud:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRequest.statusCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                             <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Aprobar esta solicitud?:</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formClose.approved" >
                                            <option value="Y">Si, aprobar</option>
                                            <option value="N">No aprobar</option>
                                        </select>
                                    </div>
                        </div>
                    </div>

                </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="closeRequest()" type="button" class="btn btn-primary">Resolver solicitud</button>
                </div>

            </div>
          </div>
        </div> -->
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
      name: "EvaluarsolicitudInasistencia",
      components: {
      LoadingComponent,
      TableMaf,

     },
      data: () => ({
          id: window.INITIAL_STATE.id, 
          documentNumber: window.INITIAL_STATE.documentNumber,    
          isLoading: false,
          formRequest:{},
          formClose:{},
          requests:[],
          allRequests:[],
          titleTable:'',
          colum:[],
          allTitleTable:'',
          allColum:[],
          formNot:{not:'',tit:'',},
          typeRequest:[],
          stateRequest:[],
          semester:[],
          school:[],

      }),
     async  created () {
        var ctx = this;

          this.isLoading=true;
          await this.getSessionStorage();
          var getSchool =  await consultServices('getSchool','POST',{id:this.id, semesterCode:this.semester.id});
          this.school = getSchool.AssignmentRecords[0].School;
          this.listRequests();
          //this.listHistoricalRequests();
          this.setHeadTable();


          this.isLoading=false;

  		},
      methods: {
        async shownotificacion()
        {
            $('.bs-example-modal-not').modal('show');

        },

        async getSessionStorage(){                
                this.isLoading = true;

                 var ids = [] ;
                 var flagStateRequest = false;
                 var flagTypeRequest = false;
                 var flagSemester = false;

                if(!window.sessionStorage.semester){
                  ids.push(15);
                  flagSemester = true;
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
                    if(flagStateRequest == true){
                       this.stateRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 21; }) 
                       window.sessionStorage.stateRequest  = JSON.stringify(this.stateRequest);  
                    } 
                    if(flagTypeRequest == true){
                       this.typeRequest = _.filter(arrayMasters, function(master) {return master.idMaster == 22; }) 
                       window.sessionStorage.typeRequest  = JSON.stringify(this.typeRequest);  
                    } 
                }
                    this.semester =JSON.parse( window.sessionStorage.semester );
                    this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                    this.typeRequest =JSON.parse( window.sessionStorage.typeRequest );
                this.isLoading = false;
        }, 



        async listRequests() {
            const response = await consultServices('listRequests','POST',{typeCode:'REQUEST_ATTENDANCE', semesterCode: this.semester.id});
            var pendings=[]
            var historical=[]
            for (let index = 0; index < response.length; index++) {
               if(response[index].statusCode == 'REQUEST_PENDING'){
                   pendings.push(response[index])
               }else{
                   historical.push(response[index])
               }
               this.setDataTable(historical, 'ALL');
               this.setDataTable(pendings, 'PENDING');

            }
            
        },
        // async listHistoricalRequests() {
        //     console.log("entramos :::::::::::::::::::::::::")
        //     const response = await consultServices('listRequestsxSchool','POST',{semesterCode: this.semester.id, typeCode: 'REQUEST_ATTENDANCE',id:this.school.id});      
        //     var requests=[]
        //     for (let index = 0; index < response.length; index++) {
        //        if(response[index].statusCode != 'REQUEST_PENDING'){
        //            requests.push(response[index])
        //        }
                
        //     }    
        //     this.setDataTable(requests, 'ALL');                    
        // },
         async approve(item) {
             console.log("solictud  ",item);

           this.isLoading=true;
           var form ={}
           var flag= confirm("¿Aprobar esta solicitud?");
            if(flag==true){
                form.approved = true;
                form.typeCode = 'REQUEST_ATTENDANCE';
                form.id=item.id;
                form.idSchoolManagementEvent = item.idSchoolManagementEvent;
                form.idVolunteer = item.idVolunteer;
                console.log("aprobado",form);

                const response=  await consultServices('closeRequest','POST',form);
                if(response.message){
                this.formNot.tit="Solicitud resuelta "; this.formNot.not="Se ha resuelto la solicitud de manera exitosa"
                this.listRequests();
                //this.listHistoricalRequests();
                this.fomrClose={};
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo resolver la solicitud de manera exitosa"
                }
                $('.modal').modal('hide');
                this.shownotificacion();
            }
            this.isLoading=false;


         },

          async disapprove(item) {
           this.isLoading=true;
           var form ={}
           var flag= confirm("¿Desaprobar esta solicitud?");
            if(flag==true){
                form.approved= false;
                form.id=item.id;
                console.log("aprobado",form);

                const response=  await consultServices('closeRequest','POST',form);
                if(response.message){
                this.formNot.tit="Solicitud resuelta "; this.formNot.not="Se ha resuelto la solicitud de manera exitosa"
                this.listRequests();
                //this.listHistoricalRequests();
                this.fomrClose={};
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo resolver la solicitud de manera exitosa"
                }
                $('.modal').modal('hide');
                this.shownotificacion();
            }
             this.isLoading=false;


         },



        //  showCloseModal(item){
        //      console.log("data solicitud ",item);
        //      this.formRequest = {};
        //      this.formRequest = _.cloneDeep(item);

        //      var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
        //      var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
        //      var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;

        //      this.formRequest.fullname = name.concat(" ", lastName," ", secondLastName);

        //      this.formRequest.typeCode= this.getDisplayValue(item.typeCode, 22);
        //      this.formRequest.statusCode=this.getDisplayValue(item.statusCode, 21);
        //      this.formRequest.id=item.id;

        //      console.log(" formReq: ",this.formRequest);
        //  },


        setHeadTable(){
            this.colum = [
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},
                {label:'Fecha de inasistencia' ,name:'eventDate' ,find:1 ,sort:1},
                {label:'Tipo' ,name:'isLate' ,find:1 ,sort:1},
                {label:'Razón de inasistencia' ,name:'reason' ,find:1 ,sort:1},
                {label:'Creando solicitante' ,name:'creando' ,find:1 ,sort:1},
                {label:'Documento del creando' ,name:'documentNumber' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Solicitudes de regularización de Asistencias del semestre";
            this.allColum = [
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},
                {label:'Fecha de inasistencia' ,name:'eventDate' ,find:1 ,sort:1},
                {label:'Tipo' ,name:'isLate' ,find:1 ,sort:1},
                {label:'Razón de inasistencia' ,name:'reason' ,find:1 ,sort:1},
                {label:'Creando solicitante' ,name:'creando' ,find:1 ,sort:1},
                {label:'Documento del creando' ,name:'documentNumber' ,find:1 ,sort:1},
                {label:'Estado' ,name:'state' ,find:0 ,sort:0}];
            this.allTitleTable = "Tabla histórica de solicitudes de regularización de Asistencias del semestre";
        },
        refreshData(type) {
            if(type == 'PENDING'){
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


                for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }

                }
            return display;



        },

        setDataTable(arrayData, type){
                var ctx = this;
                if(type == 'PENDING'){

                    this.requests = [];
                    arrayData.forEach(item => {
                        var request = {};
                        var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
                        var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
                        var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;

                            request.id = item.id;
                            request.type= this.getDisplayValue(item.typeCode, 22)
                            request.state= this.getDisplayValue(item.statusCode, 21)
                            request.creationDate=item.creationDate;
                            request.endDate=item.endDate == null ? request.endDate = "Aún no finalizada" : item.endDate;
                            request.creando=name.concat(" ", lastName," ", secondLastName);
                            request.documentNumber=item.Volunteer.documentNumber;
                            request.reason = item.reason == null? request.reason="" : request.reason= item.reason;
                            request.eventDate=item.SchoolManagementEvent.startDate;
                           
                            request.isLate =  item.isLate == true? request.isLate = 'Tarde': request.isLate ='Puntual';

                            request.actions = <div class="d-flex justify-content-around">
                            <div> <button onClick={()=>ctx.approve(item)} type="button" class="btn btn-primary btn-xs"data-target=".bs-example-modal-lg" data-toggle="modal">Aprobar</button> </div>
                            <div> <button onClick={()=>ctx.disapprove(item)} class="btn btn-danger btn-xs" data-target=".bs-example-modal-del" data-toggle="modal" >Rechazar </button> </div> </div>;
                        console.log("iteeeeeeeeem::::::::::::", item)
                         console.log("request::::::::::::", request)

                        this.requests.push(request);
                    });

                    this.refreshData('PENDING');
                }
                if(type == 'ALL'){
                    this.allRequests = [];
                    arrayData.forEach(item => {
                        var request = {};
                        var name = item.Volunteer.name == null ? name="" : item.Volunteer.name;
                        var lastName = item.Volunteer.lastName == null ? lastName="" : item.Volunteer.lastName;
                        var secondLastName = item.Volunteer.secondLastName == null ? secondLastName="" : item.Volunteer.secondLastName;

                            request.id = item.id;
                            request.type= this.getDisplayValue(item.typeCode, 22)
                            request.state=
                                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}
                                {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud rechazada</button> :null}
                                {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}
                                </font></font>; 
                            request.creationDate=item.creationDate;
                            request.endDate=item.endDate == null ? request.endDate = "Aún no finalizada" : item.endDate;
                            request.creando=name.concat(" ", lastName," ", secondLastName);
                            request.documentNumber=item.Volunteer.documentNumber;
                            request.reason = item.reason == null? request.reason="" : request.reason= item.reason;
                            request.eventDate=item.SchoolManagementEvent.startDate;
                            request.isLate =  item.isLate == true? request.isLate = 'Tarde': request.isLate ='Puntual';

                            request.actions = <div class="d-flex justify-content-around">
                            <div> <button onClick={()=>ctx.approve(item)} type="button" class="btn btn-primary btn-xs"data-target=".bs-example-modal-lg" data-toggle="modal">Aprobar</button> </div>
                            <div> <button onClick={()=>ctx.disapprove(item)} class="btn btn-danger btn-xs" data-target=".bs-example-modal-del" data-toggle="modal" >Rechazar </button> </div> </div>;
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
