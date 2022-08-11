<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Participantes</h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar participante </button>
          </div>
          <div class="clearfix"></div>
        </div>
       
        <div class="x_content">
          <MasterTemplate
            :filters="propsParticipants.filters"     
            :setDataTable="this.setDataTable"
            :dataLoadFunction="this.getParticipants"
            :header="colum"
            :useMassiveSelector="useMassiveSelector"
            :customActions="propsParticipants.customActions"  
            :data="this.participants"
            :tableTitle="titleTable"
            :setContent="this.setContentListComponent"
            :showSearchSection="this.showSearchSection"
            :searchOptionTableMaf="this.searchOptionTableMaf"
          ref="mowiMaster"/>

        </div>

        <div class="nav navbar-right panel_toolbox">
            <button type="button"  @click="downloadRegister()" class="btn btn-primary btn-xs">Descargar consolidado </button>
        </div> 
      </div>

      <!-- Modal  -->
      <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Nuevo participante</h3>
              <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar participante</h3>
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
                <button v-if="formType=='ADD'" @click="createParticipant()" type="button" class="btn btn-primary">Confirmar</button>
                <button v-if="formType=='EDIT'" @click="updateParticipant()" type="button" class="btn btn-primary">Guardar</button>
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
              <h5 class="modal-title" id="exampleModalCenterTitle">Eliminar participación</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar al participante? Este cambio no se puede revertir.
            </div>
            <div class="modal-footer">
              <center>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                    <button @click="deleteParticipant()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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

  //import "core-js/stable";
  import "regenerator-runtime/runtime";

  const uuidv1 = require('uuid/v1');

  export default {
      name: "participationsContainer",
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
          participants: [],
          countries: [],
          client: {},
          propsParticipants: {
            filters: [              
              {
                name:'name',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Nombres",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false, 
                showOp: false,             
              },
              {
                name:'lastName',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "Apellidos",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,   
                showOp: false,           
              },
              {
                name:'dni',
                filterType:'inputComponent',
                type:"text",
                valueInput: "",
                etiqueta: true,
                label: "DNI",              
                validation:{required:false, min:3},
                callbackData:"",
                textArea:false,
                operators:true,
                selectField:true,
                isRequired :false,  
                showOp: false,            
              },
              {
                name:'team',
                filterType:'listComponent',
                label: "Equipo",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
                ],
                operators:false,
                selectField:true,
                isRequired :false,
                multipleSelection: false,
              },
              {
                name:'role',
                filterType:'listComponent',
                label: "Rol",
                selectedValue:"",      
                value:'', 
                isVisible:true,          
                content: [
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
          roles:[],
          teams:[],
          otherFlag : false,
          showSearchSection: true,  
          searchOptionTableMaf: false,
          arrayFormattedParticipants:[],
      }),
      
      async created () {
        this.isLoading = true
        var ctx = this;
        //Obtener los equipos y roles   
        this.teams = await consultServices('listTeams','POST',{}); 
        this.roles= await consultServices('getMasterValues','POST',{idMaster:29});
        //setear el contenido de los listComponents
        //await this.setContentListComponent(this.teams, this.roles)        
        //Cargar array participants
        this.participants = await this.getParticipants()
        //Setear la cabecera de la tabla
        this.setHeadTable();
        //Poblar la tabla del componente Mowi
        this.$refs.mowiMaster.setInitialData(this.participants)
        this.isLoading = false
  		},
      
      methods: {
        deleteClient(index) {
        },
        setHeadTable() {
          this.colum = [
              {name:'volunteer', label: 'Creando', find:1, sort:1},
              {name:'role', label: 'Rol', find:1, sort:1},
              {name:'team', label: 'Equipo', find:1, sort:1},
              {name:'totalYears', label: 'Total de años', find:1, sort:1},
              {name:'detailYears', label: 'Detalle de años', find:1, sort:1},
              {name:'actions', label: 'Acciones', find:0, sort:0},]
          this.titleTable = "Resultados";
        },
        /**
        *  La función setDataTable() es la encargada de darle el formato necesario al arreglo obtenido de la búsqueda
        *  el formato es definido por el programador
        *  se envía al componente <MasterTemplate> en la propiedad setDataTable
        *  */ 
        setDataTable(participants){  
          var ctx = this;
          var formattedParticipants = [];
          participants.forEach(item => {
            var participant = {};
            participant.actions = (
              <div class="d-flex justify-content-around">
                <div class="btn-group" role="group">
                  <button class="btn btn-secondary dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" onClick={()=>ctx.showEditModal(item)} data-toggle="modal" data-target=".bs-example-modal-lg">Editar</a>
                    <a class="dropdown-item" onClick={()=>ctx.showDeleteModal(item)} data-toggle="modal" data-target=".bs-example-modal-del">Eliminar</a>
                  </div>
                </div>
              </div>
            );
            var name = item.Volunteer.name
            var lastName = item.Volunteer.lastName
            var secondLastName = item.Volunteer.secondLastName ? secondLastName = item.Volunteer.secondLastName  : secondLastName = ''
            
            var role = this.roles.filter(function (role) { return role.code == item.roleCode; });
            var team = this.teams.filter(function (team) { return team.id == item.idTeam; });  

            participant.role =  (role.length > 0) ? role[0].displayValue : '';
            participant.team =  (team.length > 0) ? team[0].name : '';
            participant.volunteer = name + ' ' + lastName + ' ' + secondLastName;
            participant.totalYears = item.totalYears;
            participant.detailYears = item.yearsDetail;
            participants.documentNumber = item.Volunteer.documentNumber

            formattedParticipants.push(participant);
          }); 
          this.arrayFormattedParticipants = formattedParticipants
          return formattedParticipants
        },
        /**
        *  La función getParticipants() es la encargada de la búsqueda de registros
        *  se envía al componente <MasterTemplate> en la propiedad dataLoadFunction
        *  */ 
        async getParticipants(selectedFilters ) {
          console.log('filteeeeeeeeeeeeeers',selectedFilters )
          var look =[]
          if(selectedFilters != null || selectedFilters != undefined){
               /**variables declaradas para el funcionamiento de la función */
              var filter={}
              /**declarar acá los parámetros necesarios para el servicio a utilizar
               * se filtra el arreglo recibido (selectFilters) para obtener el atributo con el nombre deseado
               */
              var documentNumber  =_.filter(selectedFilters,{'name':'dni'});
              var role  =_.filter(selectedFilters,{'name':'role'});
              var team  =_.filter(selectedFilters,{'name':'team'});
              var name  =_.filter(selectedFilters,{'name':'name'}); 
              var lastName =_.filter(selectedFilters,{'name':'lastName'}); 
              /**obtener los valores y agregarlos en el objeto filter */
              documentNumber.length > 0 ?  filter.documentNumber = documentNumber[0].value : null
              role.length > 0 ?  filter.roleCode = role[0].value[0] : null
              /**Si no hay un valor para el filtro team, setear el campo filter.idTeam con el valor 'TEST'  */
              team.length > 0 ?  filter.idTeam = team[0].value : filter.idTeam = 'TEST' // null
              name.length > 0 ?  filter.name = name[0].value : null
              lastName.length > 0 ?  filter.lastName = lastName[0].value : null

              console.log('filter obtenido ', filter)
              look = await consultServices('searchSpecialEventParticipation','POST',filter);  
          }else{
              look = await consultServices('getSpecialEventParticipation','POST',{});   
          }
          // /**consultar servicio con el objeto filter  */
          // /**retornar el nuevo arreglo */
          return look
        },
        async showNotificacion(isSucces=true){
          $('.bs-example-modal-not').modal('show');
        },

        async updateParticipant() {
          console.log('form ', this.form)

          this.isLoading=true;
          var participant = {}
          participant.id = this.form.id;
          participant.idTeam = this.form.idTeam ? participant.idTeam = this.form.idTeam: null ;
          participant.roleCode = this.form.roleCode ? participant.roleCode = this.form.roleCode: null ;
          participant.roleDetail = this.form.roleDetail ? participant.roleDetail = this.form.roleDetail: null ;
          participant.totalYears = this.form.totalYears ? participant.totalYears = this.form.totalYears: null ;
          participant.yearsDetail = this.form.yearsDetail ? participant.yearsDetail = this.form.yearsDetail: null ;

          if(participant.id ){
            const participationUpdated = await consultServices('updateSpecialEventParticipation','POST',participant);
            if(participationUpdated.status == 200){
              this.formNot.title="Operación exitosa";
              this.formNot.message="Se actualizaron los datos de la participación de manera correcta";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('getSpecialEventParticipation','POST',{});
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
        
        async createParticipant() {
          this.isLoading = true;
          var participant = {}

          participant.documentNumber = this.form.documentNumber;
          participant.idTeam = this.form.idTeam ? participant.idTeam = this.form.idTeam: null ;
          participant.roleCode = this.form.roleCode ? participant.roleCode = this.form.roleCode: null ;
          participant.roleDetail = this.form.roleDetail ? participant.roleDetail = this.form.roleDetail: null ;
          participant.totalYears = this.form.totalYears ? participant.totalYears = this.form.totalYears: null ;
          participant.yearsDetail = this.form.yearsDetail ? participant.yearsDetail = this.form.yearsDetail: null ;

          if(participant.documentNumber){
            const response0 = await consultServices('createSpecialEventParticipation','POST',participant);     
            if(response0.status== 400){
              this.formNot.title="No fue posible realizar el registro";
              this.formNot.message=response0.message;  
            }else{
              this.formNot.title="Operación exitosa";
              this.formNot.message="El registro completo de forma exitosa.";  
              this.limpiarForm();
              $('.modal').modal('hide');
               const response = await consultServices('getSpecialEventParticipation','POST',{});
               this.refreshData(response);
            }
          }else{
            this.formNot.message="Por favor complete los campos obligatorios";
            this.formNot.title="Campos incompletos"
          }
          this.isLoading=false;
          this.showNotificacion();
        },
        
        async deleteParticipant() {
          this.isLoading=true;
          var participant = {}
          participant.id = this.form.id;
          const response0 = await consultServices('deleteSpecialEventParticipation','POST',participant);
          this.isLoading=false;
          if(response0.status == 400){
            this.formNot.title="La operación no fue posible.";
            this.formNot.message=response0.message;
          }else{
            this.formNot.title="Operación exitosa";
            this.formNot.message="La participación fue eliminada";
            const response = await consultServices('getSpecialEventParticipation','POST',{});
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
          //Para limpiar los campos que usan inputMaf, primero validar que exista, luego invocar la prop clearValue()
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
          this.participants = (this.form.participants||[]);
        },
        /**
         * onChangeRole() : al cambiar roles se debe validar si el usuario selecciona el 'Otros' para mostrar un campo más para el detalle de rol (roleDetail)
         */ 
        onChangeRole(){
            if(this.form.roleCode == 'ROLE_OTHER'){
            this.otherFlag=true;
            }
            else{                  
                this.otherFlag=false;
            }
        },
        /**
         * setContentListComponent() :   permite setear los valores de los atributos de propsTemplateManangerOrder
         */
        async setContentListComponent(teamArray, rolesArray){
            console.log('entroooooooo a setContentListComponent')
            //Variables útiles para actualizar el contenido de los listComponents de la sección de búsqueda
            var listTeams = []
            var listRoles = []
            //Poblar la propiedad content del listComponent para equipos en la búsqueda
            for (let index = 0; index < teamArray.length; index++) {
            var obj={}
            obj.value = teamArray[index].id
            obj.label = teamArray[index].name
            listTeams.push(obj)          
            }
            console.log("listeamssss::::::::::::", listTeams)
            await this.$refs.mowiMaster.setContentListComponent(listTeams, 'team')
            //Poblar la propiedad content del listComponent para roles en la búsqueda
            for (let index = 0; index < rolesArray.length; index++) {
            var obj={}
            obj.value = rolesArray[index].code
            obj.label = rolesArray[index].displayValue
            listRoles.push(obj)          
            }
            //this.propsParticipants.filters[2].content = listRoles 
            console.log("listRolessss::::::::::::", listRoles)            
            await this.$refs.mowiMaster.setContentListComponent(listRoles, 'role')  
        },

        /**
         * Sección para descargar consolidado
         * downloadRegister() : esta función llamará a la encargada de convertir el registro JSON a CSV
         */

        downloadRegister(){
          this.JSONToCSVConvertor(this.arrayFormattedParticipants, 'participants', true)
        },

        /**
         * JSONToCSVConvertor() : convierte el arreglo mostrado en la tabala en un archivo csv para su descarga
         * JSONData: Arreglo de jsons a convertir
         * ReporTitle: Título del reporte
         * ShowLabel: Booleano para determinar si se muestra la cabecera 
         */
        JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
            
            var arrData=[]
            for (let index = 0; index < JSONData.length; index++) {
                var obj={}
                obj.detalle_años = JSONData[index].detailYears == null ?  obj.detalle_años = "" : obj.detalle_años = JSONData[index].detailYears
                obj.rol = JSONData[index].role == null ?  obj.rol = "" : obj.rol = JSONData[index].role
                obj.equipo = JSONData[index].team == null ?  obj.equipo = "" : obj.equipo = JSONData[index].team
                obj.total_años = JSONData[index].totalYears == null ?  obj.total_años = "" : obj.total_años = JSONData[index].totalYears
                obj.voluntario = JSONData[index].volunteer == null ?  obj.voluntario = "" : obj.voluntario = JSONData[index].volunteer
                arrData.push(obj) 
            }

            var CSV = '';
            if (ShowLabel) {
                var row = "";
                for (var index in arrData[0]) {
                    row += index + ';';
                }
                row = row.slice(0, -1);
                CSV += row + '\r\n';
            }
            
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                for (var index in arrData[i]) {
                    if( index < arrData[i].length ){
                      row += '"' + arrData[i][index] + '"';
                    }else{
                      row += '"' + arrData[i][index] + '";';
                    }                    
                }
                row.slice(0, row.length - 1);
                CSV += row + '\r\n';
            }

            if (CSV == '') {        
                alert("Invalid data");
                return;
            }   
            
            //Generate a file name
            var fileName = "Report_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g,"_");   
            
            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
            
            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    
            
            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");    
            link.href = uri;
            
            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            
            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
      }
  }
</script>
