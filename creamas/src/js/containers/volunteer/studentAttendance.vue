<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Asistencia de alumnos </h2>

                    <div class="clearfix">                      
                    </div>
                </div>
                
                <div class="card-body" v-if="show == true">
                  <div class="form-group" >
                     <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de la asistencia</label>
                     <div class="col-md-6 col-sm-6 col-xs-12">
                       <select @change="getStudentAttendances()" class="form-control" v-model="schoolEvent">
                           <option v-for="event in schoolEvents" v-bind:value="event"> {{ event.displayName }} </option>
                       </select>
                     </div>
                  </div>
                  <div class="card-header-actions" align-items: center>
                          <button  @click="exportExcel()" type="button" class="btn btn-success">Descargar lista </button>
                  </div>

                    <TableMaf :header="colum" :data="students" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>
                </div> <!--card-body-->

                <!--Modal Editar-->
                <div class="modal fade modal-Edit" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                            <h2>Editar información del alumno</h2>
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                          </div>

                          <div class="modal-body">

                            <!--Doc. Identidad-->
                            <div class="modal-body">
                              <inputMaf type='text' v-model="formStudent.documentNumber" :valueInput="formStudent.documentNumber"  label="Doc. Indentidad" :validation="{required:true, max:20}" nameInput="text" etiqueta='true' ref="inputDocumentNumber" >
                              </inputMaf>
                            </div>

                            <!--Apellido Paterno-->
                            <div class="modal-body">
                              <inputMaf type='text' v-model="formStudent.lastName" :valueInput="formStudent.lastName"  label="Apellido Paterno" :validation="{required:true, max:150}" nameInput="text" etiqueta='true' ref="inputLastName" >
                              </inputMaf>
                            </div>

                            <!--Apellido Materno-->
                            <div class="modal-body">
                              <inputMaf type='text' v-model="formStudent.secondLastName" :valueInput="formStudent.secondLastName"  label="Apellido Materno" :validation="{required:true, max:150}" nameInput="text" etiqueta='true' ref="inputSecondLastName" >
                              </inputMaf>
                            </div>

                            <!--Nombres Completos-->
                            <div class="modal-body">
                              <inputMaf type='text' v-model="formStudent.name" :valueInput="formStudent.name"  label="Nombres Completos" :validation="{required:true, max:150}" nameInput="text" etiqueta='true' ref="inputName" >
                              </inputMaf>
                            </div>

                            <div class="modal-body">
                              <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Genero</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formStudent.gender">
                                    <option value="M"> Masculino </option>
                                    <option value="F"> Femenino </option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div class="modal-body">
                              <div class="form-group">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha Nacimiento</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5" :phrases="{ok:'Seleccionar',cancel:'Cancelar'}"  v-model="formStudent.birthdate"></Datetime>
                                  </div>
                              </div>
                            </div>

                          </div>
                          <div class="card">
                                  <div class="card-header">
                                      <h2>Datos de los contactos</h2>
                                      <div class="clearfix"></div>
                                  </div>
                                  <div class="card-body">
                                          
                                          <!--Nombre contacto-->
                                          <div class="card-body">
                                              <inputMaf type='text' v-model="contact.name" :valueInput="contact.name"  label="Nombre completo:" :validation="{required:true, max:250}" nameInput="text" etiqueta='true' ref="inputContactName" >
                                              </inputMaf>
                                          </div>

                                              <!--Direccion contacto-->
                                          <div class="card-body">
                                              <inputMaf type='text' v-model="contact.address" :valueInput="contact.address"  label="Dirección" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputContactAddress" >
                                              </inputMaf>
                                          </div>

                                          <!--Relación contacto-->
                                          <div class="card-body">
                                              <inputMaf type='text' v-model="contact.relation" :valueInput="contact.relation"  label="Relación con el estudiante:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputContactRelation" >
                                              </inputMaf>
                                          </div>

                                          <!--Numero del contacto-->
                                          <div class="card-body">
                                          <inputMaf type='text' v-model="contact.phone" :valueInput="contact.phone"  label="Número telefónico del contacto" :validation="{required:true, numeric:true, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" >
                                          </inputMaf>

                                          </div>
                                          
                                          <div class="modal-footer">
                                            <button class="btn btn-primary" @click="newContact()">Agregar nuevo contacto</button>
                                          </div>
                                  </div>
                            
                                  <div class="col-md-12 col-sm-12 col-xs-12">
                                          <TableMaf :header="columModal" :data="emergencyContacts" :tableTitle="titleTable" :searchOption="false" :pagination="false" :datePerPageV="false"  :filter="false" :title="false" ref="tableMafModal"></TableMaf>
                                 
                                  </div>
                            </div>                          
                          <div class="card"><!--Sueño-->
                              <div class="card-header">
                                <h2>Sueños, gustos y ambiciones</h2>
                                <div class="clearfix"></div>
                              </div>
                              <div class="card-body">
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuál es su sueño?</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea v-model="formStudent.dream" class="form-control col-md-12 col-xs-12"></textarea>
                                  </div>
                                </div>
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué le gusta?</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea v-model="formStudent.likesTo" class="form-control col-md-12 col-xs-12"></textarea>
                                  </div>
                                </div>
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Qué no le gusta?</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea v-model="formStudent.dislikesTo" class="form-control col-md-12 col-xs-12"></textarea>
                                  </div>
                                </div>
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">¿Cuáles son sus ambiciones?</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea v-model="formStudent.ambitions" class="form-control col-md-12 col-xs-12"></textarea>
                                  </div>
                                </div>
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Otros datos</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea v-model="formStudent.other" class="form-control col-md-12 col-xs-12"></textarea>
                                  </div>
                                </div>                                
                              </div>
                          </div><!--Sueño-->

                          <!-- <div class="card" v-if="workshopType != 'WORKSHOP_CUSTOM'">
                              <div class="card-header">
                                <h2>Notas del curso: {{formWorkshop.name}}</h2>
                                <div class="clearfix"></div>
                              </div>
                              <div class="card-body">
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Nota 1</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="formWorkshop.grade1" class="form-control col-md-12 col-xs-12">
                                  </div>
                                </div>
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Nota 2</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="formWorkshop.grade2" class="form-control col-md-12 col-xs-12">
                                  </div>
                                </div>
                                <div class="card-body">
                                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Nota 3</label>
                                  <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" v-model="formWorkshop.grade3" class="form-control col-md-12 col-xs-12">
                                  </div>
                                </div>
                              </div>
                          </div> -->

                        <div class="modal-footer">
                          <button type="button" data-dismiss="modal" class="btn btn-light">Cancelar</button>
                          <!--Ntas
                          <button @click="updateGrades(formWorkshop)" data-dismiss="modal" type="button" class="btn btn-danger" v-if="workshopType != 'WORKSHOP_CUSTOM'">Actualizar notas</button>
                          -->
                          <button @click="update('STUDENT')" data-dismiss="modal" type="button" class="btn btn-warning">Actualizar datos</button>
                        </div>



                      </div>
                    </div>
                </div>
                <!--Modal Editar-->


            </div> <!--card-->
        </div> <!--col 12 -->
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
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";
    import { Datetime } from 'vue-datetime';
    import inputMaf from "./../../components/inputMaf.vue";
    import XLSX from './../../components/xlsx/xlsx.js';

  export default {
      name: "asistenciaAlumnos",
      components: {
          LoadingComponent,
          TableMaf,
          Datetime,
          inputMaf,
      },

      data: () => ({
          isLoading: false,
          idVolunteer: window.INITIAL_STATE.id,
          idSchool: window.INITIAL_STATE.idSchool,
          idWorkshop: window.INITIAL_STATE.idWorkshop,
          workshopType: window.INITIAL_STATE.workshopType,
          adm: window.INITIAL_STATE.adm,
          students:[],
          colum:[],
          titleTable:'',
          formStudent: {},
          formWorkshop: {},
          workshops: [],
          levels: [],
          grades: [],
          workshopContentCode:[],
          masterEvents: [],
          schoolEvents: [],
          schoolEventsExport: [],
          school:[],
          semester: [],
          schoolEvent: {},
          show:true,
          currentWorkshop: {},
          studentsReport: [],
          columModal:[{label:'Nombre contacto' ,name:'name' ,find:0 ,sort:0}, {label:'# Contacto' ,name:'phone' ,find:0 ,sort:0},{label:'Acciones ' ,name:'actions' ,find:0 ,sort:0}],
          emergencyContacts:[],
          contact:{},
          idStudent: 0,
          formStudentEnrollment: {},
          form: {},
          formNot:{not:'',tit:'',},
          X: '',
          titleI:[
          'N°',
          'Apellidos y nombres',
          'Taller o grado',
          'Permiso',
          'S1',
          'S2',
          'S3',
          'S4',
          'S5',
          'S6',
          'S7',
          'S8',
          'S9',
          'S10',
          'N1',
          'N2',
          'N3',
          'N4',          
          ],
          NAME :'lista_alumnos',
          nameOfSheet: 'lista_de_alumnos_por_taller',
          classrooms:[]
      }),

      async created () {
        await this.getSessionStorage();
        //si no es admi
        if(this.adm == false){
            this.school =  await consultServices('getSchool','POST',{ id:this.idVolunteer, semesterCode: this.semester.id})
            let _idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
            if(_idSchool){  
              this.currentWorkshop =  await consultServices('getWorkshop','POST',{id:this.idVolunteer ,semesterCode: this.semester.id})
              this.idSchool = _idSchool;
              
              if(this.currentWorkshop != null){
                  this.workshopType = this.currentWorkshop.typeCode;
                  this.idWorkshop = this.currentWorkshop.id;
              }else{
                  alert("El creando no cuenta con un taller asignado")
                  this.show = false;
              }
              
            }else if(!_idSchool){
                alert("El creando no cuenta con un colegio asignado")
                this.show = false;
            }
        }
        this.setHeadTable();
        await this.getSchoolEvents();


      },

      methods: {

      async getSessionStorage(){
        var ids = [];
        var flagLevels = false;
        var flagGrades = false;
        var flagWorkshops = false;
        var flagMasterEvents = false;
        var flagClassRoom = false;
        var flagWorkshopContentCode = false;

        this.isLoading = true;
        if(!window.sessionStorage.levels){
          ids.push(10);
          flagLevels = true;
        };
        if(!window.sessionStorage.grades){
          ids.push(11);
          flagGrades = true;
        };
        if(!window.sessionStorage.workshopContentCode){
          ids.push(13);
          flagWorkshopContentCode = true;
        }      
        if(!window.sessionStorage.classrooms){
          ids.push(12);
          flagClassRoom = true;
        }
        if(!window.sessionStorage.workshops){
          ids.push(17);
          flagWorkshops = true;
        };
        if(!window.sessionStorage.semester){
          const response =  await consultServices('getCurrentSemester','POST', {});
            this.semester = response;
          window.sessionStorage.semester  = JSON.stringify(this.semester);
        }
        if(!window.sessionStorage.masterEvents){
          ids.push(20);
          flagMasterEvents = true;
        };
        if (ids.length > 0) {
        //si no trae los valores, cargarlos en un array que luego se separará en atributos para sessionStorage
        //consulta única de masterValues (incluir todos los masterValues necesarios para esta pantalla)
        var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
        //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
        //Agregar todos los arreglos a los atributos del sessión storage

        if(flagLevels == true){
            this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10 });
            window.sessionStorage.levels  = JSON.stringify(this.levels);
        }
        if(flagGrades == true){
            this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11 });
            window.sessionStorage.grades  = JSON.stringify(this.grades);
        }
        if(flagClassRoom == true){
            this.classrooms = _.filter(arrayMasters, function(master) {return master.idMaster == 12; })
            window.sessionStorage.classrooms  = JSON.stringify(this.classrooms);
        } 
        if(flagWorkshopContentCode == true){
            this.workshopContentCode = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
            window.sessionStorage.workshopContentCode  = JSON.stringify(this.workshopContentCode);
        }         
        if(flagWorkshops == true){
          this.workshops = _.filter(arrayMasters, function(master) {return master.idMaster == 17 });
            window.sessionStorage.workshops  = JSON.stringify(this.workshops);
        }
        if(flagMasterEvents == true){
            this.masterEvents = _.filter(arrayMasters, function(master) {return master.idMaster == 20 });
            window.sessionStorage.masterEvents  = JSON.stringify(this.masterEvents);
        }
      }
      this.semester =JSON.parse( window.sessionStorage.semester );  


      this.levels =JSON.parse( window.sessionStorage.levels );
      this.grades =JSON.parse( window.sessionStorage.grades );
      this.workshops =JSON.parse( window.sessionStorage.workshops );
      this.masterEvents =JSON.parse( window.sessionStorage.masterEvents );   
      this.workshopContentCode =JSON.parse( window.sessionStorage.workshopContentCode );      
      this.classrooms=JSON.parse( window.sessionStorage.classrooms );
      

      this.isLoading = false;

      },

      async getSchoolEvents(){
        this.isLoading = true;
        var form = {
          semesterCode:this.semester.id,
          id:this.idSchool,
        }
        const response = await consultServices('getSchoolEventsForAssistance','POST',form);
        //ordenar por fechas 
        var orderedEvents = response.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate);  });   
        this.schoolEventsExport = _.cloneDeep(orderedEvents);
        _.map(response, (item) => {
          console.log('mirar::::::::::::::::::::::::::: ', item)
          //Validamos que no sea de capacitación (del 1 al 5)
          if(item.SchoolManagementEventType.descriptionCode != 'WORKSHOP_EVENT_DESCRIPTION_1'
          && item.SchoolManagementEventType.descriptionCode != 'WORKSHOP_EVENT_DESCRIPTION_2' 
          && item.SchoolManagementEventType.descriptionCode != 'WORKSHOP_EVENT_DESCRIPTION_3' 
          && item.SchoolManagementEventType.descriptionCode != 'WORKSHOP_EVENT_DESCRIPTION_4' 
          && item.SchoolManagementEventType.descriptionCode != 'WORKSHOP_EVENT_DESCRIPTION_5' ){
            var event = _.cloneDeep(item);
            var eventDescription = _.find(this.masterEvents, (object) => { return object.code == item.SchoolManagementEventType.descriptionCode });
            event.displayName = item.startDate + ' - ' + eventDescription.displayValue ;
            this.schoolEvents.push(event)
          }
        })
        this.isLoading = false;
      },

      async getSchoolStudents(){
        this.isLoading = true;
        var form = {
          idSchool: this.idSchool,
          semesterCode:this.semester.id,
        };
        var response =  await consultServices('getSchoolStudents','POST', form);
        this.setDataTable(response,'ADMIN');
        this.isLoading = false;
      },

      async getStudentAttendances(){
        this.isLoading = true;
        var form = {
          id: this.idWorkshop,
          descriptionDetail:0,// this.schoolEvent.SchoolManagementEventType.descriptionCode,
          semesterCode:this.semester.id
        };
        var response =  await consultServices('getStudentAttendances','POST', form);
        this.studentsReport =response
        this.setDataTable(response, 'TEACHER');
        this.isLoading = false;
      },

      async getStudentAttendancesAll(){
        this.isLoading = true;
        var form = {
          id: this.idWorkshop,
          descriptionDetail: 0, //no va a filtrar por eventos y traerá todas las asistencias 
          semesterCode:this.semester.id
        };
        var response =  await consultServices('getStudentAttendances','POST', form);
        this.studentsReport = _.cloneDeep(response);
        this.setDataTable(response, 'TEACHER');
        this.isLoading = false;
      },

      async createAttendance(form){
        this.isLoading = true;
        var formI = {
          idSchoolManagementEvent: form.idSchoolManagementEvent,
          idEnrollment: form.idEnrollment
        }
        var formII = {
          idSchoolManagementEvent: form.idSchoolManagementEvent,
          idEnrollment: form.idEnrollmentII
        }
        const response = await consultServices('createNewAttendanceByStudent','POST',formI);
        const responseII = await consultServices('createNewAttendanceByStudent','POST',formII);
        await this.getStudentAttendances()
        this.isLoading = false;
      },

      async updateAttendance(form){
        this.isLoading = true;
        var formI = {
          id: form.id,
          statusCode: form.statusCode
        }
        var formII = {
          id: form.idII,
          statusCode: form.statusCode
        }
        const response = await consultServices('updateAttendance','POST',formI);
        const responseII = await consultServices('updateAttendance','POST',formII);
        await this.getStudentAttendances()
        this.isLoading = false;
      },

      // async updateStudent(formStudent){
      //   this.isLoading = true;
      //   var form = _.cloneDeep(formStudent);
      //   const response = await consultServices('updateStudent','POST', form);
      //   this.getStudentAttendancesAll();
      //   this.isLoading = false;
      // },

      async updatePickUpStudent(formPickUpStudent){
        this.isLoading = true;
        var form = _.cloneDeep(formPickUpStudent);
        const response = await consultServices('updatePickUpStudent','POST', form);
        this.getStudentAttendancesAll();
        this.isLoading = false;
      },

      async newContact(){
          if(await this.$refs.inputContactName.returnValidationAsync() == false || await this.$refs.inputContactAddress.returnValidationAsync() == false ||
              await this.$refs.inputContactRelation.returnValidationAsync() == false || await this.$refs.inputPhone.returnValidationAsync() == false){
              alert("Complete los campos para agregar un contacto de emergencia");
          } else {
              this.contacts.push(this.contact);
              this.setDataTable(this.contacts,"contacts");
          }
      },  

      async showEditStudent(item, grades) {
        this.formStudent = _.cloneDeep(item);
        this.emergencyContacts=item.EmergencyContacts;
        this.contacts=[];       
        this.contac={};
        var idWorkshop= 0; 
        this.idStudent=item.id;
        this.formStudentEnrollment= item;
        this.contacts=item.EmergencyContacts;
        await this.setDataTable(this.contacts, "contacts");
      }, 
    
      async update(type){
          this.isLoading = true;            
          if(type == 'STUDENT'){
              var form={}
              form.documentNumber =this.formStudent.documentNumber
              form.birthdate = this.formStudent.birthdate
              form.name=this.formStudent.name
              form.lastName=this.formStudent.lastName
              form.id=this.formStudent.id
              form.secondLastName=this.formStudent.secondLastName
              form.EmergencyContacts=this.formStudentEnrollment.EmergencyContacts
              form.gradeCode=this.formStudent.gradeCode
              form.dream=this.formStudent.dream
              form.likesTo=this.formStudent.likesTo
              form.dislikesTo=this.formStudent.dislikesTo
              form.ambitions=this.formStudent.ambitions
              form.other=this.formStudent.other
              var responseStudent = await consultServices('updateStudent','POST',form);
              if(responseStudent.status == 200){     
                      this.formNot.tit="Actualización exitosa"; this.formNot.not="Se actualizaron los datos correctamente.";
                      var refesh =  await consultServices('getStudentAttendances','POST', {
                                id: this.idWorkshop,
                                descriptionDetail:0,
                                semesterCode:this.semester.id
                      });  
                      this.studentsReport =refesh
                      this.setDataTable(refesh, 'TEACHER');
         
                      this.isLoading = false;                            
              }else{
                  this.formNot.tit="Error en la actualización de datos."; this.formNot.not=response.message;
              }
              this.contact={}
             
              $('.modal').modal('hide');
              this.shownotificacion();   

                          
          }                       
      },    
      async shownotificacion(){
              $('.bs-example-modal-not').modal('show');
      },
      setHeadTable() {
        if(this.adm==true){
          //mostrar solo consolidado
          if(this.workshopType == 'WORKSHOP_MATH'){
            this.colum = [
                {label:'Asistencia' ,name:'attendance' ,find:0 ,sort:0},
                {label:'Alumno' ,name:'fullName' ,find:0 ,sort:0},
                {label:'Entregó permiso' ,name:'pickUpByParent' ,find:0 ,sort:0},
                {label:'Divertimate' ,name:'workshopMath' ,find:0 ,sort:0},
                {label:'Taller' ,name:'workshopMultidisciplinario' ,find:0 ,sort:0},
                {label:'Acciones' ,name:'action' ,find:0 ,sort:0}];        
          }
          if(this.workshopType == 'WORKSHOP_CUSTOM'){
            this.colum = [
                {label:'Asistencia' ,name:'attendance' ,find:0 ,sort:0},
                {label:'Alumno' ,name:'fullName' ,find:0 ,sort:0},
                {label:'Entregó permiso' ,name:'pickUpByParent' ,find:0 ,sort:0},
                {label:'Taller' ,name:'workshopMultidisciplinario' ,find:0 ,sort:0},
                {label:'Divertimate' ,name:'workshopMath' ,find:0 ,sort:0},
                {label:'Acciones' ,name:'action' ,find:0 ,sort:0}];
           }
        }else{
          //poder editar asistencia y notas
          if(this.workshopType == 'WORKSHOP_MATH'){
            this.colum = [
                {label:'Asistencia' ,name:'attendance' ,find:0 ,sort:0},
                {label:'Alumno' ,name:'fullName' ,find:0 ,sort:0},
                {label:'Entregó permiso' ,name:'pickUpByParent' ,find:0 ,sort:0},
                {label:'Taller' ,name:'workshopMultidisciplinario' ,find:0 ,sort:0},
                {label:'Nota 1' ,name:'grade1' ,find:0 ,sort:0},
                {label:'Nota 2' ,name:'grade2' ,find:0 ,sort:0},
                {label:'Nota 3' ,name:'grade3' ,find:0 ,sort:0},
                {label:'Nota 4' ,name:'grade4' ,find:0 ,sort:0},
                {label:'Acciones' ,name:'action' ,find:0 ,sort:0}];        
          }
          if(this.workshopType == 'WORKSHOP_CUSTOM'){
            this.colum = [
                {label:'Asistencia' ,name:'attendance' ,find:0 ,sort:0},
                {label:'Alumno' ,name:'fullName' ,find:0 ,sort:0},
                {label:'Entregó permiso' ,name:'pickUpByParent' ,find:0 ,sort:0},               
                {label:'Divertimate' ,name:'workshopMath' ,find:0 ,sort:0},
                {label:'Acciones' ,name:'action' ,find:0 ,sort:0}];        
          }

        }
        this.titleTable = "Lista de alumnos";
      },

      async refreshData(type) {
        if(type == "contacts"){
          await this.$refs.tableMafModal.formatData(this.emergencyContacts);
        }
        if(type == "students"){
          await  this.$refs.tableMaf.formatData(this.students);
        }
           
      },

      async setDataTable(arrayData, string){
        var ctx = this;
        
        var principalTable= true

        //if(principalTable== true){
        if(string != "contacts"){
        this.students = [];
            var nWeek = 0;          
            this.students = _.map(arrayData, (item) => {
              nWeek++;
              var student = {};
              var tempGrade = {};
              var tempWorkshop = {};
              var tempLevel = {};
              var formAttendance = {};
              var flagAssistance = false;
              var jsonGrades = {};
              var jsonPickUpByParent = {};
              var classroom ={}
              var idGrade1 = "1grade"+nWeek;
              var idGrade2 = "2grade"+nWeek;
              var idGrade3 = "3grade"+nWeek;
              var idGrade4 = "4grade"+nWeek;
              var workshop1 = {
                idEnrollment: item.Student.Enrollments[0].id,
                grade1 : item.Student.Enrollments[0].grade1,
                grade2 : item.Student.Enrollments[0].grade2,
                grade3 : item.Student.Enrollments[0].grade3,
                grade4 : item.Student.Enrollments[0].grade4,
                contentCode: item.Student.Enrollments[0].Workshop.contentCode,                
                displayName: item.Student.Enrollments[0].Workshop.displayName,
                levelCode: item.Student.Enrollments[0].Workshop.levelCode,
                gradeCode: item.Student.Enrollments[0].Workshop.gradeCode,
                typeCode: item.Student.Enrollments[0].Workshop.typeCode,
                classroomCode : item.Student.Enrollments[0].Workshop.classroomCode ,
              };
              item.Student.Enrollments[0].Workshop.classroomCode?workshop1.classroomCode= item.Student.Enrollments[0].Workshop.classroomCode: null ;
              var workshop2 = {
                idEnrollment: item.Student.Enrollments[1].id,
                grade1 : item.Student.Enrollments[1].grade1,
                grade2 : item.Student.Enrollments[1].grade2,
                grade3 : item.Student.Enrollments[1].grade3,
                grade4 : item.Student.Enrollments[1].grade4,
                contentCode: item.Student.Enrollments[1].Workshop.contentCode,
                displayName: item.Student.Enrollments[1].Workshop.displayName,
                levelCode: item.Student.Enrollments[1].Workshop.levelCode,
                gradeCode: item.Student.Enrollments[1].Workshop.gradeCode,
                typeCode: item.Student.Enrollments[1].Workshop.typeCode,
                classroomCode : item.Student.Enrollments[1].Workshop.classroomCode ,
              };

              student.idEnrollment = item.Student.id;
              student.documentNumber = item.Student.documentNumber;
              student.fullName = item.Student.name + ' ' + item.Student.lastName + ' ' + item.Student.secondLastName;

            
              ////////////////////SETEAMOS LOS VALORES DEL workshop1
              if(workshop1.typeCode == 'WORKSHOP_CUSTOM'){
                  tempLevel =  _.find(this.levels, (temp) => { return temp.code == workshop1.levelCode });
                  if(workshop1.displayName){
                    student.workshopMultidisciplinario = workshop1.displayName + ' - ' + tempLevel.displayValue;
                  }else{
                    tempWorkshop = _.find(this.workshops, (temp) => { return temp.code == workshop1.contentCode });
                    student.workshopMultidisciplinario = tempWorkshop.displayValue + ' - ' + tempLevel.displayValue;
                  }

              }else{
                  tempGrade =  _.find(this.grades, (temp) => { return temp.code == workshop1.gradeCode });
                  workshop1.classroomCode? classroom =  _.find(this.classrooms, (classroom) => { return classroom.code == workshop1.classroomCode }): classroom={displayValue:'No hay'}
                  student.workshopMath = tempGrade.displayValue+' '+ classroom.displayValue;
                  jsonGrades = _.cloneDeep(workshop1);
                  jsonGrades.levelValue = tempGrade.displayValue;                 
                 
              }
              ////////////////////SETEAMOS LOS VALORES DEL workshop2
              if(workshop2.typeCode == 'WORKSHOP_CUSTOM'){
                  tempLevel = _.find(this.levels, (temp) => { return temp.code == workshop2.levelCode });
                  if(workshop2.displayName){
                    student.workshopMultidisciplinario = workshop2.displayName + ' - ' + tempLevel.displayValue;
                  }else{
                    tempWorkshop = _.find(this.workshops, (temp) => { return temp.code == workshop2.contentCode });
                    student.workshopMultidisciplinario = tempWorkshop.displayValue + ' - ' + tempLevel.displayValue;
                  }
              }else{
                  tempGrade = _.find(this.grades, (temp) => { return temp.code == workshop2.gradeCode });
                  workshop2.classroomCode? classroom =  _.find(this.classrooms, (classroom) => { return classroom.code == workshop2.classroomCode }): classroom={displayValue:'No hay'}
                  student.workshopMath = tempGrade.displayValue+' '+ classroom.displayValue;
                  jsonGrades = _.cloneDeep(workshop2);
                  jsonGrades.levelValue = tempGrade.displayValue;
              }
              ////////////////////CARGAR NOTAS
              //si this.workshopType == workshop1.typeCode, cargar notas de workshop1
              if(workshop1.typeCode == 'WORKSHOP_MATH'){
                  student.grade1 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[0].id,idGrade1,'grade1')} id={idGrade1} type="text" value={ workshop1.grade1} class="form-control col-md-7 col-xs-12"></input></div>;
                  student.grade2 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[0].id,idGrade2,'grade2')} id={idGrade2} type="text" value={ workshop1.grade2} class="form-control col-md-7 col-xs-12"></input></div>;
                  student.grade3 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[0].id,idGrade3,'grade3')} id={idGrade3} type="text" value={ workshop1.grade3} class="form-control col-md-7 col-xs-12"></input></div>;
                  student.grade4 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[0].id,idGrade4,'grade4')} id={idGrade4} type="text" value={ workshop1.grade4} class="form-control col-md-7 col-xs-12"></input></div>;
              }
              //si this.workshopType == workshop2.typeCode, cargar notas de workshop2
              if(workshop2.typeCode == 'WORKSHOP_MATH'){
                  student.grade1 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[1].id,idGrade1,'grade1')} id={idGrade1} type="text" value={ workshop2.grade1} class="form-control col-md-7 col-xs-12"></input></div>;
                  student.grade2 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[1].id,idGrade2,'grade2')} id={idGrade2} type="text" value={ workshop2.grade2} class="form-control col-md-7 col-xs-12"></input></div>;
                  student.grade3 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[1].id,idGrade3,'grade3')} id={idGrade3} type="text" value={ workshop2.grade3} class="form-control col-md-7 col-xs-12"></input></div>;
                  student.grade4 = <div><input onChange={()=>ctx.updateGrade(item.Student.Enrollments[1].id,idGrade4,'grade4')} id={idGrade4} type="text" value={ workshop1.grade4} class="form-control col-md-7 col-xs-12"></input></div>;
              }
              //ASISTENCIAS
              var attendanceToCurrentEvent0 = _.filter(item.Student.Enrollments[0].Attendances, (att) => {
                return att.SchoolManagementEvent.id == this.schoolEvent.id
              });
              var attendanceToCurrentEvent1 = _.filter(item.Student.Enrollments[1].Attendances, (att) => {
                return att.SchoolManagementEvent.id == this.schoolEvent.id
              });
          
              if(attendanceToCurrentEvent0.length > 0){
                formAttendance.id = attendanceToCurrentEvent0[0].id;
                formAttendance.idII = attendanceToCurrentEvent1[0].id;
                if(attendanceToCurrentEvent0[0].statusCode == 'ATTENDANCE_ATTENDED'){
                  formAttendance.statusCode = 'ATTENDANCE_CREATED';
                  flagAssistance = true ;
                }else if(attendanceToCurrentEvent0[0].statusCode == 'ATTENDANCE_CREATED'){
                  formAttendance.statusCode = 'ATTENDANCE_ATTENDED';
                  flagAssistance = false ;
                };
                this.adm==false? student.attendance = <div> <input type="checkbox" checked={flagAssistance} onChange={()=>ctx.updateAttendance(formAttendance)} /></div>: student.attendance = <div> <input type="checkbox" checked={flagAssistance} disabled /></div>;
              }else{
                formAttendance.idSchoolManagementEvent = this.schoolEvent.id;
                formAttendance.idEnrollment = item.Student.Enrollments[0].id;
                formAttendance.idEnrollmentII = item.Student.Enrollments[1].id;
                this.adm==false? student.attendance = <div><input type="checkbox" onChange={()=>ctx.createAttendance(formAttendance)} /></div>:student.attendance = <div> <input type="checkbox" checked={flagAssistance} disabled /></div>;
              }
               
              //PERMISO
              if(item.Student.pickUpByParent == true){
                jsonPickUpByParent.id = item.Student.id;
                jsonPickUpByParent.pickUpByParent = false;
              }else{
                jsonPickUpByParent.id = item.Student.id;
                jsonPickUpByParent.pickUpByParent = true;
              }
              this.adm==false? student.pickUpByParent = <div> <input type="checkbox" checked={item.Student.pickUpByParent} onChange={()=>ctx.updatePickUpStudent(jsonPickUpByParent)} /></div>:  student.pickUpByParent = <div> <input  type="checkbox" disabled  checked={item.Student.pickUpByParent}  /></div>
              
              //ACCIONES
              student.action = <div  style="text-align: center;"> <button onClick={()=>ctx.showEditStudent(item.Student, jsonGrades)} data-toggle="modal" data-target=".modal-Edit" class="btn btn-warning btn-xs" >Editar</button></div>;

              return student;
              
            });
            
            await this.refreshData("students");
        }
        // if(this.adm == true){
        //     arrayData.forEach(item => {
        //     var student = {};
        //     var tempGrade = {};
        //     var classroom = {};

        //     var name = item.Student.name == null ? name="" : item.Student.name;
        //     var lastName = item.Student.lastName == null ? lastName="" : item.Student.lastName;
        //     var secondLastName = item.Student.secondLastName == null ? secondLastName="" : item.Student.secondLastName;

        //         student.fullName=name.concat(" ", lastName," ", secondLastName);
        //         student.workshopMultidisciplinario=item.Workshop.displayName;
        //         tempGrade = _.find(this.grades, (grade) => { return grade.code == item.Workshop.gradeCode });
        //         item.Workshop.classroomCode? classroom =  _.find(this.classrooms, (classroom) => { return classroom.code == item.Workshop.classroomCode }): classroom={displayValue:''}
        //         student.workshopMath = tempGrade.displayValue+' '+ classroom.displayValue;

        //     this.students.push(student);
        //   })
        //   await this.refreshData("students");
        // }        

        if(string == "contacts"){
          this.emergencyContacts = [];
            arrayData.forEach(item => {
                    var contac = {};
                    contac.name = item.name;
                    contac.address=item.address;
                    contac.relation=item.relation;
                    contac.phone=item.phone;
                    contac.actions=<div class="d-flex justify-content-around">
                          <div> <button onClick={()=>ctx.removeContact(item.name)}   class="btn btn-danger btn-xs" >Eliminar</button> </div>
                    </div>;
                    this.emergencyContacts.push(contac);
            });
            await  this.refreshData("contacts");
        }

      },
      async removeContact(name){
          _.remove(this.emergencyContacts, function (e) {
              return e.name == name;
          });
          _.remove(this.contacts, function (e) {
              return e.name == name;
          });
          await  this.refreshData("contacts");
      },
        async updateGrade(id,idGrade,grade) {
          this.isLoading2 = true;

          if(id){
            var aux = document.getElementById(idGrade).value;
            if(0<=aux && aux <=20){
                var form = {};
                if (grade == 'grade1') {
                  form.id = id;
                  form.grade1 = aux;
                }
                if (grade == 'grade2') {
                  form.id = id;
                  form.grade2 = aux;
                }
                if (grade == 'grade3') {
                  form.id = id;
                  form.grade3 = aux;
                }     
                if (grade == 'grade4') {
                  form.id = id;
                  form.grade4 = aux;
                }         
                const response = await consultServices('updateGrades','POST', form);
                this.getStudentAttendancesAll();
            }
            else{
              alert('Calificación ingresada no válida.')             
            }
          }else{
            alert("No existe matrícula.")
          }

          // await this.setDataTable(dataForTable);
          this.isLoading2 = false;
      },      
      async exportExcel() {
        console.log('exportExcel: ',this.schoolEventsExport)
        var tempFormat =_.cloneDeep(this.titleI);      
        this.studentsReport =await consultServices('getStudentAttendances','POST', {id: this.idWorkshop,descriptionDetail:0, semesterCode:this.semester.id});

        //Seteamos la cabecera del excel
        var data = [];
        var cont = 0
        var dataBody = [];
        data[0] = _.map(tempFormat,(item_format)=>{
          return item_format;
        });
        var dataBody = _.map( this.studentsReport, (item) => {
          cont = cont +1;
          var _student = [];
          var name="";
          var lastName="";
          var secondLastName="";

          _student[0] = cont ;
          item.Student.name ? name =  item.Student.name : name = '';
          item.Student.lastName ? lastName =   item.Student.lastName : lastName = '';
          item.Student.secondLastName ? secondLastName =  item.Student.secondLastName : secondLastName = '';
          _student[1] = name+" "+ lastName+" "+ secondLastName;

          //Estos 3 son enrollments!
          var actualWorkshop = _.find(item.Student.Enrollments, (enrollment) => {
            return enrollment.Workshop.typeCode == this.workshopType;
          })

          var mathWorkshop = _.find(item.Student.Enrollments, (enrollment) => {
            return enrollment.Workshop.typeCode == 'WORKSHOP_MATH';
          })

          var customWorkshop = _.find(item.Student.Enrollments, (enrollment) => {
            return enrollment.Workshop.typeCode == 'WORKSHOP_CUSTOM';
          })

          var tempGrade = {};
          var tempLevel = {};
          var tempContent = {};
          var tempClassroom = {};
          tempLevel =  _.find(this.levels, (item) => { return item.code == customWorkshop.Workshop.levelCode });
          tempGrade =  _.find(this.grades, (item) => { return item.code == mathWorkshop.Workshop.gradeCode });
          tempContent = _.find(this.workshopContentCode, (item) => { return item.code == mathWorkshop.Workshop.contentCode });
          tempClassroom = _.find(this.classrooms, (item) => { return item.code == mathWorkshop.Workshop.classroomCode });


          var display=''
          if( this.workshopType== 'WORKSHOP_CUSTOM'){
            if(customWorkshop.levelCode == null){
             display=customWorkshop.displayName    
            }else{
             display =customWorkshop.displayName+' - '+ tempLevel.displayValue;
            }

          }else if(this.workshopType== 'WORKSHOP_MATH'){
            if(tempClassroom != null && tempGrade != null && tempLevel != null ){         
             display = tempGrade.displayValue+' '+ tempClassroom.displayValue+ ' - ' +tempLevel.displayValue;
            }else{            
              display = tempGrade.displayValue
            }
          }

          _student[2] = display;
          item.Student.pickUpByParent ? _student[3] = "Sí" : _student[3] = "No" ;
          
          _student[4]=0
          _student[5]=0
          _student[6]=0
          _student[7]=0
          _student[8]=0
          _student[9]=0
          _student[10]=0
          _student[11]=0
          _student[12]=0
          _student[13]=0
          _student[14]=0
          _student[15]=0
          _student[16]=0
          _student[17]=0

          if(item.Attendances.length >0){

            for (let index = 0; index < item.Student.Enrollments[0].Attendances.length; index++) {
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_7'){
                _student[4] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_8'){
                _student[5] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_9'){
                _student[6] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_10'){
                _student[7] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_11'){
                _student[8] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_14'){
                _student[9] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_15'){
                _student[10] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_16'){
                _student[11] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_17'){
                _student[12] = 1
              }
              if(item.Student.Enrollments[0].Attendances[index].SchoolManagementEvent.descripti == 'WORKSHOP_EVENT_DESCRIPTION_18'){
                _student[13] = 1
              }    
              if(item.Student.Enrollments[0].grade1 != null){
                _student[14] = item.Student.Enrollments[0].grade1
              }
              if(item.Student.Enrollments[0].grade2 != null){
                _student[15] = item.Student.Enrollments[0].grade2
              }
              if(item.Student.Enrollments[0].grade3 != null){
                _student[16] = item.Student.Enrollments[0].grade3
              }
              if(item.Student.Enrollments[0].grade4 != null){
                _student[17] = item.Student.Enrollments[0].grade4
              }                          
              
              
            }

          }

         
          return _student;
          
        });

        //Seteamos los parametros para el excel
        data = _.concat(data, dataBody);
          var filename = "lista_alumnos_por_taller" + ".xlsx";
          var ws_name = this.NAME;
          var wb = XLSX.utils.book_new();
          var ws = XLSX.utils.aoa_to_sheet(data);
          XLSX.utils.book_append_sheet(wb, ws, ws_name);

          //Definimos nuestros estilos
          var jsonBlue = {
            font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
            fill: { fgColor: {rgb: "00aae4"}},
            border: {
              top : { style: 'thin', color: {rgb: "000000"} },
              bottom :	{ style: 'thin', color: {rgb: "000000"} },
              left :	{ style: 'thin', color: {rgb: "000000"} },
              right :	{ style: 'thin', color: {rgb: "000000"} },
            }
          };

          var jsonOrange = {
            font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
            fill: { fgColor: {rgb: "FFA420"}},
            border: {
              top : { style: 'thin', color: {rgb: "000000"} },
              bottom :	{ style: 'thin', color: {rgb: "000000"} },
              left :	{ style: 'thin', color: {rgb: "000000"} },
              right :	{ style: 'thin', color: {rgb: "000000"} },
            }
          };

          var jsonGreen = {
            font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
            fill: { fgColor: {rgb: "89AC76"}},
            border: {
              top : { style: 'thin', color: {rgb: "000000"} },
              bottom :	{ style: 'thin', color: {rgb: "000000"} },
              left :	{ style: 'thin', color: {rgb: "000000"} },
              right :	{ style: 'thin', color: {rgb: "000000"} },
            }
          };
          var jsonData ={
            border: {
              top : { style: 'thin', color: {rgb: "000000"} },
              bottom :	{ style: 'thin', color: {rgb: "000000"} },
              left :	{ style: 'thin', color: {rgb: "000000"} },
              right :	{ style: 'thin', color: {rgb: "000000"} },
            }
          };
          var jsonDataGris ={
            fill: { fgColor: {rgb: "D7D7D7"}},
            border: {
              top : { style: 'thin', color: {rgb: "000000"} },
              bottom :	{ style: 'thin', color: {rgb: "000000"} },
              left :	{ style: 'thin', color: {rgb: "000000"} },
              right :	{ style: 'thin', color: {rgb: "000000"} },
            }
          };

          //arreglo que contiene las celdas que seran pintadas de azul
          var auxArrayblue = ['A1', 'B1' ,'C1','E1','F1','G1','H1','I1','J1','K1','L1','M1','N1'];
          //arreglo que contiene las celdas que seran pintadas de verde
          var auxArrayOrange = ['D1','O1','P1','Q1','R1'];

          //damos estilo a nuestras celdas
          var contRow = 1 ;
          var indxColor = 0 ;
          _.map(ws, (cell, key) => {
            var flagHeader = false ;
            if(key != "!ref"){
              _.map(auxArrayblue, (blue) => {
                if(key == blue){
                  wb.Sheets.lista_alumnos[key]['s']=jsonBlue;
                  indxColor = 0
                  flagHeader = true;
                }
              })
              _.map(auxArrayOrange, (orange) => {
                if(key == orange){
                  wb.Sheets.lista_alumnos[key]['s']=jsonOrange;
                  indxColor = 0
                  flagHeader = true;
                }
              })
              _.map(this.schoolEventsExport, (green) => {
                if(cell.v == green.startDate){
                  wb.Sheets.lista_alumnos[key]['s']=jsonGreen;
                  indxColor = 0
                  flagHeader = true;
                }else if( cell.v == 'N1' || cell.v == 'N2' || cell.v == 'N3' || cell.v == 'N4' ){
                  wb.Sheets.lista_alumnos[key]['s']=jsonOrange;
                  indxColor = 0
                  flagHeader = true;
                }
              })
              if(flagHeader == false){
                if(indxColor == 0){
                  wb.Sheets.lista_alumnos[key]['s']=jsonData;
                  contRow++;
                  if(tempFormat.length < contRow){
                    contRow = 1 ;
                    indxColor = 1;
                  }
                }else{
                  wb.Sheets.lista_alumnos[key]['s']=jsonData;
                  contRow++;
                  if(tempFormat.length <= contRow){
                    contRow = 1 ;
                    indxColor = 0;
                  }
                }
              }
            }
          })

          XLSX.writeFile(wb, filename);
      },

    },

       

    }

</script>

<style scoped>
</style>
