<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Administrador de las constancias</h2>
                    <div class="clearfix"></div>
                    <small>Este panel sirve para actualizar la firma de la persona en la constancias de Crea+</small>
                </div>

                <div class="card-body">

                    <div class="card">
                        <div class="card-header">
                            <h2>Actualizar firma (español)</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Firma actual:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <td >
                                    <center> <img :src="signatureEs.url" alt="img" width="300" heigth="100">
                                    </center>
                                    </td>
                                    <button  :href="signatureEs.url" target="_blank" class="btn btn-success btn-xs"><a :href="signatureEs.url" target="_blank"> Ver firma</a></button>

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Actualizar firma (Subir archivo en formato PNG):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <button @click="$refs.imageFileEs.click()" class="btn btn-warning">Cargar nueva imagen</button>
                                    <input type="file" ref="imageFileEs" style="display: none" v-on:change="handleFileUploadSpanish" accept="image/*" >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" >
                        <div class="card-header">
                            <h2>Actualizar firma (inglés)</h2>
                            <div class="clearfix"></div>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Firma actual:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <td >
                                    <center> <img :src="signatureEn.url" alt="img" width="300" heigth="100">
                                    </center>
                                    </td>
                                     <button  :href="signatureEn.url" target="_blank" class="btn btn-success btn-xs"><a :href="signatureEn.url" target="_blank"> Ver firma</a></button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Actualizar firma (Subir archivo en formato PNG):</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                  <button @click="$refs.imageFileEn.click()" class="btn btn-warning">Cargar nueva imagen</button>
                                  <input type="file" ref="imageFileEn" style="display: none" v-on:change="handleFileUploadEnglish" accept="image/*" >
                                </div>
                            </div>
                        </div>
                    </div>
            </div> <!--card-body-->

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="changeFileFoto()"> Actualizar firmas </button>
            </div>





            </div> <!--card-->
        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import * as lang from "vuejs-datepicker/src/locale";
    import moment from 'moment';
    import _ from 'lodash';
    import Media from '@dongido/vue-viaudio';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import Datepicker from 'vuejs-datepicker';

  export default {
        name: "CharlaReclutamiento",
        components: {
            LoadingComponent,
            Datepicker,
            Media,
        },

        data: () => ({
            isLoading: true,
            evaluation:[],
            formTrainning:{},
            search:'',
            prueba: 'http://drive.google.com/uc?export=view&id=1zguPfm5HGyDQHmQWfGIld86TOm0b5AbT',
            sigantures:[],
            signatureEs: '',
            signatureEn: '',
            formMultimediaCaballo : {},
        }),

        async created () {
            this.isLoading= true;
            await this.getSessionStorage();
            await this.getSignatures()
            this.isLoading= false;

        },

        methods: {
        async getSessionStorage(){
              var ids = [] ;
              var flagSignature = false;


                if(!window.sessionStorage.signatures){
                  ids.push(23);
                  flagSignature = true;
                }

                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla

                    if(flagSignature == true){
                       this.sigantures = _.filter(arrayMasters, function(master) {return master.idMaster == 23; })
                       window.sessionStorage.signatures  = JSON.stringify(this.sigantures);
                    }

                }

                this.signatures =JSON.parse( window.sessionStorage.signatures );

             // //fin de la carga de arreglos para la pantalla


        },

        async getSignatures(){
          this.isLoading = true;
          const response =  await consultServices('getDigitalSignature','POST',{});
          this.signatureEs = _.find(response, (signature) => {
            return signature.name == 'firma_impacto_es'
          })
          this.signatureEn = _.find(response, (signature) => {
            return signature.name == 'firma_impacto_en'
          })
          this.isLoading = false;
        },

        //Manejamos cuando el usuario elige una imagen de su ordenador
        async handleFileUploadSpanish(e){
          //seteamos variable local
          const urlSufix = 'signatures/' // Folder destino del archivo
          this.isLoading = true;
          var formData = new FormData();
          formData.append('file',e.target.files[0])
          var url = 'upload/uploadAttachment?urlSufix='+urlSufix
          fetch(url, {
            method:'POST',
            body: formData
          })
          .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                  if(data.error){
                    alert(data.error)
                  }else{
                    this.signatureEs.url = data.generatedUrl
                  }
                  this.isLoading = false;
                })
            }else{
              this.isLoading = false;
            }
          })
        },

        async handleFileUploadEnglish(e){
          //seteamos variable local
          const urlSufix = 'signatures/' // Folder destino del archivo
          this.isLoading = true;
          var formData = new FormData();
          formData.append('file',e.target.files[0])
          var url = 'upload/uploadAttachment?urlSufix='+urlSufix
          fetch(url, {
            method:'POST',
            body: formData
          })
          .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                  if(data.error){
                    alert(data.error)
                  }else{
                    this.signatureEn.url = data.generatedUrl
                  }
                  this.isLoading = false;
                })
            }else{
              this.isLoading = false;
            }
          })
        },

        showNamePhotos:function (name) {
          //Debido a que se necesita que los nombres sean diferentes en s3 hacemos este split.
          var nameSplit = _.split(name, '-key-');
          if(nameSplit.length==2){
            return nameSplit[0]+'.png'
          }else{
            return name;
          }
        },
        addImagen: function(){
          var elem = this.$refs.myFilesFoto
          elem.click()
          //this.form.urlsImagenes.push({name:''})
        },

        async changeFileFoto() {
          this.isLoading = true;
          var formEs = _.cloneDeep(this.signatureEs);
          var formEn = _.cloneDeep(this.signatureEn);
          console.log("this.signatureEs ", this.signatureEs);
          console.log("this.signatureEn ", this.signatureEn);
          const responseI =  await consultServices('updateDigitalSignature','POST',formEs);
          const responseII =  await consultServices('updateDigitalSignature','POST',formEn);
          this.isLoading = false;
        },

        },



    }

</script>

<style scoped>
</style>
