<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Guías de divertimate</h2></br></br>
                    <small> Aqui irás encontrando información pedagógica para tus clases de DivertiMate</small>
                </div>
                <div class="card-body">

                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Seleccione un grado</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                           <select class="form-control" v-model="grade" @change="onChangeGrade()" >
                                <option v-for="item in grades" v-bind:value="item" >
                                     {{item.displayValue}}
                                </option>
                            </select>
                        </div>
                </div>

                </div>
                <div class="card-body">

                    <TableMaf :header="colum" :data="documentsCreando" :datePerPageV="false" :title="false" :pagination="false" :searchOption="false" ref="tableMaf" >

                    </TableMaf>

                </div>
            </div>
        </div>
    </div>
</template>>

<script>

    import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import TableMaf from "./../../components/TableMaf.vue";
    //import linkCheck  from 'link-check';

    export default {
        name: "GuiaDeClasesDivertimate",
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
            grades:[],
            grade:{},
            semester: {},
            nameAux: ''
        }),

        async created () {
            await this.getSessionStorage();
            this.setHeadTable();
        },

        methods: {
          async checkLink(grade, semester, classNumber){
            var url = `https://creamas-space.sfo2.digitaloceanspaces.com/math_guide` + `/` + grade + `/` + semester + `/` + classNumber
            let response = await fetch(url, {method:'GET'});
            return response
          },

          async getSessionStorage(){
            this.isLoading = true;

            var ids = [] ;
            var flagEvents = false;
            var flagGrade = false;

            if(!window.sessionStorage.events){
              ids.push(20);
              flagEvents = true;
            }
            if(!window.sessionStorage.semester){
              const response =  await consultServices('getCurrentSemester','POST', {});
              this.semester = response ;
              window.sessionStorage.semester  = JSON.stringify(this.semester);
            }
            if(!window.sessionStorage.grades){
              ids.push(11);
              flagGrade = true;
            }


            if( ids.length > 0){

            //Hacer consulta única de masterValues
              var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
              //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla

              if(flagEvents == true){
                  this.events = _.filter(arrayMasters, function(master) {return master.idMaster == 20; })
                  window.sessionStorage.events  = JSON.stringify(this.events);
              }
              if(flagGrade == true){
                  this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                  window.sessionStorage.grades  = JSON.stringify(this.grades);
              }
            }

            this.events =JSON.parse( window.sessionStorage.events );
            this.semester =JSON.parse( window.sessionStorage.semester );
            this.grades =JSON.parse( window.sessionStorage.grades );
            // //fin de la carga de arreglos para la pantalla

            this.isLoading = false;
          },

          async listDocuments() {
              const response = await consultServices('getAllClasses','POST',{});
              await this.setDataTable(response);
          },

          setHeadTable(){
            this.colum = [
                {label:'Clase' ,name:'class' ,find:1 ,sort:0},
                {label:'Documento' ,name:'nameDoc' ,find:1 ,sort:0},
                {label:'Subir' ,name:'link' ,find:1 ,sort:0},
              ]
            this.titleTable = "Guías de clase";
          },

          async setDataTable(arrayData){
              var ctx = this;
              this.documentsCreando = [];

              await Promise.all(_.map(arrayData, async (item) => {
                var doc = {};

                doc.class = this.getDisplayValue(item.descriptionCode,20)
                var fileName = doc.class.substring(0,7).split(' ').join('_');
                var linkResponse = await this.checkLink(this.grade.code, this.semester.id, fileName);
                //console.log('linkResponse ', linkResponse);
                //console.log("item  ",item.descriptionCode)

                if(linkResponse.status == 200){
                  doc.nameDoc = <div class="d-flex justify-content-around">
                      <div> <a href={linkResponse.url} class="btn btn-danger btn-xs" style="color:#FFFFFF" target="_newtab"><i class="cui-file"></i>{fileName}</a> </div> </div>;
                }else{
                  doc.nameDoc = 'No existe guía para esta clase'
                }
                var refs = `$refs.`+fileName+`.click()`
                doc.link = <div class="d-flex justify-content-around">
                      <div>
                        <button onClick={() => { this.$refs[fileName].click() }} class="btn btn-warning">Cargar</button>
                        <input type="file" ref={fileName} style="display: none" onChange={ (e) => { this.nameAux = fileName ; this.handleFileUpload(e) }} accept="application/msword, application/pdf"></input>
                      </div>
                    </div>;

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

          async onChangeGrade(){
            await this.listDocuments();
          },

          //Manejamos cuando el usuario elige un archivo de su ordenador
          async handleFileUpload(e){
            //seteamos variable local
            const urlSufix = 'math_guide/'+ this.grade.code + '/' + this.semester.id + '/'// Folder destino del archivo
            this.isLoading = true;
            console.log("ENTRRPP", this.nameAux);
            var formData = new FormData();
            formData.append('file',e.target.files[0])
            var url = 'upload/uploadAttachment?urlSufix='+urlSufix+`&fileName=`+this.nameAux
            fetch(url, {
              method:'POST',
              body: formData
            })
            .then(response => {
              // console.log('response ', response);
              if (response.ok) {
                  response.json()
                  .then(async data => {
                    if(data.error){
                      alert(data.error)
                    }else{
                      console.log('generatedUrl ', data.generatedUrl);
                      // console.log('data ', data);
                      await this.listDocuments();
                    }
                    this.isLoading = false;
                  })
              }else{
                this.isLoading = false;
              }
            })
          },
        }
    }
</script>
