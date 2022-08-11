<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Mis Solicitudes de constancias y certificados del creando</h2>
                <div v-if="idSchool !=0" class="card-header-actions" align-items: center>
                    <button type="button" data-toggle="modal"  @click="sendRequest()" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar solicitud
                    </button>
                </div>
                <div class="clearfix"></div>

          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <TableMaf :header="colum" :data="requests" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

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
          typeRequest:[],
          isLoading: false,
          formRequest:{typeCode:''},
          requests:[],
          titleTable:'',
          colum:[],
          formNot:{not:'',tit:'',},
          dates:[],
          stateRequest:[],
          semester:[],
          school:[],
          idSchool:'',
          signatures:[],

      }),
     async  created () {


          this.isLoading=true;
          await this.getSessionStorage();
          this.listRequests();
          this.setHeadTable();
          this.school =  await consultServices('getSchool','POST',{id:this.id ,semesterCode: this.semester.id})
          if(this.school.message){
              alert('El creando no tiene colegio asignado')
              this.idSchool= 0
          }else{
          console.log("escuela ",this.school)
          this.idSchool = ((((this.school || {}).AssignmentRecords || [])[0] || {}).School || {}).id;
          console.log("id escuela ",this.idSchool)
          }

          this.signatures = await consultServices('getDigitalSignature','POST',{});
          this.isLoading=false;

  		},
      methods: {
        async shownotificacion(){
            $('.bs-example-modal-not').modal('show');

        },

        async getSessionStorage(){
                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagStateRequest = false;
                 var flagTypeRequest = false;

                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
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

                    this.semester =JSON.parse( window.sessionStorage.semester );
                    this.stateRequest =JSON.parse( window.sessionStorage.stateRequest );
                    this.typeRequest =JSON.parse( window.sessionStorage.typeRequest );
                    // //fin de la carga de arreglos para la pantalla


                this.isLoading = false;
        },


        async listRequests() {
            const response = await consultServices('listRequestsxVolunteer','POST',{semesterCode:this.semester.id, typeCode: 'REQUEST_CREDENTIAL', idVolunteer:this.id});
            this.setDataTable(response);
        },

        async sendRequest() {


           this.isLoading=true;
           var form ={}
           var flag = confirm("¿Enviar nueva solicitud?");
            if(flag == true){
                form.idVolunteer = this.id;
                form.semesterCode =this.semester.id;
                form.typeCode = 'REQUEST_CREDENTIAL';


                console.log("solicitud",form);

                const response=  await consultServices('createRequest','POST',form);
                if(response.id){
                this.formNot.tit="Solicitud enviada "; this.formNot.not="Se ha enviado la solicitud de manera exitosa"
                this.listRequests();
                this.formRequest={};
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo enviar la solicitud de manera exitosa"
                }
                $('.modal').modal('hide');
                this.shownotificacion();
            }
             this.isLoading=false;
        },

        async removeRequest(item) {
                console.log("item delete ", item)
                var flag=confirm("¿Eliminar la solicitud seleccionada?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.id}
                        console.log(" eliminar ",form);
                        const response0 = await consultServices('removeRequest','POST',form);
                        this.listRequests();
                        this.isLoading=false;

                }
         },




        setHeadTable(){
            this.colum = [

                {label:'Fecha de envío de solicitud' ,name:'creationDate' ,find:1 ,sort:1},
                {label:'Fecha de cierre de solicitud' ,name:'closeDate' ,find:1 ,sort:1},
                {label:'Estado de solicitud' ,name:'state' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Solicitudes del semestre";
        },


        refreshData() {
               this.$refs.tableMaf.formatData(this.requests);
               console.log(" solicitudes ahora: ",this.requests);
        },


        getDisplayValue(string, master){
            var array=[];
            var display="";
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

        setDataTable(arrayData){
                var ctx = this;
                this.requests = [];

                arrayData.forEach(item => {
                    var request = {};
                    var varActionsPending="";
                    var varActionFinishedAproveed="";
                    var varActionFinishedDisapprove="";


                         request.state=
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_APPROVED'?  <button  type="button" class="btn btn-success btn-xs">Solicitud aprobada</button>:null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'?  <button   type="button" class="btn btn-danger btn-xs">Solicitud desaprobada</button> :null}
                            {item.statusCode == 'REQUEST_PENDING'?  <button  type="button" class="btn btn-warning btn-xs">Solicitud pendiente</button>:null}
                            </font></font>;
                        request.creationDate= moment(item.initialDate).format('DD/MM/YYYY');
                        request.closeDate=item.closeDate == null ? request.closeDate = "Aún no finalizada" :   request.closeDate=moment(item.closeDate).format('DD/MM/YYYY');


                        request.actions=
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.statusCode == 'REQUEST_APPROVED'? <button onClick={()=>ctx.generatePDFEN(item)}   type="button" class="btn btn-info btn-xs"> Ver documento en PDF (en inglés)</button>:null}
                            {item.statusCode == 'REQUEST_APPROVED'? <button onClick={()=>ctx.generatePDFES(item)}   type="button" class="btn btn-info btn-xs"> Ver documento en PDF (en español)</button>:null}
                            {item.statusCode == 'REQUEST_DISAPPROVED'? " " :null}
                            {item.statusCode == 'REQUEST_PENDING'?  <button onClick={()=>ctx.removeRequest(item)}   type="button" class="btn btn-danger btn-xs"> Eliminar solicitud</button>:null}
                            </font></font>;


                    this.requests.push(request);
                });

                this.refreshData();
        },
        async GetHours(category){
            //asistencias
            const response = await consultServices('getAllAttendanceReport','POST',{id:this.id});
            var attendances= response.length;
            if(category == 'SENIOR'){
                return (attendances*7)
            }
            if(category == 'JUNIOR'){
                return  (attendances*5)
            }          

        },
        async getPeriod(semester, language){
            var yearDisplay = semester
            var year= (yearDisplay.toString()).substring(0, 4);
            var period = '';
            var cycle = semester%10 ;
            if(language == 'SPANISH'){
                if(cycle == 1){
                    period = "abril del "+ year+" hasta julio del "+year
                }
                if(cycle == 2){
                    period = "setiembre del "+ year+" hasta diciembre del "+year
                }
            }
            if(language == 'ENGLISH'){
                if(cycle == 1){
                    period = "april  "+ year+" to july "+year
                }
                if(cycle == 2){
                    period = "september "+ year+" to december "+year
                }
            }
           

        },
        async getData(array, language){
            console.log("array getData ",array)
            console.log("language getData ",language)
            var period= "";
            var json={jobs:'',period:''}
            if(array.length == 1){     
                    //hay un solo job y un solo semestre 
                    //consultar el idioma 
                    if(language == 'ENGLISH'){
                        json.period= await this.getPeriod(array[0].semester,language);
                        json.jobs= array[0].enName;
                        json.area= array[0].AreaDescriptionEN
                    }   
                    if(language == 'SPANISH'){
                        json.period= await this.getPeriod(array[0].semester,language);
                        json.jobs= array[0].name;
                        json.area= array[0].AreaDescription
                    }    

            }else{
                //hay más de un job, por lo que deben listarse separados por comas
                //consultar el idioma 
                    var jobsVolunteer=[]
                    var stringJobs= ''
                    var area=''
                    if(language == 'ENGLISH'){
                        for (let index = 0; index < array.length; index++) {           
                             var name= array[index].enName;
                             if(index == 0){
                                 stringJobs =stringJobs+ name+ ', '
                             }
                             else if(index == array.length -1 ){
                                 stringJobs = stringJobs+name
                             }
                             else{
                                 stringJobs = stringJobs+', '+name+', '
                             }
                             console.log("string ",stringJobs)
                             jobsVolunteer.push(name);             
                        } 
                        area=  array[0].AreaDescriptionEN
                    }   
                    if(language == 'SPANISH'){
                        for (let index = 0; index < array.length; index++) {           
                             var name= array[index].name;
                             if(index == 0){
                                 stringJobs =stringJobs+ name+ ', '
                             }
                             else if(index == array.length -1 ){
                                 stringJobs = stringJobs+name
                             }
                             else{
                                 stringJobs = stringJobs+','+name+', '
                             }
                             console.log("string ",stringJobs)
                             jobsVolunteer.push(name);             
                        }
                        area=  array[0].AreaDescription
                    }
                    var jobs =jobsVolunteer.join()
                    json.jobs= stringJobs;
                    json.area= area;



                //si hay mas de un job y un semestre, ordenar del más antiguo al más nuevo
                var arraySemester=[]
                for (let index = 0; index < array.length; index++) {
                   arraySemester.push(array[index].semester);                    
                }
                arraySemester.sort(function(a, b) { return a - b;});
                console.log("arraySemester  ",arraySemester)

                //verificar si los periodos en el array son distintos
                if(arraySemester[0] == arraySemester[arraySemester[arraySemester.length]]){          
                   //mismo semestre                       
                   json.period= await this.getPeriod(array[0].semester, language);
                }else{
                   //distintos semestres, asignar initialYear, endYear, initialCycle , endCycle  
                   console.log("entró a else")
                   var initialYear =  (arraySemester[0].toString()).substring(0, 4);
                   var endYear =  (arraySemester.pop().toString()).substring(0, 4);
                   var initialCycle =  arraySemester[0]%10;
                   var endCycle =  arraySemester.pop()%10;
                   //consultar el idioma 
                    if(language == 'ENGLISH'){
                        if(initialCycle == 1){
                                period = "april "+ initialYear
                                if(endCycle == 1 ){
                                    period= period+" to july "+ endYear 
                                }
                                if(endCycle == 2 ){
                                    period= period+" to december "+ endYear 
                                }
                        }
                        if(initialCycle == 2){
                                period = "september "+ initialYear
                                if(endCycle == 1 ){
                                    period= period+" to july  "+ endYear 
                                }
                                if(endCycle == 2 ){
                                    period= period+" to december "+ endYear 
                                }
                        }
                        
                    }   
                    if(language == 'SPANISH'){
                                               if(initialCycle == 1){
                                period = "abril del "+ initialYear
                                if(endCycle == 1 ){
                                    period= period+" hasta julio del "+ endYear 
                                }
                                if(endCycle == 2 ){
                                    period= period+" hasta diciembre del "+ endYear 
                                }
                        }
                        if(initialCycle == 2){
                                period = "setiembre del "+ initialYear
                                if(endCycle == 1 ){
                                    period= period+" hasta julio del "+ endYear 
                                }
                                if(endCycle == 2 ){
                                    period= period+" hasta diciembre del "+ endYear 
                                }
                        }
                    } 


                    json.period= period 
                }

            }
            return json;
        },
        generatePDFEN(item){
            this.generatePDF(item, 'ENGLISH')
        },
        generatePDFES(item){
            this.generatePDF(item, 'SPANISH')
        },
        // async generatePDF(item,lan) {
        //     console.log("item  ",item)
        //     console.log("idioma ",lan)

        //     //variables
        //     var language= lan;
        //     var date = item.closeDate; 


        //     this.isLoading=true
        //     //datos del volountario
        //     var volunteer =await consultServices('getVolunteer','POST',{id:this.documentNumber})           

        //     //Jobs
        //     const response0 = await consultServices('getVolunteerJobs','POST',{id:this.id ,semesterCode:this.semester.id, });     
        //     console.log("response0 ",response0)       
        //     var jobsVolunteer=[]           
        //     for (let index = 0; index < response0.length; index++) {       
        //         var jsonJob={}
        //         jsonJob.name = response0[index].Job.name;
        //         jsonJob.enName = response0[index].Job.enName;
        //         jsonJob.AreaDescription = response0[index].Job.Area.description;
        //         jsonJob.AreaDescriptionEN = response0[index].Job.Area.enDescription;
        //         jsonJob.semester = response0[index].semesterCode
        //         jobsVolunteer.push(jsonJob);             
        //     } 
        //     console.log("jobsVolunteer ",jobsVolunteer)
            
        //     //language
        //     if(lan == 'ENGLISH'){
        //         language = 'ENGLISH'
        //         date= moment(date).format('L');
            
        //     }
        //     if(lan == 'SPANISH'){
        //         language = 'SPANISH'
        //         moment.lang('es', {
        //         months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        //         monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        //         weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        //         weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        //         weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')}
        //         );
        //         date= moment(date).format('LL');
        //     }
            
           
        //     var result = await this.getData(jobsVolunteer,language);
           

        //     //horas
        //     var category= response0[0].Job.category;            
        //     var hours= await this.GetHours(category);
        //     console.log("horas  ", hours)    
            
        //     //area
        //     var area = response0[0].Job.Area.description
            

        //      //pdf
        //      var form={creando:volunteer ,semesterCode:this.semester.id, date: date ,job:result.jobs,area:result.area, period: result.period, documentType: item.documentType, hours: hours, language:language}
        //      const response = await consultServices('generate/pdfCertificate','POST',form);
        //      console.log("form que se va al pdf  ", form)
        //      var a = document.createElement("a");
        //             document.body.appendChild(a);
        //             a.style = "display: none";
        //             a.href = response.url;
        //             //a.download = startDate +' - '+ endDate ;
        //             a.target = "_blank";
        //             a.click();
        //       console.log(response)
        //     this.isLoading = false;
        // },
        async generatePDF(item,lan, signature) {
            console.log("item  ",item)
            console.log("idioma ",lan)
            //variables
            var language= lan;
            var date = item.closeDate;
            this.isLoading=true
            //datos del volountario
            var volunteer =await consultServices('getVolunteer','POST',{id:this.documentNumber})
            //Jobs
            const response0 = await consultServices('getVolunteerJobs','POST',{id:this.id ,semesterCode:this.semester.id, });
            console.log("response0 ",response0)
            var jobsVolunteer=[]
            for (let index = 0; index < response0.length; index++) {
                var jsonJob={}
                jsonJob.name = response0[index].Job.name;
                jsonJob.enName = response0[index].Job.enName;
                jsonJob.AreaDescription = response0[index].Job.Area.description;
                jsonJob.AreaDescriptionEN = response0[index].Job.Area.enDescription;
                jsonJob.semester = response0[index].semesterCode
                jobsVolunteer.push(jsonJob);
            }
            console.log("jobsVolunteer ",jobsVolunteer)
            //language
            var signatureFinal=''
            if(lan == 'ENGLISH'){
                language = 'ENGLISH'
                date= moment(date).format('L');
                signatureFinal = this.signatures[1].url
            }
            if(lan == 'SPANISH'){
                language = 'SPANISH'
                moment.lang('es', {
                months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
                weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
                weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
                weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')}
                );
                date= moment(date).format('LL');
                signatureFinal = this.signatures[0].url
            }
            var result = await this.getData(jobsVolunteer,language);
            //horas
            var category= response0[0].Job.category;
            var hours= await this.GetHours(category);
            console.log("horas  ", hours)
            //area
            var area = response0[0].Job.Area.description
            //pdf
             var form={
               creando:volunteer,
               semesterCode:this.semester.id,
               date: date,
               job:result.jobs,
               area:result.area,
               period: result.period,
               documentType: item.documentType,
               hours: hours,
               signature: signatureFinal,
               language:language}
             console.log("FORM ", form);
             const response = await consultServices('generate/pdfCertificate','POST',form);
             var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = response.url;
                    //a.download = startDate +' - '+ endDate ;
                    a.target = "_blank";
                    a.click();
              console.log(response)
            this.isLoading = false;
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
