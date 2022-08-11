<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Primero busca al Creando para asignar a un programa</h2>
                    <br/>
                    <div class="clearfix"></div>
                         <small>Ingrese uno o más campos </small>
                    </div>

                <div class="card-body">
                    <div class="card">

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

                                <inputMaf type='text' v-model="formCrea.email" label="Email:" :validation="{required:false, email:true}" nameInput="email" etiqueta='true' ref="inputEmail">
                                </inputMaf>

                            </div>

                            <div class="card-body">

                                <inputMaf type='text' v-model="formCrea.phone" label="Celular:" :validation="{required:false, min:6}" nameInput="celular" etiqueta='true' ref="inputPhone">
                                </inputMaf>

                            </div>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="searchVolunteer()"><i class="fa fa-search"></i> Buscar </button>
                        </div>

                    </div>

                    <div class="card">
                    <TableMaf :header="colum" :data="creando" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

                    </div>

                </div> <!--card-body-->

            </div> <!--card-->

            <!--Modal sta-->
            <!-- <div class="modal fade bs-example-modal-sta" tabindex="-1" role="dialog" aria-hidden="true"  style="overflow-y:auto"> -->
            <div class="modal fade bs-example-modal-sta" tabindex="-1" role="dialog" aria-hidden="true">    
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Asignar rol/programa a Creando Para el semestre {{this.semester.semesterCode}}</h4>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <P>A continuación, los campos necesarios para asignar al creando:</p>
                            <br/>
                                 <div class="card-body">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el programa:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">

                                            <select class="form-control"  v-model="form.project"  @change="onChangeProject()">
                                                <option disabled="disabled" value="">Selecciona un programa</option>
                                                <option v-for="item in projects" v-bind:value="item.id" >
                                                {{item.label}}
                                                </option>
                                            </select>

                                        </div>
                                    </div>

                                    <div v-if="projectType == 'ACADEMIC_PROJECT'" class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <input type="text"  value="Participante" class="form-control col-md-7 col-xs-12" readonly="readonly">
                                            </div>
                                    </div>

                                    <div v-if="projectType == 'VOLUNTEER_PROJECT'" class="form-group">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo de rol:</label>                         
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <select class="form-control" v-model="form.howToTakePart"  @change="onChangeRole()">
                                                <option disabled="disabled" value="">Selecciona un tipo de rol</option>
                                                <option value="LEADER"> Líder </option>
                                                <option value="PARTICIPANT"> Participante </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div id="divRoles" class="form-group" style="display:none">
                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el rol:</label>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- <treeselect v-model="form.role"
                                            :value-consists-of="valueConsistsOf"
                                            :multiple="false"
                                            :options="optionsRoles" /> -->
                                            <select class="form-control"  v-model="form.role" @change="onChangeWorkshop()" >
                                                <option disabled="disabled" value="">Selecciona un rol</option>
                                                <option v-for="item in optionsRoles" v-bind:value="item.id" >
                                                {{item.name}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    

                                    <div id="divWorkshops" class="card-body"  style="display:none">
                                            <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Elige el taller:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <select class="form-control"  v-model="form.workshop">
                                                    <option disabled="disabled" value="">Talleres disponibles</option>
                                                    <option v-for="item in workshopsxSchool" v-bind:value="item" >                                                
                                                            {{item.displayValue}}
                                                    </option>
                                                    </select>
                                                </div>
                                            </div>
                                    </div>

                                </div>
                        </div>
                        <div id="divTable" class="modal-body" style="display:none">
                               <TableMaf :header="columModal" :data="creandosProject" :tableTitle="titleTableModal" ref="tableMafModal"> </TableMaf>
                        </div>
                        <div class="modal-footer">
                                <center>
                                    <button type="button" @click="closeModalSafety('.bs-example-modal-sta')" class="btn btn-default" >Cancelar</button>
                                    <!-- <button id="btnAsssign" @click="assign()" type="button" data-dismiss="modal" class="btn btn-success" >Asignar</button> -->
                                    <button id="btnAsssign" type="button" @click="assign()" class="btn btn-success" >Asignar</button>                                    
                                </center>
                            </div>
                        </div>
                    </div>
            </div>
            <!--Modal not-->

            <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true" >
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                     <div class="modal-header">
                        <h4 class="modal-title">{{formNot.title}} </h4>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p> <center> {{formNot.not}} </center> </p>
                    </div>
                    <div class="modal-footer">
                            <center>
                                <button type="button"  @click="closeModalSafety('.bs-example-modal-not')" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            <!--Modal not-->

        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    import Treeselect from '@riophae/vue-treeselect';
    import TableMaf from "./../../components/TableMaf.vue";
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import inputMaf from "./../../components/inputMaf.vue";


    export default {
        name: "AsignacionCreandos",
        components: {
            LoadingComponent,
            TableMaf,
            inputMaf,
            Treeselect
        },

        data: () => ({
            valueConsistsOf: 'ALL_WITH_INDETERMINATE',
            isLoading: true,
            creando:[],
            creandosProject:[],
            form:{project:''},
            formVolunteer:{},
            formCrea:{documentNumber:'', name:'',lastName:'',secondLastName:'',email:'', phone:'',},
            formNot:{not:'',le:'',},
            colum:[],
            columModal:[],
            titleTable:'',
            titleTableModal:'',
            actualValue:'',
            volunteerStatus:null,
            projects: [ ],
            projectType: '',
            schoolsLeaders: [],
            optionsRoles: [],
            rolesJunior: [],
            rolesSenior: [],
            roles:  [],
            semester:[],
            id:'',
            volunteerJobsVolunteer:[],
            //////////////
            workshopsxSchool: [],
            roomsxSchool: [],
            workshopLevelCode:[],
            workshopGradeCode:[],
            workshopClassroomCode:[],
            workshopContentCode:[],
            workshopTypeCode:[],
        }),

        async created () {
            this.isLoading=true;                          
                       
            await this.getSessionStorage();
            var responseProjects = await consultServices('listSchoolsBySemester','POST',{semesterCode:this.semester.id});
            this.tranforForSelectTree(responseProjects)
            this.setHeadTable('tableListCreando');
            this.setHeadTable('tableListCreandoModal');
            this.isLoading=false;


            },

        methods: {

            async getSessionStorage(){
                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                var ids = [] ;
                var flagSemester = false;
                var flagWorkshopLevelCode = false; 
                var flagWorkshopGradeCode = false; 
                var flagWorkshopContentCode = false;
                var flagWorkshopTypeCode = false;
                var flagWorkshopClassroomCode = false;

                if(!window.sessionStorage.semester){
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
                var rolesResponse = await  consultServices('getAllJobs','POST',{}); 
                for (var j = 0; j < rolesResponse.length; j++) {
                   if(rolesResponse[j].category == 'JUNIOR'){
                       this.rolesJunior.push(rolesResponse[j])
                   }
                   if(rolesResponse[j].category == 'SENIOR'){
                       this.rolesSenior.push(rolesResponse[j])
                   }                    
                }

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
                    // if(flagEvent == true){
                    //     this.eventsSchoolMaster = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                    //     window.sessionStorage.eventSchool  = JSON.stringify(this.eventsSchoolMaster);
                    // }
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
                
                this.workshopLevelCode =JSON.parse( window.sessionStorage.workshopLevelCode );
                this.workshopClassroomCode =JSON.parse( window.sessionStorage.workshopClassroomCode );  
                this.workshopContentCode =JSON.parse( window.sessionStorage.workshopContentCode );
                this.workshopTypeCode =JSON.parse( window.sessionStorage.workshopTypeCode );                
                this.workshopGradeCode =JSON.parse( window.sessionStorage.workshopGradeCode );      

                // if(!window.sessionStorage.optionsRoles){
                //    var roles= await  consultServices('getJobs','POST',{category:'SENIOR'});
                //    this.optionsRoles = this.tranforForSelectTree(roles);
                //    window.sessionStorage.optionsRoles  = JSON.stringify(this.optionsRoles);
                // }              
                //this.optionsRoles =JSON.parse( window.sessionStorage.optionsRoles );
                
                this.semester =JSON.parse( window.sessionStorage.semester );

                this.isLoading = false;
            },


            tranforForSelectTree(array0) {

                var fathers = []
                var aux1 = []
                var finalArray = []

                for (var i = 0; i < array0.length; i++) {
                   if (array0[i].idFather == null) {
                       var obi={}
                       obi.id = array0[i].id
                       obi.label = array0[i].name
                       obi.children = []
                       obi.idFather = null
                       obi.projectType = array0[i].projectType
                       fathers.push(obi)
                   }                    
                }
                

                for (var j = 0; j < fathers.length; j++) {
                    for (var k = 0; k < array0.length; k++) {
                       if(array0[k].idFather == fathers[j].id){
                           var objChildren = {}
                           objChildren.id =  array0[k].id                          
                           objChildren.label =  fathers[j].label+ ': '+array0[k].name
                           objChildren.idFather = fathers[j].id
                           objChildren.projectType = fathers[j].projectType
                           fathers[j].children.push(objChildren)
                       }                        
                    }                    
                }

                console.log('fathers:::::::', fathers )

                for (var m = 0; m < fathers.length; m++) {
                    if(fathers[m].idFather == null && fathers[m].children.length == 0){
                        finalArray.push(fathers[m])
                    }
                    else{
                        for (var n = 0; n < fathers[m].children.length; n++) {
                            finalArray.push(fathers[m].children[n])                            
                        }
                    }
                    
                }


                // for (var j = 0; j < array0.length; j++) {
                //    var obj={}
                //    obj.id = array0[j].id
                //    obj.projectType = array0[j].projectType
                //    obj.label = array0[j].name

                //    if (array0[j].idFather != null) { 
                //        var project = _.find(fathers, (project) => { return project.id == array0[j].idFather });                      
                //        obj.label = project.label+ ': '+array0[j].name
                //    }    
                //    aux1.push(obj)                
                // }

                console.log('finalArray::::::::::', finalArray)

                this.projects = _.cloneDeep(finalArray);

                // return _.map(array0,(item)=>{
                //     var response = {
                //     id: item.id,
                //     label: item.name,
                //     }
                //     return response;
                // })


            },




            async searchVolunteer() {
                var form=this.formCrea;
                if(!this.formCrea.documentNumber && !this.formCrea.name  && !this.formCrea.lastName  && !this.formCrea.secondLastName && !this.formCrea.email  && !this.formCrea.phone){
                    this.formNot.title="Campos vacíos"; this.formNot.not="Por favor complete un campo para realizar la búsqueda"
                    $('.modal').modal('hide');
                    this.shownotificacion();
                }
                else{
                    if((this.formCrea.documentNumber.length<3 && this.formCrea.documentNumber.length >0 || this.formCrea.name.length<3 && this.formCrea.name.length>0)||(this.formCrea.lastName.length<3 && this.formCrea.lastName.length>0)||(this.formCrea.secondLastName.length<3 && this.formCrea.secondLastName.length>0)){
                        this.formNot.title="Cantidad mínima de carcateres"; this.formNot.not="Por favor ingrese al menos 3 caractéres para la búsqueda."
                        $('.modal').modal('hide');
                        this.shownotificacion();
                    }else{
                        this.isLoading=true;   
                        //incluímos el semestre
                        form.semesterCode = this.semester.id;
                        const response = await consultServices('searchVolunteer','POST',form);
                        // console.log("search res",response);
                        this.isLoading=false;
                        if(response.length == 0){
                            alert("No se encontraron resultados");
                        }
                        else{
                            this.id=response[0].id;
                            this.volunteerJobsVolunteer = response[0].VolunteerJobs
                            console.log("id",this.id);
                            this.setDataTable(response);
                        }
                    }
                }
            } ,

            closeModalSafety(css) {
                $(css).modal('hide');
            },           

            /**
             * assign: servicio para validar campos y luego registrar la asignación
             * 
             */
            async assign(){
                //validaciones
                console.log('form:::: ', this.form)
                var formAssign = _.cloneDeep(this.form)
                if(formAssign.idVolunteer == null || (formAssign.project == null) || (formAssign.role == null || formAssign.role == '')){
                    
                    //document.getElementById("modal-sta").style.display = "block";
                    this.formNot.title="Datos incompletos"; this.formNot.not="Complete los campos incompletos para la asignación del creando."
                    //document.getElementById("divNot").style.display = "block";
                    //$('.bs-example-modal-not').modal('show');
                    this.shownotificacion();
                 
                }else{
                    console.log('todo bien, registrar')
                    this.assignJob()
                }

            },

            /**
             * assignJob:
             */
            async assignJob(){
                this.isLoading = true      
                var volunteerJobs = _.cloneDeep(this.volunteerJobsVolunteer)
                var formVolunteer = _.cloneDeep(this.form)
                var newAssignmentRecord = null
                var volunteerJob = null
                var formUpdate = {
                    id: 0,
                    idWorkshop: null,
                    requestedWorkshopDisplayName: null,
                    confirmed : true
                }
                var formVolunteerJob = {
                    id: 0,
                    idJob: 0
                }

                //Arreglo de los AR ya confirmados 
                var aux1= []
                for (var q = 0; q < volunteerJobs.length; q++) {                  
                    if(volunteerJobs[q].AssignmentRecords[0]){
                        if( volunteerJobs[q].AssignmentRecords[0].confirmed == true ){
                        aux1.push(volunteerJobs[q].AssignmentRecords[0])
                        }
                    }
                }
                console.log('aux ', aux1)
                console.log('aux.length ', aux1.length)
                if (aux1.length === 2 ) { //Máximo de talleres asociados Existen Ar ya confirmados
                this.formNot.title="Notificación"; this.formNot.not="Creando asociado al número máximo de talleres (2 talleres por semestre)."
                }else{
                    //validar que, si está asignado a un proyecto, no se trate de asignar a otro proyecto con el mismo projectType
                    var auxProject1= {}
                    var auxProject2 = {}
                    auxProject2 = _.find(this.projects, (project) => { return project.id == formVolunteer.project }); 
                    if(aux1.length == 1){ //Asociado a un taller, identificar proyectType                   
                        auxProject1 = _.find(this.projects, (project) => { return project.id == aux1[0].idSchool });
                    }
                    console.log('auxProject1:::: ', auxProject1)
                    console.log('auxProject2:::: ', auxProject2)
                    if((auxProject1 && auxProject2) &&(auxProject1.projectType == auxProject2.projectType )){
                        this.formNot.title="No fue posible hacer la asignación"; this.formNot.not="El Creando puede estar asociado a máximo a un programa académico y un programa de voluntariado activos."
                    }else{
                        //Buscar si está asociado al proyecto seleccionado
                        for (var j = 0; j < volunteerJobs.length; j++) {
                            if(volunteerJobs[j].AssignmentRecords.length > 0)
                            {
                                if(volunteerJobs[j].AssignmentRecords[0].idSchool == formVolunteer.project){
                                    volunteerJob = volunteerJobs[j]
                                }                            
                            }                        
                        }
                        //si aun no está registrado en el proyecto: registrar voluntario, crear volunteer_job y assignment_record
                        if(volunteerJob == null){
                            //crear volunteerJob y assignment_record
                            var temp = await consultServices('enrollToProject','POST', {id: formVolunteer.idVolunteer, idProject: formVolunteer.project, semesterCode:this.semester.id })
                            newAssignmentRecord = temp
                        }
                        //Actualizar assignment_record
                        newAssignmentRecord != null && newAssignmentRecord.id ? formUpdate.id = newAssignmentRecord.id : formUpdate.id = volunteerJob.AssignmentRecords[0].id //obtener id del assignment que se actualizará
                        if(formVolunteer.role == 1 || formVolunteer.role == 2 ){ //asignación tipo de rol: participante (solo divertimate y talleres)               
                            formUpdate.idWorkshop= formVolunteer.workshop.id 
                            formUpdate.requestedWorkshopDisplayName = formVolunteer.workshop.requestedWorkshopDisplayName

                        }else{ //asignación tipo de rol: operaciones o rol del tipo lider
                            formUpdate.idWorkshop= null
                            formUpdate.requestedWorkshopDisplayName = null
                        }
                        var responseAR =  await consultServices('updateAssignmentRecord','POST',formUpdate);
                        if(responseAR.message){
                            this.formNot.title="Error en la operación"; this.formNot.not="No se pudo asignar al creando."
                        }else{
                            //Actualizar volunteer_job asociado al assignment_record 
                            newAssignmentRecord != null &&  newAssignmentRecord.id ? formVolunteerJob.id = newAssignmentRecord.idVolunteerJob : formVolunteerJob.id = volunteerJob.id //obtener id del volunteer_job que se actualizará
                            formVolunteerJob.idJob = formVolunteer.role
                            var responseVJ= await consultServices('updateJobVolunteerJob','POST',formVolunteerJob);
                            if(responseVJ.message){
                                this.formNot.title="Error en la operación"; this.formNot.not="No se pudo asignar al creando."
                            }else{
                                this.formNot.title="Operación exitosa"; this.formNot.not="Se ha asignado al creando."
                                if(this.form.howToTakePart  == 'LEADER'){
                                    this.getSchoolLeaders();
                                    document.getElementById('divTable').style.display = "block";
                                }
                            }
                        }
                    }


                }

                this.shownotificacion();
                this.isLoading = false                               
            },

            async shownotificacion(){
                $('.bs-example-modal-not').modal('show');
            },

            setHeadTable(tableSelected) {
                    if(tableSelected=='tableListCreando'){
                    this.colum = [
                        {label:'Resultado' ,name:'name' ,find:1 ,sort:1},
                        //{label:'Contraseña' ,name:'password' ,find:0 ,sort:0},
                        {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},];
                    this.titleTable = "Resultados";
                    }
                if(tableSelected=='tableListCreandoModal'){
                    this.columModal = [
                        {label:'Resultado' ,name:'name' ,find:1 ,sort:1},
                        {label:'Programa' ,name:'project' ,find:1 ,sort:1},
                        {label:'Rol' ,name:'role' ,find:1 ,sort:1},
                        {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},
                        ];
                    this.titleTableModal = "Resultados";
                    }
            },

            refreshData() {
                this.$refs.tableMaf.formatData(this.creando);
            },
            
            refreshDataModal() {
                this.$refs.tableMafModal.formatData(this.creandosProject);
            },
            
            async showPasswordEdit(item){
                var flag= confirm("¿Cambiar la contraseña  actual a una asignada por defecto?");
                if(flag==true){
                    const response = await consultServices('resetPassword','POST',{documentNumber:item.documentNumber});
                    if(response.status){ this.formNot.title="Modificación de contraseña "; this.formNot.not="No se pudo actualizar la contraseña del usuario"}
                    else{ this.formNot.title="Modificación de contraseña "; this.formNot.not="Se actualizó la contraseña del usuario de manera correcta"}
                    $('.modal').modal('hide');
                    this.shownotificacion();
                }
            },            

            async getSchoolLeaders(){
                this.schoolsLeaders=[];
                //acá modifiqué
                            
                const response=await consultServices('getSchoolLeaders','POST',{id:this.form.project, semesterCode:this.semester.id});              
                if(response.length == 0){
                }else{
                    this.schoolsLeaders=response[0].AssignmentRecords;
                }
                    this.setDataTableModal(this.schoolsLeaders)

            },

            async onChangeProject(){
                console.log('id project selected ' ,this.form.project)
                this.projectType = null
                var alreadyAssigned = false
                var arrayVJ = this.volunteerJobsVolunteer
                var idSchoolAlreadyAssigned = null
                this.roomsxSchool = await consultServices('getRooms','POST',{id: this.form.project, semesterCode: this.semester.id});

                for (var q = 0; q < arrayVJ.length; q++) {
                    if(arrayVJ[q].AssignmentRecords[0]){
                        if(arrayVJ[q].AssignmentRecords[0].idSchool == this.form.project && arrayVJ[q].AssignmentRecords[0].confirmed == true ){
                            alreadyAssigned = true
                            idSchoolAlreadyAssigned = arrayVJ[q].AssignmentRecords[0].idSchool
                        }
                    }
                }

                if (alreadyAssigned == true){   
                    document.getElementById('divRoles').style.display = "none";
                    document.getElementById('divWorkshops').style.display = "none"; 
                    document.getElementById('divTable').style.display = "none";
                    document.getElementById('btnAsssign').disabled = true;  
                    alert('El creando ya se encuentra asociado al programa')
                }else{
                    var project = _.find(this.projects, (project) => { return project.id == this.form.project });
                    // console.log('project seleccionado ', project)
                    this.projectType = project.projectType
                    document.getElementById('divRoles').style.display = "block";
                    document.getElementById('btnAsssign').disabled = false;
                    if(this.projectType=='ACADEMIC_PROJECT'){
                        this.form.role= 31 //'SCHOOL_PARTICIPANT' 
                        document.getElementById('divRoles').style.display = "none";
                        document.getElementById('divTable').style.display = "none";
                    }                
                    if(this.projectType=='VOLUNTEER_PROJECT'){                   
                        this.getSchoolLeaders();
                        //document.getElementById('divTable').style.display = "block";
                    }
                }
            },
            
            async onChangeRole(){
                if(this.form.howToTakePart  == 'LEADER'){
                    document.getElementById('divRoles').style.display = "block";
                    document.getElementById('divTable').style.display = "block";
                    document.getElementById('divWorkshops').style.display = "none";
                    this.optionsRoles = _.cloneDeep(this.rolesSenior);
                }
                if(this.form.howToTakePart  == 'PARTICIPANT'){
                    document.getElementById('divRoles').style.display = "block";
                    document.getElementById('divWorkshops').style.display = "block";
                    document.getElementById('divTable').style.display = "none";
                    this.optionsRoles = _.cloneDeep(this.rolesJunior);
                }
            },

            async onChangeWorkshop(){
                // console.log('role ', this.form.role)
                var json={
                    id:'',requestedWorkshopDisplayName:'',displayValue:'',
                }
                var type = '';
                var grade = '';
                var classroom = '';
                var level = '';
                var workshops= [];
                //preparar talleres
                this.flagWorkshops = true
                
                var workshopsResponse = _.cloneDeep(this.roomsxSchool)
                console.log('workshopsResponse 1 ::::::::: ', workshopsResponse)
                for (let index = 0; index < workshopsResponse.length; index++) {          
                    grade = this.getDisplayValue(workshopsResponse[index].gradeCode,11)
                    classroom = this.getDisplayValue(workshopsResponse[index].classroomCode,12)
                    level = this.getDisplayValue(workshopsResponse[index].levelCode,10)

                    if(workshopsResponse[index].typeCode == 'WORKSHOP_MATH'){
                        json={
                            id:workshopsResponse[index].id,
                            requestedWorkshopDisplayName:workshopsResponse[index].displayName,
                            displayValue: grade + " " + classroom + " - " + level,
                            typeCode:workshopsResponse[index].typeCode,
                        } 
                    }
                    if(workshopsResponse[index].typeCode == 'WORKSHOP_CUSTOM'){
                        json={
                            id:workshopsResponse[index].id,
                            requestedWorkshopDisplayName:workshopsResponse[index].displayName,
                            displayValue:  workshopsResponse[index].displayName +" - " + level,
                            typeCode:workshopsResponse[index].typeCode
                        } 
                    }

                    workshops.push(json)
                    
                }
                console.log('workshops 1 ::::::::: ', workshops)
                //Asignar talleres por rol

                /**
                * rol: 1->divertimate 2->talleres 3->operaciones
                */
                this.workshopsxSchool = []
                if(this.form.role == 1){                   
                    for (let index = 0; index < workshops.length; index++) {
                        if(workshops[index].typeCode == 'WORKSHOP_MATH'){
                        this.workshopsxSchool.push(workshops[index])
                        }            
                    }     
                    if(this.workshopsxSchool.length >0){
                        document.getElementById('divWorkshops').style.display = "block";
                    }else{
                        alert('El programa seleccionado aún no cuenta con talleres disponibles.')
                        document.getElementById('divWorkshops').style.display = "none";
                    }  
                }
                if(this.form.role == 2){
                    for (let index = 0; index < workshops.length; index++) {
                        if(workshops[index].typeCode == 'WORKSHOP_CUSTOM'){
                        this.workshopsxSchool.push(workshops[index])
                        }            
                    } 
                    if(this.workshopsxSchool.length >0){
                        document.getElementById('divWorkshops').style.display = "block";
                    }else{
                        alert('El programa seleccionado aún no cuenta con talleres disponibles.')
                        document.getElementById('divWorkshops').style.display = "none";
                    } 
                }  
                if(this.form.role == 3){
                    document.getElementById('divWorkshops').style.display = "none";
                }    
                console.log("workXschool:  ",this.workshopsxSchool);

                
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

            setDataTable(arrayData){
                var ctx = this;
                this.creando = [];

                arrayData.forEach(item => {
                    var crea = {};

                        var name = item.name;
                        var lastName = item.lastName;
                        var secondLastName = item.secondLastName  != null ? secondLastName =  item.secondLastName : secondLastName = '' ;
                        crea.name = name.concat(" ", lastName," ", secondLastName);

                        crea.password=<div class="d-flex justify-content-around">
                        <i class="fa fa-refresh"  onClick={()=>ctx.showPasswordEdit(item)} data-toggle="modal" data-target=".modal-not"></i>
                        </div>;

                        crea.actions=<div class="d-flex justify-content-around">
                        <button onClick={()=>ctx.showEditModal(item)}   class="btn btn-info btn-xs" data-target=".bs-example-modal-sta" data-toggle="modal"><i class="fa fa-eye" ></i> Asignar rol/programa</button>
                        </div>;
                    this.creando.push(crea);
                });

                this.refreshData();
            },

            searchSchool(id){
                console.log('id entra searchSchool', id)
                console.log('arreglo searchSchool', this.projects)
                for (let index = 0; index < this.projects.length; index++) {
                    if(this.projects[index].id == id){
                        return this.projects[index].label;
                    }
                }
            },

            async showEditModal(item){
                console.log('item:::: ', item)
                this.volunteerJobsVolunteer = _.cloneDeep(item.VolunteerJobs)
                this.projectType = "";
                this.form.idVolunteer= item.id;
                this.form.project={};
                this.form.howToTakePart = "";
                this.form.role ="";
                document.getElementById('divRoles').style.display = "none";   
                document.getElementById('divTable').style.display = "none";     
                document.getElementById('btnAsssign').disabled = false;       
            },

            setDataTableModal(arrayData){
                var ctx = this;
                this.creandosProject = [];
                var name=this.searchSchool(this.form.project);
                console.log('proyecto ',this.form.project )
                arrayData.forEach(item => {
                    var crea = {};
                        crea.name = item.VolunteerJob.Volunteer.name+" "+ item.VolunteerJob.Volunteer.lastName;
                        crea.role=item.VolunteerJob.Job.name;
                        crea.project=name;
                        crea.actions = <div class="d-flex justify-content-around">
                        <div> <button onClick={()=>ctx.deleteJob(item)}  class="btn btn-danger btn-xs" >Eliminar asignación</button> </div> </div>;
                        this.creandosProject.push(crea);
                });
                this.refreshDataModal();

            },

            async deleteJob(item){
                var flag=confirm("¿Eliminar la asignación para el usuario seleccionado?");
                if(flag == true){
                        this.isLoading=true;
                        var form={id:item.VolunteerJob.id}
                        const response0 = await consultServices('removeAssignation','POST',form);
                        this.getSchoolLeaders();
                        this.isLoading=false;
                }
            },

        }

    };

</script>

<style scoped>
.fa {cursor:pointer}
</style>
