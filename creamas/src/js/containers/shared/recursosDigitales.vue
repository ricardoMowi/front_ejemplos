<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Recursos Digitales</h2><br/><br/>
                </div>
                <div class="card-body">
                    <h2>  Creandos, les compartimos los diseños oficiales de uso en Crea+ </h2>
                    <TableMaf :header="colum" :data="documentsCreando" :datePerPageV="false" :title="false" :pagination="false" :searchOption="false" ref="tableMaf" >

                    </TableMaf>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import TableMaf from "./../../components/TableMaf.vue";

    export default {
        name: "RecursosDigitalesContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            isLoading:false,
            colum:[],
            titleTable:'',
            documentsCreando:[],
             }),
        created () {
            this.setHeadTable();
            this.listDocuments();
        },

        methods: {

            async listDocuments() {
              const arrayDocuments = await consultServices('getDigitalResources','POST',{});
              this.setDataTable(arrayDocuments);
            },
            setHeadTable(){
            this.colum = [
                {label:'Descripción' ,name:'name' ,find:1 ,sort:0},
                {label:'Detalle' ,name:'url' ,find:1 ,sort:0},
              ]
            //this.titleTable = "Kit Pedagógico";
            },
            setDataTable(arrayData){
                var ctx = this;
                var typeUrl = "";
                this.documentsCreando = [];

                arrayData.forEach(item => {
                    var doc = {};
                    doc.name=item.name;

                    if(item.url.includes('ppt')) {
                       typeUrl = './img/iconPPT.png'
                       doc.url = <div class="d-flex justify-content-around">
                       <div> <a href={item.url} target="_newtab"><img src={typeUrl} alt="png" width="50" height="50"/></a> </div> </div>;
                    } else if(item.url.includes('png')) {
                       typeUrl = './img/iconPNG.png'
                       doc.url = <div class="d-flex justify-content-around">
                       <div> <a href={item.url} target="_newtab"><img src={typeUrl} alt="png" width="50" height="50"/></a> </div> </div>;
                    } else if (item.url.includes('.xl')) {
                        typeUrl = './img/iconExcel.png'
                        doc.url = <div class="d-flex justify-content-around">
                       <div> <a href={item.url} target="_newtab"><img src={typeUrl} alt="png" width="50" height="50"/></a> </div> </div>;
                    } else if (item.url.includes('.pdf')) {
                        typeUrl = './img/iconPDF.png'
                        doc.url = <div class="d-flex justify-content-around">
                       <div> <a href={item.url} target="_newtab"><img src={typeUrl} alt="png" width="50" height="50"/></a> </div> </div>;
                    } else {
                        doc.url = <div class="d-flex justify-content-around">
                       <div> <a href={item.url} class="btn btn-danger btn-xs" style="color:#FFFFFF" target="_newtab"><i class="cui-file"></i> Descargar</a> </div> </div>;
                    }

                    this.documentsCreando.push(doc);
                });
                this.$refs.tableMaf.formatData(this.documentsCreando);
            },
        }
    }
</script>
