<template>
  <div class="row">
    <LoadingComponent v-if="isLoading"></LoadingComponent>
    
      <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="card">
            <div class="card-header">
              <h2><font style="vertical-align: inherit;">Vista Previa</font></h2>
              <div class="nav navbar-right panel_toolbox">
                <Value :data='headerSection'></Value>
                <input ref="myFilesExcel" type="file" id='file-excel' @change="changeFileExcel" style="display: none;" />
                <button type="button" @click="clickUploadExcel()"
                  data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> {{labelUploadExcel}}
                </button>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="card-body">
                <TableMaf :title="tableTableFlag" :header="colum" :data="excelData" ref="tableMaf">
                </TableMaf>
                <button v-if="!modeLoading && excelData.length>0" type="button" @click="startUpload()"
                 data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs"><i class="fa fa-cloud-upload"></i> {{labelUploadData}}
                </button>
                <div v-if="modeLoading">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{ width: dataPercentSent+'%' }"></div>
                  </div>
                  <div :style="styleMessageBar.wrapper">
                    <span :style="styleMessageBar.text">{{dataSent}} datos enviados, se han encontrado {{errorsMessages.length}} errores.</span>
                  </div>
                  <div v-if="!isOver">
                    <button v-if="isUploading" type="button" @click="showStopUpload()"
                    data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-danger btn-xs">{{labelStopData}}
                    </button>
                    <button v-if="!isUploading" type="button" @click="continueUpload()"
                      data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-success btn-xs">{{labelContinueData}}
                    </button>
                  </div>

                  <div class="card" v-if="isOver">
                    <div class="card-body">
                      <div class="card-header">
                        <h2>Información sobre la subida masiva de información</h2>
                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Enviados:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <input readonly type="text" id="name" class="form-control" v-model="dataSent">
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Enviados exitosamente:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <input readonly type="text" id="name" class="form-control" :value="dataSent-errorsMessages.length">
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12">Enviados con errores:</label>
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <input readonly type="text" id="name" class="form-control" v-model="errorsMessages.length">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-for="error in errorsMessages" class="alert alert-danger alert-dismissible fade in show" role="alert">
                    <strong>{{error.title}}</strong> {{error.message}}
                  </div>
                </div>
            </div>
          </div>
      </div>
    
    

      <!--Modal not-->
    <div class="modal fade bs-example-modal-stop" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">La carga no a finalizado</h4>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <h3> <center> ¿Seguro que quiere terminar? </center> </h3>
            </div>
            <div class="modal-footer">
                    <center>
                        <button type="button" data-dismiss="modal" class="btn btn-primary">No</button>
                      <button @click="stopUpload()" data-dismiss="modal" type="button" class="btn btn-danger">Si</button>
                    </center>
                </div>
            </div>
        </div>
    </div>

    <!--Modal not-->
    <div class="modal fade bs-example-modal-success" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-cat">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">La carga a finalizado</h4>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <h3> <center> Se han subido exitosamente </center> </h3>
            </div>
            <div class="modal-footer">
                    <center>
                        <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                    </center>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>




