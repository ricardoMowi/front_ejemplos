<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <!-- <h2>Historial de talleres</h2> -->
          <!-- <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar taller
            </button>
          </div> -->
          <div class="clearfix"></div>
        </div>
        <img src="https://intranet.creamas.org/LogoCrea.png" style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;" width="150" height="150" >
        <div class="x_content">
          <nav data-v-49ef1a4a="" class="breadcrumb">
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="filterCategory('WORKSHOP_ARTISTIC')"  class="link" style="margin-left: 5px;margin-right: 5px;"> Artísticos ({{ artisticsCount }})  </a>|
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="filterCategory('WORKSHOP_PHYSICAL')"  class="link" style="margin-left: 5px;margin-right: 5px;"> Motrices ({{ physicalsCount }})  </a>|
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="filterCategory('WORKSHOP_COGNITIVE')"  class="link" style="margin-left: 5px;margin-right: 5px;"> Cognitivos ({{ cognitivesCount }})  </a>|
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="filterCategory('WORKSHOP_SOCIAL')"  class="link" style="margin-left: 5px;margin-right: 5px;"> Socio personales ({{ socialsCount }})  </a>|
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="filterType('WORKSHOP_CUSTOM')"  class="link" style="margin-left: 5px;margin-right: 5px;">Talleres  ({{customCount}})  </a>|
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="filterType('WORKSHOP_MATH')"  class="link" style="margin-left: 5px;margin-right: 5px;"> Divertimate ({{ mathCount }})  </a>|
            <a data-v-49ef1a4a="" href="javascript:void(0)" v-on:click="showAll()"  class="link" style="margin-left: 5px;margin-right: 5px;"> Todos ({{ totalCount }})  </a>
          </nav>
          <MasterTemplate  
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getWorkshops"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsWorkshops.customActions"  
            :data="this.workshops"
            :tableTitle="titleTable"
            :showSearchSection="false"
            :tableSearch="true"
          ref="mowiMaster"/>

        </div>
      </div>

      <!-- Modal  -->
      <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Nuevo taller</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar taller</h3>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
            </div>
            <!-- <h5>(*) Campos obligatorios</h5> -->

            <div class="modal-body">
              <div class="form-horizontal form-label-left">
                <div  v-if="formType=='ADD'" class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf type='text' v-model="form.documentNumber"  :valueInput='form.documentNumber' label="Documento de identidad: (*)" :validation="{required:true, alpha_num:true, max:60}" nameInput="documentNumber"  etiqueta='true' ref="inputDocument"/>           
                  </div>                 
                </div>

                <div  v-if="formType=='EDIT'" class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento de identidad: (*)</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" v-model="form.documentNumber" required="required" class="form-control col-md-7 col-xs-12" readonly="readonly">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Cantidad de años como creando activo:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="number"  v-model="form.totalYears" class="form-control col-md-7 col-xs-12" min="0" max="100">
                    </div>
                </div>  

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <inputMaf textArea="textArea" v-model="form.yearsDetail" :valueInput='form.yearsDetail'
                      label="Detalle de años : " :validation="{required:false}" nameInput="content" etiqueta='true' ref="content"/>
                  </div>
                </div>        

                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Rol: </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="form.roleCode"  @change="onChangeRole()" >
                          <option disabled="disabled" value="">Selecciona un rol</option>
                          <option v-for="item in roles" v-bind:value="item.code" >
                          {{item.displayValue}}
                          </option>
                          </select>
                      </div>
                  </div>
                </div>

                <div class="form-group" v-if="otherFlag==true ">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Ingrese otro rol:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" v-model="form.roleDetail" required="required" class="form-control col-md-7 col-xs-12">
                    </div>
                </div>


                
                <div class="form-group">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Equipo: </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" v-model="form.idTeam">
                          <option disabled="disabled" value="">Selecciona un equipo</option>
                          <option v-for="item in teams" v-bind:value="item.id" >
                          {{item.name}}
                          </option>
                          </select>
                      </div>
                  </div>
                </div>
                
              </div>
              <div class="modal-footer">
                <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                <button v-if="formType=='ADD'" @click="createWorkshop()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateWorkshop()" type="button" class="btn btn-primary">Guardar</button>
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
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar taller</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar al taller? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="deleteWorkshop()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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
  import _ from 'lodash';

  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import inputMaf from "./../../components/inputMaf.vue";

  //import "core-js/stable";
  import "regenerator-runtime/runtime";

  const uuidv1 = require('uuid/v1');

  export default {
    name: "workshopsHistoryContainer",
    components: {
      LoadingComponent,
      inputMaf,
      MasterTemplate, 
    },
    data: () => ({
      totalCount:0,
      customCount: 0,
      mathCount: 0,
      artisticsCount: 0,
      physicalsCount: 0,
      cognitivesCount: 0,
      socialsCount: 0,
      isLoading: false,
      form: {},
      formType: '',
      formNot:{title:'',message:'',},
      value: null,
      colum:[],
      workshops: [],
      semester:{},
      propsWorkshops: {
        // filters: [              
        //   {
        //     name:'volunteer',
        //     filterType:'inputComponent',
        //     type:"text",
        //     valueInput: "",
        //     etiqueta: true,
        //     label: "Creando",              
        //     validation:{required:true, min:3},
        //     callbackData:"",
        //     textArea:false,
        //     operators:true,
        //     selectField:true,
        //     isRequired :false,        
        //   },
        //   {
        //     name:'team',
        //     filterType:'listComponent',
        //     label: "Equipo",
        //     selectedValue:"",      
        //     value:'', 
        //     isVisible:true,          
        //     content: [
        //     ],
        //     operators:false,
        //     selectField:true,
        //     isRequired :false,
        //   },
        //   {
        //     name:'role',
        //     filterType:'listComponent',
        //     label: "Rol",
        //     selectedValue:"",      
        //     value:'', 
        //     isVisible:true,          
        //     content: [      
        //       {
        //         value: "Enviado",
        //         label: "Orden enviada"
        //       } ,
        //       {
        //         value: "Enviado 2",
        //         label: "Orden enviada 2"
        //       }           
        //     ],
        //     operators:false,
        //     selectField:true,
        //     isRequired :false,
        //   },   
        // ],
      },
      useMassiveSelector:false,
      titleTable: '',
      roles:[],
      teams:[],
      otherFlag : false,
    }),
    
    async created () {
      this.isLoading = true
      var ctx = this;
      await this.getSessionStorage();

      //Cargar array workshops
      this.workshops = await this.getWorkshops()
      //Setear la cabecera de la tabla
      this.setHeadTable();
      //Poblar la tabla del componente Mowi
      this.$refs.mowiMaster.setInitialData(this.workshops)
      this.isLoading = false
    },
    
    methods: {
      /**
       * filterType: Permite filtrar la lista por tipo de workshop
      */
      filterType(code){
        let totalWorkshops = this.workshops
        let filterMathFlag = code == 'WORKSHOP_MATH'
        let filteredWorkshops = _.filter(totalWorkshops, (workshop) => {
          return filterMathFlag ? workshop.contentCode == null : workshop.contentCode != null
        })
        this.refreshData(filteredWorkshops);
      },
      /**
       * filterCategory: Permite filtrar la lista por categoría de workshop
      */
      filterCategory(code){
        let totalWorkshops = this.workshops
        let cognitiveFlag = code == 'WORKSHOP_COGNITIVE'
        let filteredWorkshops = _.filter(totalWorkshops, (workshop) => {
          return cognitiveFlag ? workshop.categoryCode == 'WORKSHOP_COGNITIVE_D' || workshop.categoryCode == 'WORKSHOP_COGNITIVE_M' : workshop.categoryCode == code;
        })
        this.refreshData(filteredWorkshops);
      },
      
      /**
       * showAll: Quita todos los filtros hechos
      */
      showAll(code){
        let totalWorkshops = this.workshops
        this.refreshData(this.workshops);
      },

      /**
       * getSessionStorage: Permite consultar todas las listas de valores necesarias para mostrar
       * los valores finales al usuario de diversos campos
      */
      async getSessionStorage(){
        /**
         * Variables:
         * ids: arreglo de ids de maestros que se irán acomulando
         * flags: indican si es necesario o no agregar un id de maestro al arrelgo para ser consultado
        */
        this.isLoading = true;
        var ids = [] ;
        var flagCategory = false; //id 17
        var flagContent = false; //id 13
        var flagType = false; //id 14
        var flagVolunteerCode = false; 
        var flagLevel = false; //id 10
        var flagGrade = false; //id 11
        var flagEvents = false;

        if(!window.sessionStorage.workshopGradeCode){
          ids.push(11);
          flagGrade = true;
        }
        if(!window.sessionStorage.workshopLevelCode){
          ids.push(10);
          flagLevel = true;
        }
        if(!window.sessionStorage.workshopContentCode){
          ids.push(13);
          flagContent = true;
        }          
        if(!window.sessionStorage.workshopTypeCode){
          ids.push(14);
          flagType = true;
        }   
        if(!window.sessionStorage.workshopCategories){
          ids.push(17);
          flagCategory = true;
        }             
        if(!window.sessionStorage.semester){
          const response = await consultServices('getCurrentSemester','POST', {});
          this.semester = response;
          window.sessionStorage.semester  = JSON.stringify(this.semester);
        }else{
          this.semester = JSON.parse( window.sessionStorage.semester );
        }

        if( ids.length > 0){
        //Hacer consulta única de masterValues
            var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
            //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
            if(flagGrade){
                this.grades = _.filter(arrayMasters, function(master) {return master.idMaster == 11; })
                window.sessionStorage.grades = JSON.stringify(this.grades);
            }    
            if(flagLevel){
                this.levels = _.filter(arrayMasters, function(master) {return master.idMaster == 10; })
                window.sessionStorage.levels = JSON.stringify(this.levels);
            }
            if(flagContent){
                this.contents = _.filter(arrayMasters, function(master) {return master.idMaster == 13; })
                window.sessionStorage.contents = JSON.stringify(this.contents);
            }    
            if(flagType){
                this.types = _.filter(arrayMasters, function(master) {return master.idMaster == 14; })
                window.sessionStorage.types = JSON.stringify(this.types);
            }                    
            if(flagCategory){
                this.categories = _.filter(arrayMasters, function(master) {return master.idMaster == 17; })
                window.sessionStorage.categories = JSON.stringify(this.categories);
            }
        };
        this.grades =JSON.parse( window.sessionStorage.grades );
        this.contents =JSON.parse( window.sessionStorage.contents );
        this.levels =JSON.parse( window.sessionStorage.levels );
        this.types =JSON.parse( window.sessionStorage.types );
        this.categories =JSON.parse( window.sessionStorage.categories );
        this.isLoading = false;
      },

      setHeadTable() {
        this.colum = [
          {name:'content', label: 'Taller', find:1, sort:1},
          {name:'level', label: 'Ciclo', find:1, sort:1},
          {name:'grade', label: 'Grado', find:1, sort:1},
          {name:'displayName', label: 'Tema', find:1, sort:1},
          {name:'url', label: 'Acciones', find:1, sort:1}]
        this.titleTable = "Historial de Talleres";
      },
      
      /**
      *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
      *  el formato es definido por el programador
      *  se envía al componente <MasterTemplate> en la propiedad setDataTable
      *  */ 
      setDataTable(workshops){  
        var ctx = this;
        var formattedWorkshops = [];

        _.map(workshops, (item)=> {
          var workshop = {};
          var content = _.filter(this.contents, function(o) { return o.code == item.contentCode; });
          var level = _.filter(this.levels, function(o) { return o.code == item.levelCode; });
          var grade = _.filter(this.grades, function(o) { return o.code == item.gradeCode; });
          var displayName = item.displayName;
          var url = item.url;
          workshop.url = <a href={url} target="_blank">Ver video</a>;
          workshop.content = content.length > 0 ? content[0].displayValue : 'Divertimate';
          workshop.level = level.length > 0 ? level[0].displayValue : '-';
          workshop.grade = grade.length > 0 ? grade[0].displayValue : '-';
          workshop.displayName = displayName;
          formattedWorkshops.push(workshop);
        })
        return formattedWorkshops
      },
      /**
      *  La función getWorkshops() es la encargada de la búsqueda de registros
      *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
      *  */ 
      async getWorkshops(filters) {
        // var look = await consultServices('getWorkshops','POST',{semesterCode: this.semester.id});   
        var workshops = await consultServices('getWorkshops','POST',{semesterCode: 202001});   //En duro porque queremos sólo del semestre indicado
        this.totalCount = workshops.length;
        this.customCount = _.sumBy(workshops, (w) => w.contentCode != null);
        this.mathCount = _.sumBy(workshops, (w) => w.contentCode == null);
        this.artisticsCount = _.sumBy(workshops, (w) => w.categoryCode == 'WORKSHOP_ARTISTIC');
        this.physicalsCount = _.sumBy(workshops, (w) => w.categoryCode == 'WORKSHOP_PHYSICAL');
        this.cognitivesCount = _.sumBy(workshops, (w) => w.categoryCode == 'WORKSHOP_COGNITIVE_M' || w.categoryCode == 'WORKSHOP_COGNITIVE_D');
        this.socialsCount = _.sumBy(workshops, (w) => w.categoryCode == 'WORKSHOP_SOCIAL');

        /**retornar el nuevo arreglo */
        return workshops
      },
      
      async showNotificacion(isSucces=true){
        $('.bs-example-modal-not').modal('show');
      },

      async updateWorkshop() {
        console.log('form ', this.form)

        this.isLoading=true;
        var workshop = {}
        workshop.id = this.form.id;
        workshop.idTeam = this.form.idTeam ? workshop.idTeam = this.form.idTeam: null ;
        workshop.roleCode = this.form.roleCode ? workshop.roleCode = this.form.roleCode: null ;
        workshop.roleDetail = this.form.roleDetail ? workshop.roleDetail = this.form.roleDetail: null ;
        workshop.totalYears = this.form.totalYears ? workshop.totalYears = this.form.totalYears: null ;
        workshop.yearsDetail = this.form.yearsDetail ? workshop.yearsDetail = this.form.yearsDetail: null ;

        if(workshop.id ){
          const updatedWorkshop = await consultServices('updateWorkshop','POST',workshop);
          if(updatedWorkshop.status == 200){
            this.formNot.title="Operación exitosa";
            this.formNot.message="Se actualizaron los datos de la taller de manera correcta";  
            this.limpiarForm();
            $('.modal').modal('hide');
              const response = await consultServices('getWorkshops','POST',{});
              this.refreshData(response);
          }else{
            this.formNot.title="Error en operación";
            this.formNot.message=creditUpdated.message;  
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }
        this.isLoading=false;
        this.showNotificacion();
      },
      
      async createWorkshop() {
        this.isLoading = true;
        var workshop = {}

        workshop.documentNumber = this.form.documentNumber;
        workshop.idTeam = this.form.idTeam ? workshop.idTeam = this.form.idTeam: null ;
        workshop.roleCode = this.form.roleCode ? workshop.roleCode = this.form.roleCode: null ;
        workshop.roleDetail = this.form.roleDetail ? workshop.roleDetail = this.form.roleDetail: null ;
        workshop.totalYears = this.form.totalYears ? workshop.totalYears = this.form.totalYears: null ;
        workshop.yearsDetail = this.form.yearsDetail ? workshop.yearsDetail = this.form.yearsDetail: null ;

        if(workshop.documentNumber){
          const response0 = await consultServices('createWorkshop','POST',workshop);     
          if(response0.status== 400){
            this.formNot.title="No fue posible realizar el registro";
            this.formNot.message=response0.message;  
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="El registro completo de forma exitosa.";  
            this.limpiarForm();
            $('.modal').modal('hide');
              const response = await consultServices('getWorkshops','POST',{});
              this.refreshData(response);
          }
        }else{
          this.formNot.message="Por favor complete los campos obligatorios";
          this.formNot.title="Campos incompletos"
        }
        this.isLoading=false;
        this.showNotificacion();
      },
      
      async deleteWorkshop() {
        this.isLoading=true;
        var workshop = {}
        workshop.id = this.form.id;
        const response0 = await consultServices('deleteWorkshop','POST',workshop);
        this.isLoading=false;
        if(response0.status == 400){
          this.formNot.title="La operación no fue posible.";
          this.formNot.message=response0.message;
        }else{
          this.formNot.title="Operación exitosa";
          this.formNot.message="La taller fue eliminada";
          const response = await consultServices('getWorkshops','POST',{});
          this.refreshData(response);
        }
        this.showNotificacion();
      },

      showDeleteModal(item) {
        this.formType = "DELETE";
        this.form = _.cloneDeep(item);
      },

      setForm(item) {
        this.form = _.cloneDeep(item);
      },
      
      showAddModal() {
          this.formType = "ADD";
          this.form = {};
          this.$refs.inputDocument ? this.$refs.inputDocument.clearValue() : null;
          this.$refs.content.dataInput();
          this.value = null;
      },
      
      limpiarForm() {
        //Para limpiar los campos que eusan inputMaf, primero validar que exista, luego invocar la prop clearValue()
        this.$refs.inputDocument ? this.$refs.inputDocument.clearValue() : null;
      },
      
      async refreshData(response){
        this.$refs.mowiMaster.setInitialData(response)
      },
      
      async showEditModal(item) {
        this.formType = "EDIT";
        this.form = _.cloneDeep(item);
        this.form.documentNumber = item.Volunteer.documentNumber
        this.form.role = item.roleCode
        this.workshops = (this.form.workshops||[]);
      },
    }
  }
</script>
