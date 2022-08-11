<template>
  <div class="row">
      <LoadingComponent v-if="isLoading"></LoadingComponent>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header">
                <h2>Gestionar salones </h2>
                <div class="card-header-actions" align-items: center>
                    <button type="button" @click="showAddRoom()" data-toggle="modal" data-target=".modal-rooms" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar salón
                    </button>
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
                <div class="clearfix"></div>
            </div>

          

            <nav class="breadcrumb">           
              <a v-if="flagCustom == true" class="link" style="color:#20a8d8;" href="javascript:void(0)" @click="showWorkshops('WORKSHOP_CUSTOM')">Talleres  ({{quantityCustom}})  </a> <a v-if="flagCustom == false" class="link" href="javascript:void(0)" @click="showWorkshops('WORKSHOP_CUSTOM')">Talleres ({{quantityCustom}})  </a>  | 
              <a v-if="flagMath == true" class="link" style="color:#20a8d8;" href="javascript:void(0)" @click="showWorkshops('WORKSHOP_MATH')"> Divertimate ({{quantityMath}})  </a> <a v-if="flagMath == false" class="link"  href="javascript:void(0)" @click="showWorkshops('WORKSHOP_MATH')"> Divertimate ({{quantityMath}})  </a> | 
              <a v-if="flagGrade == true" class="link" style="color:#20a8d8;" href="javascript:void(0)" @click="showWorkshops('GRADE')"> Divertimate agrupado</a>   <a v-if="flagGrade == false" class="link"  href="javascript:void(0)" @click="showWorkshops('GRADE')"> Divertimate agrupado</a> 
            </nav>


            <div v-if="flagGrouped == false"  class="card-body">
                <TableMaf :header="colum" :data="rooms" :tableTitle="titleTable" :searchOption="false" ref="tableMaf">
                </TableMaf>
            </div>
            
            <div v-if="flagGrouped == true" class="card-body">
                <div class="table-responsive">
                    <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                    <thead>
                        <tr >
                            <th style="width: 20px;">Grado</th>
                            <th style="width: 20px;">Alumnos Matriculados</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(room,index) in roomsGrouped" >
                            <th style="width: 20px;"><input type="text" v-model="room.grade" class="form-control col-md-7 col-xs-12" readonly='readonly'></th>
                            <th style="width: 20px;"><input type="text" v-model="room.enrollments" class="form-control col-md-7 col-xs-12" readonly='readonly'></th>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <!--Modal-->
            <div class="modal fade modal-rooms" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="card-header">
                        <h1 v-if="formType=='Add'">Agregar salón</h1>
                        <h1 v-if="formType=='Edit'">Editar salón</h1>
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="card-body"> <!--body-->

                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de taller</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formWorkshop.typeCode" @change="setCategoryWorkshop(formWorkshop.typeCode)">
                                      <option v-for="type in workshopType" :value="type.code">{{type.displayValue}}</option>
                                  </select>
                              </div>
                          </div>

                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Cupos:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <input v-model="formWorkshop.quota" type="text" required="required" class="form-control col-md-12 col-xs-12">
                          </div>
                      </div>

                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Semestre:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <input v-model="formWorkshop.semesterCode" type="text" required="required" class="form-control col-md-12 col-xs-12" readonly>
                          </div>
                      </div>

                    <div v-if="formWorkshop.typeCode == 'WORKSHOP_MATH'">
                      <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Categoria:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                              <input v-model="mathCategory.displayValue" type="text" required="required" class="form-control col-md-12 col-xs-12" readonly>
                          </div>
                      </div>
                      <div class="card-body">
                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Grado:</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formWorkshop.gradeCode" >
                                      <option v-for="grade in grades" :value="grade.code">{{grade.displayValue}}</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="card-body">
                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Sección:</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formWorkshop.classroomCode" >
                                      <option v-for="room in classrooms" :value="room.code">{{room.displayValue}}</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                    </div>

                    <div v-if="formWorkshop.typeCode == 'WORKSHOP_CUSTOM'">

                      <div class="card-body">
                          <inputMaf type='text' v-model="formWorkshop.displayName" :valueInput="formWorkshop.displayName"  label="Nombre del taller:" :validation="{required:true, max:50}" nameInput="text" etiqueta='true' ref="inputDisplayName" >
                          </inputMaf>
                      </div>
                      
                      <div class="card-body">
                          <inputMaf type='text' v-model="formWorkshop.url" :valueInput="formWorkshop.url"  label="Url del video:" :validation="{required:true}" nameInput="text" etiqueta='true' ref="inputUrl" >
                          </inputMaf>
                      </div>

                      <div class="card-body">
                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Categoria:</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" @change="listContent"  v-model="formWorkshop.categoryCode"  >
                                      <option v-for="category in categories" :value="category.code">{{category.displayValue}}</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="card-body">
                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Contenido:</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formWorkshop.contentCode" >
                                      <option v-for="content in newListWorkshop" :value="content.code">{{content.displayValue}}</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="card-body">
                          <div class="form-group">
                              <label class="control-label col-md-3 col-sm-3 col-xs-12">Nivel:</label>
                               <div class="col-md-6 col-sm-6 col-xs-12">
                                  <select class="form-control" v-model="formWorkshop.levelCode" >
                                      <option v-for="level in levels" :value="level.code">{{level.displayValue}}</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                    </div>
                    </div><!--body-->

                    <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                                <button v-if="formType=='Add'"  @click="createNewRoom()" type="button" class="btn btn-success">Agregar</button>
                                <button v-if="formType=='Edit'" @click="updateRoom()" type="button" class="btn btn-danger">Grabar</button>
                            </center>
                    </div>
                    </div>
                </div>
            </div>
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

        </div> <!--card-->
    </div> <!--col 12 -->
  </div> <!--row-->
