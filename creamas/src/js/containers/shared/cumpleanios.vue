<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Cumpleaños</h2><br/><br/>
                </div>

                <div class="form-group" style="text-align: left">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Filtro por mes:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <select  class="form-control" v-model="formDate.idMonth" @change="getBirthdays()">
                                 <option disabled="disabled" value="idMonth">Selecciona un mes</option>
                                <option v-for="option in options" v-bind:value="option.id">{{option.label}} </option>
                            </select>
                        </div>
                    </div>

                <div class="card-body">

                    <TableMaf :header="colum" :data="birthdays" :tableTitle="titleTable" :title="false" :datePerPageV="false" :pagination="false" :searchOption="false" ref="tableMaf" >

                    </TableMaf>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import TableMaf from "./../../components/TableMaf.vue";
    import moment from '../../../../assets/dashboard-x/vendors/moment/moment';

    export default {
        name: "CumpleaniosContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            isLoading:false,
            colum:[],
            titleTable:'',
            birthdays:[],
            month:"",
            semester:{},
            levels:[],
            grades:[],
            classrooms:[],
            id:window.INITIAL_STATE.id,
            school:{},
            idSchool:"", 
            formDate:{
                idMonth:''
            },
            options:[],
             }),
        async created () {

            this.isLoading=true;

            await this.getMasterValues();
            await this.setHeadTable();
            this.school =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id})
            console.log("escualaaa: ",this.school)
            let _idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;

            if(_idSchool){
            await this.fillMonths();

            }else if(!_idSchool){
                alert("El  creando  no cuenta con un colegio asignado")
            }

            this.isLoading=false;

        },

        methods: {
            async getMasterValues() {

                var ids = [];
                var flagLevel = false;
                var flagGrade = false;
                var flagClassRoom = false;

                if(!window.sessionStorage.levels){
                  ids.push(10);
                  flagLevel = true;
                }
                if(!window.sessionStorage.grades){
                  ids.push(11);
                  flagGrade = true;
                }
                if(!window.sessionStorage.classrooms){
                  ids.push(12);
                  flagClassRoom = true;
                }

                if( ids.length > 0){
                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagLevel == true){
                       this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
                       window.sessionStorage.levels  = JSON.stringify(this.levels);
                    }
                    if(flagGrade == true){
                       this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                       window.sessionStorage.grades  = JSON.stringify(this.grades);
                    }
                    if(flagClassRoom == true){
                       this.classrooms = _.filter(arrayMasters, function(master) {return master.idMaster == 12; })
                       window.sessionStorage.classrooms  = JSON.stringify(this.classrooms);
                    }
                }

                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                if(!window.sessionStorage.school){
                  this.school = await  consultServices('getSchool','POST',{id:this.id,semesterCode:this.semester.id});
                  window.sessionStorage.school  = JSON.stringify(this.school);
                }

                this.semester = JSON.parse( window.sessionStorage.semester );
                this.school = JSON.parse( window.sessionStorage.school );
                this.levels =JSON.parse( window.sessionStorage.levels );
                this.grades =JSON.parse( window.sessionStorage.grades );
                this.classrooms=JSON.parse( window.sessionStorage.classrooms );

            },
            async fillMonths() {
                 this.options = [
                  {id:1, label:"Enero"},
                  {id:2, label:"Febrero"},
                  {id:3, label:"Marzo"},
                  {id:4, label:"Abril"},
                  {id:5, label:"Mayo"},
                  {id:6, label:"Junio"},
                  {id:7, label:"Julio"},
                  {id:8, label:"Agosto"},
                  {id:9, label:"Setiembre"},
                  {id:10, label:"Octubre"},
                  {id:11, label:"Noviembre"},
                  {id:12, label:"Diciembre"},
              ]
            },
            async getBirthdays() {
              this.isLoading = true;
              var aux = _.find(this.options,(option)=>{
                  return option.id == this.formDate.idMonth
              });
                //this.titleTable = "Cumpleaños del mes de: " + aux.label;
              _.map(this.school.AssignmentRecords,(assingmentRecord)=>{
                    this.idSchool = assingmentRecord.School.id;
                });
              var form = {
                month: this.formDate.idMonth,
                //idSchool:this.school.id, ---> ese es el id del assignemnt record, no del school
                idSchool: this.idSchool,//this.idSchool -- 1,
                semesterCode: this.semester.id,
              }
              const arrayBirthdays = await consultServices('getBirthdate','POST',form);
              /*[{
                    "name": "Marcelo",
                    "lastName": "Motta",
                    "secondLastName": null,
                    "birthdate": "1999-10-13",
                    "VolunteerJobs": [
                        {
                            "id": "17",
                            "AssignmentRecords": [
                                {
                                    "id": "17",
                                    "Workshop": null
                                }
                            ],
                            "Job": {
                                "name": "Creando de Operaciones",
                                "code": "SCHOOL_OPERATIONS"
                            }
                        }
                    ]
            }]*/
            
              this.setDataTable(arrayBirthdays);
              this.isLoading = false;
            },
            setHeadTable(){
                this.colum = [
                    {label:'', name:'icon'},
                    {label:'Nombre' ,name:'name' ,find:1 ,sort:0},
                    {label:'Cargo' ,name:'job' ,find:1 ,sort:0},
                    {label:'Fecha de nacimiento' ,name:'birthdate' ,find:1 ,sort:0},
                    {label:'Taller' ,name:'worshop' ,find:1 ,sort:0},
                ]
            },
            refreshData() {
                this.$refs.tableMaf.formatData(this.birthdays);
            },
            setDataTable(arrayData){
                var ctx = this;
                this.birthdays = [];
                arrayData.forEach(item => {
                    var birthday = {};
                    var currentDate = moment();
                    var month = currentDate.month();
                    var day = currentDate.date();
                    var cMonth = moment(item.birthdate).month();
                    var cDay =  moment(item.birthdate).date();

                    var workshopAux = item.VolunteerJobs[0].AssignmentRecords[0].Workshop;

                    if(month == cMonth && day == cDay) {
                        birthday.icon = <div class="d-flex justify-content-around"> 
                                            <div> <img src="./birthday2.png" alt="png" width="50" height="50"/> </div>
                                      </div>
                    }
                    birthday.name = item.name + " " + (item.lastName != null ? item.lastName:"") + " " + (item.secondLastName != null ? item.secondLastName:"");
                    birthday.job = item.VolunteerJobs[0].Job.name;
                    birthday.birthdate = moment(item.birthdate).format('DD/MM/YYYY');

                    if(item.VolunteerJobs[0].Job.code=='SCHOOL_MATH') {
                        
                        if(workshopAux !=null) {

                            var level = (workshopAux.levelCode != null ? workshopAux.levelCode:"");
                            var grade = (workshopAux.gradeCode != null ? workshopAux.gradeCode:"");
                            var classroom = (workshopAux.classroomCode != null ? workshopAux.classroomCode:"");

                            var gradeAux = "";
                            var classroomAux = "";
                            var levelAux = "";

                            if(level != "") {
                                var aux = _.find(this.levels, (object) => { return object.code == level })
                                levelAux = aux.displayValue;
                            }
                            if(grade != "") {
                                var aux = _.find(this.grades, (object) => { return object.code == grade })
                                gradeAux = aux.displayValue;
                                console.log("aux",aux);
                                console.log("gradeAux",gradeAux);
                            }
                            if(classroom != "") {
                                var aux = _.find(this.classrooms, (object) => { return object.code == classroom })
                                classroomAux = aux.displayValue;
                                console.log("aux",aux);
                                console.log("classroomAux",classroomAux)
                            }

                            birthday.worshop = ("Grado: " + gradeAux) + (classroomAux != "" ? " -  Sección: " + classroomAux:"") + (levelAux != "" ? " -  Ciclo: " + levelAux:"");

                        } else {
                            birthday.worshop = "";
                        }

                    } else if (item.VolunteerJobs[0].Job.code=='SCHOOL_CUSTOM') {

                        if(workshopAux !=null) {
                            
                            var level = (workshopAux.levelCode != null ? workshopAux.levelCode:"");
                            var content = (workshopAux.contentCode != null ? workshopAux.contentCode:"");

                            var contentAux = "";
                            var levelAux = "";

                             if(level != "") {
                                var aux = _.find(this.levels, (object) => { return object.code == level })
                                levelAux = aux.displayValue;
                            }

                            birthday.worshop = (content != "" ? " Contenido: " + content:"") + (levelAux != "" ? " -  Ciclo: " + levelAux:"");

                        } else {
                            birthday.worshop = "";
                        }

                    } else if (item.VolunteerJobs[0].Job.code=='SCHOOL_OPERATIONS') {
                            birthday.worshop = "Operaciones";
                    } else {
                            birthday.worshop = "GDC";
                    }

                    this.birthdays.push(birthday);
                });
                console.log(this.birthdays);
                
                this.refreshData();
            },
        }
    }
</script>
