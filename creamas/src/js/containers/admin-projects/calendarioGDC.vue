<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2 v-if="selectedProject == false">Agregar evento al calendario del proyecto seleccionado </h2>
                    <h2 v-if="selectedProject == true">Cronograma {{project.name}} </h2>
                    <div class="card-header-actions" v-if="selectedProject == false">
                        <button v-if="form.project!=''" type="button" @click="showAddActivity()" data-toggle="modal" data-target=".modal-Activity" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar Fecha
                        </button>
                    </div> 
                    <div class="clearfix"></div>
                </div>

                <div  class="card-body">

                    <div class="form-group" v-if="selectedProject == false" >
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el programa:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control"  v-model="form.project"  @change="onChangeSchool()">
                            <option disabled="disabled" value="">Selecciona un proyecto</option>
                            <option v-for="item in projects" v-bind:value="item.id" >
                            {{item.name}}
                            </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group" v-if="selectedProject == true">
                        <div class="col-md-10 col-sm-12 col-xs-12"  >
                            <h1 style="padding-left: 5px;"> Aquí podrás gestionar los eventos del proyecto. Pueden ser de assessment, participación o tareas. </h1>
                        </div>     
                        <div class="col-md-2 col-sm-12 col-xs-12">
                            <button v-if="form.project!=''" type="button" @click="showAddActivity()" data-toggle="modal" data-target=".modal-Activity" class="btn btn-success btn-xs" style="float: right;"><i class="fa fa-plus" ></i> Agregar Evento
                            </button>
                        </div>
                    </div>

                    <TableMaf :header="colum" :data="schoolEvents" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

                </div> <!--card-body-->

                <!--Modal Actividades-->
                <div class="modal fade modal-Activity" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Crear Evento</h3>
                            <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar Evento</h3>
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>

                        </div>
                        <div class="modal-body">
                          <div class="card">
                            <div class="card-body">
                                <div v-if="formType=='ADD'" class="form-group">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de evento:</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                      <!-- <select class="form-control"  v-model="formActivity.SchoolManagementEventType" >
                                      <option disabled="disabled" value="">Selecciona el tipo de evento</option>
                                      <option v-for="item in eventTypes" v-bind:value="item" >
                                        {{getDisplayValue(item.descriptionCode,20)  }}
                                      </option>
                                      </select> -->
                                      <treeselect v-model="formActivity.SchoolManagementEventType" :multiple="false" :options="options" />
                                  </div>
                                </div>
                                <div v-if="formType=='EDIT'" class="form-group">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Editar Tipo de evento:</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                        <!-- <select class="form-control"  v-model="SchoolManagementEventType.descriptionCode" >
                                        <option disabled="disabled" value="">Selecciona el tipo de evento</option>
                                        <option v-for="item in eventTypes" v-bind:value="item.descriptionCode" >
                                            {{getDisplayValue(item.descriptionCode,20)  }} 
                                        </option>
                                        </select> -->
                                        <treeselect v-model="SchoolManagementEventType.descriptionCode" :multiple="false" :options="options" />
                                  </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre público:</label>
                                     <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text"  v-model="formActivity.desktopName" class="form-control col-md-12 col-xs-12" >
                                    </div>
                                </div>
                                <div class="form-group">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <!-- <Datetime type="date" format="dd/MM/yyyy" zone="America/New_York" value-zone="America/New_York" :phrases="{ok:'Seleccionar',cancel:'Cancelar'}" v-model="formActivity.startDate" ></Datetime> -->
                                    <DatePicker class="col-md-8 col-sm-8 col-xs-12" mode="date" 
                                    :value="new Date(formActivity.startDate)" v-model="formActivity.startDate" :masks="masks"/>
                                  </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Descripción del evento:</label>
                                     <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" v-model="formActivity.descriptionDetail" class="form-control col-md-12 col-xs-12" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Obligatorio para seniors:</label>
                                     <div class="col-md-3 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formActivity.isSeniorRequired" >
                                            <option value=true>Si</option>
                                            <option value=false>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Obligatorio para nuevos:</label>
                                     <div class="col-md-3 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formActivity.isJuniorRequired" >
                                            <option value=true>Si</option>
                                            <option value=false>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Obligatorio para divertimate:</label>
                                     <div class="col-md-3 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formActivity.isMathRequired" >
                                            <option value=true>Si</option>
                                            <option value=false>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Obligatorio para Talleres:</label>
                                     <div class="col-md-3 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formActivity.isCustomRequired" >
                                            <option value=true>Si</option>
                                            <option value=false>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Obligatorio para operaciones:</label>
                                     <div class="col-md-3 col-sm-6 col-xs-12">
                                        <select class="form-control" v-model="formActivity.isOperationsRequired" >
                                            <option value=true>Si</option>
                                            <option value=false>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>

                        <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-danger">Cancelar</button>
                                <button v-if="formType=='ADD'" type="button" class="btn btn-success" @click="createEvent()">Confirmar</button>
                                <button v-if="formType=='EDIT'" data-dismiss="modal" @click="updateEvent()" type="button" class="btn btn-primary">Guardar cambios</button>
                            </center>
                        </div>
                        </div>
                    </div>
                </div>
                <!--Modal Actividades-->



            </div> <!--card-->
        </div> <!--col 12 -->
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
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import _ from 'lodash';
    import moment from 'moment';
    // import { Datetime } from 'vue-datetime';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import DatePicker from 'v-calendar/lib/components/date-picker.umd'

    import TableMaf from "./../../components/TableMaf.vue";
    import Message from "./../../components/MessageConfirmation.vue";
    import Treeselect from '@riophae/vue-treeselect';

  export default {
        name: "CalendarioGDC",
        components: {
            LoadingComponent,
            // Datetime,
            TableMaf,
            Message,
            Treeselect,
            DatePicker,
        },

        data: () => ({
        masks: {
            input: 'DD/MM/YYYY',
        },
        colum:[],
        calendar:[],
        projects:[],
        formActivity:{
        },
        formType: '',
        titleTable:'',
        titleMessage:'',
        messageBody:'',
        isLoading:false,
        form:{project:''},
        events:[],
        schoolEvents:[],
        semester:[],
        eventTypes:[],
        formNot:{not:'',tit:'',},
        SchoolManagementEventType:{
        },
        selectedProject: false,
        project: null,
        value: null,
        options: [ ],

        }),

        async created () {            
            this.isLoading=true;
            await this.getSessionStorage();
            await this.searchProjects();
            this.setHeadTable();
            //Setear arreglo de opciones
            this.setOptionsArray();
            //Validar si se recibe un id de proyecto como parámetro
            var urlParams = new URLSearchParams(window.location.search);
            var myParam = urlParams.get('idProject');
            if(myParam){
                this.selectedProject= true
                this.form.project =  myParam
                //Capturar la info del proyecto seleccionado
                var auxProject = _.find(this.projects, (school) =>{
                return school.id == myParam;
                });
                this.project= auxProject
                this.getSchoolEvents();
            }
            this.isLoading=false;
        },

        methods: {
            async searchProjects(){
                this.projects = await consultServices('searchProjects','POST',{});
            },
            async getSessionStorage(){
                this.isLoading = true;
                 var ids = [] ;
                 var flagEvents = false;
                 var flagEventTypes = false;

                if(!window.sessionStorage.events){
                  ids.push(20);
                  flagEvents = true;
                }

                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                // if(!window.sessionStorage.schools){
                //   this.schools=await consultServices('searchProjects','POST',{});
                //   window.sessionStorage.schools  = JSON.stringify(this.schools);
                // }
                if(!window.sessionStorage.eventTypes){
                  this.eventTypes=await consultServices('getAllTypes','POST',{});
                  window.sessionStorage.eventTypes  = JSON.stringify(this.eventTypes);
                }

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    if(flagEvents == true){
                       this.events = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                       window.sessionStorage.events  = JSON.stringify(this.events);
                    }
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla

                }

                //this.schools =JSON.parse( window.sessionStorage.schools );
                this.eventTypes =JSON.parse( window.sessionStorage.eventTypes );
                this.semester =JSON.parse( window.sessionStorage.semester );
                this.events =JSON.parse( window.sessionStorage.events );
                //fin de la carga de arreglos para la pantalla

                this.isLoading = false;
            },

            async showAddActivity(){
                this.formType = "ADD";
                this.formActivity = {
                  isSeniorRequired:true,
                  isJuniorRequired:true,
                  isMathRequired:true,
                  isCustomRequired:true,
                  isOperationsRequired:true,
                };
            },

            setOptionsArray(){
                console.log('setOptionsArray ', this.eventTypes)
                var option1={}
                var option2={
                    id: 'Participation',
                    label: 'Participación',
                    children: [],
                }
                var option3={}  
                var participations=[]
                for (var index = 0; index < this.eventTypes.length; index++) {
                    if(this.eventTypes[index].descriptionCode=='WORKSHOP_EVENT_ASSESSMENT'){
                        option1.id = this.eventTypes[index].id
                        option1.descriptionCode = this.eventTypes[index].descriptionCode
                        option1.label= this.getDisplayValue(this.eventTypes[index].descriptionCode,20)
                        console.log('option1 ', option1)
                    }
                    else if(this.eventTypes[index].descriptionCode=='WORKSHOP_EVENT_TASK'){
                        option3.id = this.eventTypes[index].id
                        option3.descriptionCode = this.eventTypes[index].descriptionCode
                        option3.label= this.getDisplayValue(this.eventTypes[index].descriptionCode,20)
                        console.log('option3 ', option3)
                    }else{
                            var obj={}
                            obj.id= this.eventTypes[index].id
                            obj.descriptionCode= this.eventTypes[index].descriptionCode
                            obj.label= this.getDisplayValue(this.eventTypes[index].descriptionCode,20)
                            participations.push(obj)
                    } 
                }
                option2.children= participations
                this.options.push(option1)
                this.options.push(option2)
                this.options.push(option3)
                console.log('options ', this.options)
            },

            //editar Actividad
            async showEditModal(item) {
                this.formType = "EDIT";
                this.formActivity=item
                this.formActivity.startDate = moment(item.startDate).utcOffset('-0500').toDate();
                this.SchoolManagementEventType["descriptionCode"]=item.idType//item.SchoolManagementEventType.descriptionCod;
                // console.log("+++++++++++++++++++++ ",this.SchoolManagementEventType)
            },

            setHeadTable(){
            this.colum = [
                {label:'Nombre' ,name:'desktopName' ,find:1 ,sort:1},
                {label:'Tipo de evento' ,name:'description' ,find:1 ,sort:1},
                {label:'Fecha' ,name:'startDate' ,find:1 ,sort:1},
                {label:'Inscritos' ,name:'inscribed' ,find:1 ,sort:1},
                {label:'Asistentes' ,name:'attendees' ,find:1 ,sort:1},
                // {label:'Senior' ,name:'isSeniorRequired' ,find:1 ,sort:1},
                // {label:'Nuevo' ,name:'isJuniorRequired' ,find:1 ,sort:1},
                // {label:'Divertimate' ,name:'isMathRequired' ,find:1 ,sort:1},
                // {label:'Talleres' ,name:'isCustomRequired' ,find:1 ,sort:1},
                // {label:'Operaciones' ,name:'isOperationsRequired' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Eventos:";
            },

            refreshData(){
                this.$refs.tableMaf.formatData(this.schoolEvents);
            },
            searchDescription(description){
                console.log("des  ",this.events);
                for (let index = 0; index < this.events.length; index++) {
                  if(this.events[index].code == description){
                      return this.events[index].displayValue;
                  }

                }
            },

            setDataTable(arrayData){
                this.schoolEvents=[];
                arrayData.forEach(item => {
                   var senior="";
                   var junior="";
                   var math="";
                   var custom="";
                   var operations="";
                   var attendances = item.Attendances
                   if(item.isSeniorRequired == true ){senior="Obligatorio"}else{senior="Opcional" };
                   if(item.isJuniorRequired == true ){junior="Obligatorio"}else{junior="Opcional" };
                   if(item.isMathRequired == true ){math="Obligatorio"}else{math="Opcional" };
                   if(item.isCustomRequired == true ){custom="Obligatorio"}else{custom="Opcional" };
                   if(item.isOperationsRequired == true ){operations="Obligatorio"}else{operations="Opcional" };

                   let _event={};
                    _event.description=this.searchDescription(item.SchoolManagementEventType.descriptionCod);
                    // var d = new Date(item.startDate);
                    // var d = new Date(1489199400000);
                    
                    // console.log('d', d)
                    // console.log('d', d.toString())
                    // const year = d.getFullYear()
                    // const date = d.getDate() 
                    // const month = d.getMonth()+1 
                    // _event.displayStartDate = `${date}/${month}/${year}`
                    var attendees=[]
                    for (var q = 0; q < attendances.length; q++) {
                        if(attendances[q].statusCode == 'ATTENDANCE_ATTENDED'){
                            attendees.push(attendances[q])
                        }                       
                    }
                    _event.inscribed = attendances.length
                    _event.attendees = attendees.length
                    _event.startDate = item.startDate
                    console.log('fecha', _event.startDate)
                    
                    _event.isSeniorRequired=senior;
                    _event.isJuniorRequired=junior;
                    _event.isMathRequired=math;
                    _event.isCustomRequired=custom;
                    _event.desktopName=item.desktopName;
                    _event.isOperationsRequired=operations;
                    _event.actions = <div class="d-flex justify-content-around">
                        <div> <button onClick={()=>this.showEditModal(item)} type="button" class="btn btn-warning btn-xs" data-target=".modal-Activity" data-toggle="modal"><i class="icon-pencil"></i></button> </div>
                        <div> <button  class="btn btn-danger btn-xs" onClick={()=>this.deleteEvent(item)} ><i class="icon-trash"></i></button> </div> </div>;
                    this.schoolEvents.push(_event);

                });
                this.refreshData();
            },
            async  onChangeSchool(){
               this.getSchoolEvents();
            },
            /**
             * createEvent: Registra un nuevo evento
             */
            async createEvent() {
                // console.log('Nuevo createEvent')
                this.isLoading = true;
                var event = _.find(this.eventTypes, (ev) =>{
                    return ev.id == this.formActivity.SchoolManagementEventType;
                });
                // console.log('event: ', event)

                if(event && this.formActivity.startDate && this.formActivity.descriptionDetail && this.formActivity.desktopName){
                    var form = {
                        // startDate:this.formActivity.startDate,
                        startDate: moment(this.formActivity.startDate).utcOffset('-0500').valueOf(),
                        isSeniorRequired:this.formActivity.isSeniorRequired,
                        isJuniorRequired:this.formActivity.isJuniorRequired,
                        isMathRequired:this.formActivity.isMathRequired,
                        isCustomRequired:this.formActivity.isCustomRequired,
                        isOperationsRequired:this.formActivity.isOperationsRequired,
                        semesterCode:this.semester.id,
                        descriptionCode:event.descriptionCode,//this.formActivity.SchoolManagementEventType.descriptionCode,
                        descriptionDetail:this.formActivity.descriptionDetail,
                        id:this.form.project,
                        idType : event.id, // this.formActivity.SchoolManagementEventType.id
                        desktopName: this.formActivity.desktopName
                    }
                    console.log('Fecha en bruto: ', this.form.startDate )
                    console.log('Todo ok, vamos a crear: ', form)
                    const response = await consultServices('createEvent','POST',form);
                    if(!response.message){
                        this.formNot.tit="Registro exitoso "; this.formNot.not="Se registró un nuevo evento de manera correcta"
                        this.formActivity={}
                        $('.modal').modal('hide');
                        this.showAddActivity();
                        this.getSchoolEvents();
                    }else{
                        this.formNot.tit="Error en operación";
                        this.formNot.not=creditUpdated.message;  
                    }
                }else{
                    this.formNot.not="Por favor complete los campos obligatorios";
                    this.formNot.tit="Campos incompletos"
                }
                this.isLoading = false;
                $('.bs-example-modal-not').modal('show');
            },
            // async createEvent(){
            //         //console.log('form act ',this.formActivity.SchoolManagementEventType )
            //         // var event = _.find(this.eventTypes, (event) =>{
            //         // return event.id == this.formActivity.SchoolManagementEventType;
            //         // });
            //         //console.log('event ', event)
            //         // var flag= confirm("¿Crear nuevo evento?");
            //         if(flag==true){
            //             // var form={
            //             //     startDate:this.formActivity.startDate,
            //             //     isSeniorRequired:this.formActivity.isSeniorRequired,
            //             //     isJuniorRequired:this.formActivity.isJuniorRequired,
            //             //     isMathRequired:this.formActivity.isMathRequired,
            //             //     isCustomRequired:this.formActivity.isCustomRequired,
            //             //     isOperationsRequired:this.formActivity.isOperationsRequired,
            //             //     semesterCode:this.semester.id,
            //             //     descriptionCode:event.descriptionCode,//this.formActivity.SchoolManagementEventType.descriptionCode,
            //             //     descriptionDetail:this.formActivity.descriptionDetail,
            //             //     id:this.form.project,
            //             //     idType : event.id, // this.formActivity.SchoolManagementEventType.id
            //             // }
            //         } 
            //         console.log("form ",form)
            //         const response=await consultServices('createEvent','POST',form); 
                    
            //         if(response.status == 200){
            //             this.formNot.tit="Registro exitoso "; this.formNot.not="Se registró un nuevo evento de manera correcta"
            //             this.formActivity={}
            //             this.showAddActivity();
            //             this.getSchoolEvents();
                        
            //         }
            //         else if(response.status == 400){ 
            //             this.formNot.tit="Error al crear un nuevo evento "; this.formNot.not=response.message;
            //         }
            //         $('.modal').modal('hide');
            //         this.shownotificacion();
                  
            // },
            //actualizar updateEvent
            async updateEvent() {
                this.isLoading=true;
                var form ={};
                //obtener el registro con el descriptionCode capturado
                console.log('update 1 ', this.SchoolManagementEventType.descriptionCode)
                var typeUpdate={}
                for (let index = 0; index < this.eventTypes.length; index++) {
                    if(this.eventTypes[index].id == this.SchoolManagementEventType.descriptionCode  ){
                        typeUpdate = this.eventTypes[index]
                    }                    
                }
                //actualizar el tipo de evento 
                this.formActivity.SchoolManagementEventType = typeUpdate;

                if(this.formActivity.id==''||!this.formActivity.SchoolManagementEventType||!this.formActivity.startDate){  

                    this.formNot.prob="Se deben llenar todos los campos";
                    this.shownotificacion();
                    this.isLoading=false

                } else {

                    var flag= confirm("¿Seguro que desea actualizar el evento?");
                    if(flag==true){

                        var form={
                            id:this.formActivity.id,
                            startDate:this.formActivity.startDate,
                            startDate: moment(this.formActivity.startDate).utcOffset('-0500').valueOf(),
                            isSeniorRequired:this.formActivity.isSeniorRequired,
                            isJuniorRequired:this.formActivity.isJuniorRequired,
                            isMathRequired:this.formActivity.isMathRequired,
                            isCustomRequired:this.formActivity.isCustomRequired,
                            isOperationsRequired:this.formActivity.isOperationsRequired,
                            semesterCode:this.semester.id,
                            descriptionCode:this.formActivity.SchoolManagementEventType.descriptionCode,
                            descriptionDetail:this.formActivity.descriptionDetail,
                            desktopName:this.formActivity.desktopName,
                            idType : this.formActivity.SchoolManagementEventType.id
                        }

                        const response0 = await consultServices('updateSchoolManagementEvent','POST',form);
                        // console.log("response ",response0)
                        //  console.log("response status ",response0.status)
                        if(response0.status == 200){
                            this.formNot.tit="Registro exitoso "; this.formNot.not="Evento actualizado"
                            this.formActivity={}
                            this.SchoolManagementEventType={}
                            this.showAddActivity();
                            this.getSchoolEvents();
                            
                        }
                        else if(response0.status == 400){
                            this.formNot.tit="Error al actualizar evento "; this.formNot.not=response.message;
                        }
                        $('.modal').modal('hide');
                        this.isLoading=false;
                        this.shownotificacion();
                    }

                }
            },
            async getSchoolEvents(){
                this.schoolEvents=[];
                    const response=await consultServices('getSchoolEvents','POST',{id:this.form.project, semesterCode:this.semester.id});
                    // console.log('MIRAR:',response)
                    if(response == null){
                      this.schoolEvents=[];                       
                    }
                    else if(response.SchoolManagementEvents){
                       this.schoolEvents=response.SchoolManagementEvents;
                    }
                    
                    console.log("resultado:  ", this.schoolEvents);
                    this.setDataTable(this.schoolEvents)
            },
             async deleteEvent(item){
                // console.log("item delete ", item)
                var flag=confirm("¿Eliminar el evento para el proyecto seleccionado?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeEvent','POST',form);
                        if(response0.status == 200){
                            this.getSchoolEvents();
                        }
                        else if(response0.status == 400){
                        this.formNot.tit="Error al actualizar evento "; this.formNot.not=response.message;
                        }
                        
                        this.isLoading=false;

                }
            },
            getDisplayValue(string, master){
            var array=[];
            var display="";
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
            async shownotificacion(){
                 $('.bs-example-modal-not').modal('show');
            },


        }
    }

</script>

<style scoped>
</style>
