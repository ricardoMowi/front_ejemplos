<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Pendientes de asignacion del semestre  {{currentSemester.displayName}}  </h2>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
          <UploadMasiveComponent :serviceUrl='serviceUrl' :serviceContent='serviceContent' :headerSection='headerSection' :columnExcel='columnExcel' :colum='colum' :columnToDB='columnToDB' :slice='slice' :initRow='initRow' :nameOfSheet='nameOfSheet' ></UploadMasiveComponent>
        </div> <!--Body-->
      </div> <!--Card-->
    </div> <!--Col-->
  </div> <!--Row-->
</template>

<script>
import consultServices from './../../utilities/consultServices.js'; //consulta servicios
import LoadingComponent from "./../../components/loadingComponent.vue";
//import writeFileXLSX from './../../components/xlsx/example.js'; //consulta servicios
import XLSX from './../../components/xlsx/xlsx.js';
import UploadMasiveComponent from './../../components/UploadMasiveComponent.vue';
import _ from 'lodash';


  export default {
    name: "exportResultByPendingAssigmentContainer",
    components: {
      LoadingComponent,
      UploadMasiveComponent,
    },
    data: () => ({
        isLoading: false,
        id: window.INITIAL_STATE.id,
        idSchool: '',
        workshopTypeCode:[],
        workshopGradeCode:[],
        workshopClassroomCode:[],
        workshopContentCode:[],
        NAME :'Vol_pendientes_asignacion',
        NAMEII :'Lista_de_talleres',
        titleII:[
            'Código',
            'Nombre',
            'Grado y seccion',
            'Tipo',
        ],
        titleI:[
          'Código',
          'DNI',
          'Nombres',
          'Apellido Paterno',
          'Apellido Materno',
          'Email',
          'Celular',
          'Distrito',
          'Antiguedad',
          'Rol',
          'Grado',
          'Taller Final',
  	      'Taller1',
	        'Expertise1',
	        'Taller2',
          'Expertise2',
          'Motivacion',
          'Comentario Adicional',
          'Sueño',
          'CambioPeru'
        ],
        reports:[],
        reportsExcel:[],
        currentSemester: [],
        psychologicalStatus : [],
        resultEvaluation: [],
        X: '',
        id: window.INITIAL_STATE.id,
        headerSection: '',
        serviceContent: {},
      columnExcel: [ //SON LAS COLUMNA / MASCARA QUE HARA MATCH CON LA DATA DEL EXCEL
        'code',
        'document',
        'name',
        'lastName',
        'secondLastName',
        'email',
        'phone',
        'district',
        'time',
        'rol',
        'grade',
        'workshopFinal',
        'firstWorkshop',
        'expertise1',
        'secondWorkshop',
        'expertise2',
        'motivation',
        'comment',
        'dream',
        'peruChange',
      ],
      colum:[ //SON LAS COLUMNAS QUE SE MOSTRARAN EN LA TABLA
        {name:'code', label :'Código', find:1, sort:1},
        {name:'document', label :'DNI', find:1, sort:1},
        {name:'name', label :'Nombre', find:1, sort:1},
        {name:'lastName', label :'Apellido Paterno', find:1, sort:1},
        {name:'secondLastName', label :'Apeliido Materno', find:1, sort:1},
        {name:'email', label :'Email', find:1, sort:1},
        {name:'phone', label :'Celular', find:1, sort:1},
        {name:'district', label :'Destrito', find:1, sort:1},
        {name:'time', label :'Antiguedad', find:1, sort:1},
        {name:'rol', label :'Rol', find:1, sort:1},
        {name:'grade', label :'Grado', find:1, sort:1},
        {name:'workshopFinal',  label :'Taller Final', find:1, sort:1},
        {name:'firstWorkshop',  label :'Taller primario', find:1, sort:1},
        {name:'expertise1', label :'Expertise1', find:1, sort:1},
        {name:'secondWorkshop', label :'Taller secundario', find:1, sort:1},
        {name:'expertise2', label :'Expertise2', find:1, sort:1},
        {name:'motivation', label :'Motivación', find:1, sort:1},
        {name:'comment', label :'Comentario', find:1, sort:1},
        {name:'dream', label :'Sueño', find:1, sort:1},
        {name:'peruChange', label :'CambioPerú', find:1, sort:1},
      ],
      columnToDB:[
        'code',
        'workshopFinal'
      ],
      slice: 1,
      initRow:1,//0,1,2,3... Es la posicion en donde empieza el la data
      nameOfSheet: 'Vol_pendientes_asignacion',
      serviceUrl:'updateAssignmentWorkshop',
      workshopsxSchool:[],

    }),

    async created () {
      var ctx = this;
      this.X = XLSX;
      await this.getSessionStorage();
      console.log("semestre en created:::::::::::::::::",this.currentSemester)
      await this.getSchoolandWorkshops();
      this.headerSection = <button type="button" class="btn btn-success btn-xs" onClick={()=>ctx.exportExcel()}><i class="fa fa-download"></i> Descargar lista </button>;
    },

    methods: {
      async getSessionStorage(){
        this.isLoading = true;
        var ids = [] ;
        var flagLevels = false;
        var flagWorkshopTypeCode = false;
        var flagWorkshopClassroomCode = false;
        var flagWorkshopGradeCode = false; 
        var flagWorkshopContentCode = false;

        if(!window.sessionStorage.semester){
          var response = await consultServices('getCurrentSemester','POST',{});
          this.currentSemester = response;
          window.sessionStorage.semester = JSON.stringify(this.currentSemester);
        }

        if(!window.sessionStorage.levels){
          ids.push(10);
          flagLevels = true;
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


        if( ids.length > 0){
          //Hacer consulta única de masterValues
          var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
          //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
          if(flagLevels == true){
              this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
              window.sessionStorage.levels  = JSON.stringify(this.levels);
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
        this.currentSemester = JSON.parse( window.sessionStorage.semester );
        this.workshopClassroomCode =JSON.parse( window.sessionStorage.workshopClassroomCode );  
        this.workshopTypeCode =JSON.parse( window.sessionStorage.workshopTypeCode );      
        this.workshopContentCode =JSON.parse( window.sessionStorage.workshopContentCode );          
        this.workshopGradeCode =JSON.parse( window.sessionStorage.workshopGradeCode );         
        this.isLoading = false;
      },

      async getSchoolandWorkshops(){
        console.log("semestre:::::::::::::::::",this.currentSemester)
        console.log("semestre:::::::::::::::::",window.sessionStorage.semester)
        const resp =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.currentSemester.id});        
        let _idSchool = ((((resp || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
        if(_idSchool){
            this.idSchool = _idSchool
            this.serviceContent.idSchool = this.idSchool;
            this.workshopsxSchool=await consultServices('getSchoolAvailableWorkshops','POST',{id:_idSchool  , semesterCode: this.currentSemester.id});
            return true;
        }else if(!_idSchool){
            alert("El  creando  no cuenta con un colegio asignado")
            return false;
        };
      },
      

      async getPenddingAssignmentsBySchool(){
        this.isLoading = true;
        const resp = await consultServices('getWorkshopAssignments', 'POST', {idSchool: this.idSchool, semesterCode: this.currentSemester.id});
        this.reports = resp;
        this.isLoading = false;
       },

      //Seteamos la data que recibimos para exportarla al un archivo excel

       async exportExcel() {
         if(this.currentSemester){
           await this.getPenddingAssignmentsBySchool();
           var tempFormat =_.cloneDeep(this.titleI);
           var tempFormatII =_.cloneDeep(this.titleII);

           //Seteamos la cabecera del excel
           var data = [];
           var dataBody = [];
           data[0] = _.map(tempFormat,(item_format)=>{
             return item_format;
           });
                        var dataI = []
             dataI[0] = _.map(tempFormatII,(item_format)=>{
               return item_format;
             });

           //Seteamos la data del excel
           var dataBody = _.map(this.reports, (report)=>{
           var _report = [];

            // console.log('')
            _.map( report.VolunteerJobs, (item) => {
               if(item.semesterCode){
                 var levelDisplayName = _.result(_.find(this.levels, function(obj) {
                    
                    return obj.code === item.AssignmentRecords[0].requestedWorkshopLevelCode;
                 }), 'displayValue');

                  _report[0] = item.AssignmentRecords[0].id ;
                  report.documentNumber  ? _report[1] = report.documentNumber : _report[1] = '';
                  report.name  ? _report[2] = report.name : _report[2] = '';
                  report.lastName  ? _report[3] = report.lastName : _report[3] =  '';
                  report.secondLastName  ? _report[4] = report.secondLastName : _report[4] = '';
                  report.email ? _report[5] = report.email : _report[5] =  '';
                  report.phone ? _report[6] = report.phone : _report[6] =  '';
                  report.district ? _report[7] = report.district :  _report[7] = '';
                  report.startDate ? _report[8] = report.startDate : _report[8] = '';                 
                  item.Job.name ? _report[9] = item.Job.name : _report[9] = '';
                  _report[10] = '',
                  //11 es taller final 
                  _report[11] = '';
                  report.VolunteerJobs[0].AssignmentRecords[0].requestedWorkshopDisplayName ? _report[12] = report.VolunteerJobs[0].AssignmentRecords[0].requestedWorkshopDisplayName :  _report[12] = '';
                  report.VolunteerJobs[0].AssignmentRecords[0].knowledgeLevel ? _report[13] = report.VolunteerJobs[0].AssignmentRecords[0].knowledgeLevel :  _report[13] = '';
                  report.VolunteerJobs[0].AssignmentRecords[0].reqSecondWorkshopDisplayName ? _report[14] = report.VolunteerJobs[0].AssignmentRecords[0].reqSecondWorkshopDisplayName :  _report[14] = '';
                  report.VolunteerJobs[0].AssignmentRecords[0].secondKnowledgeLevel ? _report[15] = report.VolunteerJobs[0].AssignmentRecords[0].secondKnowledgeLevel :  _report[15] = '';
                  item.AssignmentRecords[0].assignmentReason ? _report[16] = item.AssignmentRecords[0].assignmentReason : _report[16] = '';
                  _report[17] = '';
                  report.dream ? _report[18] = report.dream : _report[18] = '';
                  _report[19] = '';
                  report.startDate ? _report[20] = report.startDate : _report[20] = '';
                  console.log(_report);
               }
             });
             return _report;
            });
            
            var workshops=[]
            var jsonWorkshop={}
            // for (let index = 0; index < this.workshopsxSchool.length; index++) {
            //   jsonWorkshop={
            //     id: this.workshopsxSchool[index].id,
            //     name: this.workshopsxSchool[index].displayName,
            //   }
            //   jsonWorkshop={}             
              
            // }

            
            var dataBodyII = _.map(this.workshopsxSchool, (workshop)=>{
               var _report = [];
               var grades=[];
               var classrooms=[];
               var types=[];
               _report[0] = workshop.id ;
               var name= workshop.typeCode == 'WORKSHOP_CUSTOM' &&  workshop.displayName == null? name = this.getDisplayValue(workshop.contentCode,13): name= workshop.displayName
               _report[1] = name;
               _report[2] = this.getDisplayValue(workshop.gradeCode,11)+ " "+this.getDisplayValue(workshop.classroomCode,12) ;
               _report[3] = this.getDisplayValue(workshop.typeCode,14) ;
               return _report;
             });

           //Seteamos los parametros para el excel
           data = _.concat(data, dataBody);
           dataI = _.concat(dataI, dataBodyII);
             var filename = "crea_asignacion_talleres" + ".xlsx";
             var ws_name = this.NAME;
             var ws_nameII = this.NAMEII;
             var wb = XLSX.utils.book_new();
             var ws = XLSX.utils.aoa_to_sheet(data);
             var wsII = XLSX.utils.aoa_to_sheet(dataI);
             XLSX.utils.book_append_sheet(wb, ws, ws_name);
             XLSX.utils.book_append_sheet(wb, wsII, ws_nameII);

            var stringLetter = "ABCDEFGHIJKLMNOPQRST";
            var arrayString = stringLetter.split('');

            for (var i = 0; i <= dataBody.length; i++) {
            //   i = i + 1
            //   var json = {}
            //   if(i == 1){
            //     json = {
            //       font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
            //       fill: { fgColor: {rgb: "00aae4"}},
            //       border: {
            //         top : { style: 'thin', color: {rgb: "000000"} },
            //         bottom :	{ style: 'thin', color: {rgb: "000000"} },
            //         left :	{ style: 'thin', color: {rgb: "000000"} },
            //         right :	{ style: 'thin', color: {rgb: "000000"} },
            //       }
            //     }
            //   }else{
            //     json ={
            //       border: {
            //         top : { style: 'thin', color: {rgb: "000000"} },
            //         bottom :	{ style: 'thin', color: {rgb: "000000"} },
            //         left :	{ style: 'thin', color: {rgb: "000000"} },
            //         right :	{ style: 'thin', color: {rgb: "000000"} },
            //       }
            //     }
            //   }
            //   _.map(arrayString, (item) => {
            //     var cell = item + String(i);
            //     console.log(cell);
            //     console.log(wb.Sheets.Vol_pendientes_asignacion[cell]);
            //     wb.Sheets.Vol_pendientes_asignacion[cell]['s']=json;
            //   })
            //   i = i - 1
            // };
            i = i + 1
                _.map(arrayString, (item) => {
                  var cell = item + i;
                  wb.Sheets.Vol_pendientes_asignacion[cell]['s']={
                    border: {
                      top : { style: 'thin', color: {rgb: "000000"} },
                      bottom :	{ style: 'thin', color: {rgb: "000000"} },
                      left :	{ style: 'thin', color: {rgb: "000000"} },
                      right :	{ style: 'thin', color: {rgb: "000000"} },
                    }
                  }
                })
                i = i - 1
            };

              _.map(arrayString, (item) => {
                var cell = item + '1';
                wb.Sheets.Vol_pendientes_asignacion[cell]['s']={
                  font: { name: "Verdana", sz: 12, color: {rgb: "ffffff"}},
                  fill: { fgColor: {rgb: "00aae4"}},
                  border: {
                    top : { style: 'thin', color: {rgb: "000000"} },
                    bottom :	{ style: 'thin', color: {rgb: "000000"} },
                    left :	{ style: 'thin', color: {rgb: "000000"} },
                    right :	{ style: 'thin', color: {rgb: "000000"} },
                  }
                }
              });


             XLSX.writeFile(wb, filename);

         }else{
           alert("No existen semestres");
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
          for (let index = 0; index < array.length; index++) {
                  if(array[index].code == string){
                      display=array[index].displayValue;
                  }
          }    
          return display;
       },
    }
}

</script>
