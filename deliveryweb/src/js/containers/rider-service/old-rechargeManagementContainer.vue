<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Recargas</h2>
          <div class="nav navbar-right panel_toolbox">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar usuario
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">

          <div class="x_content">
                 <TableMaf :header="colum" :data="users" tableTitle="Recargas" ref="tableMaf"></TableMaf>
         </div>

        </div>
      </div>

      <!-- Modal  -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar usuario</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar usuario</h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
              </div>
              <h5>(*) Campos obligatorios</h5>

              <div class="modal-body">
                <div class="form-horizontal form-label-left">
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                     <inputMaf type="text" v-model="form.identificationCard" :valueInput='form.identificationCard'
                        label="Cédula: (*)" :validation="{required:true, min:6}" nameInput="document" etiqueta='true' ref="identificationCard">
                     </inputMaf>                      
                   </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type='text' v-model="form.name"  :valueInput='form.name' label="Nombre: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="inputName">
                      </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type="text" v-model="form.surName" :valueInput='form.surName' label="Apellido paterno: (*)" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="inputSurName">
                      </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type="text" v-model="form.lastName" :valueInput='form.lastName' label="Apellido materno:" :validation="{required:true, alpha_spaces:true}" nameInput="name"  etiqueta='true' ref="inputLastName">
                      </inputMaf>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <inputMaf type="text" v-model="form.email"  :valueInput='form.email' label="Correo electrónico: (*)" :validation="{required:false, email:true}" nameInput="email" etiqueta='true' ref="inputEmail">
                      </inputMaf>
                    </div>
                  </div>

                  <div class="form-group" v-if="formType=='ADD'">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Contraseña:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input  v-model="form.password" type="password" id="password" required="required" class="form-control col-md-7 col-xs-12">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <inputMaf type="text"  v-model="form.phone" :valueInput='form.phone' label="Teléfono:" :validation="{required:true, numeric:true}" nameInput="phone"  etiqueta='true' ref="inputNumber">
                        </inputMaf>
                    </div>
                  </div>

                  <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">País:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" v-model="form.countryCode" >
                                <option disabled="disabled" value="">Seleccione</option>
                                <option v-for="country in countries" :value="country.countryCode">{{country.name}}</option>
                            </select>
                        </div>
                  </div>

                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Roles:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <treeselect v-model="value"
                       :multiple="true"
                       :options="options" />
                    </div>
                  </div>

                  <!--Seccion clientes-->

                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Clientes:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <SearchComponent v-model="client" value="client" service="listClients" displayNameKey="businessName"></SearchComponent>
                      </div>
                      <button type="button" @click="createClient()" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar cliente
                      </button>
                    </div>

                    <div class="modal-body">
                      <div class="card-body">
                          <div class="table-responsive">
                              <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                                  <thead>
                                      <tr >
                                          <th style="width: 20px;">#</th>
                                          <th style="width: 20px;">Cliente</th>
                                          <th style="width: 20px;">Accion</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(item,index) in clients" >
                                          <th style="width: 20px;">Cliente {{index+1}} </th>
                                          <th style="width: 20px;">{{item.client.businessName}}</th>
                                          <th style="width: 20px;"><button @click="deleteClient(index)" type="button" class="btn btn-danger btn-xs" > Eliminar </button> </th>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>

                      </div>
                    </div>

                  <div class="card-body">
                    <div class="form-group" v-if="formType=='EDIT'">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado: </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <button v-if="form.statusCode==0" type="button" class="btn btn-dark btn-xs">{{form.statusDescription}} </button>
                        <button v-if="form.statusCode==1" type="button" class="btn btn-success btn-xs">{{form.statusDescription}} </button>
                        <button v-if="form.statusCode==2" type="button" class="btn btn-warning btn-xs"> {{form.statusDescription}} </button>
                        <button v-if="form.statusCode==3" type="button" class="btn btn-info btn-xs">{{form.statusDescription}}</button>
                      </div>
                    </div>
                    <div class="form-group" v-if="formType=='EDIT'">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                      <div class="col-md-6 col-sm-6 col-xs-12 ">
                            <button @click="toActive()" v-if="form.statusCode==0" class="btn btn-success" style="margin-bottom: 5px;" type="button">Aprobar Usuario</button>
                            <button @click="toInactive()" v-if="form.statusCode==1" class="btn btn-warning" style="margin-bottom: 5px;" type="button">Inactivar Usuario</button>
                            <button @click="toActive()" v-if="form.statusCode==2" class="btn btn-success" style="margin-bottom: 5px;" type="button">Activar Usuario</button>
                            <button @click="resetPassword()" class="btn btn-danger" style="margin-bottom: 5px;" type="reset">Restaurar Contraseña</button>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="formType=='ADD'" @click="createUser()" type="button" class="btn btn-primary">Aceptar</button>
                  <button v-if="formType=='EDIT'" @click="updateUser()" type="button" class="btn btn-primary">Aceptar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!--Modal Borrar-->
        <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
                  <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al usuario : {{form.name}} {{form.surName}} {{form.lastName}}? </center> </h3>
              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteUser()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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

                  <h3 class="modal-title" > <center> {{formNot.title}}  </center> </h3>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.message}} </center> </h4></div>
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
  import consultServices from './../../utilities/consultServices.js'; //consulta servicios
  import Treeselect from '@riophae/vue-treeselect';
  import TableMaf from "./../../components/tableMaf.vue";
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import SearchComponent from "./../../components/searcherComponent.vue";  
  import inputMaf from "./../../components/inputMaf.vue";
  const uuidv1 = require('uuid/v1');

  const TableQQ = ({ props }) => {
    var qq = props.data
    return _.map(qq,(item)=>(
      <div>{item.iniButton}{item.name}</div>
    ))
  }
  export default {
      name: "usersContainer",
      components: {
      LoadingComponent,
      Treeselect,
      TableMaf,
      inputMaf,
      SearchComponent,
      },
      data: () => ({
          isLoading: false,
          users: [],
          form: { email:''},
          formType: '',
          formNot:{title:'',message:'',},
          value: null,
          options: [],
          colum:[],
          clients: [],
          countries: [],
          client: {},
      }),
      created () {
        var ctx = this;
        this.setHeadTable();
        this.listUsers();
        this.listCountries();

  		},
      methods: {
        async listCountries(){
          this.isLoading = true;
          const response = await consultServices('listCountries','POST',{});
          this.countries = response;
          this.isLoading = false;
        },
        createClient() {
          this.isLoading = true;
          if(_.isEmpty(this.client) == true) {
            alert("Tienes que seleccionar un cliente");
          } else {
            var form = {
              clientCodeList: uuidv1(),
              client: this.client
            }
            var isRepeated = false;
             _.map(this.clients,(item)=>{
               if(item.client.businessName == form.client.businessName) {
                 isRepeated = true;
               }
             })
            if(isRepeated == false) {
              this.clients.push(form);
              this.client = {}
            } else {
              alert("El cliente ya se encuentra asignado, favor seleccionar otro");
            }
            
          }
          this.isLoading = false;
        },
        deleteClient(index) {
          var retVal = confirm("Seguro que desea eliminar material, no podrá recuperarlo");
          var index=index;
          var listAux = _.cloneDeep(this.clients);
          var listResponse = [];
          if( retVal == true ) {
                this.isLoading = true;
                for(var i = 0; i < listAux.length; i++ ) {
                  var client = listAux[i];
                  if(i != index) {
                    listResponse = _.concat(listResponse, client)
                  }
                }
                this.clients = listResponse;
                this.isLoading = false;
            } else {
                return false;
            }
        },
        setHeadTable() {
            this.colum = [
                {name:'editButton', label: ' ', find:0, sort:0},
                {name:'identificationCard', label: 'Cedula', find:1, sort:1},
                {name:'name', label: 'Nombres', find:1, sort:1},
                {name:'lastName', label: 'Apellidos', find:1, sort:1},
                {name:'email', label: 'Correo', find:1, sort:1},
                {name:'phone', label: 'Teléfono', find:1, sort:1},
                {name:'roles', label: 'Roles', find:1, sort:1},
                {name:'statusDescription', label: 'Estado', find:1, sort:1},],
            this.titleTable = "Recargas ";
        },
        codeRoleToName (codeName) {
          let i = _.findIndex(this.options,function(o) { return o.id == codeName; });
          if(i>=0){
            return this.options[i].label;
          }else{
            return codeName;
          }

        },
        arrayCodeRolesToName (arrayCodeRoles) {
          let text = '';
          if(this.options != []){
            _.map(arrayCodeRoles,(codeRole,i)=>{
              console.log(codeRole);
              console.log(this.codeRoleToName(codeRole));
              text += this.codeRoleToName(codeRole)
              text += (arrayCodeRoles.length==i+1)?'':', ';
              console.log(text);
            })
          }
          return text;
        },
        async shownotificacion(isSucces=true)
        {
          this.formNot.title==isSucces?'Operación exitosa':'Error'
          $('.bs-example-modal-not').modal('show');
        },
        async listUsers() {
          this.isLoading=true;
          
          const response = await consultServices('listUsers','POST',{});     

          this.refreshData(response);     
          $('.modal').modal('hide');

          this.isLoading=false;
        },
        async updateUser() {
           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           form.roles = this.value;
           form.fullName = (this.form.name || '') + ' ' + (this.form.surName || '') + ' ' + (this.form.lastName || '');
           form.clients = this.clients;
           if(!this.form.identificationCard||!this.form.name||!this.form.surName || !this.form.email){this.formNot.message="Por favor complete los campos obligatorios";this.formNot.title="Campos incompletos"}
            else{
           const response0 = await consultServices('updateUser','POST',form);
           const response = await consultServices('listUsers','POST',{});
           this.refreshData(response);
           this.limpiarForm();
           $('.modal').modal('hide');
           this.formNot.title="Operación exitosa";
           this.formNot.message="Se actualizaron los datos del usuario de manera correcta";
            }
           this.isLoading=false;
           this.shownotificacion();
        },
        validar(){
            if(this.$refs.identificationCard.returnValidation() == false || this.$refs.inputName.returnValidation() == false|| this.$refs.inputSurName.returnValidation() == false){
              return false;
            }else{return true;}
        },
        async createUser() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);            
            form.roles = this.value;
            form.fullName = (this.form.name || '') + ' ' + (this.form.surName || '') + ' ' + (this.form.lastName || '');
            form.clients = this.clients;
            if(this.validar()==false || !this.form.email){this.formNot.message="Por favor complete los campos obligatorios";this.formNot.title="Campos incompletos"}
            else{
            const response0 = await consultServices('createUser','POST',form);
            const response = await consultServices('listUsers','POST',{});
           
            this.refreshData(response);
           
            $('.modal').modal('hide');
            this.formNot.title="Operación exitosa";
            this.formNot.message="Se ha registardo con éxito un nuevo usuario";
            if(response0.code || response0.error){
              this.formNot.message=response0.message;}
            
            }
            this.isLoading=false;
            this.shownotificacion();
        },
        async deleteUser() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            form.roles = this.value;
            const response0 = await consultServices('deleteUser','POST',form);
            const response = await consultServices('listUsers','POST',{});
            this.users=response;
            this.isLoading=false;
            this.formNot.title="Operación exitosa";
            this.formNot.message="El usuario seleccionado está inactivo";
            if(response0.code || response0.error){
              this.formNot.title="Error en la operación";
              this.formNot.message=response0.message;
              this.shownotificacion(false);
            }else{
              this.shownotificacion();
            }
        },
        showDeleteModal(item) {
            this.formType = "DELETE";
            this.form = _.cloneDeep(item);
        },
        showAddModal() {
           this.formType = "ADD";
           this.form ={
             countryCode:""
           };
           this.$refs.identificationCard.dataInput();
           this.$refs.inputName.dataInput();
           this.$refs.inputSurName.dataInput();
           this.$refs.inputLastName.dataInput();
           this.$refs.inputEmail.dataInput();
           this.$refs.inputNumber.dataInput();
           this.clients = [];
           this.value = null;
        },
        limpiarForm()
        {
          this.form.identificationCard="";
          this.form.name="";
          this.form.surName="";
          this.form.lastName="";
          this.form.email="";
          this.form.phone="";
        },
        async toActive() {
           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           form.status=1;
           const response0 = await consultServices('userToActive','POST',form);
           const response = await consultServices('listUsers','POST',{});
           this.refreshData(response);
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.title="Operación exitosa";
           this.formNot.message="Se actualizó el estado del usuario de manera correcta";
           this.shownotificacion();
        },
        async toInactive() {
           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           form.status=2;
           const response0 = await consultServices('userToInactive','POST',form);
           const response = await consultServices('listUsers','POST',{});
           this.refreshData(response);
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.title="Operación exitosa";
           this.formNot.message="Se actualizó el estado del usuario de manera correcta";
           this.shownotificacion();
        },
        async resetPassword() {
           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           form.userId=form._id;
           const response0 = await consultServices('resetPassword','POST',form);
           const response = await consultServices('listUsers','POST',{});
           this.users = response;
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.title="Operación exitosa";
           this.formNot.message="Se restauro la contraseña del usuario de manera correcta";
           if(response0.code || response0.error){
             this.formNot.title="Error en la operación";
             this.formNot.message=response0.message;
             this.shownotificacion(false)
           }else{
             this.shownotificacion();
           }
        },
        async refreshData(response){
          var ctx = this;
          const roles = await consultServices('listRoles','POST',{});
          ///////////////
          this.roles= roles;
          this.options =  _.map(roles,(role)=>{
            return {
              id: role.roleCode,
              label: role.name
            }
          })

         
           this.users = _.map(response,(item)=>{
            let user = {};
            user.iniButton = ({ props }) => <p>pinche</p>;
            user.identificationCard = item.identificationCard;
            user.name = item.name; 
            user.lastName = (item.surName||"")+ " " + (item.lastName||"");  
            user.email = item.email;  
            user.phone = item.phone; 
            user.roles = this.arrayCodeRolesToName(item.roles) ;

            user.statusDescription = <font style="vertical-align: inherit;">
                        {item.statusCode==0?<button type="button" class="btn btn-dark btn-xs">{item.statusDescription} </button>:null}
                        {item.statusCode==1?<button type="button" class="btn btn-success btn-xs">{item.statusDescription} </button>:null}
                        {item.statusCode==2?<button type="button" class="btn btn-warning btn-xs"> {item.statusDescription} </button>:null}
                        {item.statusCode==3?<button type="button" class="btn btn-info btn-xs"> {item.statusDescription} </button>:null}
            </font>;         

            user.editButton = <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> <a onClick={()=>ctx.showEditModal(item)} data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-warning btn-xs"><i class="fa fa-pencil"></i></a></font></font>;
          

            
            return user;

          })
                this.$refs.tableMaf.formatData(this.users);
         },
        async showEditModal(item) {
           this.formType = "EDIT";
           this.form = _.cloneDeep(item);
           this.value = this.form.roles;
           this.clients = (this.form.clients||[]);
         },
      }
  }
</script>
