<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Asignar líderes GDC</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">

                    <div class="card">

                        <div class="card-body">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">DNI:</label>
                                <div class="col-md-3 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.documentNumber"  type="text" id="DNI" required="required" class="form-control col-md-12 col-xs-12"   >
                                </div>
                                <div class="control-label col-md-6 col-sm-3 col-xs-12">
                                <p align="left"></p>
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombres:</label>
                                <div class="col-md-3 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.name" type="text" id="Nombres" required="required" class="form-control col-md-12 col-xs-12"  >
                                </div>
                                <div class="control-label col-md-6 col-sm-3 col-xs-12">
                                <p align="left">(Colocar mínimo las 3 primeras letras del Nombre)</p>
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido Paterno:</label>
                                <div class="col-md-3 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.lastName" type="text" id="apePaterno" required="required" class="form-control col-md-12 col-xs-12">                                  
                                </div>
                                <div class="control-label col-md-6 col-sm-3 col-xs-12">
                                <p align="left">(Colocar mínimo las 3 primeras letras del Apellido)</p>
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Apellido Materno:</label>
                                <div class="col-md-3 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.secondLastName" type="text" id="apeMaterno" required="required" class="form-control col-md-12 col-xs-12">
                                </div>
                                <div class="control-label col-md-6 col-sm-3 col-xs-12">
                                <p align="left">(Colocar mínimo las 3 primeras letras del Apellido)</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Email:</label>
                                <div class="col-md-3 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.email" type="text" id="email" required="required" class="form-control col-md-12 col-xs-12">
                                </div>
                                <div class="control-label col-md-6 col-sm-3 col-xs-12">
                                <p align="left"></p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Celular:</label>
                                <div class="col-md-3 col-sm-6 col-xs-12">
                                    <input v-model="formCrea.phone" type="text" id="celular" required="required" class="form-control col-md-12 col-xs-12">
                                </div>
                                <div class="control-label col-md-6 col-sm-3 col-xs-12">
                                <p align="left"></p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" ><i class="fa fa-search"></i> Buscar </button>
                        </div>

                    </div>

                    <TableMaf :header="colum" :data="creando" :tableTitle="titleTable" ref="tableMaf">  

                    </TableMaf> 

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import consultServices from './../utilities/consultServices.js';
    import LoadingComponent from "./../components/loadingComponent.vue";
    import _ from 'lodash';
    import moment from 'moment';
    import TableMaf from "./../components/TableMaf.vue";  

    export default {
        name: "RegisterVolunteerContainer",
        components: {
            LoadingComponent,  
            TableMaf,
        },
        data: () => ({
            isLoading:true,
            titleTable:'',
            colum:[],
            creando:[],
            formCrea:{},
        }),
        async created () {
        this.isLoading=true;
          await this.setHeadTable();
          this.isLoading=false;
        },
        
        methods: {
            setHeadTable(){
            this.colum = [
                {label:'Resultado' ,name:'name' ,find:1 ,sort:1},
                {label:'Contraseña' ,name:'password' ,find:0 ,sort:0},
                {label:'Asignar rol' ,name:'watch' ,find:0 ,sort:0}];
            this.titleTable = "Resultados";
            },

            refreshData(){
                this.$refs.tableMaf.formatData(this.creando);
            },

            setDataTable(arrayData){
                var ctx = this;
                this.creando = [];

                arrayData.forEach(item => {
                    var crea = {};

                        crea = item;

                        crea.password=<div class="d-flex justify-content-around">
                        <i class="fa fa-refresh" ></i> 
                        </div>;

                        crea.watch=<div class="d-flex justify-content-around">
                        <div> <button onClick={()=>ctx.redirectToDetail(item)} type="button" class="btn btn-warning btn-xs"><i class="fa fa-eye"></i></button> </div>
                        </div>;

                    this.creando.push(crea);
                });

                    this.refreshData();
                },
            
        }
      

    }
</script>