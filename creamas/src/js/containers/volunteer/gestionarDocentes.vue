<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">

      <div class="card">
            <div class="card-header">
                <h2>BBDD Equipo </h2><br/><br/>
            </div>
            <div id= "divTeams" class="form-group" style=" text-align: left; " >
                <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el equipo:</label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <select class="form-control"  v-model="idTeam"  @change="onChangeTeam()">
                    <option v-for="item in teams" v-bind:value="item.id" >
                    {{item.name}}
                    </option>
                    </select>
                </div>
            </div> 
            <div class="form-group" style="text-align: left">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de la asistencia:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                       <select @change="listTeachers()" class="form-control" v-model="formDate">
                            <option v-for="option in options" v-bind:value="option">{{option.label}} </option>
                        </select>
                    </div>
            </div>
            <div class="card-body">
              <TableMaf :header="colum" :data="teachers" :tableTitle="titleTable" :searchOption="true" ref="tableMaf">
                    </TableMaf>
            </div>

     </div>

      <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Editar creando</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">

                    <div class="form-group ">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Cargo:</label>
                        <div class="col-md-6">
                        <input class="form-control" id="textarea-input" name="textarea-input" v-model="formEdit.job" rows="6" readonly="readonly" />
                        </div>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.name" :valueInput="formEdit.name" label="Nombre:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputName">
                        </inputMaf>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.lastName" :valueInput="formEdit.lastName" label="Apellido Paterno:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputLastName">
                        </inputMaf>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.secondLastName" :valueInput="formEdit.secondLastName" label="Apellido Materno:" :validation="{required:false, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputSecondLastName">
                        </inputMaf>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.alias" :valueInput="formEdit.alias" label="Nickname:" :validation="{required:true, alpha_spaces:true, max:250}" nameInput="text" etiqueta='true' ref="inputAlias">
                        </inputMaf>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.email" :valueInput="formEdit.email" label="Email:" :validation="{required:true, email:true, max:100}" nameInput="email" etiqueta='true' ref="inputEmail">
                        </inputMaf>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.phone" :valueInput="formEdit.phone"  label="Celular:" :validation="{required:true, numeric:true , min:6, max:20}" nameInput="phone" etiqueta='true' ref="inputPhone" >
                        </inputMaf>
                    </div>

                    <div class="card-body">
                        <inputMaf type='text' v-model="formEdit.documentNumber" :valueInput="formEdit.documentNumber"  label="Nro. documento:" :validation="{required:true, max:60}" nameInput="document" etiqueta='true' ref="inputDocument" >
                        </inputMaf>
                    </div>

                    <div class="form-group row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado:</label>
                        <div class="col-md-6">
                          <font style="vertical-align: inherit;">
                            <button v-if="formEdit.statusCode=='VOLUNTEER_ACTIVE'" type="button" class="btn btn-success btn-xs">Activo</button>
                            <button v-if="formEdit.statusCode=='VOLUNTEER_INACTIVE'" type="button" class="btn btn-danger btn-xs">Inactivo</button>
                          </font>
                        </div>
                    </div>

                    <div class="form-group row">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha de nacimiento:</label>
                        <div class="col-md-6">
                            <v-date-picker v-model="formEdit.birthdate" />
                        </div>
                    </div>
                    <div class="card" v-if="formEdit.statusCode=='VOLUNTEER_ACTIVE'">
                          <div class="card-header">
                              <h2>Dar de baja a Creando</h2>
                              <div class="clearfix"></div>
                          </div>
                          <div class="card-body">
                              <div class="card-body">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <textarea v-model="formEdit.reasonUnsubscribe" class="form-control col-md-12 col-xs-12"></textarea>
                              </div>
                              </div>                              
                          </div>
                         <div class="modal-footer">
                              <button type="button" @click="unsubscribe()" class="btn btn-danger">Dar de baja</button>
                          </div>
                    </div>

               </div>
               <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button @click="updateTeacher()" type="button" class="btn btn-success">Guardar cambios</button>
               </div>

            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!-- Modal resetear contraseña -->
        <div class="modal fade bs-example-modal-rp" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">

                    <h3 class="modal-title" id="myModalLabel" >Resetear contraseña</h3>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>

                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Contraseña actual:</label>
                            <div role="group" class="input-group col-md-6 col-sm-6 col-xs-12">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="fa fa-lock"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Nueva contraseña:</label>
                        <div role="group" class="input-group col-md-6 col-sm-6 col-xs-12">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="fa fa-lock" style="color:red"></i>
                              </span>
                            </div>
                            <input type="text" class="form-control">
                        </div>
                    </div>


               </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="updatePassword()" type="button" class="btn btn-success">Guardar cambios</button>
                </div>

            </div>
          </div>
        </div>
      <!-- Modal resetear contraseñaFin -->

      <!-- Modal Rotación -->
        <div class="modal fade bs-example-modal-rot" tabindex="-1" role="dialog" aria-hidden="true">
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
                                       <input type="text" v-model="formRotation.fullName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol actual:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRotation.job" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo actual:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                       <input type="text" v-model="formRotation.schoolName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo destino:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control"  v-model="formRotation.school">
                                <option v-for="item in schools" v-bind:value="item" >
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo de rotación:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <textarea  v-model="formRotation.reason" class="form-control" >
                              </textarea>
                        </div>
                    </div>


               </div>

                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-rot" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button @click="CreateNewRotation()" type="button" class="btn btn-success">Enviar solicitud</button>
                </div>

            </div>
          </div>
        </div>
      <!-- Modal Rotación Fin -->

      <!-- Modal Reasignación -->
      <div class="modal fade bs-example-modal-rea" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">

                          <h3 class="modal-title" id="myModalLabel" >Reasignación de creando </h3>
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                          </button>

                      </div>
                      <div class="modal-body">
                          <div class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Creando solicitante:</label>
                                      <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formReasign.fullName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                      </div>
                          </div>
                          <div class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol actual:</label>
                                      <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formReasign.job" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                      </div>
                          </div>
                          <div v-if="flagWorkshopDetails==true" class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Taller actual:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">                                 
                                            <input type="text" v-model="formReasign.requestedWorkshopDisplayName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                              </div>
                          </div>
                          <div v-if="flagWorkshopDetails==true" class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formReasign.typeWorkshop" class="form-control col-md-7 col-xs-12" readonly="readonly">
                              </div>
                          </div>
                          <div v-if="flagWorkshopDetails==true" class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Grupo:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formReasign.contentCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                              </div>
                          </div>
                          <div v-if="flagWorkshopDetails==true" class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Ciclo:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formReasign.levelCode" class="form-control col-md-7 col-xs-12" readonly="readonly">
                              </div>
                          </div>
                          <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige nuevo rol:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control" @change="listWorkshopsxSchool"   v-model="formReasign.newRole">
                                            <option disabled="disabled" value="">Roles disponibles</option>
                                            <option v-for="item in jobs" v-bind:value="item.code" >                                                
                                                  {{item.name}}
                                            </option>
                                            </select>
                                        </div>
                                    </div>
                          </div>                          
                          <div v-if="flagWorkshops== true" class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el taller de reasignación:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control"  v-model="formReasign.workshop">
                                            <option disabled="disabled" value="">Talleres disponibles</option>
                                            <option v-for="item in workshopsxSchool" v-bind:value="item" >                                                
                                                  {{item.displayValue}}
                                            </option>
                                            </select>
                                        </div>
                                    </div>
                          </div>


                    </div>

                    <div class="modal-footer">
                      <button @click="updateAssignmentRecord()" type="button" class="btn btn-success">Reasignar</button>
                    </div>


                    <div class="card">
                      <div class="card-header">
                          <h3 class="modal-title" id="myModalLabel" >Solicitar reasignación a otro equipo</h3>
                      </div>
                      <div class="card-body">
                          <div class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol actual:</label>
                                      <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formRotation.job" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                      </div>
                          </div>
                          <div class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo actual:</label>
                                      <div class="col-md-6 col-sm-6 col-xs-12">
                                            <input type="text" v-model="formRotation.schoolName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                      </div>
                          </div>
                          <div class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo destino:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control"  v-model="formRotation.school">
                                      <option v-for="item in schools" v-bind:value="item" >
                                          {{item.name}}
                                      </option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group ">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Motivo de rotación:</label>
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <textarea  v-model="formRotation.reason" class="form-control" >
                                    </textarea>
                              </div>
                          </div>
                      </div>

                      <div class="modal-footer">
                          <button @click="CreateNewRotation()" type="button" class="btn btn-success">Enviar solicitud</button>
                      </div> 
                    </div>

                  </div>
                </div>
              </div>

      <!-- Modal Reasignación Fin -->

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
    import { Datetime } from 'vue-datetime';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";
    import Treeselect from '@riophae/vue-treeselect';
    import inputMaf from "./../../components/inputMaf.vue";


export default {
  name: "GestionarDocentesContainer",
  components: {
    LoadingComponent,
    TableMaf,
    Datetime,
    inputMaf,
    Treeselect,
  },
  data: () => ({

      isLoading: false,
      formEdit:{content:'',},
      masterValues20:[],
      titleTable:'',
      colum:[],
      formNot:{not:'',tit:'',},
      semester:[],
      eventsSchoolMaster:[],
      teachers:[],
      valueWeb: null,
      options:[],
      schools: [],
      id: window.INITIAL_STATE.id,
      idTeam: null,
      idFather: null,
      teams:[],
      formDate:{},
      schoolEvents:[],
      formRotation:[],
      formReasign:{},
      workshopsxSchool:[],
      workshopLevelCode:[],
      workshopGradeCode:[],
      workshopClassroomCode:[],
      workshopContentCode:[],
      workshopTypeCode:[],
      idSchool:'',
      isCheckdisabled: false,
      jobs:[],
      flagWorkshops: false,
      flagWorkshopDetails: true,
  }),


  async created () {
    this.isLoading=true;
    await this.getMasterValues();
    await this.listJobs();
    await this.setHeadTable();
    
    var urlParams = new URLSearchParams(window.location.search);
  
    if(urlParams.get('idFather') != null && urlParams.get('idTeam')){  
        console.log('Entraron parámetros') 
        this.idFather = urlParams.get('idFather')
        this.idTeam = urlParams.get('idTeam') 
        //Listar equipos
        var responseProjects = await consultServices('listSchoolsBySemester','POST',{semesterCode:this.semester.id});
        for (var i = 0; i < responseProjects.length; i++) {
          if(responseProjects[i].idFather == this.idFather){
            this.teams.push(responseProjects[i])
          }          
        }        
        console.log('teams ',this.teams )
        //Utilizar idTeam para equipo seleccionado 
        await this.listSchoolEvents(this.idFather);     
        

    }else{
      console.log('No entraron parámetros') 
      //Ocultar combo de equipos
      document.getElementById('divTeams').style.display = "none";

      //Conseguir proyecto/colegio
      this.school =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id})
      let _idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
      if(_idSchool){
        var idFather = 0
        _.map(this.school.AssignmentRecords,(assingmentRecord)=>{
            assingmentRecord.School.idFather != null?  idFather = assingmentRecord.School.idFather: idFather = assingmentRecord.School.id
        });
        await this.listSchoolEvents(idFather);
        this.idFather = idFather
      }else{
          alert("El creando no cuenta con un equipo asignado")
      }  
      if(this.schoolEvents.length > 0){
        await this.getEvent()  
      }
    }    
    this.isLoading = false;
  },
  methods: {
    async getMasterValues() {
      var ids = [];
      var flagEvent = true;
      var flagWorkshopLevelCode = false; 
      var flagWorkshopGradeCode = false; 
      var flagWorkshopContentCode = false;
      var flagWorkshopTypeCode = false;
      var flagWorkshopClassroomCode = false;


      if(!window.sessionStorage.semester){
        var response =  await consultServices('getCurrentSemester','POST', {});
        this.semester = response;
        window.sessionStorage.semester  = JSON.stringify(this.semester);
      }
      if(!window.sessionStorage.eventsSchoolMaster){
        ids.push(20);
        flagEvent = true;
      }
      // if(!window.sessionStorage.schools){
      //   this.schools=await consultServices('listSchools','POST',{});
      //   window.sessionStorage.schools  = JSON.stringify(this.schools);
      // } 
      if(!window.sessionStorage.workshopLevelCode){
        ids.push(10);
        flagWorkshopLevelCode = true;
      }
      if(!window.sessionStorage.workshopGradeCode){
        ids.push(11);
        flagWorkshopGradeCode = true;
      }
      if(!window.sessionStorage.workshopClassroomCode){
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


      if( ids.length > 0){
      //Hacer consulta única de masterValues
          var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
          //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
          if(flagEvent == true){
              this.eventsSchoolMaster = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
              window.sessionStorage.eventSchool  = JSON.stringify(this.eventsSchoolMaster);
          }
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
      }
      this.semester =JSON.parse( window.sessionStorage.semester );

      // if(!window.sessionStorage.school){
      //   this.school=await  consultServices('getSchool','POST',{id:this.id,semesterCode:this.semester.id});
      //   window.sessionStorage.school  = JSON.stringify(this.school);
      // }

      this.semester =JSON.parse( window.sessionStorage.semester );
      // this.school =JSON.parse( window.sessionStorage.school );
      // this.schools =JSON.parse( window.sessionStorage.schools );
      this.eventSchool =JSON.parse( window.sessionStorage.eventSchool );
      this.workshopLevelCode =JSON.parse( window.sessionStorage.workshopLevelCode );
      this.workshopClassroomCode =JSON.parse( window.sessionStorage.workshopClassroomCode );  
      this.workshopContentCode =JSON.parse( window.sessionStorage.workshopContentCode );
      this.workshopTypeCode =JSON.parse( window.sessionStorage.workshopTypeCode );                
      this.workshopGradeCode =JSON.parse( window.sessionStorage.workshopGradeCode ); 
      // console.log("este es el semestre ", this.semester);
    },
    async shownotificacion() {
        $('.bs-example-modal-not').modal('show');

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
        for (let index = 0; index < array.length; index++) {
                if(array[index].code == string){
                    display=array[index].displayValue;
                }
        }           
        console.log("string ",string)
        console.log("array  ",array)
        return display;
    },

    tranforForSelectTreeB(schoolEvents) {
      return _.map(schoolEvents,(schoolEvent)=>{
        var response = {
          id: schoolEvent.id,
          label: schoolEvent.displayName ,
          startDate: schoolEvent.startDate,
          }
        return response;
      })
    },

    async listJobs(){
      this.jobs=  await consultServices('getJobs','POST',{category:'JUNIOR'});
    },

    async onChangeTeam (){

    },

    async listSchoolEvents(idFather) {

        var form = {
          semesterCode: this.semester.id,
          id: idFather
        }

        const response = await consultServices('getSchoolEventsForAssistance','POST',form);
    
        //ordenar eventos por fechas 
        var orderedEvents = response.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate);  });      

        this.schoolEvents = _.map(orderedEvents, (item) => {
          var event = _.cloneDeep(item);
          var eventDescription = _.find(this.eventsSchoolMaster, (object) => { return object.code == item.SchoolManagementEventType.descriptionCode });
          event.displayName = item.startDate + ' - ' + eventDescription.displayValue ;
          return event
        })

        this.options = this.tranforForSelectTreeB(this.schoolEvents);
    },
  
    async listWorkshopsxSchool(){        
        var json={
          id:'',requestedWorkshopDisplayName:'',displayValue:'',
        }
        var type = '';
        var grade = '';
        var classroom = '';
        var level = '';
        var workshops= [];

        //si el rol no es de operaciones 
        if(this.formReasign.newRole != 'SCHOOL_OPERATIONS'){
          //mostrar el combobox de talleres
          this.flagWorkshops = true
          
          //listar todos los talleres 
          this.workshopsxSchool = []
          const response=await consultServices('getRooms','POST',{id: this.idSchool, semesterCode: this.semester.id});

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
          //si el rol es divertimate
          if(this.formReasign.newRole == 'SCHOOL_MATH'){
            for (let index = 0; index < workshops.length; index++) {
            if(workshops[index].typeCode == 'WORKSHOP_MATH'){
              this.workshopsxSchool.push(workshops[index])
            }            
            }          
          }
          //si el rol es taller 
          if(this.formReasign.newRole == 'SCHOOL_CUSTOM'){
            for (let index = 0; index < workshops.length; index++) {
            if(workshops[index].typeCode == 'WORKSHOP_CUSTOM'){
              this.workshopsxSchool.push(workshops[index])
            }            
            }          
          }
          console.log("workXschool:  ",this.workshopsxSchool);

        }else{
          //si es creando operaciones no hay workshop
          console.log("idWork ", this.formReasign);
          this.flagWorkshops=false        
        }
    },

    async listTeachers() {
      //validar que se tome la asistencia el mismo día de la clase o evento      
      var dateEvent =moment(this.formDate.startDate )
      var dateCurrent = moment()
      this.isCheckdisabled = false
      //Cambiado tempralmente, originalmente es != 0 para poder tomar asistencia en eventos pasados
      if(dateEvent.diff(dateCurrent, 'days') > 0){ 
          this.isCheckdisabled = true
      }
      // console.log('Diferencia de días: ', dateEvent.diff(dateCurrent, 'days'))
      this.isLoading = true;
      var form = {
        semesterCode:this.semester.id,
        schoolManagementEventId:this.formDate.id,
        id:this.school.AssignmentRecords[0].School.id//idFather 
        //id: this.idFather
      }



      const response = await consultServices('getTeachers','POST',form);

      this.setDataTable(response);
      this.isLoading = false;
    },

    async unsubscribe() {
      this.isLoading = true;
      var form = _.cloneDeep(this.formEdit);
      var json={}
      json.id = this.formEdit.id
      json.idVolunteerJob = this.formEdit.idVolunteerJob
      json.retirementReason = this.formEdit.reasonUnsubscribe
      if(this.formEdit.reasonUnsubscribe == null || this.formEdit.reasonUnsubscribe == ' ' ){
        alert('Escriba el motivo')
      } else{
        var flag = confirm("¿Seguro que quiere dar de baja al participante");
        console.log("json:::::::::: ",json)
        if(flag == true) {
          const response = await consultServices('setAsRetired','POST',json);
          if(response.status == 200){
            this.formNot.not="Se dio de baja al voluntario";
          }else{
            this.formNot.not="No se pudo dar de baja al voluntario";
          }
          $('.modal').modal('hide');          
          await this.listTeachers();
        }

      }

      this.isLoading = false;
    },

    async updatePassword() {

    },

    async updateTeacher() {

        this.isLoading = true;
        var form =_.cloneDeep(this.formEdit);
        var flag = confirm("¿Guardar cambios?");
        if(flag == true){

          if(await this.$refs.inputName.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
              await this.$refs.inputSecondLastName.returnValidationAsync() == false || await this.$refs.inputAlias.returnValidationAsync() == false || 
              await this.$refs.inputEmail.returnValidationAsync() == false || await this.$refs.inputPhone.returnValidationAsync() == false ||
              await this.$refs.inputDocument.returnValidationAsync() == false){
                this.formNot.tit="Actualización incorrecta "; this.formNot.not="No se ha podido actualizar al docente";
          }else{

              const response=  await consultServices('updateVolunteer','POST',form);
              this.formNot.tit="Actualización correcta "; this.formNot.not="Se ha actualizado al docente de manera exitosa";
              this.listTeachers();
              this.formEdit={};

              $('.modal').modal('hide');

          }
              this.shownotificacion();
        }
        this.isLoading = false;

    },

    async createAttendance(form) {
      console.log("form  createAttendance ", form);
      this.isLoading = true;
      const response = await consultServices('createNewAttendanceByEvent','POST',form);
      if(response.message){
        alert(response.message)
      }
      await this.listTeachers();
      this.isLoading = false;
    },

    async updateAsistence (form) {
      this.isLoading = true;
      const response = await consultServices('updateAttendance','POST',form);
      await this.listTeachers();
      this.isLoading = false;
    },
    
    setHeadTable(){
      this.colum = [
        {label:'Asistencia', name:'asistence',find:0, sort:0},
        {label:'Nombre' ,name:'fullName' ,find:1 ,sort:1},
        {label:'Cargo' ,name:'job' ,find:1 ,sort:1},
        {label:'Nickname' ,name:'alias' ,find:1 ,sort:1},
        {label:'Email' ,name:'email' ,find:1 ,sort:1},
        {label:'Celular' ,name:'phone' ,find:1 ,sort:1},
        {label:'N. de Documento' ,name:'documentNumber' ,find:1 ,sort:1},
        {label:'Fec. nacimiento' ,name:'birthDate' ,find:1 ,sort:1},               
        {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
      this.titleTable = "Lista de creandos";
    },

    refreshData() {
        // console.log("entró a refreshdata:::::::::::::::::",this.$refs)
        this.$refs.tableMaf.formatData(this.teachers);
    },

    setDataTable(arrayData){
      // console.log("isCheckdisabled:::::::::::::::::::", this.isCheckdisabled)
      // console.log("aray::::::::::::::::::::::::::::::", arrayData)
      var ctx = this;
      this.teachers = [];
      arrayData.forEach(item => {
        var itemAux = item.VolunteerJob.Volunteer;
        var idVolunteerJob = item.VolunteerJob.id
        var teacherItem = {};
        var flagAssistance = false;
        var form = {};
        var prefix= item.VolunteerJob.Job.category == 'SENIOR' ? prefix = "GDC": item.VolunteerJob.Job.code == 'SCHOOL_OPERATIONS' ? prefix ="Operaciones" : prefix = "" ;
        var fullName =prefix+"  "+ itemAux.name + " " + itemAux.lastName + " " + (itemAux.secondLastName != null ? itemAux.secondLastName:"")
        teacherItem.fullName = fullName;
        teacherItem.job = item.VolunteerJob.Job.name;
        teacherItem.alias = itemAux.alias;
        teacherItem.email = itemAux.email;
        teacherItem.phone = itemAux.phone;
        teacherItem.documentNumber = itemAux.documentNumber;
        teacherItem.birthDate = itemAux.birthdate?  moment(itemAux.birthdate).format('DD/MM/YYYY'): '';
        // teacherItem.statusCode = <font style="vertical-align: inherit;">
        // {itemAux.statusCode=='VOLUNTEER_ACTIVE'?<button type="button" class="btn btn-success btn-xs">Activo</button>:null}
        // {itemAux.statusCode=='VOLUNTEER_INACTIVE'?<button type="button" class="btn btn-danger btn-xs">Inactivo</button>:null}
        // </font>;

        //Asistencia
        // if(this.isCheckdisabled == true){
        //   console.log("entró 1 ")
        //   teacherItem.asistence = <div><input type="checkbox" checked = "true" disabled="true" /></div>;
        // }else{
          if(itemAux.Attendances.length > 0) {
          
            form.id = itemAux.Attendances[0].id;
            if(itemAux.Attendances[0].statusCode == 'ATTENDANCE_ATTENDED') {
              form.statusCode = 'ATTENDANCE_CREATED';
              flagAssistance = true ;
            }else if(itemAux.Attendances[0].statusCode == 'ATTENDANCE_CREATED') {
              form.statusCode = 'ATTENDANCE_ATTENDED';
              flagAssistance = false ;
            };
            // console.log("tiene asistencia:::::::::::", itemAux.documentNumber)  
            // console.log("checked:::::::::::::::::::: ",flagAssistance )
            teacherItem.asistence = <div> <input type="checkbox" checked = {flagAssistance} disabled={this.isCheckdisabled }  onChange={()=>ctx.updateAsistence(form)} /></div>;

          }else {
            var flag=false;
            form.idSchoolManagementEvent = this.formDate.id;
            form.idVolunteer = itemAux.id;
            form.startDate = this.formDate.startDate;
            form.startHour1 = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).startHour1;
            form.startHour2 = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).startHour2;
            form.isClass = true;
            form.isWorkshop = true;
            // console.log("no tiene asistencia :::::::::: ", itemAux.documentNumber)  
            // console.log("checked:::::::::::::::::::: ",flag )
            teacherItem.asistence = <div><input type="checkbox" checked = {flag} disabled={this.isCheckdisabled }  onChange={()=>ctx.createAttendance(form)} /></div>;
          }
       //}


        var itemEdit = {
          name:itemAux.name,
          lastName:itemAux.lastName,
          secondLastName:itemAux.secondLastName,
          fullName:teacherItem.fullName,
          job:teacherItem.job,
          alias:teacherItem.alias,
          email:teacherItem.email,
          phone:teacherItem.phone,
          documentNumber:teacherItem.documentNumber,
          statusCode:itemAux.statusCode,
          id:itemAux.id,
          idVolunteerJob:idVolunteerJob,
          birthdate:moment(itemAux.birthdate)._d,
        }

        teacherItem.actions = <font style="vertical-align: inherit;">
              <div> <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.showPasswordEdit(itemEdit)} data-toggle="modal" data-target=".modal-not"> Reiniciar contraseña</button> </div>
              <div> <button onClick={()=>ctx.showEdit(itemEdit)} type="button" class="btn btn-warning btn-xs"data-target=".bs-example-modal-lg" data-toggle="modal">Editar</button> </div>
              {item.VolunteerJob.Job.category != 'SENIOR' ?<div> <button onClick={()=>ctx.showReasign(item)} type="button" class="btn btn-info btn-xs" data-target=".bs-example-modal-rea" data-toggle="modal"> Reasignación </button> </div>:null}
              
            </font>
            //<div> <button onClick={()=>ctx.showEditResetPassword(item)} type="button" class="btn btn-danger btn-xs" data-target=".bs-example-modal-rp" data-toggle="modal">Resetear contraseña</button> </div>
            // {item.VolunteerJob.Job.category != 'SENIOR' ? <div> <button onClick={()=>ctx.showCreateNewRotation(item)} type="button" class="btn btn-info btn-xs"data-target=".bs-example-modal-rot" data-toggle="modal"> Solicitar rotación </button> </div>: null}
      this.teachers.push(teacherItem);
      });

          this.refreshData();
    },

    showEdit(item){
      this.formEdit = _.cloneDeep(item);
    },

    showEditResetPassword(item){
    },

    showCreateNewRotation(item){
      // console.log("item  nueva rotación ", item)
      // this.formRotation = {};
      
      // var itemAux = item.VolunteerJob.Volunteer;        
      // var fullName = itemAux.name + " " + itemAux.lastName + " " + (itemAux.secondLastName != null ? itemAux.secondLastName:"")
      // this.formRotation.fullName = fullName;
      // this.formRotation.job = item.VolunteerJob.Job.name;
      // this.formRotation.idVolunteer = item.VolunteerJob.Volunteer.id; 
      // this.formRotation.schoolName = item.School.name;       
      // console.log("solicitante de rotación  ",this.formRotation)         
    },

    showReasign(item){
      console.log("item  nueva reasignación ", item)
      this.formReasign = {} 
      item.VolunteerJob.Job.code == 'SCHOOL_OPERATIONS'? this.flagWorkshopDetails = false : this.flagWorkshopDetails = true;
      var itemAux = item.VolunteerJob.Volunteer;        
      var fullName = itemAux.name + " " + itemAux.lastName + " " + (itemAux.secondLastName != null ? itemAux.secondLastName:"")
      this.formReasign.fullName = fullName;
      this.formReasign.job = item.VolunteerJob.Job.name;
      this.formReasign.idVolunteerJob = item.VolunteerJob.id;
      this.formReasign.newRole = item.VolunteerJob.Job.code;
      if(item.Workshop){
        this.formReasign.contentCode = this.getDisplayValue(item.Workshop.contentCode, 13);
        this.formReasign.typeWorkshop = this.getDisplayValue(item.Workshop.typeCode, 14);
        this.formReasign.levelCode = this.getDisplayValue(item.Workshop.levelCode, 10);
      }
      this.formReasign.requestedWorkshopDisplayName = item.requestedWorkshopDisplayName;
      this.formReasign.idWorkshopAct = item.idWorkshop;
      this.formReasign.codeJobAct = item.VolunteerJob.Job.code;
      this.formReasign.id = item.id;
      this.formReasign.schoolName = item.School.name;      
      console.log("solicitante de reasignación  ",this.formReasign)  
      
      var itemAux = item.VolunteerJob.Volunteer;        
      var fullName = itemAux.name + " " + itemAux.lastName + " " + (itemAux.secondLastName != null ? itemAux.secondLastName:"")
      this.formRotation.fullName = fullName;
      this.formRotation.job = item.VolunteerJob.Job.name;
      this.formRotation.idVolunteer = item.VolunteerJob.Volunteer.id; 
      this.formRotation.schoolName = item.School.name;       
      console.log("solicitante de rotación  ",this.formRotation)  
    },

    async CreateNewRotation(){
      var form = {}
      console.log("id school sol ", this.formRotation.school.id);
        form.idDestinationSchool = this.formRotation.school.id;
        if(form.idDestinationSchool == this.idSchool ){
          alert("Debe seleccionar un equipo de destino diferente a su equipo actual")
        }else{
        var flag= confirm("¿Solicitar rotación de creando?");
        if(flag==true){
        form.idVolunteer =  this.formRotation.idVolunteer;
        form.semesterCode = this.semester.id;
        form.idOriginSchool = this.idSchool;
        form.idDestinationSchool = this.formRotation.school.id;
        form.nameDestinationSchool =  this.formRotation.school.name;
        form.reason = this.formRotation.reason;
        console.log("form crear rotación ", form);
        const response=  await consultServices('createRotation','POST',form);
                if(response.idAssignmentRecord){
                this.formNot.tit="Solicitud creada "; this.formNot.not="Se ha creado su solicitud de rotación de manera exitosa"                    
                this.formRotation={};
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo crear la oslicitud de rotación."
                }
                $('.modal').modal('hide');
                this.shownotificacion();
        }
        console.log("form crear rotación ", form);
      
      
        }
    },
    
    async updateAssignmentRecord(){

        //se actualizará el rol?
        if(this.formReasign.codeJobAct == this.formReasign.newRole){
          //son iguales, solo se cambia de taller
          if(this.formReasign.workshop.id == this.formReasign.idWorkshopAct ){
             alert("seleccione un taller distinto al taller asociado al creado actualmente")
          }else{
            var flag= confirm("¿Actualizar taller asociado a creando?");
            if(flag==true){
              var form={}
              form.id =  this.formReasign.id;
              form.idWorkshop = this.formReasign.workshop.id;
              form.requestedWorkshopDisplayName = this.formReasign.workshop.requestedWorkshopDisplayName;
              console.log("form ",form)

              const response=  await consultServices('updateAssignmentRecord','POST',form);
              if(response.status == 200){
              this.formNot.tit="Reasignación exitosa "; this.formNot.not="Se ha reasignado al creando."                    
              this.formReasign={};
              await this.listTeachers();              
              }else{
                  this.formNot.tit="Error en la operación"; this.formNot.not="No se pudo reasignar al creando."
              }
            }
          }

        }else{
          //cambiar de rol
          //actualizar el volunteerJob
            var flag= confirm("¿Reasignar creando?");
            if(flag==true){

              //actualizar assignmentRecord
              var jsonAssignment={}
              jsonAssignment.id= this.formReasign.id

              if(this.formReasign.newRole == 'SCHOOL_OPERATIONS'){
                jsonAssignment.idWorkshop= null
                jsonAssignment.requestedWorkshopDisplayName = null
              }else{
                jsonAssignment.idWorkshop= this.formReasign.workshop.id 
                jsonAssignment.requestedWorkshopDisplayName = this.formReasign.workshop.requestedWorkshopDisplayName

              }
              const response=  await consultServices('updateAssignmentRecord','POST',jsonAssignment);

              //actualizar volunteerJob
              var jsonVolunteerJob={}
              jsonVolunteerJob.id = this.formReasign.idVolunteerJob
              var job = _.find(this.jobs, (object) => { return object.code == this.formReasign.newRole }); 
              jsonVolunteerJob.idJob = job.id
              const response1=  await consultServices('updateJobVolunteerJob','POST',jsonVolunteerJob);

              //notificar resultados 
              if(response1.status == 200 && response.status == 200){
                this.formNot.tit="Reasignación exitosa "; this.formNot.not="Se ha reasignado al creando." 
                await this.listTeachers();
              }else{
                 this.formNot.tit="Error en la operación"; this.formNot.not="No se pudo reasignar al creando."
              }
            }

        }

        $('.modal').modal('hide');
        this.shownotificacion();
      
      
    },

    async showPasswordEdit(item){
      var flag= confirm("¿Cambiar la contraseña  actual a una asignada por defecto?");
      if(flag==true){
        const response = await consultServices('resetPassword','POST',{documentNumber:item.documentNumber});
        if(response.status == 200){
         this.formNot.tit="Modificación de contraseña "; this.formNot.not="Se actualizó la contraseña del usuario de manera correcta"
        }  
        else{ 
          this.formNot.tit="Modificación de contraseña "; this.formNot.not="No se pudeo actualizar la contraseña del usuario";}
        $('.modal').modal('hide');
        this.shownotificacion();
      }
    },

    async getEvent(){
      //obtener fecha actual
      var dateCurrent = moment()
      var flagOther = true
      var event={}
      var orderedEvents = this.schoolEvents 

      //hay un evento el día de hoy?
      for (let index = 0; index < orderedEvents.length; index++) {
        if(new Date(orderedEvents[index].startDate) == new Date(dateCurrent)){
           event = orderedEvents[index]
           flagOther = false
        }        
      }
      // console.log("buscar pasado mas reciente? ",flagOther)
      if(flagOther){
        //si no hay, buscar el evento pasado más reciente
        var final = []
        for (let index = 0; index < orderedEvents.length; index++) {
          if(new Date(orderedEvents[index].startDate) < new Date(dateCurrent)){
              final.push(orderedEvents[index])
          }        
        }
        event = final[final.length-1]
      }
      // console.log("este es el evento ", event)
      //cargar la tabla
      if(event){
        this.formDate = {
          id: event.id,
          label: event.displayName ,
          startDate:  event.startDate,
        }
        await this.listTeachers();
      }
    }


  }
}
</script>
<style scoped>
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    margin: 0px;
}

</style>


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-nrix{text-align:center;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
