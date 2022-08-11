<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="card-header">
          <h2>Páginas</h2>
          <!--div class="card-header-actions">
            <button type="button" @click="showAddModal()" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Registrar página
            </button>
          </div-->
          <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <TableMaf :header="colum" :data="pages" :tableTitle="titleTable" ref="tableMaf">
                    </TableMaf>

        </div>
      </div>




      <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">

                <h3 v-if="formType=='ADD'" class="modal-title" id="myModalLabel" >Agregar página</h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>
              </div>

              <div class="modal-body">
                <div class="card-body">
                  <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Codigo:</label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <input v-model="form.code"  type="text" id="code" required="required" class="form-control col-md-7 col-xs-12" >
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
                  <button v-if="formType=='ADD'" @click="createPage()" type="button" class="btn btn-primary">Aceptar</button>
                  <button v-if="formType=='EDIT'" @click="updatePage()" type="button" class="btn btn-primary">Aceptar</button>
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
                  <h3 class="modal-title"> <center> ¿Seguro que quiere eliminar al página : {{form.name}} {{form.surName}} {{form.lastName}}? </center> </h3>
              </div>
                  <div class="modal-footer">
                    <center>
                          <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                          <button @click="deletePage()" data-dismiss="modal" type="button" class="btn btn-danger">Aceptar</button>
                    </center>
                  </div>
            </div>
          </div>
        </div>
      <!--Modal Fin-->
      <!--Modal not-->
        <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                     <h3 class="modal-title" > <center> Operación exitosa  </center> </h3>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                </button>


              </div>
              <div class="modal-body">
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
      name: "pagesContainer",
      components: {
      LoadingComponent,
      TableMaf,
      },
      data: () => ({
          isLoading: false,
          pages: [ ],
          titleTable:'',
          form: { },
          formType: '',
          formNot:{prueba:'',},
          colum:[],
          titleTable:'',

      }),
      created () {
        var ctx = this;
        this.listPages();
        this.setHeadTable();

  		},
      methods: {
        async shownotificacion() {
            $('.bs-example-modal-not').modal('show');

        },
       setHeadTable() {
            this.colum = [
              {label:'ID' ,name:'id' ,find:1 ,sort:1},
              {label:'Nombre' ,name:'displayName' ,find:1 ,sort:1},
              {label:'descripción' ,name:'description' ,find:1 ,sort:1},];
            this.titleTable = "Páginas";
            },
        refreshData(){
                this.$refs.tableMaf.formatData(this.pages);
            },

        setDataTable(arrayData){
                var ctx = this;
                this.pages = [];
                arrayData.forEach(item => {
                    var page = {};
                        page = _.cloneDeep(item);
                        page.id = item.id;
                        page.codePage = item.code;
                        page.displayName = item.displayName;
                        page.description = item.description;
                        page.statusDescription=<font style="vertical-align: inherit;">
                        {item.active==true?<button type="button" class="btn btn-success btn-xs">Activo </button>:null}
                        {item.active!=true?<button type="button" class="btn btn-danger btn-xs">Inactivo </button>:null}
                        </font>;
                    this.pages.push(page);
                });

                    this.refreshData();
            },
        async listPages() {
          this.isLoading=true;
          const response = await consultServices('listPages','POST',{});
          this.setDataTable(response);
          this.isLoading=false;

        },
         async updatePage() {
           this.isLoading=true;
           var form = _.cloneDeep(this.form)
           const response0 = await consultServices('updatePage','POST',form);
           const response = await consultServices('listPages','POST',{});
           this.setDataTable(response);
           this.isLoading=false;
           $('.modal').modal('hide');
           this.formNot.prueba="Se actualizaron los datos de la página de manera correcta";
           this.shownotificacion();

         },
         async createPage() {
            this.isLoading=true;
            var form ={code:this.form.code};
            const response0 = await consultServices('createPage','POST',form);
            const response = await consultServices('listPages','POST',{});
            this.setDataTable(response);
            this.isLoading=false;
            $('.modal').modal('hide');
           this.formNot.prueba="Se ha registardo con éxito una nueva página";
           this.shownotificacion();
       },

         async deletePage() {
            this.isLoading=true;
            var form = _.cloneDeep(this.form);
            const response0 = await consultServices('deletePage','POST',form);
            //const response = await consultServices('listPages','POST',{});
            this.setDataTable(response);
            this.isLoading=false;
            this.formNot.prueba="El página seleccionado está inactivo";
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
      }
  }
</script>


          <div class="col-sm-12">
            <table id="searcher-datatable-default" class="table table-striped projects" role="grid">
              <thead>
                <tr>
                  <th style="width: 30px;"></th>
                  <th style="width: 68px;">Codigo</th>
                  <th style="width: 68px;">Nombre</th>
                  <th style="width: 68px;">Página</th>
                  <th style="width: 29px;">Estado</th>
                  <th style="width: 30px;"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in components">
                  <td>
                    <a @click="showEditModal(item)" data-target=".bs-example-modal-lg" data-toggle="modal" class="btn btn-warning btn-xs"><i class="fa fa-pencil"></i></a>
                  </td>

                  <td>{{item.code}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.pageName}}</td>
                  <td>
                      <button v-if="item.statusCode==1" type="button" class="btn btn-success btn-xs">{{item.statusDetail}} </button>
                      <button v-if="item.statusCode==2" type="button" class="btn btn-danger btn-xs"> {{item.statusDetail}} </button>
                  </td>
                  <td>
                    <a @click="showDeleteModal(item)" data-target=".bs-example-modal-del" data-toggle="modal" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
