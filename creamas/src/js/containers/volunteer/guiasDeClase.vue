<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Guías de clase</h2></br></br>
                    <small> Aqui irás encontrando información pedagógica para tus clases de DivertiMate </small>
                </div>
                <div class="card-body">

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
        name: "GuiasDeCLaseContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            isLoading:false,
            colum:[],
            titleTable:'',
            documentsCreando:[],
            events:[],
            id: window.INITIAL_STATE.id,
            idWorkshop:  window.INITIAL_STATE.idWorkshop,
            gradeCode:  window.INITIAL_STATE.gradeCode,
            adm: window.INITIAL_STATE.adm,
            }),
        async created () {
            console.log('id:::::::::::::::', this.id)
            await this.getSessionStorage();
            this.setHeadTable();
            if(this.adm == false){
                await this.getWorkShop();
            }else{
                await this.listDocuments();
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
                  const response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response ;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla

                    if(flagEvents == true){
                       this.events = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                       window.sessionStorage.events  = JSON.stringify(this.events);
                    }
                }

                this.events =JSON.parse( window.sessionStorage.events );
                this.semester =JSON.parse( window.sessionStorage.semester );
             // //fin de la carga de arreglos para la pantalla

                this.isLoading = false;
            },

            async getWorkShop(){
                this.isLoading = true;
                var form = {
                    id:this.id,
                    semesterCode: this.semester.id,
                }
                this.workShop = await consultServices('getWorkshop','POST',form);
                if(this.workShop.gradeCode) {
                    this.gradeCode = this.workShop.gradeCode;
                    await this.listDocuments();
                } else {
                    alert("El  creando  no esta asignado a un taller");
                }
                this.isLoading = false;
            },

            async listDocuments() {
                const response = await consultServices('getAllClasses','POST',{});
                this.setDataTable(response);
            },
            async checkLink(grade, semester, classNumber){
              console.log('grade', grade)
              console.log('semester', semester)
              console.log('classNumber',classNumber)  
              var url = `https://creamas-space.sfo2.digitaloceanspaces.com/math_guide` + `/` + grade + `/` + semester + `/` + classNumber
              let response = await fetch(url, {method:'GET'}); 
              return response
            },
            setHeadTable(){
              this.colum = [
                  {label:'Clase' ,name:'class' ,find:1 ,sort:0},
                  {label:'Documento' ,name:'nameDoc' ,find:1 ,sort:0},
                  {label:'Descargar' ,name:'link' ,find:1 ,sort:0},
                ]
              this.titleTable = "Guías de clase";
            },
            async setDataTable(arrayData){
              var ctx = this;
              this.documentsCreando = [];

              await Promise.all(_.map(arrayData, async (item) => {
                var doc = {};
                console.log("ENTRA");
                doc.class = this.getDisplayValue(item.descriptionCode,20)
                var fileName = doc.class.substring(0,7).split(' ').join('_');
                var linkResponse = await this.checkLink(this.gradeCode, this.semester.id, fileName);
                //console.log('linkResponse ', linkResponse);
                //console.log("item  ",item.descriptionCode)
                console.log('link::::::::::::::::::::::::::::::', linkResponse)

                if(linkResponse.status == 200){
                  console.log('link::::::::::::::::::::::::::::::', linkResponse.status)
                  doc.nameDoc = doc.class.substring(0,7);
                  doc.link = <div class="d-flex justify-content-around">
                     <div> <a href={linkResponse.url} class="btn btn-danger btn-xs" style="color:#FFFFFF" target="_newtab"><i class="cui-file"></i>{fileName}</a> </div> </div>;
                }else{
                  doc.nameDoc = 'No existe guía para esta clase'
                  doc.link = 'No existe guía para esta clase'
                }

                console.log("doc ", doc);
                this.documentsCreando.push(doc);
              }))
              .then((table) => {
                this.refreshData();
              })
            },
            refreshData(){
                this.$refs.tableMaf.formatData(this.documentsCreando);
            },

            getDisplayValue(string, master){
            var array=[];
            var display="";
            if(master == 20){
                array= this.events
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
