<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>

        <div v-if="showDocProjectDiv == true" id="cardDocProject" class="card" >
            <!-- <div class="card-header">
                <h2>Documentos del programa </h2><br/><br/>
                <small>* Aqui irás encontrando información psobre el proyecto</small>
            </div> -->
            <div class="card-header collapse show blue" data-toggle="collapse" data-target="#confirmedProjects">
                <h2 class="whiteFont">Documentos del programa </h2>
                <div class="clearfix"></div>
            </div>
            <div class="card-body">
                <p class="lead">
                    Aquí encontrarás información sobre el programa
                </p>
                <TableMaf :header="colum" :data="documentsProject" :datePerPageV="false" :title="false" :pagination="false" :searchOption="false" ref="tableMaf2" >
                </TableMaf>

            </div>
        </div>  

        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <!-- <div class="card-header">
                    <h2>Kit Pedagógico</h2><br/><br/>
                    <small>* Aqui irás encontrando información pedagógica para tus sábados Crea+ test</small>
                </div> -->
                <div class="card-header collapse show blue" data-toggle="collapse" data-target="#confirmedProjects">
                    <h2 class="whiteFont">Kit Pedagógico </h2>
                    <div class="clearfix"></div>
                </div>
                <div class="card-body">
                    <p class="lead">
                        Aqué encontrarás información pedagógica para tus sábados Crea+
                    </p>
                    <TableMaf :header="colum" :data="documentsCreando" :datePerPageV="false" :title="false" :pagination="false" :searchOption="false" ref="tableMaf" >
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

    export default {
        name: "KitPedagogicoContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            id: window.INITIAL_STATE.id,  
            isLoading:false,
            colum:[],
            titleTable:'',
            documentsCreando:[],
            documentsProject:[],
            semester:{}.consultServices,
            showDocProjectDiv: true,
             }),
        async created () {
            this.setHeadTable();
            //Obtener id del proyecto y semestre
            var idProject= 0
            const response =  await consultServices('getCurrentSemester','POST', {});
            this.semester = response;
            var getSchool =  await consultServices('getSchool','POST',{id:this.id, semesterCode:this.semester.id});
            this.school = ((((getSchool || {}).AssignmentRecords || [])[0] || {})).School;
            console.log("school ", getSchool);
            if(this.school){
               
                this.school.idFather == null ? idProject = this.school.id : idProject = this.school.idFather
                this.listDocumentsProject(idProject)
            }else{
                // document.getElementById('cardDocProject').style.display = "none"
                this.showDocProjectDiv = false
            }
            //listar documentos generales
            this.listDocuments();
        },

        methods: {

            async listDocuments() {
              //listar kit pedagógico
              var arrayDocuments = await consultServices('getPedagogicalKit','POST',{});
              this.setDataTable(arrayDocuments, 'PEDAGOGICAL');
            },
            async listDocumentsProject(id) {
              //listar documentos por el taller
              var respDocs =  await consultServices('getDocumentsProject','POST',{idProject:id});
              this.setDataTable(respDocs, 'PROJECT');

            },
            setHeadTable(){
            this.colum = [
                {label:'Documento' ,name:'name' ,find:1 ,sort:0},
                {label:'Descargar' ,name:'url' ,find:1 ,sort:0},
              ]            
            this.titleTable = "Kit Pedagógico";
            },
            setDataTable(arrayData, tableType){
                var ctx = this;

                if(tableType == 'PEDAGOGICAL'){
                    this.documentsCreando = [];
                    arrayData.forEach(item => {
                    var doc = {};
                        doc.name=item.name;
                        doc.url = <div class="d-flex justify-content-around">
                            <div> <a href={item.url} class="btn btn-success btn-xs" style="color:#FFFFFF"  target="_newtab"><i class="fa fa-download"></i> </a> </div> </div>;
                        this.documentsCreando.push(doc);
                    });
                    this.$refs.tableMaf.formatData(this.documentsCreando);
                }
                if(tableType == 'PROJECT'){
                    this.documentsProject = []
                    arrayData.forEach(item => {
                    var doc = {};
                        doc.name=item.name;
                        doc.url = <div class="d-flex justify-content-around">
                            <div> <a href={item.url} class="btn btn-success btn-xs" style="color:#FFFFFF"  target="_newtab"><i class="fa fa-download"></i> </a> </div> </div>;
                        this.documentsProject.push(doc);
                    });
                    this.$refs.tableMaf2.formatData(this.documentsProject);
                }
                


            },
        }
    }
</script>
