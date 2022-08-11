<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Lista de estudiantes</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">
                   <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el colegio:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                             <select class="form-control"  v-model="form.idSchool"  @change="onChangeSchool()">
                             <option disabled="disabled" value="">Selecciona un colegio</option>
                             <option v-for="item in schools" v-bind:value="item.id" >
                             {{item.name}}
                             </option>
                             </select>
                          </div>
                     </div>
                     <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el taller:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                             <select class="form-control"  v-model="form.idWorkshop" @change="onChangeWorkshop()" >
                             <option disabled="disabled" value="">Selecciona un taller</option>
                             <option v-for="item in workshops" v-bind:value="item.id" >
                             {{item.displayName ? item.displayName : item.displayGrade}}
                             </option>
                             </select>
                          </div>
                     </div>
                    <TableMaf :header="colum" :data="students" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

                    <div class="modal-footer">
                      <button  @click="exportExcel()" type="button" class="btn btn-success">Descargar lista </button>
                    </div>
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
                              </div>
                          </div><!--Sueño-->

                          <div class="card"><!--Notas-->
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
                          </div><!--Notas-->

                        <div class="modal-footer">
                          <button type="button" data-dismiss="modal" class="btn btn-light">Cancelar</button>
                          <button @click="updateStudent(formStudent)" data-dismiss="modal" type="button" class="btn btn-warning">Actualizar datos</button>
                          <button @click="updateGrades(formWorkshop)" data-dismiss="modal" type="button" class="btn btn-danger">Actualizar notas</button>
                        </div>



                      </div>
                    </div>
                </div>
                <!--Modal Editar-->


            </div> <!--card-->
        </div> <!--col 12 -->
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
        name: "listaAlumnos",
        components: {
            LoadingComponent,
            TableMaf,
            Datetime,
            inputMaf,
        },

        data: () => ({
            isLoading: false,
            students:[],
            colum:[],
            titleTable:'',
            formStudent: {},
            formWorkshop: {},
            schools:[],
            workshops:[],
            form:{},
            semester:{},
            Enrollments:[],
            ////export
            X: '',
            titleI:[
            'Documento',
            'Nombre',
            'Fecha de nacimiento',
            'Género',
            'Sueño',
            'Gustos',
            'Disgustos',
            'Ambiciones',
            'Nota 1',
            'Nota 2',
            'Nota 3',
            ],
          NAME :'lista_alumnos',
          nameOfSheet: 'lista_de_alumnos_por_taller',

        }),

        created () {
            this.getSessionStorage();
            this.setHeadTable();
            this.getSchools();

            },

        methods: {

            async getSessionStorage(){
              var ids = [];
              var flagClassRooms = false;
              var flagGrades = false;
              if(!window.sessionStorage.semester){
                const response =  await consultServices('getCurrentSemester','POST', {});
                this.semester = response;
                window.sessionStorage.semester  = JSON.stringify(this.semester);
              }
              
              if(!window.sessionStorage.workshopClassroomCode){
                ids.push(12);
                flagClassRooms = true;
              };
              if(!window.sessionStorage.grades){
                ids.push(11);
                flagGrades = true;
              }
              
              var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
              
              if(flagGrades == true){
                  this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11 });
                  window.sessionStorage.grades = JSON.stringify(this.grades);
              }

              if(flagClassRooms == true){
                this.classroomCodes = _.filter(arrayMasters, function(master) {return master.idMaster == 12 });
                window.sessionStorage.workshopClassroomCode  = JSON.stringify(this.classroomCodes);
              }

              this.classroomCodes =JSON.parse( window.sessionStorage.workshopClassroomCode );
              this.grades =JSON.parse( window.sessionStorage.grades );
              this.semester =JSON.parse( window.sessionStorage.semester );
              // console.log("semestre ",this.semester)
            },
            async onChangeWorkshop(){
              this.isLoading = true;
              const response = await consultServices('listStudentsByWorkshop','POST', { id: this.form.idWorkshop});
              this.Enrollments = response.Enrollments;
              this.setDataTable(response);
              if(this.Enrollments.length == 0){
                alert("No existen alumnos matriculados en este taller")
              }
              this.isLoading = false;
            },

            async getSchools(){
               this.schools=await consultServices('listSchools','POST',{});
            },

            async onChangeSchool(){
              console.log("entró a onChangeSchool ")
              var temp = await consultServices('getSchoolWorkshops','POST',{id:this.form.idSchool,semesterCode: this.semester.id});
              var finalArray = _.map(temp, (obj) => {
                if(!obj.displayName){
                  var tempGrade = _.find(this.grades, (grade) => { return grade.code == obj.gradeCode });
                  var tempClassroom = _.find(this.classroomCodes, (classroom) => { return classroom.code == obj.classroomCode });
                  console.log("tempClassroom ",this.classroomCodes)
                  console.log("classroomCode ",obj)
                  console.log("tempClassroom ",tempClassroom)
                  obj.displayGrade = tempGrade.displayValue + " " + tempClassroom.displayValue
                }
                return obj;
              })
              this.workshops = finalArray;
              
            },

           setHeadTable() {
            this.colum = [

                {label:'Alumno' ,name:'fullName' ,find:0 ,sort:0},
                {label:'Nota 1' ,name:'grade1' ,find:0 ,sort:0},
                {label:'Nota 2' ,name:'grade2' ,find:0 ,sort:0},
                {label:'Nota 3' ,name:'grade3' ,find:0 ,sort:0},
                {label:' ' ,name:'action' ,find:0 ,sort:0},];

            this.titleTable = "Resultados";
            },
             refreshData() {
                this.$refs.tableMaf.formatData(this.students);
            },

            setDataTable(arrayData){
                var ctx = this;
                this.students = [];

                this.students = _.map(arrayData.Enrollments, (item) => {
                  var student = {};
                  student.idEnrollment = item.id;
                  student.documentNumber = item.Student.documentNumber;
                  student.fullName = item.Student.name + ' ' + item.Student.lastName + ' ' + item.Student.secondLastName;
                  item.grade1 ? student.grade1 = item.grade1 : student.grade1 = 0 ;
                  item.grade2 ? student.grade2 = item.grade2 : student.grade2 = 0 ;
                  item.grade3 ? student.grade3 = item.grade3 : student.grade3 = 0 ;
                  student.action = <div> <button onClick={()=>ctx.showEditStudent(item)} data-toggle="modal" data-target=".modal-Edit" class="btn btn-warning btn-xs" >Editar</button></div>;

                  return student;
                });
                this.refreshData();
            },

            showEditStudent(item) {
              console.log("item ",)
              this.formStudent = item.Student;
              this.formWorkshop = {
                grade1: item.grade1,
                grade2: item.grade2,
                grade3: item.grade3,
                id: item.id
              };
            },

            async updateStudent(formStudent){
              this.isLoading = true;
              console.log("form  ", formStudent)
              var form = _.cloneDeep(formStudent);
              if(await this.$refs.inputDocumentNumber.returnValidationAsync() == false || await this.$refs.inputLastName.returnValidationAsync() == false ||
                 await this.$refs.inputSecondLastName.returnValidationAsync() == false || await this.$refs.inputName.returnValidationAsync() == false ){
                alert("Complete los campos para actualizar al estudiante");
              } else {
                const response = await consultServices('updateStudent','POST', form);
                alert("Se actualizó al estudiante con éxito");
              }
              this.isLoading = false;
            },

            async updateGrades(formWorkshop) {
              this.isLoading = true;
              console.log("formWorkshop ", formWorkshop)
              var form = _.cloneDeep(formWorkshop)
              const response = await consultServices('updateGrades','POST', form);
              this.onChangeWorkshop();
              this.isLoading = false;
            },

            async exportExcel() {
              if(this.students == []){
                 alert("Seleccione el colegio y taller para cargar la lista de alumnos")
              }else{


                  var tempFormat =_.cloneDeep(this.titleI);

                  //Seteamos la cabecera del excel
                  var data = [];
                  var dataBody = [];
                  data[0] = _.map(tempFormat,(item_format)=>{
                    return item_format;
                  });

                  //Seteamos la data del excel
                  console.log("estudinates ", this.Enrollments)
                  var dataBody = _.map(this.Enrollments, (student)=>{
                  var _student = [];

                    // console.log('')
                    _.map( student, (item) => {
                      console.log("estudinate ", student)

                          var name="";
                          var lastName="";
                          var secondLastName="";
                          var gender="";

                          _student[0] = student.Student.documentNumber ;
                          student.Student.name ? name =  student.Student.name : name = '';
                          student.Student.lastName ? lastName =   student.Student.lastName : lastName = '';
                          student.Student.secondLastName ? secondLastName =  student.Student.secondLastName : secondLastName = '';
                          _student[1] = name+" "+ lastName+" "+ secondLastName;
                          student.Student.birthdate  ? _student[2] =  student.Student.birthdate : _student[2] = '';
                          if(student.Student.gender == 'M'){gender= 'Hombre' }
                          if(student.Student.gender == 'F'){gender= 'Mujer'  }
                          student.Student.gender  ?  _student[3] =  gender : _student[3] = '';
                          student.Student.dream  ?  _student[4] =  student.Student.dream : _student[4] = '';
                          student.Student.likesTo  ?  _student[5] =  student.Student.likesTo : _student[5] = '';
                          student.Student.dislikesTo  ?  _student[6] =  student.Student.dislikesTo : _student[6] = '';
                          student.Student.ambitions  ?  _student[7] =  student.Student.ambitions : _student[7] = '';
                          student.grade1  ?  _student[8] =  student.grade1 : _student[8] = '';
                          student.grade2  ?  _student[9] =  student.grade2 : _student[9] = '';
                          student.grade3  ?  _student[10] =  student.grade3 : _student[10] = '';

                          console.log(_student);

                    });
                    return _student;
                    });

                  //Seteamos los parametros para el excel
                  data = _.concat(data, dataBody);
                    var filename = "lista_alumnos_por_taller" + ".xlsx";
                    var ws_name = this.NAME;
                    var wb = XLSX.utils.book_new();
                    var ws = XLSX.utils.aoa_to_sheet(data);
                    XLSX.utils.book_append_sheet(wb, ws, ws_name);

                    var stringLetter = "ABCDEFGHIJK";
                    var arrayString = stringLetter.split('');

                    for (var i = 0; i <= dataBody.length; i++) {
                      i = i + 1
                      var json = {}
                      if(i == 1){
                        json = {
                          font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                          fill: { fgColor: {rgb: "00aae4"}},
                          border: {
                            top : { style: 'thin', color: {rgb: "000000"} },
                            bottom :	{ style: 'thin', color: {rgb: "000000"} },
                            left :	{ style: 'thin', color: {rgb: "000000"} },
                            right :	{ style: 'thin', color: {rgb: "000000"} },
                          }
                        }
                      }else{
                        json ={
                          border: {
                            top : { style: 'thin', color: {rgb: "000000"} },
                            bottom :	{ style: 'thin', color: {rgb: "000000"} },
                            left :	{ style: 'thin', color: {rgb: "000000"} },
                            right :	{ style: 'thin', color: {rgb: "000000"} },
                          }
                        }
                      }
                      _.map(arrayString, (item) => {
                        var cell = item + String(i);
                        console.log("cells ",cell);
                        console.log("debajo de cells ",wb.Sheets.lista_alumnos[cell]);
                        wb.Sheets.lista_alumnos[cell]['s']=json;
                      })
                      i = i - 1
                    };

                    XLSX.writeFile(wb, filename);

              }
            },


        },

    }

</script>

<style scoped>
</style>
