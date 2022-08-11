<template>
    <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Componentes</h2>
          <div class="card-header-actions">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar componente
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <TableMaf :header="colum" :data="components" :tableTitle="titleTable" ref="tableMaf">                    
                    </TableMaf>        

        </div>
      </div>




      <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar componente</h3>
                <h3 v-if="formType=='EDIT'" class="modal-title" id="myModalLabel" >Editar componente</h3>
              </div>

              <div class="modal-body">
                <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Página:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <select class="form-control" v-model="form.pageId">
                        <option disabled="disabled" value="">Selecciona una página</option>
                        <option v-for="item in pages" v-bind:value="item._id">
                          {{item.name}}
                        </option>
                      </select>
                    </div>
                  </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12">Codigo:</label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input v-model="form.code"  type="text" id="code" required="required" class="form-control col-md-7 col-xs-12" >
                      </div>
                    </div>
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombre:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input  v-model="form.name" type="text" id="name" required="required" class="form-control col-md-7 col-xs-12">
                    </div>
                  </div>
                  <div class="form-group">
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
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-default">Cerrar</button>
                  <button v-if="formType=='ADD'" @click="createComponent()" type="button" class="btn btn-primary">Aceptar</button>
                  <button v-if="formType=='EDIT'" @click="updateComponent()" type="button" class="btn btn-primary">Aceptar</button>
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
                  <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al componente : {{form.name}} {{form.surName}} {{form.lastName}}? </center> </h3>
              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deleteComponent()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
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
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
                  <h3 class="modal-title" > <center> Operación exitosa  </center> </h3>
                   <h4 class="modal-title" > <center> {{formNot.prueba}} </center> </h4>
              </div>
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
  import LoadingComponent from "./../../components/loadingComponent.vue";
  import TableMaf from "./../../components/TableMaf.vue";
  export default {
      name: "componentsContainer",
      components: {
      LoadingComponent,
      TableMaf,

      },
      data: () => ({

          isLoading: false,
          components: [ ],
          pages:[],
          form: {},
          formType: '',
          formNot:{prueba:'',},
          colum:[],
          titleTable:'',          

      }),
      created () {
        var ctx = this;
        this.listComponents();
        this.setHeadTable();

  		},
      methods: {
        async shownotificacion()
        {
            $('.bs-example-modal-not').modal('show');

        },
        async listComponents() {
          this.isLoading=true;

          const response = await consultServices('listComponents','POST',{});
          this.components = response;
          const responsePages = await consultServices('listPages','POST',{});
          //this.pages = responsePages;
          //this.setDataTable(responsePages);
          this.isLoading=false;
          $('.modal').modal('hide');
        },
         async updateComponent() {

           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           var indexPageSelected = _.findIndex(this.pages, function(o) { return o.code == form.pageCode; });
           form.pageName=this.pages[indexPageSelected].name;
           const response0 = await consultServices('updateComponent','POST',form);
           const response = await consultServices('listComponents','POST',{});
           //this.components = response;
           this.setDataTable(response);
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.prueba="Se actualizaron los datos del componente de manera correcta";
           this.shownotificacion();

         },
         async createComponent() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            var indexPageSelected = _.findIndex(this.pages, function(o) { return o.code == form.pageCode; });
            form.pageName=this.pages[indexPageSelected].name;
            form.pageName=this.pages[indexPageSelected].code;
            const response0 = await consultServices('createComponent','POST',form);
            const response = await consultServices('listComponents','POST',{});
           // this.components=response;
            this.setDataTable(response);
            this.isLoading=false;
            $('.modal').modal('hide');
           this.formNot.prueba="Se ha registardo con éxito un nuevo componente";
           this.shownotificacion();
         },

         async deleteComponent() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            const response0 = await consultServices('deleteComponent','POST',form);
            const response = await consultServices('listComponents','POST',{});
            //this.components=response;
            this.setDataTable(response);
            this.isLoading=false;
            this.formNot.prueba="El componente seleccionado está inactivo";
            this.shownotificacion();
         },
         showDeleteModal(item) {
            this.formType = "DELETE";
            this.form = _.cloneDeep(item);
           },
        showAddModal() {
           this.formType = "ADD";
           this.form ={
                      identificationCard:'',
                      name:'',
                      surName:'',
                      lastName:'',
                      email:'',
                      adm:'',
                      technical:'',
                      reports:'',
                      statusDescription:'',
            };
          },

        async showEditModal(item) {
           this.formType = "EDIT";
           this.form = _.cloneDeep(item);
         },
       setHeadTable() {
            this.colum = [
                {label:'Nombre' ,name:'Name' ,find:1 ,sort:1},
                {label:'Código' ,name:'code' ,find:1 ,sort:1},
                {label:'Página' ,name:'pageName' ,find:1 ,sort:1},
                {label:'Estado' ,name:'statusDescription' ,find:1 ,sort:1},
                {label:'' ,name:'edit' ,find:0 ,sort:0},
                {label:'' ,name:'delete' ,find:0 ,sort:0}];
            this.titleTable = "Componentes";
            },
        refreshData(){
                this.$refs.tableMaf.formatData(this.components);
            },

        setDataTable(arrayData){ 
                var ctx = this;
                this.components = [];
                arrayData.forEach(item => {
                    var component = {};
                        component = _.cloneDeep(item);
                        component.name = item.name;
                        component.code = item.code;
                        component.pageName = item.pageName;
                        page.delete = <div class="d-flex justify-content-around">                       
                           <div> <button onClick={()=>ctx.showDeleteModal(item)} class="btn btn-danger btn-xs" data-target=".bs-example-modal-del" data-toggle="modal" ><i class="fa fa-trash"></i> </button> </div> </div>;
                        page.edit = <div class="d-flex justify-content-around">                       
                           <div> <button onClick={()=>ctx.showEditModal(item)} class="btn btn-warning btn-xs" data-target=".bs-example-modal-lg" data-toggle="modal" ><i class="fa fa-pencil"></i> </button> </div> </div>;
                            
                        page.statusDescription=<font style="vertical-align: inherit;">                        
                        {item.statusCode==1?<button type="button" class="btn btn-success btn-xs">{item.statusDetail} </button>:null}
                        {item.statusCode==2?<button type="button" class="btn btn-danger btn-xs">{item.statusDetail} </button>:null}                        
                        </font>;
                    this.components.push(component);
                });

                    this.refreshData();
            },           

      }
  }
</script>