<script>
  import consultServices from './../utilities/consultServices.js'; //consulta servicios
  import TableMaf from "./../components/tableMaf.vue";
  import LoadingComponent from "./../components/loadingComponent.vue";
  import inputMaf from "./../components/inputMaf.vue";
  import XLSX from './xlsx/xlsx.js';
  const Value = ({ props }) => {
    return <div>{props.data}</div>
  }

  export default {
      props: ['serviceContent','headerSection','columnExcel','colum','columnToDB','slice','initRow','nameOfSheet','serviceUrl'],
      name: "UploadMasiveComponent",
      components: {
        LoadingComponent,
        TableMaf,
        inputMaf,
        Value,
      },
      data: () => ({
        labelUploadExcel: 'Subir Excel',
        labelUploadData: 'Subir Data',
        labelStopData: 'Detener',
        labelContinueData: 'Continuar',
        //initRow:2,//0,1,2,3... Es la posicion en donde empieza el la data
        //nameOfSheet: 'reporte',
        tableTableFlag: false,
        isLoading: false,
        isUploading: false,
        isOver: false,
        modeLoading:false,
        styleMessageBar: {
          wrapper:{
            'margin': '4px',
            'display': 'flex',
            'align-items': 'end'
          },
          text:{
            'font-size': '9px',
            'text-align': 'right',
            'width': '100%'
          }
        },
        excelData: [],
        // columnExcel: [ //SON LAS COLUMNA / MASCARA QUE HARA MATCH CON LA DATA DEL EXCEL
        //   'campo1',
        //   'campo2',
        //   'campo3',
        //   'campo4',
        //   'campo5',
        //   'campo6',
        //   'campo7',
        //   'campo8',
        //   'campo9',
        //   'campo10',
        // ],
        // colum:[ //SON LAS COLUMNAS QUE SE MOSTRARAN EN LA TABLA
        //   {name:'campo1', label :'campo1', find:1, sort:1},
        //   {name:'campo2', label :'campo2', find:1, sort:1},
        //   {name:'campo7', label :'campo7', find:1, sort:1},
        //   {name:'campo8', label :'campo8', find:1, sort:1},
        //   {name:'campo9', label :'campo9', find:1, sort:1},
        //   {name:'campo10', label :'campo10', find:1, sort:1},
        // ],
        // columnToDB:[
        //   'campo1',
        //   'campo2',
        //   'campo10'
        // ],
        // slice: 10,
        positionUploading:0,
        errorsMessages:[ ],
        dataSent:0,
        dataPercentSent:0,
      }),
      created () {
  		},
      methods: {
        async shownotificacion()
        {
            $('.bs-example-modal-stop').modal('show');
        },
        async startUpload(isContinue=false){
          if(!isContinue){
            this.dataSent = 0;
            this.dataPercentSent = 0;
            this.positionUploading = 0;
          }
          //EMPEZAR LA SUBIDA MASIVA DE data
          //EN UN PERIDO DE TIEMPO
          this.isUploading=true;
          this.modeLoading=true;
          for(;(this.positionUploading<this.excelData.length && this.isUploading);){


            //PORCION DE DATA QUE SE ENVIA
            var _data = _.slice(this.excelData, (this.positionUploading*this.slice), (((this.positionUploading+1)*this.slice)>(this.excelData.length))?this.excelData.length:(this.positionUploading+1)*this.slice);

            _data = _.map(_data,(_item)=>{
              let item = {};
              _.map(this.columnToDB,(column)=>{
                item[column] = _item[column];
              })
              return item;
            })

            //>>>>> CONSUMIR SERVICIO
            const response = await consultServices(this.serviceUrl,'POST',{
              ...(this.serviceContent || {}),
              data:_data
            });

            console.log(response);
            console.log((response.errors || []).length)

            if((response.errors || []).length>0){
              this.errorsMessages = _.concat(this.errorsMessages,response.errors);

            }
            this.dataSent = ((((this.positionUploading+1)*this.slice)>(this.excelData.length))?this.excelData.length:(this.positionUploading+1)*this.slice);
            this.dataPercentSent = (this.dataSent/this.excelData.length)*100;
            if(this.dataSent  == this.excelData.length){
              this.isUploading = false;
              this.isOver = true;
              //CERRAR EL PANEL DE DETENER PORSIACA :)
              $('.bs-example-modal-stop').modal('hide');
              $('.bs-example-modal-success').modal('show');
            }
            this.positionUploading++;
          }
        },
        async sendData(){

        },
        showStopUpload(){
          $('.bs-example-modal-stop').modal('show');
          // MOSTRAR POPUP
        },
        stopUpload(){
          this.isUploading=false;
        },
        continueUpload(){
          this.isUploading=true;
          this.startUpload(true);
        },
        clickUploadExcel(){
          //EVENTO QUE EJECUTA EL INPUT FILE OCULTO PARA SUBIR EL ARCHIVO
          var elem = this.$refs.myFilesExcel;
          elem.click()
        },
        changeFileExcel(){
          console.log('changeFileExcel')
          var rABS = true;
          //EVENTO QUE SE DISPARA AL DETECTAR CAMBIOS EN EL INPUT FILE
          var files = this.$refs.myFilesExcel.files, f = files[0];
          if(files[0]){
            this.isLoading=true;
              var reader = new FileReader();
              var ctx = this;
              reader.onload = function(e) {
                var data = e.target.result;
                if(!rABS) data = new Uint8Array(data);
                //CUANDO LLEGA A ESTE PUNTO SIGNIFICA QUE YA TENEMOS LA DATA DEL DOCUMENTO SUBIDO
                ctx.readExcel(data,rABS)
              };
              if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
          }
        },
        readExcel(data,rABS){
          console.log('readExcel')
            //SE USA LA LIBRERIA XLSX PARA LEER EL BUFFER DEL EXCEL CARGADO EN MEMORIA(DATA DEL EXCEL)
            var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
            /* DO SOMETHING WITH workbook HERE */
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
              var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
              if(roa.length) result[sheetName] = roa;
            });
            //EN ESTE PUNTO TENEMOS LA DATA EN FORMATO JSON
            this.refreshData(result);
        },
        refreshData(response){
          console.log('refreshData')
          console.log(response)
          console.log(this.initRow)
          console.log(this.nameOfSheet)
          var initRow = this.initRow;
          var nameOfSheet = this.nameOfSheet;
          var _data = response ;
          var _data = _.drop(_data[nameOfSheet], initRow); // Se eliminan los espacios innecesarios
          console.log(_data)
          //configuración de lectura del Excel
          var columnExcel = this.columnExcel;
            var data = [];
          _.map(_data,(value,i)=>{
            let item = {}
            let addFlag = false;
            _.map(columnExcel,(key,j)=>{
              if(value[j]){
                addFlag = true
              }
              item[key]=value[j];
            })
            if(addFlag){
              data = _.concat(data, item);
            }
          })
          //EN ESTE PUNTO LA DATA YA TIENE EL FORMATO JSON CORRECTO

          var ctx = this;
          this.excelData = data;
          this.$refs.tableMaf.formatData(this.excelData);//SE ENVIA LA DATA A LA TABLA
          this.isLoading = false;
        }
      }
  }
</script>



<style scoped>
  .alert{
    margin-bottom: 4px;
    padding: 5px;
    background-color: rgba(247, 240, 240, 0.8);
    border-color: rgba(231,76,60,.88);
    color: rgba(231,76,60,.88);
  }


</style>
