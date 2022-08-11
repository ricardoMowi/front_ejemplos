<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Noticias</h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar Noticia 
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <MasterTemplate
            :filters="propsNews.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getNews"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsNews.customActions"  
            :data="this.news"
            :tableTitle="titleTable"
            :showSearchSection="this.showSearchSection"
          ref="mowiMaster"/>
        </div>
      </div>

      <!-- Modal  -->
      <div id="mainModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Nueva noticia</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar noticia</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type='text' v-model="form.title"  :valueInput='form.title' label="Título: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="title"  etiqueta='true' ref="title"/>           
                  </div>
              </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf textArea="textArea" v-model="form.content" :valueInput='form.content'
                      label="Contenido: (*)" :validation="{required:true}" nameInput="content" etiqueta='true' ref="content"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Público objetivo: (*)</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <select v-model="form.target" :valueInput='form.target' class="custom-select">
                        <option value="" selected>Selecciona una opción:</option>
                        <option value="RIDER">Riders</option>
                        <option value="CLIENT">Clientes</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12 col-form-label">Tamaño de la noticia: (*)</label>
                    <div class="col-md-9 col-form-label">
                      <div class="form-check form-check-inline mr-1">
                        <input class="form-check-input" id="inline-radio1" type="radio" v-model="form.size" :valueInput='form.size' value="STANDART" name="inline-radios" ref="size">
                        <label class="form-check-label" for="inline-radio1">Estandar</label>
                      </div>
                      <div class="form-check form-check-inline mr-1">
                        <input class="form-check-input" id="inline-radio2" type="radio" v-model="form.size" :valueInput='form.size' value="LARGE" name="inline-radios" ref="size">
                        <label class="form-check-label" for="inline-radio2">Grande</label>
                      </div>
                    </div>
                  </div>
                </div>  
                <div class="form-group">
                  <div v-if="form.attachment" class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Imagen actual:</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <img v-bind:src="form.attachment.url" class="img-fluid" alt="Responsive image" width="400px">
                    </div>
                  </div>
                  
                  <!-- <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Previsualización con imageResize:</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <img id="salida1" src="" class="img-fluid" alt="Responsive image" width="400px">
                    </div>
                  </div>
                  <div  class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Previsualización sin resize:</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <img id="salida2"  src="" class="img-fluid" alt="Responsive image" width="400px">
                    </div>
                  </div> -->

                  <div v-if="formType=='ADD'" class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Agregar Imagen: (*)</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <div class="custom-file">
                        <input id="upload" v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input"  accept="image/*">
                        <label class="custom-file-label" for="customFile">{{tempFileName ? tempFileName : 'Elige la imagen'}}</label>
                      </div>
                    </div>
                  </div>

                  <div v-if="formType=='EDIT'" class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Actualizar Imagen</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                      <div class="custom-file">
                        <input v-on:change="handleFileSelection" type="file" ref="imageFile" class="custom-file-input" id="customFile" accept="image/*">
                        <label class="custom-file-label" for="customFile">{{tempFileName ? tempFileName : 'Elige la imagen'}}</label>
                      </div>
                    </div>
                  </div>
                </div>             
                

                <!-- <div class="card-body">
                  <div class="form-group" v-if="formType=='EDIT'">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                          <button @click="resetPassword()" class="btn btn-danger" style="margin-bottom: 5px;" type="reset">Restaurar Contraseña</button>
                    </div>
                  </div>
                </div> -->
                
              </div>
              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button v-if="formType=='ADD'" @click="createNewRecord()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateNewRecord()" type="button" class="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Fin -->

      <!--Modal Delete-->
      <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar noticia</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar la noticia? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="deleteNewRecord()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal Publish-->
      <div class="modal fade bs-example-modal-publish" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Publicar noticia</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea publicar esta noticia?
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="publishNewRecord()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal Unpublish-->
      <div class="modal fade bs-example-modal-unpublish" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Ocultar noticia</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea ocultar esta noticia?
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="unPublishNewRecord()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Fin-->
      <!--Modal not-->
        <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" > {{formNot.title}} </h5>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">{{formNot.message}}</div>
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
  import MasterTemplate from 'mowi-master';
  import moment from "moment";
  import ImageResize from 'image-resize';
  import convert from 'image-file-resize';

  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";

  const uuidv1 = require('uuid/v1');
  // const fs = require('fs');
  // const resizeImg = require('resize-img');

  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        inputMaf,
        SearchComponent,
        MasterTemplate, 
        ImageResize,
        convert,
      },
      data: () => ({
          isLoading: false,
          users: [],
          form: {},
          formType: '',
          formNot:{title:'',message:'',},
          value: null,
          options: [],
          colum:[],
          news: [],
          countries: [],
          client: {},
          propsNews: {
            filters: [              
              {
                name:'title',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Título",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,
                showOp: true,        
              },
              {
                name:'size',
                filterType:'listComponent',
                label: "Tamaño",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
                  {
                    value:'STANDART',
                    label:'Estándar'
                  },
                  {
                    value:'LARGE',
                    label:'Grande'
                  }
                ],
                operators:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              },  
              {
                name:'target',
                filterType:'listComponent',
                label: "Público Objetivo",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
                  {
                    value:'RIDER',
                    label:'Rider'
                  },
                  {
                    value:'CLIENT',
                    label:'Cliente'
                  }
                ],
                operators:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              },        
            ],
          },
          useMassiveSelector:false,
          titleTable: '', //No tiene efecto
          showSearchSection: true,  
          searchOptionTableMaf: true,
          tempFileName: ''
      }),
      
      async created () {
        var ctx = this;
        this.news = await this.getNews()
        this.setHeadTable();
        this.$refs.mowiMaster.setInitialData(this.news)
        //Agregamos listeners al modal de creación/edición
        // var myModal = document.getElementById('mainModal')
        
        // myModal.addEventListener('show.coreui.modal', function () {
        //   console.log('Holi show.coreui.modal')
        // })
        // myModal.addEventListener('hidden.coreui.modal', function () {
        //   console.log('Holi hidden.coreui.modal')
        // })
        // myModal.addEventListener('hide.coreui.modal', function () {
        //   console.log('Holi hide.coreui.modal')
        // })
        // myModal.addEventListener('hidePrevented.coreui.modal', function () {
        //   console.log('Holi hidePrevented.coreui.modal')
        // })
  		},
      
      methods: {
        deleteClient(index) {
        },
        setHeadTable() {
          this.colum = [
              {name:'title', label: 'Título', find:1, sort:1},
              {name:'content', label: 'Contenido', find:1, sort:1},
              {name:'target', label: 'Público objetivo', find:1, sort:1},
              {name:'published', label: 'Publicada', find:1, sort:1},
              {name:'size', label: 'Tamaño', find:1, sort:1},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(news){  
          var ctx = this;
          var formattedNews = [];
          news.forEach(item => {
            var newRecord = {};
            newRecord.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                    <a class="dropdown-item" onClick={()=>ctx.showDeleteModal(item)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a>
                    { item.published ? <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-unpublish">Ocultar</a>
                    :
                    <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-publish">Publicar</a>
                    }
                  </div>
                </div>
              </div>
            );
            newRecord.title = item.title;
            newRecord.content = item.content;
            if(item.target){
              newRecord.target = item.target == "CLIENT" ? 'Clientes' : 'Riders';
            }else{
              newRecord.target = '-'
            }
            newRecord.published = item.published ? 'Sí' : 'No';
            if(item.size){
              newRecord.size = item.size == "STANDART" ? 'Estandar' : 'Grande';
            }else{
              newRecord.size = '-'
            }
            formattedNews.push(newRecord);
          }); 
          return formattedNews
        },
        /**
        *  La función getNews() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getNews(filters) {
          console.log('filteeeeeeeeeeeeeers',filters )
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var title  =_.filter(filters,{'name':'title'});
              var target  =_.filter(filters,{'name':'target'});
              var size  =_.filter(filters,{'name':'size'});
              /**obtener los valores y agregarlos en el objeto filter */
              title.length > 0 ?  filter.title = title[0].value : null
              target.length > 0 ?  filter.target = target[0].value : null
              size.length > 0 ?  filter.size = size[0].value : null

              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              look = await consultServices('searchNews','POST',filter);  
          }else{
              look = await consultServices('listNews','POST',{});   
          }
          
          // /**retornar el nuevo arreglo */
          return look
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },
        /**
         * updateNewRecord: Valida y actualiza la noticia
        */
        async updateNewRecord() {
          console.log('updateNewRecord', this.form)
          //Mostramos la pantalla de cargando
          this.isLoading=true;
          //Validamos campos obligatorios
          if(this.form.title && this.form.content 
            && this.form.target && this.form.target != "" 
            && this.form.size && (this.form.attachment || (this.form.newImageFile 
            && this.form.newFileName))){
            
            //Creamos objeto
            var newRecord = {}
            newRecord._id = this.form._id;
            newRecord.title = this.form.title;
            newRecord.content = this.form.content
            newRecord.target = this.form.target
            newRecord.size = this.form.size

            //Si la imagen fue reemplazada, generamos el nuevo attachment
            if(this.form.newFileName){
              //Subimos el archivo
              await this.uploadSelectedFile()
              let attachment = {
                name: this.form.newFileName,
                url: this.form.newFileUrl,
                type: 'NEW_BANNER',
              }
              newRecord.attachment = attachment
            }else{
              newRecord.attachment = this.form.attachment
            }
            
            const newRecordUpdated = await consultServices('updateNewRecord','POST',newRecord);
            if(newRecordUpdated.message){
              this.formNot.title="Error en operación";
              this.formNot.message=newRecordUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos de la noticia de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('listNews','POST',{});
               this.refreshData(response);
            }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        
        /**
         * createNewRecord: Valida y registra el nuevo registro
        */
        async createNewRecord() {
          //Mostramos la pantalla de cargando
          this.isLoading = true;
          //Validamos campos obligatorios
          if(this.form.title && this.form.content && this.form.target 
           && this.form.target != "" && this.form.size && this.form.newImageFile 
           && this.form.newFileName){
            //Subimos el archivo
            await this.uploadSelectedFile()
            console.log('url despues de subir: ',this.form.newFileUrl)
            //Si la url fue generada, continuamos
            if(this.form.newFileUrl){
              //Creamos objeto a registrar
              var newRecord = {}
              newRecord.title = this.form.title;
              newRecord.content = this.form.content
              newRecord.target = this.form.target
              newRecord.size = this.form.size
              let attachment = {
                name: this.form.newFileName,
                url: this.form.newFileUrl,
                type: 'NEW_BANNER',
              }
              newRecord.attachment = attachment
              const response0 = await consultServices('createNewRecord','POST',newRecord);         
              console.log('respuesta del back: ', response0)
              if(response0.message){
                this.formNot.title="No fue posible realizar el registro";
                this.formNot.message=response0.message;  
              }else{
                this.formNot.title="Operación exitosa";
                this.formNot.message="El registro completo de forma exitosa.";  
                this.limpiarForm();
                $('.modal').modal('hide');
                const response = await consultServices('listNews','POST',{});
                this.refreshData(response);
              }
            }else{
              this.formNot.message="No se pudo subir el archivo, prueba con otra o intenta más tarde.";
              this.formNot.title="No fue posible realizar el registro"
            }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        
        async deleteNewRecord() {
          this.isLoading=true;
          var newRecord = {}
          newRecord._id = this.form._id;
          const response0 = await consultServices('deleteNewRecord','POST',newRecord);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La noticia fue eliminada";
            const response = await consultServices('listNews','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion();
        },
        
        async publishNewRecord() {
          this.isLoading=true;
          var newRecord = {}
          newRecord._id = this.form._id;
          const response0 = await consultServices('publishNewRecord','POST',newRecord);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La noticia fue publicada.";
            const response = await consultServices('listNews','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion()
        },

        async unPublishNewRecord() {
          this.isLoading=true;
          var newRecord = {}
          newRecord._id = this.form._id;
          const response0 = await consultServices('unpublishNewRecord','POST',newRecord);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La noticia fue ocultada.";
            const response = await consultServices('listNews','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion()
        },

        /**
         * handleFileSelection: Permitirá conservar el archivo elegido por el usuario
         *  para subirlo a Spaces después
        */
        async handleFileSelection(e){
          console.log('handleFileSelection')
          //Si la nueva selección tiene algún archivo seleccionado
          if(e.target.files.length > 0){
            const ctx=this
            //Guardamos el archivo y el nombre en variables separadas
            this.form.newImageFile = e.target.files[0]
            this.form.newFileName = e.target.files[0].name
            this.tempFileName = e.target.files[0].name
            console.log('revisar', this.form.newImageFile)

            //Reasignar el tamaño de la imagen , con la librería image-file-resize
            convert({ 
                file: e.target.files[0],  
                width: 250, 
                height: 250, 
                type: 'jpeg'
                }).then(resp => {
                    // La redimensión de la imagen se asigna a  ctx.form.newImageFile
                    console.log('resp 22', resp)
                    ctx.form.newImageFile = resp
                }).catch(error => {
                    // Error
                    console.log('error redimensionando', error)
                })
          }
      },
      /**
       * uploadSelectedFile: Permitirá subir a Spaces el archivo seleccionado 
       * y colocar la url en la variable local
      */
      async uploadSelectedFile(){
        /**Variables generales:
         * urlSufix: Sufijo del archivo, define la ubicación final del archivo en Spaces
        */
        console.log('uploadSelectedFile')
        const urlSufix = 'news/'+ this.form.target +'/'
        //Declaramos y seteamos el formData con el archivo
        var formData = new FormData();
        formData.append('file',this.form.newImageFile)
        console.log('formadata', formData)
        //Subimos el archivo al servidor web 
        var url = 'uploadAttachment?fileName=' + this.form.newFileName + '&urlSufix=' + urlSufix 
        //Usamos el método fetch para consultar el servicio con opciones especiales
        await fetch(url, {
          method:'POST',
          body: formData
        })
        .then(async (response) => {
          console.log('response uploadSelectedFile ', response)
          if(response.ok) {
            await response.json().then(data => {
              if(data.error){
                console.log('error del back: ', data.error)
              }else{
                console.log('Se subió exitosamente: ', data.generatedUrl)
                this.form.newFileUrl = data.generatedUrl
              }
            }).catch((error)=>{console.log('Error: ', error)})
          }else{
            console.log('No ok')
          }
        }).catch((error)=>{console.log('Error: ', error)})
      },

      showDeleteModal(item) {
        this.formType = "DELETE";
        this.form = _.cloneDeep(item);
      },

      setForm(item) {
        console.log('entré a setForm')
        this.form = _.cloneDeep(item);
      },
      
      showAddModal() {
        this.limpiarForm()
        this.formType = "ADD";
        this.$refs.title.dataInput();
        this.$refs.content.dataInput();
        this.value = null;
      },
      limpiarForm() {
        this.form.title="";
        this.form.content="";
        this.form.target="";
        this.form.size="";
        this.form.newImageFile="";
        this.form.newFileName="";
        this.form.newFileUrl="";
        this.tempFileName="";
        this.form.attachment=null;
      },
      
      async refreshData(response){
        this.$refs.mowiMaster.setInitialData(response)
      },
      async showEditModal(item) {
        this.formType = "EDIT";
        this.form = _.cloneDeep(item);
        this.news = (this.form.news||[]);
      }
    }
  }
</script>


