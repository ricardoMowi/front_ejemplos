<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Solicitudes de rotación recibidas CAMBIO</h2>
                <div class="clearfix"></div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <TableMaf :header="columReceived" :data="rotationsIssued" :tableTitle="titleTable" :title="false" ref="tableMafReceived"></TableMaf>     
            
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2>Solicitudes de rotación emitidas</h2>
                <div class="clearfix"></div>

          <div class="clearfix"></div>
        </div>
        <div class="card-body">
               <TableMaf :header="columIssued" :data="rotationsReceived" :tableTitle="titleTable" :title="false" ref="tableMafIssued"></TableMaf>    

        </div>
      </div>





        <!-- <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
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
                                       <input type="text" v-model="documentNumber" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                    </div>
                        </div>
                    </div>
                    <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha del calendario:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control"  v-model="formRequest.typeCode" >
                                            <option disabled="disabled" value="">Fechas del calendario del colegio</option>
                                            <option v-for="item in dates" v-bind:value="item.startDate" >
                                            {{item.startDate}}
                                            </option>
                                            </select>
                                        </div>
                                    </div>
                    </div>
                     <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control"  v-model="formRequest.typeCode" >
                                            <option disabled="disabled" value="">Seleccione un motivo</option>
                                            <option v-for="item in dates" v-bind:value="item.startDate" >
                                            {{item.startDate}}
                                            </option>
                                            </select>
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
        </div> -->
      <!-- Modal Fin-->



        <!-- Modal Rotación -->
        <div class="modal fade bs-example-modal-volunteer" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Solicitud de rotación </h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Creando solicitante:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="formVolunteer.fullName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol en el colegio de procedencia:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="formVolunteer.job" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Colegio de procedencia:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="formVolunteer.schoolName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo de rotación:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <textarea  v-model="formVolunteer.reason" class="form-control"  readonly="readonly" >
                                </textarea>
                        </div>
                    </div>
                    <div v-if="flagWorkshopDetails==true" class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Taller actual:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">                                 
                                    <input type="text" v-model="formVolunteer.requestedWorkshopDisplayName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                        </div>
                    </div>
                    <!-- <div v-if="flagWorkshopDetails==true" class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="formVolunteer.typeWorkshop" class="form-control col-md-7 col-xs-12" readonly="readonly">
                        </div>
                    </div>
                    <div v-if="flagWorkshopDetails==true" class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Grupo:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="formVolunteer.contentCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                        </div>
                    </div>
                    <div v-if="flagWorkshopDetails==true" class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Ciclo:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="formVolunteer.levelCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                        </div>
                    </div> -->
                    <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige nuevo rol:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select class="form-control" @change="listWorkshopsxRole"   v-model="formVolunteer.newRole">
                                    <option disabled="disabled" value="">Roles disponibles</option>
                                    <option v-for="item in jobs" v-bind:value="item.code" >                                                
                                            {{item.name}}
                                    </option>
                                    </select>
                                </div>
                            </div>
                    </div>                          
                    <div id="divWorkshops" class="card-body">
                            <div id="divMessage" class="card-body" style="display:none; text-align: center" >
                                <p style="margin: auto;">No hay talleres disponibles para el rol seleccionado </p>
                            </div>
                            <div id= "divAvailableWorkshops" class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el taller de reasignación:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select class="form-control"  v-model="formVolunteer.workshop">
                                    <option disabled="disabled" value="">Talleres disponibles</option>
                                    <option v-for="item in availableWorkshop" v-bind:value="item" >                                                
                                            {{item.displayValue}}
                                    </option>
                                    </select>
                                </div>
                            </div>
                    </div>
                </div>


                <div class="modal-footer">
                    <button @click="approved()" type="button" class="btn btn-success">Aprobar rotación y reasignar</button>
                </div>
            </div>
            </div>
        </div>
        <!-- Modal Rotación Fin -->

        <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                     <div class="modal-header">
                        <h4 class="modal-title">{{formNot.title}} </h4>
                        <button class="close" type="button"  @click="closeModalSafety('.bs-example-modal-not')" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p> <center> {{formNot.not}} </center> </p>
                    </div>
                    <div class="modal-footer">
                            <center>
                                 <button type="button" class="btn btn-success" @click="closeModalSafety('.bs-example-modal-not')" >Aceptar</button>
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
      name: "rolesContainer",
      components: {
      LoadingComponent,
      TableMaf,

     },
      data: () => ({
          id: window.INITIAL_STATE.id,
          documentNumber: window.INITIAL_STATE.documentNumber,       
          idSchool:'',  
          isLoading: false,
          formRequest:{typeCode:''},         
          titleTable:'',
          columReceived:[],
          columIssued:[],
          workshopsxSchool:[],
          availableWorkshop:[],
          workshopLevelCode:[],
          workshopGradeCode:[],
          workshopClassroomCode:[],
          workshopContentCode:[],
          workshopTypeCode:[],
          schools:[],
          formNot:{not:'',tit:'',},
          dates:[],
          stateRequest:[],
          semester:[],
          rotationsReceived:[],
          jobs:[],
          flagWorkshops: false,
          flagWorkshopDetails: true,
          rotationsIssued:[],
          formVolunteer:{},


      }),
     async  created () {
          this.isLoading=true;
          await this.getSessionStorage();
          this.school =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id})
          this.idSchool= this.school.AssignmentRecords[0].School.id,
          await this.listJobs();
          await this.listRotations();
          await this.setHeadTable();
          await this.listWorkshopsxSchool();
          this.isLoading=false;

  		},
      methods: {
        async shownotificacion(){
            $('.bs-example-modal-not').modal('show');

        },
        async listJobs(){
            var response = await consultServices('getJobs','POST',{category:'JUNIOR'});
            this.jobs= []
            for (var j = 0; j < response.length; j++) {
               if(response[j].code != 'SCHOOL_PARTICIPANT'){
                   this.jobs.push(response[j])
               }                
            }
        },


        async getSessionStorage(){
            this.isLoading = true;
            //validar si existen los atributos en sessionStorage
            //si no existen y son masterValues, agregar idMaster a ids
                var ids = [] ;
                var flagStateRequest = false;
                var flagTypeRequest = false;
                var flagWorkshopLevelCode = false; 
                var flagWorkshopGradeCode = false; 
                var flagWorkshopContentCode = false;
                var flagWorkshopTypeCode = false;
                var flagWorkshopClassroomCode = false;
             
               
            if(!window.sessionStorage.semester){
                const response =  await consultServices('getCurrentSemester','POST', {});
                this.semester = response;
                window.sessionStorage.semester  = JSON.stringify(this.semester);
            }
            if(!window.sessionStorage.workshopLevelCode){
                ids.push(10);
                flagWorkshopLevelCode = true;
            }
            if(!window.sessionStorage.workshopGradeCode){
                ids.push(11);
                flagWorkshopGradeCode = true;
            }
            if(!window.sessionStorage.flagWorkshopClassroomCode){
                ids.push(12);
                flagWorkshopClassroomCode = true;
            }
            if(!window.sessionStorage.workshopContentCode){
                ids.push(13);
                flagWorkshopContentCode = true;
            }
            if(!window.sessionStorage.workshopTypeCode){
                ids.push(14);
                flagWorkshopTypeCode = true;
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

            if( ids.length > 0){

            //Hacer consulta única de masterValues
                var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                console.log("array  ",arrayMasters);
                //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                if(flagWorkshopLevelCode == true){
                    this.workshopLevelCode = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
                    window.sessionStorage.workshopLevelCode  = JSON.stringify(this.workshopLevelCode);
                }
                if(flagWorkshopGradeCode == true){
                    this.workshopGradeCode = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                    window.sessionStorage.workshopGradeCode  = JSON.stringify(this.workshopGradeCode);
                }
                if(flagWorkshopClassroomCode == true){
                    this.workshopClassroomCode = _.filter(arrayMasters, function(master) {return master.idMaster == 12; })
                    window.sessionStorage.workshopClassroomCode  = JSON.stringify(this.workshopClassroomCode);
                }
                if(flagWorkshopContentCode == true){
                    this.workshopContentCode = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
                    window.sessionStorage.workshopContentCode  = JSON.stringify(this.workshopContentCode);
                }
                if(flagWorkshopTypeCode == true){
                    this.workshopTypeCode = _.filter(arrayMasters, function(master) {return master.idMaster == 14; })
                    window.sessionStorage.workshopTypeCode  = JSON.stringify(this.workshopTypeCode);
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
                this.workshopLevelCode =JSON.parse( window.sessionStorage.workshopLevelCode );
                this.workshopClassroomCode =JSON.parse( window.sessionStorage.workshopClassroomCode );  
                this.workshopContentCode =JSON.parse( window.sessionStorage.workshopContentCode );
                this.workshopTypeCode =JSON.parse( window.sessionStorage.workshopTypeCode );                
                this.workshopGradeCode =JSON.parse( window.sessionStorage.workshopGradeCode ); 
                this.semester =JSON.parse( window.sessionStorage.semester );
                this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                this.typeRequest =JSON.parse( window.sessionStorage.typeRequest );
                //fin de la carga de arreglos para la pantalla
                this.schools=await consultServices('listSchools','POST',{});

            this.isLoading = false;
        },
        async listRotations() {
            await this.listRotationsIssued();
            await this.listRotationsReceived();
        },
        async listWorkshopsxSchool(){
              var response=await consultServices('getRooms','POST',{id: this.idSchool, semesterCode: this.semester.id});
              this.workshopsxSchool = _.cloneDeep(response)
        },
        async listWorkshopsxRole(){
                
            console.log('rol:::::::::::::::', this.formVolunteer.newRole)

            var json={
            id:'',requestedWorkshopDisplayName:'',displayValue:'',
            }
            var type = '';
            var grade = '';
            var classroom = '';
            var level = '';
            var workshops= [];

            //si el rol no es de operaciones 
            if(this.formVolunteer.newRole != 'SCHOOL_OPERATIONS'){
                console.log('es distino a SCHOOL_OPERATIONS')
                document.getElementById('divWorkshops').style.display = "block";
            
                //listar todos los talleres 
                const response = _.cloneDeep(this.workshopsxSchool)

                for (let index = 0; index < response.length; index++) {          
                    grade = this.getDisplayValue(response[index].gradeCode,11)
                    classroom = this.getDisplayValue(response[index].classroomCode,12)
                    level = this.getDisplayValue(response[index].levelCode,10)

                    if(response[index].typeCode == 'WORKSHOP_MATH'){
                    json={
                        id:response[index].id,
                        requestedWorkshopDisplayName:response[index].displayName,
                        displayValue: grade + " " + classroom + " - " + level,
                        typeCode:response[index].typeCode,
                    } 
                    }
                    if(response[index].typeCode == 'WORKSHOP_CUSTOM'){
                    json={
                        id:response[index].id,
                        requestedWorkshopDisplayName:response[index].displayName,
                        displayValue:  response[index].displayName +" - " + level,
                        typeCode:response[index].typeCode
                    } 
                    }

                    workshops.push(json)
                    
                }                
                //
                this.availableWorkshop = []

                //si el rol es divertimate
                if(this.formVolunteer.newRole == 'SCHOOL_MATH'){
                    for (let index = 0; index < workshops.length; index++) {
                    if(workshops[index].typeCode == 'WORKSHOP_MATH'){
                        console.log('push a math')
                    this.availableWorkshop.push(workshops[index])
                    }            
                    }          
                }
                //si el rol es taller 
                if(this.formVolunteer.newRole == 'SCHOOL_CUSTOM'){
                    for (let index = 0; index < workshops.length; index++) {
                    if(workshops[index].typeCode == 'WORKSHOP_CUSTOM'){
                        console.log('push a custom')
                    this.availableWorkshop.push(workshops[index])
                    }            
                    }          
                }
                console.log("workXschool:  ",this.availableWorkshop);

                if(this.availableWorkshop.length == 0){
                    document.getElementById('divMessage').style.display = "block"
                    document.getElementById('divAvailableWorkshops').style.display = "none"
                }else{
                    document.getElementById('divMessage').style.display = "none" 
                    document.getElementById('divAvailableWorkshops').style.display = "block" 
                }   

            }else{
                console.log('es SCHOOL_OPERATIONS')
                document.getElementById('divWorkshops').style.display = "none";                     
            }
        },

        async listRotationsIssued() {
            const responseRotationsIssued = await consultServices('listRotations','POST',{typeRotation: 'ROTATION_ISSUED', idSchool:this.idSchool});
            this.setDataTable(responseRotationsIssued,'ROTATION_ISSUED');
        },
        async listRotationsReceived() {
            const responseRotationsReceived = await consultServices('listRotations','POST',{typeRotation: 'ROTATION_RECEIVED', idSchool:this.idSchool});
            this.setDataTable(responseRotationsReceived,'ROTATION_RECEIVED');
        },

        async removeRequest(item) {
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la solicitud seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeRequest','POST',form);
                        this.listRotations();
                        this.isLoading=false;
                }
         },




        setHeadTable(){
            this.columReceived = [
                {label:'Creando solicitante' ,name:'volunteer' ,find:0 ,sort:0},
                {label:'Escuela de procedencia' ,name:'schoolOrigin' ,find:0 ,sort:0},
                {label:'Rol en la escuela de procedencia' ,name:'job' ,find:0 ,sort:0},
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},
                {label:'Estado de solicitud' ,name:'state' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];

           this.columIssued = [
                {label:'Creando solicitante' ,name:'volunteer' ,find:0 ,sort:0},
                {label:'Escuela de destino' ,name:'schoolOrigin' ,find:0 ,sort:0},
                {label:'Rol en la escuela de origen' ,name:'job' ,find:0 ,sort:0},
                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},
                {label:'Estado de solicitud' ,name:'state' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];    
          
        },


        refreshData(type) {
            if(type == "ROTATION_ISSUED" ){                
               this.$refs.tableMafIssued.formatData(this.rotationsIssued);
               console.log(" solicitudes emitidas: ",this.rotationsIssued);
            }
            if(type == "ROTATION_RECEIVED"){
                this.$refs.tableMafReceived.formatData(this.rotationsReceived);
               console.log(" solicitudes recibidas: ",this.rotationsReceived);
            }

        },


        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 10){
                array= this.workshopLevelCode
            }
            if(master == 11){
                array= this.workshopGradeCode
            }
            if(master == 12){
                array= this.workshopClassroomCode
            }
            if(master == 13){
                array= this.workshopContentCode
            }
            if(master == 14){
                array= this.workshopTypeCode
            }
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
            this.requests = [];

            if(type == "ROTATION_RECEIVED"){
                this.rotationsReceived = []   
                arrayData.forEach(item => {
                var request = {};
                var name = item.AssignmentRecord.VolunteerJob.Volunteer.name == null ? name="" : item.AssignmentRecord.VolunteerJob.Volunteer.name;
                var lastName = item.AssignmentRecord.VolunteerJob.Volunteer.lastName == null ? lastName="" : item.AssignmentRecord.VolunteerJob.Volunteer.lastName;
                var secondLastName = item.AssignmentRecord.VolunteerJob.Volunteer.secondLastName == null ? secondLastName="" : item.AssignmentRecord.VolunteerJob.Volunteer.secondLastName;
                
                    request.volunteer =  name.concat(" ", lastName," ", secondLastName);
                    request.schoolOrigin =  item.AssignmentRecord.School.name;
                    request.job = item.AssignmentRecord.VolunteerJob.Job.name;
                    request.state=
                        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}
                        {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud rechazada</button> :null}
                        {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}
                        </font></font>;
                    request.creationDate= moment(item.initialDate).format('DD/MM/YYYY');
                    //request.closeDate=item.closeDate == null ? request.closeDate = "Aún no finalizada" :   request.closeDate=moment(item.closeDate).format('DD/MM/YYYY');

                    request.actions=
                        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        {item.statusCode == 'REQUEST_APPROVED'? " " :null}
                        {item.statusCode == 'REQUEST_DISAPPROVED'? " " :null}                        
                        {item.statusCode == 'REQUEST_PENDING'? <div> <div> <button onClick={()=>ctx.showVolunteer(item)} data-toggle="modal" data-target=".modal-volunteer" type="button" class="btn btn-success btn-xs"> Aprobar </button></div>
                        <div> <button onClick={()=>ctx.disapproved(item)}   type="button" class="btn btn-danger btn-xs"> Rechazar </button></div></div>:null}
                        </font></font>;


                this.rotationsReceived.push(request);
                //{item.statusCode == 'REQUEST_PENDING'? <div> <div> <button onClick={()=>ctx.approved(item)}   type="button" class="btn btn-success btn-xs"> Aprobar </button></div>
            });
            this.refreshData("ROTATION_RECEIVED");
            }

            if(type == "ROTATION_ISSUED"){
                this.rotationsIssued = []   
                arrayData.forEach(item => {
                    var request = {};
                    var name = item.AssignmentRecord.VolunteerJob.Volunteer.name == null ? name="" : item.AssignmentRecord.VolunteerJob.Volunteer.name;
                    var lastName = item.AssignmentRecord.VolunteerJob.Volunteer.lastName == null ? lastName="" : item.AssignmentRecord.VolunteerJob.Volunteer.lastName;
                    var secondLastName = item.AssignmentRecord.VolunteerJob.Volunteer.secondLastName == null ? secondLastName="" : item.AssignmentRecord.VolunteerJob.Volunteer.secondLastName;
                    

                        request.volunteer =  name.concat(" ", lastName," ", secondLastName);
                        var destinationSchool = _.find(this.schools, (object) => { return object.id == item.idDestinationSchool }); 
                        request.schoolOrigin = destinationSchool.name
                        request.job = item.AssignmentRecord.VolunteerJob.Job.name;
                        request.state=
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud rechazada</button> :null}
                            {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}
                            </font></font>;
                        request.creationDate= moment(item.initialDate).format('DD/MM/YYYY');
                        //request.closeDate=item.closeDate == null ? request.closeDate = "Aún no finalizada" :   request.closeDate=moment(item.closeDate).format('DD/MM/YYYY');


                        request.actions=
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_APPROVED'? " " :null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'? " " :null}
                            {item.statusCode == 'REQUEST_PENDING'? <div><div> <button onClick={()=>ctx.delete(item)}   type="button" class="btn btn-danger btn-xs"> Cancelar solicitud </button></div></div> : null}
                            </font></font>;


                    this.rotationsIssued.push(request);
                });
                this.refreshData("ROTATION_ISSUED");
            }
        
        },

        showVolunteer(item){
            console.log("review item :::::::::::::::::::::", item)
            this.formVolunteer={}
            item.AssignmentRecord.VolunteerJob.Job.code == 'SCHOOL_OPERATIONS'? this.flagWorkshopDetails = false : this.flagWorkshopDetails = true;
            var name = item.AssignmentRecord.VolunteerJob.Volunteer.name
            var lastname = item.AssignmentRecord.VolunteerJob.Volunteer.lastName != null? lastname=item.AssignmentRecord.VolunteerJob.Volunteer.lastName : lastname = ''
            var secondLastName = item.AssignmentRecord.VolunteerJob.Volunteer.secondLastName != null? secondLastName=item.AssignmentRecord.VolunteerJob.Volunteer.secondLastName : secondLastName = ''
            this.formVolunteer.fullName = name+' '+lastname+' '+secondLastName
            this.formVolunteer.job = item.AssignmentRecord.VolunteerJob.Job.name
            this.formVolunteer.schoolName = item.AssignmentRecord.School.name
            this.formVolunteer.reason=item.reason
            this.formVolunteer.newRole = null;// item.AssignmentRecord.VolunteerJob.Job.code;
            this.formVolunteer.workshop = null;
            if(item.Workshop){
                this.formVolunteer.contentCode = this.getDisplayValue(item.Workshop.contentCode, 13);
                this.formVolunteer.typeWorkshop = this.getDisplayValue(item.Workshop.typeCode, 14);
                this.formVolunteer.levelCode = this.getDisplayValue(item.Workshop.levelCode, 10);
            }
            this.formVolunteer.requestedWorkshopDisplayName = item.AssignmentRecord.requestedWorkshopDisplayName;
            this.formVolunteer.idWorkshopAct = item.idWorkshop;
            this.formVolunteer.codeJobAct = item.AssignmentRecord.VolunteerJob.Job.code;
            this.formVolunteer.id = item.id;
            this.formVolunteer.schoolName = item.AssignmentRecord.School.name;   
            this.formVolunteer.idAssignmentRecord = item.AssignmentRecord.id;
            this.formVolunteer.idDestinationSchool= item.idDestinationSchool;
            this.formVolunteer.idVolunteerJob = item.AssignmentRecord.VolunteerJob.id;
            $('.bs-example-modal-volunteer').modal('show');
        },

        async approved(){
            console.log('formVolunteer::::::', this.formVolunteer)

            if(!this.formVolunteer.newRole || !this.formVolunteer.workshop ){
                this.formNot.title="Campos incompletos"; this.formNot.not="Complete todos los campos para la reasignación."            
                //$('.modal').modal('hide');
                this.shownotificacion();
            }else{            
                var flag= confirm("¿Aprobar rotación de creando?");
                if(flag==true){           
                var form={}            
                form.id = this.formVolunteer.id;
                form.idAssignmentRecord = this.formVolunteer.idAssignmentRecord;
                form.idDestinationSchool = this.formVolunteer.idDestinationSchool;
                form.approved = true;
                console.log("form ;::::::::::::::::::::::::::::" , form)
                const response=  await consultServices('updateRotation','POST',form);
                //con la rotación aprobada, reasignar
                //actualizar assignmentRecord
                var jsonAssignment={}
                jsonAssignment.id= this.formVolunteer.idAssignmentRecord

                if(this.formVolunteer.newRole == 'SCHOOL_OPERATIONS'){
                    jsonAssignment.idWorkshop= null
                    jsonAssignment.requestedWorkshopDisplayName = null
                }else{
                    jsonAssignment.idWorkshop= this.formVolunteer.workshop.id 
                    jsonAssignment.requestedWorkshopDisplayName = this.formVolunteer.workshop.requestedWorkshopDisplayName

                }
                console.log("jsonAssignment:::::::::::::::::::::::::::",jsonAssignment )  
                const response1=  await consultServices('updateAssignmentRecord','POST',jsonAssignment);

                var jsonVolunteerJob={}
                jsonVolunteerJob.id = this.formVolunteer.idVolunteerJob
                var job = _.find(this.jobs, (object) => { return object.code == this.formVolunteer.newRole }); 
                jsonVolunteerJob.idJob = job.id
                const response2=  await consultServices('updateJobVolunteerJob','POST',jsonVolunteerJob);
                console.log("jsonVolunteerJob:::::::::::::::::::::::::::",jsonVolunteerJob )  

                if(response.message && response1.status==200 && response2.status == 200){
                    this.formNot.title="Reasignación exitosa "; this.formNot.not="Se ha reasignado al creando." 
                }else{
                    this.formNot.title="Error en la operación"; this.formNot.not="No se pudo reasignar al creando."
                }
                $('.modal').modal('hide');
                this.shownotificacion();
                this.listRotations();

                }
            }


        },

        async disapproved(item){
            console.log("desaprobado  ",item)
            var flag= confirm("¿Desaprobar rotación de creando?");
            if(flag==true){
            var form={}
            form.id= item.id;
            form.idAssignmentRecord = item.AssignmentRecord.id;
            form.idDestinationSchool = item.idDestinationSchool;
            form.approved = false;
                        const response=  await consultServices('updateRotation','POST',form);
            if(response.message){
                this.formNot.title="Solicitud resuelta "; this.formNot.not="Rotación rechazada"                    
                this.formRequest={};
            }else{
                this.formNot.title="Error en la operación  "; this.formNot.not="No se pudo actualizar  la solicitud de manera exitosa"
            }
            $('.modal').modal('hide');
            this.shownotificacion();
            this.listRotations();
            }
        },

        async delete(item){
            var flag = confirm("¿Anular la rotación del voluntario?");
            if(flag==true){
                var form={}
                form.id = item.id;
                const response =  await consultServices('removeRotation','POST',form);
                if(response.message){
                    this.formNot.title = "Solicitud resuelta "; this.formNot.not="Rotación anulada"                    
                    this.formRequest = {};
                }else{
                    this.formNot.title="Error en la operación  "; this.formNot.not="No se pudo actualizar la solicitud."
                }
                $('.modal').modal('hide');
                this.shownotificacion();
                this.listRotations();
            }
        },

        closeModalSafety(css) {
            $(css).modal('hide');
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
