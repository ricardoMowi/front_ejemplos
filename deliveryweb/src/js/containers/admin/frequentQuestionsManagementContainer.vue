<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Preguntas</h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar Pregunta 
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <MasterTemplate
            :filters="propsNews.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getQuestions"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsNews.customActions"  
            :data="this.questions"
            :tableTitle="titleTable"
            :showSearchSection="this.showSearchSection"
            :searchOptionTableMaf="this.searchOptionTableMaf"
          ref="mowiMaster"/>

        </div>
      </div>

      <!-- Modal  -->
      <div id="mainModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Nueva Pregunta</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar Pregunta</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf textArea="textArea" v-model="form.question" :valueInput='form.question'
                      label="Pregunta: (*)" :validation="{required:true}" nameInput="question" etiqueta='true' ref="question"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf textArea="textArea" v-model="form.answer" :valueInput='form.answer'
                      label="Respuesta: (*)" :validation="{required:false}" nameInput="answer" etiqueta='true' ref="answer"/>
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
                <div v-if="formType=='EDIT'" class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado</label>
                    <div class="col-md-7 col-sm-6 col-xs-12 ">
                         <button v-if="this.form.published == true" class="btn btn-primary">Publicado</button>
                         <button v-else type="button"  class="btn btn-secondary">Oculto</button>
                    </div>
                  </div>
                </div>       
              </div>
              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button v-if="formType=='ADD'" @click="createQuestion()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateQuestion()" type="button" class="btn btn-primary">Guardar</button>
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
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar Pregunta</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar la Pregunta? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="deleteQuestion()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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
              <h5 class="modal-title" id="exampleModalCenterTitle">Publicar Pregunta</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea publicar esta Pregunta?
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="publishQuestion()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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
              <h5 class="modal-title" id="exampleModalCenterTitle">Ocultar Pregunta</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea ocultar esta Pregunta?
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

  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  const uuidv1 = require('uuid/v1');

  export default {
      name: "usersContainer",
      components: {
        LoadingComponent,
        inputMaf,
        SearchComponent,
        MasterTemplate, 
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
          questions: [],
          countries: [],
          client: {},
          propsNews: {
            filters: [            
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
          showSearchSection: true,  
          searchOptionTableMaf: false,
          tempFileName: '',
          titleTable:'',
      }),
      
      async created () {
        var ctx = this;
        this.questions = await this.getQuestions()
        this.setHeadTable();
        this.$refs.mowiMaster.setInitialData(this.questions)
  		},
      
      methods: {

        setHeadTable() {
          this.colum = [
              {name:'question', label: 'Pregunta', find:1, sort:1},
              {name:'answer', label: 'Respuesta', find:1, sort:1},
              {name:'target', label: 'Público objetivo', find:1, sort:1},
              {name:'published', label: 'Estado de publicación', find:1, sort:1},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(questions){  
          var ctx = this;
          var formattedQuestions = [];
          questions.forEach(item => {
            var question = {};
            question.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                    <a class="dropdown-item" onClick={()=>ctx.showDeleteModal(item)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a>
                    { item.published == true ? <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-unpublish">Ocultar</a>
                    :
                    <a class="dropdown-item" onClick={()=>ctx.setForm(item)} data-toggle="modal" data-target=".bs-example-modal-publish">Publicar</a>
                    }
                  </div>
                </div>
              </div>
            );
            question.question = item.question;
            question.answer = item.answer;
            if(item.target){
              question.target = item.target == "CLIENT" ? 'Clientes' : 'Riders';
            }else{
              question.target = '-'
            }
            if(item.published == true){
              question.published = 'Publicado'
            }else{
              question.published = 'Oculto'
            }
            formattedQuestions.push(question);
          }); 
          return formattedQuestions
        },
        /**
        *  La función getQuestions() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getQuestions(filters) {
          console.log('filteeeeeeeeeeeeeers',filters )
          var look =[]
          if(filters != null || filters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var target  =_.filter(filters,{'name':'target'});
              /**obtener los valores y agregarlos en el objeto filter */
              target.length > 0 ?  filter.target = target[0].value : null

              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              var result = await consultServices('searchQuestions','POST',filter);  
              look = result.questions
          }else{
              look = await consultServices('listQuestions','POST',{});   
          }
          
          // /**retornar el nuevo arreglo */
          return look
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },
        async publishQuestion() {
          this.isLoading=true;
          var question = {}
          question._id = this.form._id;
          question.publishQuestion = true;
          const response0 = await consultServices('publishQuestion','POST',question);
          this.isLoading=false;
          if(response0.status == 400){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La noticia fue publicada.";
            const response = await consultServices('listQuestions','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion()
        },

        async unPublishNewRecord() {
          this.isLoading=true;
          var question = {}
          question._id = this.form._id;
          question.publishQuestion = false;
          const response0 = await consultServices('publishQuestion','POST',question);
          this.isLoading=false;
          if(response0.message || response0.error){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La noticia fue ocultada.";
            const response = await consultServices('listQuestions','POST',{});
            this.refreshData(response);
          }
          this.showNotificacion()
        },
        /**
         * updateQuestion: Valida y actualiza la Pregunta
        */
        async updateQuestion() {
          console.log('updateQuestion', this.form)
          //Mostramos la pantalla de cargando
          this.isLoading=true;
          //Validamos campos obligatorios
          if(this.form.question && this.form.target && this.form.questions != ""  ){
            
            //Creamos objeto
            var newRecord = {}
            newRecord._id = this.form._id;
            newRecord.question = this.form.question;
            newRecord.target = this.form.target
            newRecord.answer = this.form.answer ? newRecord.answer = this.form.answer : null

            
            const questionUpdated = await consultServices('updateQuestion','POST',newRecord);
            if(questionUpdated.status == 400){
              this.formNot.title="Error en operación";
              this.formNot.message=newRecordUpdated.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos de la Pregunta de manera correcta";  
              this.clearForm();
              $('.modal').modal('hide');
               const response = await consultServices('listQuestions','POST',{});
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
       * createQuestion: Valida y registra una nueva pregunta
      */
      async createQuestion() {
          //Mostramos la pantalla de cargando
          this.isLoading = true;
          //Validamos campos obligatorios
          if(this.form.question && this.form.target && this.form.questions != ""  ){

           
              //Creamos objeto a registrar
              var newQuestion = {}
              newQuestion.question = this.form.question;
              newQuestion.answer = this.form.answer
              newQuestion.target = this.form.target

              const response0 = await consultServices('createQuestion','POST',newQuestion);         
              console.log('respuesta del back: ', response0)
              if(response0.status == 400){
                this.formNot.title="No fue posible realizar el registro";
                this.formNot.message=response0.message;  
              }else{
                this.formNot.title="Operación exitosa";
                this.formNot.message="La pregunta se registró de forma exitosa.";  
                this.clearForm();
                $('.modal').modal('hide');
                const response = await consultServices('listQuestions','POST',{});
                this.refreshData(response);
              }

          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
      },
        
      async deleteQuestion() {
        this.isLoading=true;
        var question = {}
        question._id = this.form._id;
        question.active = false;
        const response0 = await consultServices('updateQuestion','POST',question);
        this.isLoading=false;
        if(response0.status == 400){
          this.formNot.title="La operación no fue posible.";
          this.formNot.message=response0.message;
        }else{
          this.formNot.title="Operación exitosa";
          this.formNot.message="La Pregunta fue eliminada";
          const response = await consultServices('listQuestions','POST',{});
          this.refreshData(response);
        }
        this.showNotificacion();
      },
        

      showDeleteModal(item) {
        this.formType = "DELETE";
        this.form = _.cloneDeep(item);
      },

      setForm(item) {
        console.log('entré a setForm')
        this.form = _.cloneDeep(item);
      },
      
      async showAddModal() {        
        this.formType = "ADD";
        this.clearForm()
      },

      async clearForm() {
        this.form.answer="";
        this.form.question="";
        this.form.target="";
        await this.$refs.answer.clearValue();
        await this.$refs.question.clearValue();
      },      

      async refreshData(response){
        this.$refs.mowiMaster.setInitialData(response)
      },

      async showEditModal(item) {
        console.log('Mira item', item)
        this.formType = "EDIT";
        this.form = _.cloneDeep(item);
        this.questions = (this.form.questions||[]);
      }
    }
  }
</script>
