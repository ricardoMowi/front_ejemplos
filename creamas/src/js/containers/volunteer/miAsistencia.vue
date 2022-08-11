<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h1>Calendario {{semester.displayName}}</h1>
                    <div class="clearfix"></div>
                </div>
                <h2 v-if="lack!=0" style="color:#f86c6b">Cantidad de faltas registradas: {{lack}} falta(s)</h2>
                <h2 v-if="lack==0" style="color:#0000FF">No tienes faltas</h2>
                <div class="card-body">
                    <div class="card-header col-md-12 col-sm-12 col-xs-12">
                        <h2 class="col-md-12 col-sm-12 col-xs-12">1) Recuerda que para ser creado activo tienes un máximo de 3 comodines que puedes usar durante el semestre (incluyendo capacitaciones de inicio y mitad de semestre)</h2>
                        <h2 class="col-md-12 col-sm-12 col-xs-12">2) Cuando estamos en aulas la hora de ingreso para Divertimate y Operaciones dentro del colegio es hasta las 9:15 a.m. y para talleres hasta las 11:15a.m. Luego de esa hora es tardanza y las tardanzas son falta.</h2>
                        <div class="clearfix"></div>
                    </div>

                    <TableMaf :header="colum" :data="myAssistance" :tableTitle="titleTable" ref="tableMaf">

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
    import moment from 'moment';
    import TableMaf from "./../../components/TableMaf.vue";

    export default {
        name: "MiAsistenciaContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            isLoading:false,
            colum:[],
            titleTable:'',
            myAssistance:[],
            documentNumber:window.INITIAL_STATE.documentNumber,
            seniorityCode: window.INITIAL_STATE.seniorityCode,
            id: window.INITIAL_STATE.id,
            VolunteerJobs:[],
            idSchool:'',
            arrActivities:[],
            semester:{},
            events:[],
            lack:0,
             }),
        async created () {
            this.setHeadTable();
            await this.getSessionStorage();

            this.school =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id})
            let _idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
            if(_idSchool){
                await this.getData();
            }else if(!_idSchool){
                alert("El  creando  no cuenta con un colegio asignado")
            }

        },

        methods: {
            async getSessionStorage(){
                this.isLoading = true;

                 var ids = [] ;
                 var flagEvents = false;


                if(!window.sessionStorage.events){
                  ids.push(20);
                  flagEvents = true;
                }
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if(ids.length > 0){
                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagEvents == true){
                       this.arrActivities = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                       window.sessionStorage.events  = JSON.stringify(this.arrActivities);
                    }
                }


                this.arrActivities =JSON.parse( window.sessionStorage.events );
                this.semester =JSON.parse( window.sessionStorage.semester );
             // //fin de la carga de arreglos para la pantalla

                this.isLoading = false;
            },

            setHeadTable() {
            this.colum = [
                {label:'Actividad Crea+' ,name:'activityCrea' ,find:1 ,sort:0},
                {label:'Fecha actividad' ,name:'startDate' ,find:1 ,sort:0},
                {label:'Te esperamos' ,name:'obligatoryAttendance' ,find:1 ,sort:0},
                {label:'Asististió' ,name:'attendance' ,find:1 ,sort:0}];
                //{label:'Actualizado el' ,name:'updateDate' ,find:1 ,sort:0}];
            this.titleTable = "Mi asistencia";
            },

            refreshData() {
                this.$refs.tableMaf.formatData(this.myAssistance);
            },

            async getData() {
                this.isLoading=true;

                //this.id --- cambiar por el 24
                var const0 = await consultServices('getSchool','POST',{id:this.id,semesterCode:this.semester.id});


                this.VolunteerJobs = await consultServices('getVolunteerJobs','POST',{id:this.id,semesterCode:this.semester.id});

                _.map(const0.AssignmentRecords,(assingmentRecord)=>{
                    this.idSchool=assingmentRecord.School.id;
                });

                const form = {
                    id:this.id,
                    idSchool:this.idSchool,//this.idSchool ---- Cambiar 24
                    semesterCode:this.semester.id,
                }
                // console.log("Formulario",form)
                const response= await consultServices('getAttendanceReport','POST',form);
                this.setDataTable(response.SchoolManagementEvents);
                this.isLoading=false;
            },

            setDataTable(arrayData) {
                var ctx = this;
                this.myAssistance = [];

                //Declaramos variables
                var isMath = false;
                var isOperations = false;
                var isJunior = false;
                var isSenior = false;
                var isCustom = false;
                var attendanceRequired;

                arrayData.forEach(item => {
                    // console.log('TEEEEEEEEEEEEEEEEEEEEEEEST:', item)
                    var assistance = {};

                    var activityCrea ="";

                    _.map(this.arrActivities,(activity)=>{
                        if(activity.code == item.SchoolManagementEventType.descriptionCod) {
                            activityCrea = activity.displayValue;
                        }
                    });

                    assistance.activityCrea = activityCrea;
                    assistance.startDate = item.startDate;

                   ////Damos valor a estos datos
                   if(this.seniorityCode == 'VOLUNTEER_JUNIOR') {
                       isJunior = true;
                   } else if (this.seniorityCode == 'VOLUNTEER_SENIOR') {
                       isSenior = true;
                   }

                   _.map(this.VolunteerJobs,(volunteerJob)=>{
                       if(volunteerJob.Job.code == 'SCHOOL_OPERATIONS') {
                           isOperations = true;
                       } else if(volunteerJob.Job.code == 'SCHOOL_MATH') {
                           isMath = true;
                       } else if (volunteerJob.Job.code == 'SCHOOL_CUSTOM') {
                           isCustom = true;
                       }
                   })

                    attendanceRequired = ((isMath && item.isMathRequired) || (isOperations && item.isOperationsRequired) ||
                    (isCustom && item.isCustomRequired)) ||  ((isJunior && item.isJuniorRequired) || (isSenior && item.isSeniorRequired));


                    if(attendanceRequired == true) {
                        assistance.obligatoryAttendance = "Si";
                    } else {
                        assistance.obligatoryAttendance = "No, fue opcional";
                    }



                    //campo 'Asistió'
                    var dateEvent = moment(item.startDate )
                    var dateCurrent = moment()
                    if(dateEvent.diff(dateCurrent, 'days') > 0){ 
                        this.isCheckdisabled = true
                    }
                    if(item.Attendances.length > 0){
                        let attendance = item.Attendances[0]
                        if(attendance.statusCode == 'ATTENDANCE_ATTENDED'){
                            if(!attendance.isLate){
                                assistance.attendance = 'Si'
                            }else{
                                assistance.attendance = 'Tardanza'
                            }
                        }else{
                            if(dateEvent.diff(dateCurrent, 'days') <= 0){this.lack +=1}
                            assistance.attendance = 'No'    
                        }
                    }else{
                        if(dateEvent.diff(dateCurrent, 'days') <= 0){this.lack +=1}
                        assistance.attendance = 'No'
                    }
                    
                    // //Campo 'Actualizado el'
                    // if(item.lastUpdateDate){
                    //     assistance.updateDate = item.updateDate;
                    // }else{
                    //     assistance.updateDate = "-"
                    // }


                    this.myAssistance.push(assistance);
                });

                    this.refreshData();
                },
        }
    }
</script>
