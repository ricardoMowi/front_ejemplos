<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Lista de potenciales sin evaluación</h2>
                    <div class="nav navbar-right panel_toolbox">
                        <button type="button" @click="exportAssignments()"  class="btn btn-success btn-xs"> Descargar Respuestas </button>
                    </div>
                    <div class="clearfix"></div>
                </div>

                    <div class="card">
                        <h2>Consulta rápida: Busque un registro completando alguno de estos campos.</h2>
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
                                <inputMaf type='text' v-model="formCrea.phone" label="Teléfono:" :validation="{required:false, alpha_spaces:true}" nameInput="text" etiqueta='true' ref="inputPhone">
                                </inputMaf>
                             </div>

                    

                            
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="searchVolunteer()"><i class="fa fa-search"></i> Buscar </button>
                        </div>

                    </div>

                <div class="card-body">
                
                     <TableMaf :header="colum" :data="evaluations" :tableTitle="titleTable" ref="tableMaf">                    
                    </TableMaf>             

                </div> <!--card-body-->

                <!--Modal Evaluated-->
                    <modalEvaluatedComponent ref="evaluationComponent"  :callbackData="setEvaluationModal" :competences="competences" :selectedEvalCompetencies="evaluationCompetences">
                    </modalEvaluatedComponent>
                <!--Modal Evaluated-->

                <!--Modal borrar-->
                <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-cat">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            
                        </div>
                        <div class="modal-body">
                                <h3 class="modal-title"> <center> ¿Seguro que desea eliminar la información seleccionada? </center> </h3>
                        </div> 
                        <div class="modal-footer">
                                <center>
                                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                                    <button @click="deleteAttendance()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
                                </center>
                        </div>
                        </div>
                    </div>
                </div>
                <!--Modal borrar-->
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
    import modalEvaluatedComponent from "./../../components/modalEvaluatedComponent.vue";
    import TableMaf from "./../../components/TableMaf.vue";
    import inputMaf from "./../../components/inputMaf.vue";
    import XLSX from './../../components/xlsx/xlsx.js';


  export default {
        name: "PendienteEvaluacionReclu",
        components: {
            LoadingComponent,
            modalEvaluatedComponent,
            TableMaf,
            inputMaf,
        },

        data: () => ({
            isLoading: true,            
            evaluations:[],
            evaluated:[],    
            colum:[],
            regions:[],
            titleTable:'',
            form:{},
            formCrea:{documentNumber:'', name:'',lastName:'',secondLastName:'',email:'', phone:'',},
            formNot:{not:'',tit:''},
            //Variables para exportar a slsx
            title:['NOMBRE COMPLETO', 'EDAD','DNI', 'M o F'],
            NAME :'hoja1',
            questions: [],
            //
            competences:[],
            activeProjects:[],
            evaluationCompetences: [],
            //
            auxEvaluation:[],
            semester : {}

        }),

        async created () {         
            await this.getRegion();
            this.setHeadTable();
            var response =  await consultServices('getCurrentSemester','POST', {});
            this.semester = response;
            this.activeProjects = await consultServices('searchProjects ','POST', {});
            await this.getPenddingEvaluations();    
            this.questions = await consultServices('getQuestions ','POST', {})      
            var test=[{id:1}, {id:2}, {id:3}]   
            console.log('total de questions ', this.questions.length) 
            for (let index = 1; index <= this.questions.length; index++) {
                this.title.push('P'+index)                
            }

        },

        methods: {

            async getPenddingEvaluations (){
                this.isLoading = true;
                console.log('entró a getPenddingEvaluations')
                var form= {}
                form.semesterCode = this.semester.id
                const response = await consultServices('getPenddingEvaluations','POST',form);
                this.setDataTable(response);
                this.isLoading = false;
            },

            /**
             * setEvaluationModal: esta función se llama en el callbackData de modalEvaluatedComponent
             * permite actualizar los datos de la evaluación que se muetsra en el modal
             */
            async setEvaluationModal (){
                this.isLoading = true;
                console.log('entró a getPenddingEvaluations')
                const response = await consultServices('getPenddingEvaluations','POST',{semesterCode: this.semester.id});
                var currentEvaluation =  _.find(response, ['id', this.auxEvaluation.id]); 
                this.setDataTable(response);
                if(currentEvaluation != null){
                    this.$refs.evaluationComponent.setEvaluationCompetences(currentEvaluation.EvaluationCompetences)  
                }
                this.isLoading = false;
            },

            async getRegion(){

                this.isLoading = true;

                if(!window.sessionStorage.regions){
                    this.regions = await consultServices('getRegions','POST',{});
                    window.sessionStorage.regions =JSON.stringify(this.regions);
                }
                this.regions = JSON.parse( window.sessionStorage.regions );


                this.isLoading = false;
            },

            /**
             * showEvaluated: esta función se llama cuando se presiona el botón 'Evaluar' en cada item de la tabla de evas pendientes
             * permite actualizar los datos de auxEvaluation
             * envía la data para el modal utilizando los refs ->  this.$refs.evaluationComponent
             */
            async showEvaluated(json, idProject){     
                this.isLoading = true 
                this.auxEvaluation = []
                this.auxEvaluation = _.cloneDeep(json)                
                var project = _.find(this.activeProjects, ['id', idProject]); 
                if(project == undefined){
                        this.formNot.tit="Error"; this.formNot.not="No se encontró proyecto activo"
                        $('.modal').modal('hide');
                        this.shownotificacion();
                }else{
                    this.competences = project.ProjectCompetences
                    this.$refs.evaluationComponent.setCompetences(this.competences)
                    this.$refs.evaluationComponent.setEvaluationCompetences(this.auxEvaluation.EvaluationCompetences)  
                    var documentNumber = json.AssignmentRecord.VolunteerJob.Volunteer.documentNumber           
                    var idVolunteer = json.AssignmentRecord.VolunteerJob.Volunteer.id          
                    this.$refs.evaluationComponent.showModal(documentNumber,json.id, json.AssignmentRecord.id,idVolunteer, project.id, this.semester.id  );
                }
                this.isLoading = false
            },

            getDay(day){
                return moment(day).format('DD/MM/YYYY');
            },

            async searchVolunteer(){
              this.isLoading = true  
              console.log('form crea::::::::::::::', this.formCrea)
              var form=this.formCrea;
              form.semesterCode = this.semester.id  
                 if(!this.formCrea.documentNumber && !this.formCrea.name  && !this.formCrea.lastName  && !this.formCrea.secondLastName   && !this.formCrea.phone){
                        this.formNot.tit="Campos vacíos"; this.formNot.not="Por favor complete un campo para realizar la búsqueda"
                        $('.modal').modal('hide');
                        this.shownotificacion();
                 }
                 else{
                     if((this.formCrea.documentNumber.length<3 && this.formCrea.documentNumber.length >0 ||this.formCrea.name.length<3 && this.formCrea.name.length>0)||(this.formCrea.lastName.length<3 && this.formCrea.lastName.length>0)||(this.formCrea.secondLastName.length<3 && this.formCrea.secondLastName.length>0)){
                         this.formNot.tit="Cantidad mínima de carcateres"; this.formNot.not="Por favor ingrese al menos 3 caracteres para la búsqueda."
                        $('.modal').modal('hide');
                        this.shownotificacion();

                     }else{
                  
                      console.log("Entró a búsqueda");
                      const response = await consultServices('getPenddingEvaluations','POST',form);
                      if(response.length == 0){
                          alert('No se encontraron registros para la búsqueda realizada')
                      }
                      this.setDataTable(response);

                      //limpiar formCrea y componentes tipo inputMaf
                      this.formCrea.documentNumber = ''
                      this.formCrea.name = ''
                      this.formCrea.lastName = ''
                      this.formCrea.secondLastName = ''
                      this.formCrea.phone = ''

                      await this.$refs.inputDocument.clearValue()
                      await this.$refs.inputName.clearValue()
                      await this.$refs.inputLastName.clearValue()
                      await this.$refs.inputSecondLastName.clearValue()
                      await this.$refs.inputPhone.clearValue()
                      
                      console.log("form limpio ", this.formCrea)
                     }
                 }
                 this.isLoading = false
            },

            async deleteAttendance() {
                this.isLoading=true;
                var form = _.cloneDeep(this.form);
                const response0 = await consultServices('deleteAttendance','POST',form);
                this.getPenddingEvaluations(); 
                 this.isLoading=false;           
            },

             showDeleteModal(item) {               
                this.form = _.cloneDeep(item);         
                  this.isLoading=false;      
            },

            setHeadTable() {
            this.colum = [
                {label:'Nombre' ,name:'name' ,find:1 ,sort:1},
                {label:'DNI' ,name:'documentNumber' ,find:1 ,sort:1},
                {label:'Proyecto' ,name:'projectName' ,find:1 ,sort:1},
                {label:'Fecha de registro' ,name:'creationDate' ,find:1 ,sort:1},
                //{label:'Estado' ,name:'evaluationStatus' ,find:1 ,sort:1},
                {label:'Resultado' ,name:'resultCode' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Evaluaciones";
            },

            async shownotificacion(){   
            $('.bs-example-modal-not').modal('show');
            },

            refreshData() {
                this.$refs.tableMaf.formatData(this.evaluations);
            },

            setDataTable(arrayData){ 
                var ctx = this;
                this.evaluations = [];

                arrayData.forEach(item => {
                    var json = {};
                    //console.log('array data ',item )
                    let volunteer = item.AssignmentRecord.VolunteerJob.Volunteer
                    let project = item.AssignmentRecord.School
                    json.name = volunteer.name + ' ' + volunteer.lastName
                    json.documentNumber = volunteer.documentNumber
                    json.projectName = project.name
                    json.id = item.id
                    json.creationDate = moment(item.creationDate).format('MM/DD/YYYY');
                    json.evaluationCompetences = item.EvaluationCompetences
                    //json.evaluationStatus = item.statusCode == 'EVALUATION_FINISHED'? json.evaluationStatus = 'Evaluación terminada' : json.evaluationStatus = 'Evaluación pendiente'

                    if(item.statusCode == 'EVALUATION_CREATED'){                       
                        json.resultCode = 'PENDIENTE'
                    }                    

                    if(item.resultCode == null){
                        json.actions = <div class="d-flex justify-content-around">
                            <div> <button onClick={()=>ctx.showEvaluated(item, project.id)} type="button" class="btn btn-warning btn-xs">Evaluar</button> </div>
                                </div>;                         
                    }else{
                        item.resultCode == 'EVALUATION_SUITABLE'? json.resultCode = 'APTO' : json.resultCode = 'NO APTO'
                        json.actions = '' 
                    }
                      

                    this.evaluations.push(json);
                });

                this.refreshData();
            },

            async exportAssignments () {
                const resp = await consultServices('getPenddingTests', 'POST', {});

                for (var j = 0; j < resp.length; j++) {
                    for (var k = 0; k < resp[j].Answers.length; k++) {
                        for (var l = 0; l < this.questions.length; l++) {
                            if(this.questions[l].id == resp[j].Answers[k].Question.id ){
                                resp[j].Answers[k].position = l
                            }            
                        }           
                    }          
                }

                console.log('resp :::::::::: ', resp)

                if(resp.length > 0){
                    var tempFormat =_.cloneDeep(this.title);

                    //Seteamos la cabecera del excel
                    var data = []
                    data[0] = _.map(tempFormat,(item_format)=>{
                    return item_format;
                    });

                    //Seteamos la data del excel
                    var data_body =_.map(resp, (item)=>{
                    if(item){
                        var _report = [];
                        if (item.VolunteerJob != null){
                            var name= item.VolunteerJob.Volunteer.name ? name= item.VolunteerJob.Volunteer.name : name=''
                            var lastName= item.VolunteerJob.Volunteer.lastName ? lastName= item.VolunteerJob.Volunteer.lastName : lastName=''
                            var secondLastName= item.VolunteerJob.Volunteer.secondLastName ? secondLastName= item.VolunteerJob.Volunteer.secondLastName : secondLastName=''
                            
                            var year1 = parseInt(item.VolunteerJob.Volunteer.birthdate.substring(0, 4));
                            var year2 = new Date();
                            var age = year2.getFullYear() - year1
 
                            _report[0] = name+' '+lastName+' '+secondLastName // _report[0] = ''
                            _report[1] = age
                            _report[2] = item.VolunteerJob.Volunteer.documentNumber
                            _report[3] = item.VolunteerJob.Volunteer.genderCode
                        } else{
                            _report[0] = '-'
                            _report[1] = '-'
                            _report[2] = '-'
                            _report[3] = '-'
                        }
                        var Answers = item.Answers

                        // for (let i = 1; i < 176; i++) {
                        //     _report[i+3] = '-'
                        //     for (let j = 0; j < Answers.length; j++) {
                                
                        //         if(Answers[j].Question.id -17 == i ){
                        //             if(Answers[j].numValue == 1){
                        //                 _report[i+3] = 'VERDADERO'
                        //             }   
                        //             if(Answers[j].numValue == 0){
                        //                 _report[i+3] = 'FALSO'
                        //             }                                                            
                        //         }                         
                        //     }                            
                        // }

                        for (let q = 0; q < this.questions.length; q++) {
                            _report[q+4] = '-'  
                            for (let n = 0; n < Answers.length; n++) {
                                if(Answers[n].numValue == 1){
                                    _report[Answers[n].position + 4] = 'VERDADERO'
                                }   
                                if(Answers[n].numValue == 0){
                                    _report[Answers[n].position + 4] = 'FALSO'
                                }                                                       
                            }
                        }



                        
                        //console.log(_report);
                        return _report;
                    }

                    // if(item){
                    //     var _report = [];
                    //     item.VolunteerJob != null ?  _report[0] = item.VolunteerJob.Volunteer.documentNumber: _report[0] = ''
                    //     var Answers = item.Answers
                    //     for (let index = 0; index < Answers.length; index++) {
                    //         var value = Answers[index].numValue
                    //         if(value != null){
                    //             value == 1 ? _report[index+1] = 'VERDADERO' : _report[index+1] = 'FALSO'
                    //         }else{
                    //             _report[index+1] = ''
                    //         }                            
                    //     }                        
                    //     //console.log(_report);
                    //     return _report;
                    // }

                    });

                    //Seteamos los parametros para el excel
                    data = _.concat(data, data_body);
                    //var data_body= []

                    var filename =  "registros.xlsx";
                    var ws_name = this.NAME;
                    var wb = XLSX.utils.book_new();
                    var ws = XLSX.utils.aoa_to_sheet(data);                    
                    XLSX.utils.book_append_sheet(wb, ws, ws_name);

                    // var stringLetter = "ABCDEFGHI";
                    // var arrayString = stringLetter.split('');

                    //arreglo que contiene las celdas que seran pintadas de azul
                    var auxArrayblue = ['A1', 'B1' ,'C1','D1']
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
                    //Estilo de Celdas para data
                    var jsonData ={
                        border: {
                        top : { style: 'thin', color: {rgb: "000000"} },
                        bottom :	{ style: 'thin', color: {rgb: "000000"} },
                        left :	{ style: 'thin', color: {rgb: "000000"} },
                        right :	{ style: 'thin', color: {rgb: "000000"} },
                        }
                    };

                    var contRow = 1 ;
                    var indxColor = 0 ;
                    _.map(ws, (cell, key) => {
                    var flagHeader = false ;
                    if(key != "!ref"){
                        _.map(auxArrayblue, (blue) => {
                        if(key == blue){
                            wb.Sheets.hoja1[key]['s']=jsonBlue;
                            indxColor = 0
                            flagHeader = true;
                        }                        
                        })
                        if(flagHeader == false){
                            if(indxColor == 0){
                            wb.Sheets.hoja1[key]['s']=jsonData;
                            contRow++;
                            if(tempFormat.length < contRow){
                                contRow = 1 ;
                                indxColor = 1;
                            }
                            }else{
                            wb.Sheets.hoja1[key]['s']=jsonData;
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
                }else{
                    alert("No se encontro asistencias de voluntarios");
                }
            },

        },

    }

</script>

<style scoped>
</style>