</template>

<script>
import consultServices from './../../utilities/consultServices.js';
import moment from 'moment';
import _ from 'lodash';
//import * as lang from "vuejs-datepicker/src/locale";
import { Datetime } from 'vue-datetime';
//COMPONENTS
import LoadingComponent from "./../../components/loadingComponent.vue";
//import Datepicker from 'vuejs-datepicker';
import TableMaf from "./../../components/TableMaf.vue";
import SearchInput from "./../../components/searcherComponent.vue";
import Message from "./../../components/MessageConfirmation.vue";
import inputMaf from "./../../components/inputMaf.vue";
import XLSX from './../../components/xlsx/xlsx.js';

export default {
    name: "roomsManagement",
    components: {
        LoadingComponent,
        TableMaf,
        Message,
        inputMaf,
    },

    data: () => ({
        id: window.INITIAL_STATE.id,
        idSchool:window.INITIAL_STATE.idSchool,
        idTeam: null,
        idFather: null,
        teams:[],
        isLoading: true,
        colum:[],
        columGrouped:[],
        titleTable:'',
        titleTableGrouped:'',
        formNot:{not:'',tit:'',},

        flagCustom:false,
        flagMath:false,
        flagGrade:false,


        semester: [],
        workshopCategories: [],
        workshopType: [],
        grades: [],
        levels: [],
        classrooms: [],
        contentWorkshop: [],
        newListWorkshop:[],
        mathCategory: [],
        allRooms:[],
        school:[],
        formWorkshop: {},
        rooms: [],
        roomsGrouped: [],
        grouped:[],
        allRooms: [],
        quantityCustom:0,
        quantityMath:0,
        formType: '',
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
        studentsReport: [],
        flagGrouped:false,
        typeCode:'',


    }),

    async created () {
      console.log("school  ", this.idSchool)
      await this.setHeadTable('WORKSHOP_CUSTOM');
      await this.getSessionStorage();
      var urlParams = new URLSearchParams(window.location.search);
    
      if(urlParams.get('idFather') != null && urlParams.get('idTeam')){  
        this.idFather = urlParams.get('idFather')
        this.idTeam = urlParams.get('idTeam') 
        var responseProjects = await consultServices('listSchoolsBySemester','POST',{semesterCode:this.semester.id});
        for (var i = 0; i < responseProjects.length; i++) {
          if(responseProjects[i].idFather == this.idFather){
            this.teams.push(responseProjects[i])
          }          
        } 
      }
      else{
        document.getElementById('divTeams').style.display = "none";
        var getSchool =  await consultServices('getSchool','POST',{id:this.id, semesterCode: this.semester.id});
        if(! getSchool.AssignmentRecords[0].School || !this.idSchool ){
            alert('Usted no cuenta con un equipo asignado')
        }      
        this.school = getSchool.AssignmentRecords[0].School;
        this.idTeam = this.school.id
      }      
      var id=0
      this.idTeam != null ? id = this.idTeam : id = this.school.id
      await this.getRooms(id)
      await this.showWorkshops('WORKSHOP_CUSTOM')
    },

    methods: {
      //Consultamos los valores maestros
      async getSessionStorage(){
        this.isLoading = true;

        //validar si existen los atributos en sessionStorage
        //si no existen y son masterValues, agregar idMaster a ids
          var ids = [] ;
          var flagLevels = false;
          var flagContentWorkshop = false;
          var flagClassrooms = false;
          var flagGrades = false;
          var flagWorkshopCategories = false;
          var flagWorkshopType = false;

        if(!window.sessionStorage.levels){
          ids.push(10);
          flagLevels = true;
        }
        if(!window.sessionStorage.grades){
          ids.push(11);
          flagGrades = true;
        }
        if(!window.sessionStorage.classrooms){
          ids.push(12);
          flagClassrooms = true;
        }
        if(!window.sessionStorage.contentWorkshop){
          ids.push(13);
          flagContentWorkshop = true;
        }
        if(!window.sessionStorage.workshopType){
          ids.push(14);
          flagWorkshopType = true;
        }
        if(!window.sessionStorage.semester){
          var response =  await consultServices('getCurrentSemester','POST', {});
          this.semester = response;
          window.sessionStorage.semester  = JSON.stringify(this.semester);
        }
        if(!window.sessionStorage.workshopCategories){
          ids.push(17);
          flagWorkshopCategories = true;
        }
        console.log("acá están las ids " ,ids);
        //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

        if( ids.length > 0){

        //Hacer consulta única de masterValues
            var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
            console.log("array  ",arrayMasters);
            //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
            if(flagLevels == true){
                this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
                window.sessionStorage.levels  = JSON.stringify(this.levels);
            }
            if(flagGrades == true){
                this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                window.sessionStorage.grades  = JSON.stringify(this.grades);
            }
            if(flagClassrooms == true){
                this.classrooms = _.filter(arrayMasters, function(master) {return master.idMaster == 12; })
                window.sessionStorage.classrooms  = JSON.stringify(this.classrooms);
            }
            if(flagContentWorkshop == true){
                this.contentWorkshop = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
                window.sessionStorage.contentWorkshop  = JSON.stringify(this.contentWorkshop);
            }
            if(flagWorkshopType == true){
                this.workshopType = _.filter(arrayMasters, function(master) {return master.idMaster == 14; })
                window.sessionStorage.workshopType  = JSON.stringify(this.workshopType);
            }

            if(flagWorkshopCategories == true){
                this.workshopCategories = _.filter(arrayMasters, function(master) {return master.idMaster == 17; })
                window.sessionStorage.workshopCategories  = JSON.stringify(this.workshopCategories);
            }
        }

            // //si los datos existen cargarlos en los arreglos definidos para la patalla
            this.levels =JSON.parse( window.sessionStorage.levels );
            this.grades =JSON.parse( window.sessionStorage.grades );
            this.classrooms =JSON.parse( window.sessionStorage.classrooms );
            this.contentWorkshop =JSON.parse( window.sessionStorage.contentWorkshop );
            this.newListWorkshop = this.contentWorkshop;
            this.workshopType =JSON.parse( window.sessionStorage.workshopType );
            this.semester =JSON.parse( window.sessionStorage.semester );
            this.workshopCategories =JSON.parse( window.sessionStorage.workshopCategories );
            // //fin de la carga de arreglos para la pantalla

        this.formWorkshop.semesterCode = this.semester.id;

        this.setCategoriesWorkshop();

        this.isLoading = false;
      },

      //Consultamos los salones por equipo
      async getRooms(id){
        this.isLoading = true;
        //Talleres del equipo
          let jsonI = {
            id: id,//this.school.id,
            semesterCode: this.semester.id,
          };
          const responseVIII = await consultServices('getSchoolWorkshops','POST',jsonI);
          this.allRooms = responseVIII;
        this.isLoading = false;
      },

      //Configuramos la cabecera de la tabla
      setHeadTable(type){
        if(type == 'WORKSHOP_CUSTOM'){
          this.colum = [
            {label:'Nombre' ,name:'nameRoom' ,find:1 ,sort:1},
            {label:'Grado/Ciclo' ,name:'level' ,find:1 ,sort:1},
            {label:'Capacidad máxima' ,name:'quota' ,find:0 ,sort:1},
            {label:'Alumnos matriculados' ,name:'enrollments' ,find:0 ,sort:1},
            {label:'Vacantes disponibles' ,name:'available' ,find:0 ,sort:1},
            {label:'Avance del sillabus' ,name:'advance' ,find:0 ,sort:1},
            {label:'' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Talleres";
        }
        if(type == 'WORKSHOP_MATH'){
          this.colum = [
            {label:'Nombre' ,name:'nameRoom' ,find:1 ,sort:1},
            {label:'Grado/Ciclo' ,name:'level' ,find:1 ,sort:1},
            {label:'Capacidad máxima' ,name:'quota' ,find:0 ,sort:1},
            {label:'Alumnos matriculados' ,name:'enrollments' ,find:0 ,sort:1},
            {label:'Vacantes disponibles' ,name:'available' ,find:0 ,sort:1},
            {label:'' ,name:'actions' ,find:0 ,sort:0}];
          this.titleTable = "Salones Divertimate";
        }
        if(type == 'GRADE'){
          this.columGrouped=[]
          this.columGrouped = [            
            {label:'Grado' ,name:'grade' ,find:1 ,sort:0},
            {label:'Alumnos matriculados' ,name:'enrollments' ,find:0 ,sort:0}];
          this.titleTableGrouped = "Divertimate Agrupado";

        }

      },

      refreshData(type){
        if(type == 'WORKSHOP'){
          this.$refs.tableMaf.formatData(this.rooms);
        }      
      },

      async showWorkshops(type){
        console.log('entró', type)
        var finalArray=[]
        if(type == 'WORKSHOP_CUSTOM'){ 
            this.flagGrouped = false
            this.flagCustom = true
            this.flagGrade = false
            this.flagMath =false
            this.setHeadTable('WORKSHOP_CUSTOM');        
            for (let index = 0; index < this.allRooms.length; index++) {
              if(this.allRooms[index].typeCode == 'WORKSHOP_CUSTOM'){
                finalArray.push(this.allRooms[index])
              }                           
            }
            this.quantityCustom = finalArray.length
            this.quantityMath = this.allRooms.length -  finalArray.length
            this.setDataTable(finalArray,'WORKSHOP');
        }
        if(type == 'WORKSHOP_MATH'){
            this.flagGrouped = false
            this.flagCustom = false
            this.flagGrade = false
            this.flagMath =true
            this.setHeadTable('WORKSHOP_MATH');  
            for (let index = 0; index < this.allRooms.length; index++) {
              if(this.allRooms[index].typeCode == 'WORKSHOP_MATH'){
                finalArray.push(this.allRooms[index])
              }
              
            }
            this.quantityMath = finalArray.length
            this.quantityCustom = this.allRooms.length -  finalArray.length
            this.setDataTable(finalArray,'WORKSHOP');
        }
        if(type == 'GRADE'){
            this.flagGrouped = true
            this.flagCustom = false
            this.flagGrade = true
            this.flagMath =false
            finalArray = await consultServices('getGroupedEnrollments','POST',{semesterCode:this.semester.id, idSchool:this.school.id,typeCode:'WORKSHOP_MATH' });
            this.setDataTable(finalArray,'GRADE');
        }
        
      },

      setDataTable(arrayData, type){
          var ctx = this;
          if(type == 'WORKSHOP'){
              this.rooms = [];
              this.rooms = _.map(arrayData, (item) => {
                console.log('item ', item )
                var object = {};
                var tempLevel = {};
                var tempWorkshop = {};
                if(item.typeCode == 'WORKSHOP_CUSTOM' && item.contentCode){
                  tempLevel = _.find(ctx.levels, (o) => { return o.code == item.levelCode });
                  console.log("estas buscando en level")
                  console.log("item.contentCode:",item.contentCode);
                  console.log("templevel:", tempLevel)
                  object.level = tempLevel.displayValue;
                  tempWorkshop = _.find(ctx.allRooms, (o) => { return o.id == item.id })
                  object.nameRoom = tempWorkshop.displayName != null? object.nameRoom = tempWorkshop.displayName :  object.nameRoom =this.getDisplayValue(item.contentCode, 13)     ;
                }else{
                  tempLevel = _.find(ctx.grades, (o) => { return o.code == item.gradeCode });
                  //console.log("temp:",tempLevel);
                  console.log("estas buscando en grade")
                  console.log("item:",item.gradeCode);
                  console.log("templevel:", tempLevel)
                  object.level = tempLevel.displayValue;
                  object.nameRoom = 'Divertimate';
                };
                object.quota = item.quota;
                object.enrollments = item.enrollments;
                object.available = item.quota - item.enrollments;
                object.classroomCode = item.classroomCode;
                object.advance = item.advance ? object.advance =  item.advance.toFixed(2)+ '%': object.advance = '0%' ;


                object.actions = <div class="btn-group" role="group">
                                          <button class="btn btn-primary dropdown-toggle"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>  
                                           <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="margin: 0px;">
                                            <a class="dropdown-item" href="javascript:void(0)" onClick={()=>ctx.showEditRoom(item)} data-toggle="modal" data-target=".modal-rooms" >Editar salon</a>
                                            <a class="dropdown-item" href={'/dashboard/attendanceStudentsADM/'+ item.id+'/'+item.typeCode+'/'+this.idSchool } target="_newtab">Asistencias</a>
                                            {item.typeCode == 'WORKSHOP_CUSTOM'? <a class="dropdown-item" href="javascript:void(0)" onClick={()=>ctx.exportExcel(item.id)} >Descargar Lista</a>: null}    
                                            {item.typeCode == 'WORKSHOP_CUSTOM'? <a class="dropdown-item" href={'/dashboard/silabusADM/'+ item.id } target="_newtab">Ver silabus</a>: null}    
                                            {item.typeCode == 'WORKSHOP_MATH'?<a class="dropdown-item" href="javascript:void(0)"  onClick={()=>ctx.exportExcel(item.id)}  >Descargar registros</a>: null}  
                                            {item.typeCode == 'WORKSHOP_MATH'?<a class="dropdown-item" href={'/dashboard/guiasDeClaseADM/'+ item.id+'/'+item.gradeCode+'' }  >Ver guías</a>: null}  
                                            <a class="dropdown-item" href="javascript:void(0)" onClick={()=>ctx.removeRoom(item)}>Eliminar</a>   
                                            
                                            
                                 
                                   
                                          </div>
                                   </div>;
                return object
              });

              this.refreshData('WORKSHOP');
          }
          if(type == 'GRADE'){
              console.log('grade ', arrayData)
              this.roomsGrouped = [];
              this.grouped = _.map(arrayData, (item) => {
                console.log('item ', item ) 
                var object = {};
                var temGrade = _.find(ctx.grades, (o) => { return o.code == item.grade_code });
                object.grade = temGrade.displayValue;
                object.enrollments = item.count;
                return object
              });
              this.roomsGrouped = this.grouped

              //this.refreshData('GRADE');

          }

        },

        async showAddRoom(){
          this.isLoading = true;
          this.formType = 'Add';
          this.formWorkshop = {};
          this.formWorkshop.semesterCode=this.semester.id;
          this.isLoading = false;

        },

        showEditRoom(item){
          this.isLoading = true;
          this.typeCode = item.typeCode
          this.formType = 'Edit';
          this.newListWorkshop = this.contentWorkshop;
          this.formWorkshop = {};
          this.formWorkshop = _.cloneDeep(item);
          this.formWorkshop.semesterCode = this.semester.id;
          this.formWorkshop.classroomCode= item.classroomCode;
          if(item.contentCode){
            var tempWorkshop = _.find(this.allRooms, (o) => { return o.id == item.id })
            this.formWorkshop.displayName = tempWorkshop.displayName;
            this.formWorkshop.url = tempWorkshop.url ? tempWorkshop.url : '';
          };
          this.isLoading = false;
        },
        async getWorkshopContent (id){
          console.log('entró a getWorkshopContent')
          var response = await consultServices('getWorkshopContent','POST',{id:id});
          var advance=0;
          for (let index = 0; index < response.WorkshopContents.length; index++) {
            if(response.WorkshopContents[index].content != null){
              advance +=1
            }   
            if(response.WorkshopContents[index].finalAssembly != null){
              advance +=1
            }
            if(response.WorkshopContents[index].goalOfTheDay != null){
              advance +=1
            }
            if(response.WorkshopContents[index].initialAssembly != null){
              advance +=1
            }
            if(response.WorkshopContents[index].operationalRequirements != null){
              advance +=1
            }         
          }
          var final= (advance/(5*response.WorkshopContents.length))*100
          console.log('final  ', final)
          return final
        },

        listContent(){
          console.log("listContent")
          this.newListWorkshop=[]
          for (let index = 0; index < this.contentWorkshop.length; index++) {
            console.log("1::::::::::",this.contentWorkshop[index].parentCode[0])
            console.log("2::::::::::",this.formWorkshop.categoryCode )
            if(this.contentWorkshop[index].parentCode[0] == this.formWorkshop.categoryCode){
              this.newListWorkshop.push(this.contentWorkshop[index])
            }            
          }
          

        },

        setCategoriesWorkshop(){
          let ctx = this;
          ctx.categories = ctx.workshopCategories
          _.map(ctx.categories,(category) =>{
            if(category.parentCode[0] == 'WORKSHOP_MATH'){
              this.mathCategory = category
            };
            return category
          });
          this.categories = _.remove(ctx.categories,(category) =>{
              return category.code != ctx.mathCategory.code
          });
        },

        setCategoryWorkshop(WorkshopType){
          console.log("entrooo ",WorkshopType)
          console.log("asignación", this.formWorkshop.categoryCode)
          console.log("asignación2", this.mathCategory.code)
          if(WorkshopType == 'WORKSHOP_MATH'){
            this.formWorkshop.categoryCode = this.mathCategory.code;
          };
        },

        async onChangeTeam (){
          await this.getRooms(this.idTeam)
          await this.showWorkshops('WORKSHOP_CUSTOM')
        },

        async shownotificacion(){
          $('.bs-example-modal-not').modal('show');
        },

        async createNewRoom(){
          console.log("entró a createNewRoom :::::::::::")
          this.isLoading = true;
          var flagRegister=false; 
          var form = _.cloneDeep(this.formWorkshop);
          form.idSchool=this.school.id;

          if(this.formWorkshop.typeCode == 'WORKSHOP_CUSTOM'){
            if(this.formWorkshop.categoryCode != null && this.formWorkshop.contentCode != null && this.formWorkshop.levelCode !=null){
              flagRegister = true
            }
          }else if(this.formWorkshop.typeCode == 'WORKSHOP_MATH'){
            if(this.formWorkshop.gradeCode != null && this.formWorkshop.quota != null && this.formWorkshop.classroomCode !=null){
              flagRegister = true
            }
          }
          if(flagRegister == true){
              var flag= confirm("¿Crear nuevo salón?");
              if(flag == true){
                
                // //Se agrego la validacion
                // var validateVar = true;
                // if(this.formWorkshop.typeCode == 'WORKSHOP_CUSTOM' ){
                //   if( await this.$refs.inputDisplayName.returnValidationAsync() == false){
                //       validateVar = false;
                //     }
                // } 
                
                // if(validateVar == false) {
                //     this.formNot.tit="Error al registar salón"; this.formNot.not="No se pudo registrar el salón, favor de llenar el campo Nombre del Taller";
                //     this.shownotificacion();
                // } else {
                  const response = await consultServices('createRoom','POST',form);
                  if(response.id){
                    this.formNot.tit="Registro de salón exitoso "; this.formNot.not="Se registró un salón de manera correcta";
                    await this.getRooms(this.idTeam);
                    await this.showWorkshops(this.formWorkshop.typeCode)
                    this.formWorkshop={};
                  }else{
                    this.formNot.tit="Error en el registro de salón  "; this.formNot.not="No se pudo registrar el salón de manera correcta";
                  }
                  $('.modal-rooms').modal('hide');
                  this.shownotificacion();
                //}
                  this.isLoading = false;            
              }
          }else{
            this.formWorkshop.typeCode == 'WORKSHOP_MATH' ? alert('Es necesario especificar número de cupos, grado y sección ') : alert('Es necesario especificar categoría, contenido y nivel ')
            this.isLoading = false;            
          }


          
        },

        async updateRoom(){
          this.isLoading = true;
          var form = _.cloneDeep(this.formWorkshop);
          console.log('form::::::::::::::::: ', form)
         
          var flag= confirm("Actualizar datos del salón seleccionado?");
          if(flag == true){
            //Se agrego la validacion
            var validateVar = true;
            if(this.formWorkshop.typeCode == 'WORKSHOP_CUSTOM'){
              if( await this.$refs.inputDisplayName.returnValidationAsync() == false){
                  validateVar = false;
                }
            } 
            
            if(validateVar == false) {
                this.formNot.tit="Error al registar salón"; this.formNot.not="No se pudo registrar el salón, favor de llenar el campo Nombre del Taller";
                this.shownotificacion();
            }
            else if(this.formWorkshop.typeCode != this.typeCode && this.formWorkshop.enrollments != 0){
                  alert('No se puede cambiar el tipo de taller porque tiene estudiantes matriculados.')
            }else if(parseInt(this.formWorkshop.quota < 0) ){
                  alert('El cupo no puede ser negativo.')
            }else if( parseInt(this.formWorkshop.quota) < parseInt(this.formWorkshop.enrollments)){
                  alert('No se puede colocar un cupo menor a la cantidad de matriculados.')
            } 
            else {
              const response = await consultServices('updateRoom','POST',form);
              if(response.message){
                this.formNot.tit="Actualización exitosa "; this.formNot.not="Se actualizaron los datos del salón de manera correcta"
                this.allRooms = [];
                await this.getRooms(this.idTeam);
                await this.showWorkshops(this.formWorkshop.typeCode)
                this.formWorkshop={};
              }else{
                this.formNot.tit="Error en la actualización de datos de salón  "; this.formNot.not="No se pudo actualizar los datos del salón de manera correcta"
              }
              $('.modal-rooms').modal('hide');
              this.shownotificacion();
            }
          }
          this.isLoading = false;
        },

        async removeRoom(item){
          var typeCode= item.typeCode
          console.log('removeRoom:::',typeCode)
          console.log('removeRoom form:::',this.formWorkshop.typeCode)
          var flag= confirm("¿Eliminar salón?");
          if(flag == true){
            const response = await consultServices('removeRoom','POST',{id:item.id});
            console.log(response);
            if(response.message){
              this.formNot.tit="Operación exitosa "; this.formNot.not="Se eliminaron los datos del salón de manera correcta"
              await this.getRooms(this.idTeam);
              await this.showWorkshops(typeCode)
              this.formWorkshop={};
            }else{
              this.formNot.tit="Error en la operación"; this.formNot.not="No se pudo eliminar los datos del salón de manera correcta"
            }
            $('.modal').modal('hide');
            this.shownotificacion();

          }
        },

        getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 13){
                array=  this.contentWorkshop
            }
            for (let index = 0; index < array.length; index++) {
                    if(array[index].code == string){
                        display=array[index].displayValue;
                    }
            }
            return display;
        },
        
      async exportExcel(idWorkshop) {
        
        var tempFormat =_.cloneDeep(this.titleI);
        var form = {
          id: idWorkshop,
        };
        this.studentsReport = await consultServices('listAllAttendacesByWorkshop','POST', form);

        //Seteamos la cabecera del excel
        var data = [];
        var cont = 0
        var dataBody = [];
        data[0] = _.map(tempFormat,(item_format)=>{
          return item_format;
        });

        console.log('REPORTTTTT', this.studentsReport)
        var dataBody = _.map( this.studentsReport, (item) => {
          console.log('ITEMMMMMMMMMMMMMMM',item.Workshop)
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
          var display= ''
          if(item.Workshop.typeCode == 'WORKSHOP_CUSTOM'){
            if(item.Workshop.levelCode == null){
             display=item.Workshop.displayName 
    
            }else{
             var code0 =   item.Workshop.levelCode
             var level =_.find(this.levels, (item) => { return item.code ==code0 });
             display =item.Workshop.displayName+' - '+ level.displayValue;
            }
          }
          if(item.Workshop.typeCode == 'WORKSHOP_MATH'){
            if(item.Workshop.classroomCode != null && item.Workshop.gradeCode  && item.Workshop.levelCode  ){
             var level=_.find(this.levels, (item0) => { return item0.code == item.Workshop.levelCode });
             var classroom=_.find(this.classrooms, (item0) => { return item0.code == item.Workshop.classroomCode });
             var gradeCode=_.find(this.grades, (item0) => { return item0.code == item.Workshop.gradeCode });
             display = gradeCode.displayValue+' '+ classroom.displayValue+ ' - ' +level.displayValue;
            }else{
             var gradeCode=_.find(this.grades, (item0) => { return item0.code == item.Workshop.gradeCode });
             display = gradeCode.displayValue
            }

          }  
          _student[2]= display        


          item.parentPermission ? _student[3] = "Sí" : _student[3] = "No" ;
          
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
           console.log("revisar", item.Attendances)

            for (let index = 0; index < item.Attendances.length; index++) {
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_7'){
                _student[4] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_8'){
                _student[5] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_9'){
                _student[6] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode== 'WORKSHOP_EVENT_DESCRIPTION_10'){
                _student[7] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode== 'WORKSHOP_EVENT_DESCRIPTION_11'){
                _student[8] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_14'){
                _student[9] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_15'){
                _student[10] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_16'){
                _student[11] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_17'){
                _student[12] = 1
              }
              if(item.Attendances[index].SchoolManagementEvent.descriptionCode == 'WORKSHOP_EVENT_DESCRIPTION_18'){
                _student[13] = 1
              }    
              if(item.grade1 != null){
                _student[14] = item.grade1
              }
              if(item.grade2 != null){
                _student[15] = item.grade2
              }
              if(item.grade3 != null){
                _student[16] = item.grade3
              }
              if(item.grade4 != null){
                _student[17] = item.grade4
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
button.btn.btn-danger.btn-xs {
    color: #ffffff;
    margin: 0px;
}

.tab {
  overflow: hidden;
  border: 1px solid #f0f3f5;
  background-color: #f0f3f5;
}

/* .link { color: #FF0000; } 
.link:hover { color: #00FF00; }   */
.dropdown-menu>li>a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.428571429;
    color: #333;
    white-space: nowrap;
}


</style>
