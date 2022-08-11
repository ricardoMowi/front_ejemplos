<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Roles y Cargos</h2>
          <div class="card-header-actions">
           <!--<button type="button" @click="showModalRole()" data-toggle="modal" data-target=".bs-example-modal-role" class="btn btn-success btn-xs"><i class="fa fa-check"></i> Asignar  roles a usuarios-->
            <!--</button>-->

          </div>
          <div class="clearfix"></div>
        </div>

        <div class="card-body">

          <!--Tabla Cargos-->
          <div class="card-header">
            <h2>Cargos</h2>
          <div class="card-header-actions">
            <button type="button" @click="showAddModal2()" data-toggle="modal" data-target=".bs-example-modal-carlg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar cargo
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
          <TableMaf :header="colum2" :data="appointments" :title="false"  ref="tableMaf2" >
                    </TableMaf>

          <!--Tabla Roles-->
          <div class="card-header">
            <h2>Roles</h2>
          <div class="card-header-actions">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar rol
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
            <TableMaf :header="colum" :data="roles" :title="false"  ref="tableMaf" >
                    </TableMaf>

        </div>
      </div>

      <!-- Modal Cargo -->
        <div class="modal fade bs-example-modal-carlg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">

                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar cargo</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar cargo</h3>
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body">
                <div class="card-body">

                     <!--Nombre del cargo-->
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form2.name" type="text" id="name" required="required" class="form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre en inglés:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <input  v-model="form2.enName" type="text" id="name" required="required" class="form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <!--Área-->
                    <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Área:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <treeselect v-model="valueArea"
                       :disable-branch-nodes="true"
                       :value-consists-of="valueConsistsOf"
                       :multiple="false"
                       :options="optionsArea" />
                    </div>
                  </div>
                  <!--Roles cargo-->
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Roles:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <treeselect v-model="valueRole"
                       :value-consists-of="valueConsistsOf"
                       :multiple="true"
                       :options="optionsRole" />
                    </div>
                  </div>
                  <!--Estado
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado: </label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <button type="submit" class="btn btn-success">Activo</button>
                      </div>
                  </div>-->
                <!--<  <div class="form-group"  v-if="formType=='EDIT'">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                    div class="col-md-6 col-sm-6 col-xs-12 ">
                          <button class="btn btn-warning" type="button">Cambiar a Inactivo</button>

                    </div>

                  </div>-->
                </div>
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-carlg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="formType=='ADD'" @click="createAppointment()" type="button" class="btn btn-primary">Crear cargo</button>
                  <button v-if="formType=='EDIT'" @click="updateAppointment()" type="button" class="btn btn-primary">Guardar cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!--Modal Borrar Cargo-->
        <div class="modal fade bs-example-modal-cardel" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                   <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al cargo : {{form2.name}} {{form2.surName}} {{form2.lastName}}? </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteAppointment()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
                    </center>
                  </div>
            </div>
          </div>
        </div>
      <!--Modal Fin-->


      <!-- Modal Rol -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">

                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar rol</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar rol</h3>
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>

              <div class="modal-body">
                <div class="card-body">
                    <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Acceso Web:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <treeselect v-model="valueWeb"
                       :value-consists-of="valueConsistsOf"
                       :multiple="true"
                       :options="optionsWeb" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input  v-model="form.name" type="text" id="name" required="required" class="form-control col-md-7 col-xs-12">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre en inglés:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input  v-model="form.enName" type="text" id="name" required="required" class="form-control col-md-7 col-xs-12">
                    </div>
                  </div>
                  <!--<div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado: </label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <button type="submit" class="btn btn-success">Activo</button>
                      </div>
                  </div>
                  <div class="form-group"  v-if="formType=='EDIT'">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones: </label>
                    <div class="col-md-6 col-sm-6 col-xs-12 ">
                          <button class="btn btn-warning" type="button">Cambiar a Inactivo</button>

                    </div>

                  </div>-->
                </div>
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="formType=='ADD'" @click="createRole()" type="button" class="btn btn-primary">Crear rol</button>
                  <button v-if="formType=='EDIT'" @click="updateRole()" type="button" class="btn btn-primary">Guardar cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!-- Modal -->
        <div class="modal fade bs-example-modal-role" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">

                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Asignación de roles por usuarios</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar roles  por usuario</h3>
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
              </div>
               <div class="modal-body">
                <div class="card-body">
                   <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Documento del usuario:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input class="col-md-12 col-sm-12 col-xs-12" type='text' v-model="formSetRoles.documentNumber">
                      <center>{{message}}</center>
                    </div>

                  </div>

                 <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Roles activos:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <treeselect v-model="valueRole"
                       :value-consists-of="valueConsistsOf"
                       :multiple="true"
                       :options="optionsRole" />
                    </div>
                  </div>



                </div>
                <div class="modal-footer">
                   <button type="button" data-target=".bs-example-modal-role" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="formType=='ADD'" @click="setRoles()" type="button" class="btn btn-primary">Asignar roles</button>
                  <button v-if="formType=='EDIT'" @click="setRoles()" type="button" class="btn btn-primary">Guardar cambios</button>
                </div>
              </div>



            </div>
          </div>
        </div>
      <!-- Modal Fin -->

      <!--Modal Borrar Rol-->
        <div class="modal fade bs-example-modal-del" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                   <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al rol : {{form.name}} {{form.surName}} {{form.lastName}}? </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteRole()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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

                  <h3 class="modal-title" > <center> Estado de la operación   </center> </h3>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.prueba}} </center> </h4></div>
                  <div class="modal-footer">
                    <center>
                           <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                    </center>
                  </div>
            </div>
          </div>
        </div>
      <!--Modal not-->
      <!--Modal not-->
        <div class="modal fade bs-example-modal-prob" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">

                  <h3 class="modal-title" > <center> Aviso  </center> </h3>
                     <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>

              </div>
              <div class="modal-body">   <h4 class="modal-title" > <center> {{formNot.prob}} </center> </h4></div>
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
  import _ from 'lodash';
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import Treeselect from '@riophae/vue-treeselect';
  import TableMaf from "./../../components/TableMaf.vue";
  import inputMaf from "./../../components/inputMaf.vue";


  export default {
      name: "rolesContainer",
      components: {
      LoadingComponent,
      Treeselect,
      TableMaf,
      inputMaf,
     },
      data: () => ({
          valueConsistsOf: 'ALL_WITH_INDETERMINATE',
          isLoading: false,
          formSetRoles:{},
          message:'',

          roles: [  ],
          pages: [ ],
          appointments:[],

          form: { },
          form2:{},
          formType: '',
          formNot:{prueba:'',prob:''},
          valueApp: null,
          optionsApp: [ ],

          valueWeb: null,
          valueArea:null,
          optionsWeb: [ ],
          optionsArea:[],

          valueRole:null,
          optionsRole:[ ],

          value: null,
          options: [ ],

           titleTable:'',
           colum:[],
           colum2:[],

      }),
      created () {
        var ctx = this;
        this.listRoles();
        this.setHeadTable();
        this.listAppointments();
  		},
      methods: {
        async shownotificacion()
        {
            $('.bs-example-modal-not').modal('show');

        },
        async shownotificacion2()
        {
            $('.bs-example-modal-prob').modal('show');

        },
        tranforForSelectTree(pagesWithComponents) {
          return _.map(pagesWithComponents,(page)=>{
            var response = {
              id: page.code,
              label: page.displayName?page.displayName+' ':page.code,
              }
            return response;
          })
        },
        tranforForSelectTreeB(roles) {
          return _.map(roles,(role)=>{
            var response = {
              id: role.id,
              label: role.name,
              }
            return response;
          })
        },

        tranforForSelectTreeC(departments) {
          var hijos=[];

          console.log('Departamentos')
          console.log(departments)

          return _.map(departments,(department)=>{

            var hijosAux=[];
             _.map(department.Areas,(area)=>{
               console.log('Area')
               console.log(area)
               hijosAux= _.concat(hijosAux,{id:area.id,label:area.name})
            })

            console.log('Hijo');
            console.log(hijosAux);
            var response = {
              id:"d"+department.id,
              label:department.name,
              children:hijosAux,
            }
            return response;
          })
        },

        //Listar cargos
        async listAppointments() {
          this.isLoading=true;

          const responseAppointments = await consultServices('getAllJobs','POST',{});
          this.setDataTable2(responseAppointments);
          const organizations = await consultServices('getAreasTree','POST',{});
          this.optionsArea = this.tranforForSelectTreeC(organizations);
          this.isLoading=false;
          $('.modal').modal('hide');
        },

        //Listar Roles
        async listRoles() {
          this.isLoading=true;
          this.optionsRole=[];
          const responseRoles = await consultServices('listRoles','POST',{});
          this.setDataTable(responseRoles);
          const responsePages = await consultServices('listPages','POST',{});
          this.pages = responsePages;
          this.optionsWeb = this.tranforForSelectTree(responsePages);
          this.optionsRole=this.tranforForSelectTreeB(responseRoles);
          this.isLoading=false;
          $('.modal').modal('hide');
        },

        //Actualizar Cargos
         async updateAppointment() {

           this.isLoading=true;
           var form = _.cloneDeep(this.form2);

           form = {
             ...form,
             idArea:this.valueArea,
           }

           if(this.form2.name==''|| this.form2.name == null || this.form2.enName == '' || this.form2.enName == null ||!this.valueArea||!this.valueRole||this.valueRole.length==0){  

             alert("Complete todos los campos para actualizar un cargo")
             this.isLoading=false;

           } else {
             console.log("form:::::::::", form)

             var flag= confirm("Estos cambios pueden impactar la experiencia de usuarios que tengan este cargo, ¿Desea continuar?");
              if(flag==true){

              //Cambiar 
              const response0 = await consultServices('updateJob','POST',form);
              var formSetRoles={ id:form.id, Roles:this.valueRole}
              const response1 = await consultServices('setRolesByJob','POST',formSetRoles);
              const response = await consultServices('getAllJobs','POST',{});
              this.setDataTable2(response);
              this.isLoading=false;
              $('.modal').modal('hide');
              this.formNot.prueba="Se actualizaron los datos del cargo de manera correcta";
              this.shownotificacion();
              }else{return this.isLoading=false}
           }

         },

        //Actualizar Roles
         async updateRole() {

           this.isLoading=true;           
           var form = _.cloneDeep(this.form)


           //if(this.form.name == '' || this.form.name == null || this.form.enName == '' || this.form.enName == null  || this.form.pagesWebCodes.length == 0 ){
           if(this.form.name == '' || this.form.name == null || this.form.enName == '' || this.form.enName == null   ){  
             alert("Complete todos los campos para actualizar un rol")
             this.isLoading=false;
           }else{
             //actualizar
             console.log("todo bien form:::::::", form)
             var flag= confirm("Estos cambios pueden impactar la experiencia de usuarios que tengan este rol, ¿Desea continuar?");
              if(flag==true){
                var pagesWebIds = []

                //obtener id de las nuevas páginas por rol
                console.log("valuee web :::::::::::: ",this.valueWeb )
                console.log("pages:::::::::::::::::: ", this.pages)
                for (let index = 0; index < this.valueWeb.length; index++) {
                  var label=this.valueWeb[index];
                  var page=_.find(this.pages, { 'code': label })
                  console.log("indexx :::::::", index )
                  console.log("pagex  :::::::", page )
                  if(page != undefined){
                    var id=Number(page.id);
                    pagesWebIds.push(id);
                  }

                }
                //actualizar json del rol on las páginas nuevas
                form = {
                  ...form,
                  pages:pagesWebIds,
                }
                          
                //Borrar  los registros de la tabla roles-paginas con la id del rol
                const responseDelete =  await consultServices('removePages','POST',{id:this.form.id});

                //actualizar rol con los nuevos ids de paginas
                const response1 = await consultServices('updateRole','POST',form);
                if(response1.errors 
                ){
                this.formNot.prueba="No se actualizaron los datos del rol de manera correcta";
                }
                else{
                  this.listRoles();
                  this.listAppointments();
                  this.formNot.prueba="Se actualizaron los datos del rol de manera correcta";
                }              
              }
              this.isLoading=false;
              $('.modal').modal('hide');          
              this.shownotificacion();  
           }
         },

         //Crear cargo
         async createAppointment() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form2);
            form={
              ...form,
              idArea:this.valueArea,
              Roles:this.valueRole,
            }
            console.log("form mos")
            console.log(form)
           //Cambiar servicio
           if(!this.form2.name||!this.valueArea||!this.valueRole||this.valueRole.length==0 || !this.form2.enName ) {
                alert("Complete todos los campos para registrar un nuevo cargo")
                this.isLoading=false;
            //  this.formNot.prob="Se deben llenar todos los campos";
            //  this.shownotificacion2();

           } else {
             console.log('pasó:::::::')
             const response0 = await consultServices('createJob','POST',form);
             var formSetRoles={id:response0.job.id,Roles:form.Roles}
             const response1 = await consultServices('setRolesByJob','POST',formSetRoles);
             if(response0.status == 200 && response1.status == 200){
                this.formNot.prueba="Se ha registardo con éxito un nuevo cargo";
              }else{
                this.formNot.prueba="Error en el registro de un nuevo cargo";
             }
             const response = await consultServices('getAllJobs','POST',{});
             this.setDataTable2(response);
             $('.modal').modal('hide');
             this.shownotificacion();
           }

           this.isLoading=false;
         },

         //Crear role
         async createRole() {
            this.isLoading=true;
           
            console.log("form:::::::::: ", this.form)
            //if(this.valueWeb.length == 0 || !this.form.name || !this.form.enName){
            if(!this.form.name || !this.form.enName){  
                alert("Complete todos los campos para registrar un nuevo rol")
                this.isLoading=false;
            }else{
              
              var form = _.cloneDeep(this.form);
              console.log("todo bien:::", form)
              //WEB
              var pagesWebIds = []
              for (let index = 0; index < this.valueWeb.length; index++) {
              var label=this.valueWeb[index];
              var page=_.find(this.pages, { 'code': label })
              var id=page.id;
                pagesWebIds.push(id);
              }
              console.log("pages",pagesWebIds);
              const response0 = await consultServices('createRole','POST',form);
              var formSetPages={id:response0.role.id,pages:pagesWebIds}
              const response1=  await consultServices('setPages','POST',formSetPages);
              this.listRoles();
              this.isLoading=false;
              if(response0.status == 200 && response1.status == 200){
                this.formNot.prueba="Se ha registardo con éxito un nuevo rol";
              }else{
                this.formNot.prueba="Error en el registro de un nuevo rol";
              }
            }
            $('.modal').modal('hide');              
            this.shownotificacion();

         },

        //Borrar Cargo
         async deleteAppointment() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form2);
            //Cambiar esto
            const response0 = await consultServices('deleteJob','POST',form);
            const response = await consultServices('getAllJobs','POST',{});
            this.setDataTable2(response);
            this.isLoading=false;
            this.formNot.prueba="El cargo seleccionado está inactivo";
            this.shownotificacion();
         },

         //Borrar Role
         async deleteRole() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            const response0 = await consultServices('deleteRole','POST',form);
            this.listRoles();
            this.listAppointments();
            this.isLoading=false;
            this.formNot.prueba="El rol seleccionado está inactivo";
            this.shownotificacion();
         },

         //Show delete para cargos
         showDeleteModal2(item) {
            this.formType = "DELETE";
            this.form2 = _.cloneDeep(item);
           },

         //Show delete para roles
         showDeleteModal(item) {
            this.formType = "DELETE";
            this.form = _.cloneDeep(item);
           },

          //Show add cargos
          showAddModal2() {
           this.formType = "ADD";
           this.valueRole = null;
           this.valueArea = null;
           this.form2 ={

            };

          },

          //Show add roles
          showAddModal() {
           this.formType = "ADD";
          this.valueApp = null;
           this.valueWeb = null;
           this.form ={

            };

          },

        //Showedit modal para cargos
        async showEditModal2(item) {
           this.formType = "EDIT";
           this.form2 = _.cloneDeep(item);
           this.valueArea = this.form2.idArea;
           this.valueRole = this.form2.rolesId;

         },


        //Showedit modal para roles
        async showEditModal(item) {
           this.formType = "EDIT";
           this.form = _.cloneDeep(item);
           const responsePages = await consultServices('getRolePages','POST',{id:this.form.id});
           this.form.pagesWebCodes = _.map(responsePages,(item)=>(item.code));
           this.form.componentsWebCodes = _.map(this.form.componentsWebCodes,(item)=>('component/'+item.componentCode))
           this.valueWeb = _.concat(this.form.componentsWebCodes,this.form.pagesWebCodes)




         },
         showModalRole(){
           window.location.href = "/dashboard/admcreando";
             // this.formType = "ADD";
             //  this.valueRole = null;
          },
          async setRoles(){
           // if(this.formSetRoles==""){this.message=""}
            const response0=  await consultServices('getVolunteer','POST',{id:this.formSetRoles.documentNumber});
            if(response0.message=="No se encontró al voluntario." ){
                confirm("Error en el registro de roles."+response0.message);
                this.valueRole=[];
                this.formSetRoles.documentNumber="";
            }else{
           var formSetRoles={id:this.response0.id,roles:this.valueRole}
           const response1=  await consultServices('setRoles','POST',formSetRoles);
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.prueba="Registro exitoso";
           this.shownotificacion();
            }
          },
        setHeadTable() {
            this.colum = [
                {label:'Nombre' ,name:'name' ,find:1 ,sort:1},
                //{label:'Estado' ,name:'statusDescription' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},],
            this.titleTable = "Roles ";
            this.colum2 = [
                {label:'Nombre' ,name:'name' ,find:1 ,sort:1},
                //{label:'Estado' ,name:'statusDescription' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0},],
            this.titleTable = "Cargos ";
        },

         refreshData() {
                this.$refs.tableMaf.formatData(this.roles);
         },

         refreshData2() {
                this.$refs.tableMaf2.formatData(this.appointments);
         },


        //Tabla cargos
        setDataTable2(arrayData){
                var ctx = this;
                this.appointments = [];

                arrayData.forEach(item => {

                    var rolesId = [];

                    var appointment = {};
                        appointment = _.cloneDeep(item);

                        _.map(item.Roles,(role)=>{
                          rolesId.push(role.id);
                        })

                        item.rolesId = rolesId;
                        appointment.idArea=item.idArea;
                        appointment.name = item.name;
                        appointment.statusDescription=<font style="vertical-align: inherit;">
                        {item.active!=true?<button type="button" class="btn btn-danger btn-xs">Inactivo </button>:null}
                        {item.active==true?<button type="button" class="btn btn-success btn-xs">Activo </button>:null}
                        </font>;
                        appointment.actions = <div class="d-flex justify-content-around">
                           <div> <button onClick={()=>ctx.showEditModal2(item)} type="button" class="btn btn-warning btn-xs"data-target=".bs-example-modal-carlg" data-toggle="modal">Editar</button> </div>
                           {item.availableForAdmin==true?<div> <button onClick={()=>ctx.showDeleteModal2(item)} class="btn btn-danger btn-xs" data-target=".bs-example-modal-cardel" data-toggle="modal" >Eliminar </button> </div>:null}
                          </div>;
                    this.appointments.push(appointment);
                });

                    this.refreshData2();
            },


         //Tabla roles
         setDataTable(arrayData){
                var ctx = this;
                this.roles = [];

                arrayData.forEach(item => {
                    var role = {};
                        role = _.cloneDeep(item);
                        role.name = item.name;
                        role.statusDescription=<font style="vertical-align: inherit;">
                        {item.active!=true?<button type="button" class="btn btn-danger btn-xs">Inactivo </button>:null}
                        {item.active==true?<button type="button" class="btn btn-success btn-xs">Activo </button>:null}
                        </font>;
                        role.actions = <div class="d-flex justify-content-around">
                           <div> <button onClick={()=>ctx.showEditModal(item)} type="button" class="btn btn-warning btn-xs"data-target=".bs-example-modal-lg" data-toggle="modal">Editar</button> </div>
                           <div> <button onClick={()=>ctx.showDeleteModal(item)} class="btn btn-danger btn-xs" data-target=".bs-example-modal-del" data-toggle="modal" >Eliminar </button> </div> </div>;
                    this.roles.push(role);
                });

                    this.refreshData();
            },


      }
  }
</script>
