<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Sugerencias</h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <MasterTemplate
            :filters="propsSuggestions.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getSuggestions"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsSuggestions.customActions"  
            :data="this.suggestions"
            :flagUploadData="this.flagUploadData"
            :tableTitle="titleTable"
            :showSearchSection="this.showSearchSection"
            :searchOptionTableMaf="this.searchOptionTableMaf"
          ref="mowiMaster"/>

        </div>
      </div>



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
  import MasterTemplate from 'mowi-master'; //importar librería 
  import moment from "moment";
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
import { date } from '../../components/xlsx/jszip.js';
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
          formNot:{title:'',message:'',},
          options: [],
          colum:[],
          suggestions: [],
          propsSuggestions: {
            filters: [              
              {
                name:'nameClient',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombre del cliente",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,
                showOp: false,        
              },
              {
                name:'phoneClient',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Teléfono del cliente",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,
                showOp: false,        
              },
              {
                name:'status',
                filterType:'listComponent',
                label: "Estado de sugerencia",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
                  {
                    value:'ACTIVE',
                    label:'Activo'
                  },
                  {
                    value:'INACTIVE',
                    label:'Inactivo'
                  }
                ],
                operators:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              },  
              {
                name:'creationDate',
                filterType:'dateComponent',
                label: "Fecha de creación ",
                dateRange: {
                  start: moment().format('dddd, MMMM DD YYYY'),
                  end: moment().format('dddd, MMMM DD YYYY')
                },
                mode:"single",
                selectedDate:'',
                operators:false,
                selectField:true,
                isRequired :false,
              },       
            ],
          },
          useMassiveSelector:false,
          showSearchSection: true,  
          searchOptionTableMaf: false,
          flagUploadData: true,
          titleTable:'',

      }),
      
      async created () {
        var ctx = this;
        this.suggestions = await this.getSuggestions()
        this.setHeadTable();
        this.$refs.mowiMaster.setInitialData(this.suggestions)
        var dateString = moment.unix(1603376638).format("MM/DD/YYYY");
        console.log("fecha convertida ", dateString)     
        var test= moment(dateString).utcOffset('-0500');
        console.log('test', test)

  		},
      
      methods: {
        setHeadTable() {
          this.colum = [
              {name:'client', label: 'Cliente', find:1, sort:1},
              {name:'email', label: 'Correo del cliente', find:1, sort:1},
              {name:'phone', label: 'Teléfono del cliente', find:1, sort:1},
              {name:'content', label: 'Contenido', find:1, sort:1},
              {name:'status', label: 'Estado', find:1, sort:1},              
              {name:'creationDate', label: 'Fecha de creación', find:1, sort:1},
              ]
          this.titleTable = "Resultados";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(suggestions){  

          console.log('suggestionsssssssssssssssss ', suggestions)
          var ctx = this;
          var formattedSuggestions = [];
          suggestions.forEach(item => {
            var newRecord = {};
            var client= item.idClient
            newRecord.client = client.fullname;
            newRecord.email = client.email;
            newRecord.phone= client.phone;
            newRecord.content = item.content;
            var date = new Date(item.creationDate)
            date.toDateString() 
            newRecord.creationDate = date.getDate()+ '/'+(date.getMonth()+1)+'/'+date.getFullYear()
            if(item.status){
              item.status == 'NEW' ? newRecord.status = 'Nuevo' :  newRecord.status = 'Archivado'
            }
            

            formattedSuggestions.push(newRecord);
          }); 
          return formattedSuggestions
        },
        /**
        *  La función getSuggestions() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getSuggestions(filters) {

          var look =[]
          if(filters != null || filters != undefined){



               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var status  =_.filter(filters,{'name':'status'});
              var creationDate  =_.filter(filters,{'name':'creationDate'});
              var nameClient  =_.filter(filters,{'name':'nameClient'});
              var phoneClient  =_.filter(filters,{'name':'phoneClient'});
              /**obtener los valores y agregarlos en el objeto filter */
              if(status.length > 0){
                status[0].value == 'INACTIVE' ? filter.status=false :null
                status[0].value == 'ACTIVE' ? filter.status=true :null
              }
              //status.length > 0 ?  filter.status = status[0].value : null

              
              //creationDate.length > 0 ?  filter.creationDate = creationDate[0].value : null
              
              if(creationDate.length > 0){
                var dateString = moment.unix(1603376638).format("MM/DD/YYYY");
                console.log("fecha convertida ", dateString)     
                var test= moment(dateString).utcOffset('-0500');

                filter.creationDate = test
              }
              
              
              nameClient.length > 0 ?  filter.nameClient = nameClient[0].value : null
              phoneClient.length > 0 ?  filter.phoneClient = phoneClient[0].value : null
              // if(creationDate[0].value){
              //   var timestampToDate = new Date(creationDate[0].value).toLocaleDateString("en-US")
              //   filter.creationDate = timestampToDate
              // }
              console.log('filter obtenido ', filter)
              // /**consultar servicio con el objeto filter  */
              var response = await consultServices('searchSuggestions','POST',filter);  
              look = response.suggestions
          }else{
            console.log('entró a suggestions list')
            look = await consultServices('listSuggestions','POST',{});   
          }
          
          // /**retornar el nuevo arreglo */
          return look
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
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
           this.formType = "ADD";
           this.$refs.title.dataInput();
           this.$refs.content.dataInput();
          //  this.$refs.target.dataInput();
           this.value = null;
        },
        limpiarForm() {
          this.form.title="";
          this.form.content="";
          this.form.target="";
          this.form.size="";
        },
       
        async refreshData(response){
          this.$refs.mowiMaster.setInitialData(response)
        },
        async showEditModal(item) {
          this.formType = "EDIT";
          this.form = _.cloneDeep(item);
          this.suggestions = (this.form.suggestions||[]);
        }
      }
  }
</script>
