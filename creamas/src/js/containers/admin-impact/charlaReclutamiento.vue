<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Charla de reclutamiento</h2>
                    <div class="card-header-actions" align-items: center>
                        <button type="button" @click="showAddEvent()" data-toggle="modal" data-target=".modal-Trainning" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar Charla
                        </button>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">

                    <TableMaf :header="colum" :data="events" :tableTitle="titleTable" ref="tableMaf">

                    </TableMaf>

                </div> <!--card-body-->

                <!--Modal Evaluated-->
                <div class="modal fade modal-Trainning" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h3 class="modal-title" id="myModalLabel" v-if="formType=='ADD'" > Crear charla de reclutamiento </h3>
                                <h3 class="modal-title" id="myModalLabel" v-if="formType=='EDIT'" > Editar charla de reclutamiento </h3>
                                <button type="button" class="close"   data-dismiss="modal"><span aria-hidden="true">×</span></button>
                            </div>

                            <div class="modal-body">
                                <div class="card">

                                    <div class="card-body">
                                        <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Region:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <search-input v-model="region" :value="region" :callBackData="getLocals"  :arrayData="regions" displayNameKey="name" ref="region" >
                                                    </search-input>
                                                </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Local:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <search-input v-model="local" :arrayData="locals" displayNameKey="name" service="getLocale" :callBackData="getLocaleRoom" ref="locale">
                                                <!--<search-input v-model="local" :value="local" :arrayData="locals" displayNameKey="name" service="getLocale" :callBackData="getLocaleRoom" ref="locale">-->
                                                </search-input>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Dirección:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                  <input type="text"  v-model="local.address" class="form-control col-md-12 col-xs-12" readonly="readonly">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Espacio:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <search-input v-model="localeRoom" :arrayData="localeRooms" displayNameKey="name" ref="localeRoom" >
                                                    <!--<search-input v-model="localeRoom" :value="localeRoom" :arrayData="localeRooms" displayNameKey="name" ref="localeRoom">-->
                                                    </search-input>
                                                </div>
                                            </div>

                                        <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Centro de estudio:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <search-input v-model="studyCenter" :arrayData="studyCenters" displayNameKey="name" ref="studyCenter" AddNewValue="Y">
                                                    <!--<search-input v-model="studyCenter" :value="studyCenter" :arrayData="studyCenters" displayNameKey="name" ref="studyCenter">-->
                                                    </search-input>
                                                </div>
                                            </div>
                                        <div class="form-group">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Fecha:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <Datetime type="date" format="dd/MM/yyyy" value-zone="UTC-5" :phrases="{ok:'Seleccionar',cancel:'Cancelar'}"  v-model="formEvent.startDate" ></Datetime>
                                                </div>
                                        </div>
                                        <div class="form-group" v-if="formType=='EDIT'">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Estado:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <label v-if="formEvent.statusCode=='EVENT_CREATED'" class="btn btn-success btn-xs">{{formEvent.statusValue}}</label>
                                                    <label v-if="formEvent.statusCode=='EVENT_ENROLLMENT_OPENED'" class="btn btn-info btn-xs">{{formEvent.statusValue}}</label>
                                                    <label v-if="formEvent.statusCode=='EVENT_ENROLLMENT_CLOSED'" class="btn btn-warning btn-xs">Inscripciones cerradas</label>
                                                </div>
                                            </div>
                                        <div class="form-group" v-if="formType=='EDIT'">
                                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Acciones:</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">

                                                    <button type="button" v-if="formEvent.statusCode=='EVENT_CREATED'"  @click="updateEventbyStatus(formEvent)" class="btn btn-info btn-xs">Abrir inscripciones</button>
                                                    <button type="button" v-if="formEvent.statusCode=='EVENT_ENROLLMENT_OPENED'" @click="updateEventbyStatus(formEvent)" class="btn btn-warning btn-xs">Cerrar inscripciones</button>
                                                    <button type="button" v-if="formEvent.statusCode=='EVENT_ENROLLMENT_CLOSED'" @click="updateEventbyStatus(formEvent)" class="btn btn-info btn-xs">Abrir inscripciones </button>
                                                    <button type="button" @click="deleteEvent(formEvent)" class="btn btn-danger" > Eliminar </button>
                                                    <!--<button type="button" @click="closeEvent(formEvent)" class="btn btn-dark" > Cerrar charla </button>-->
                                                </div>
                                            </div>


                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" data-target=".modal-Trainning" data-toggle="modal" class="btn btn-default"> Cancelar </button>
                                        <button type="button" @click="createEvent(formEvent)" class="btn btn-primary" v-if="formType=='ADD'"> Crear charla </button>
                                        <button type="button" @click="updateEvent(formEvent)" class="btn btn-primary" v-if="formType=='EDIT'"> Guardar cambios </button>
                                    </div>
                                </div>
                            </div> <!--Body-->
                        </div> <!--Content-->
                    </div>
                </div>
                <!--Modal Evaluated-->

                <!--Modal Turno-->
                <div class="modal fade modal-Turn" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h3 class="modal-title" id="myModalLabel"> Gestionar turno </h3>
                                <button type="button" @click="addTurnOff()"   class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <button type="button" @click="showAddTurn()" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> Agregar Turno
                                    </button>
                                </div>

                                <div v-if="turnType=='ADD'" >
                                    <div class="card-body">


                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Hora inicio:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <Datetime v-model="turn.startHour" type="time" title="Hora inicio" ></Datetime>
                                            </div>
                                        </div>

                                        <!--<div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-3">Hora fin:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <Datetime v-model="turn.endHour" type="time" title="Hora fin"></Datetime>
                                            </div>
                                        </div>-->

                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Cupos:</label>
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <input v-model="turn.quota" type="text" required="required" class="form-control col-md-6 col-xs-12">
                                            </div>
                                        </div>

                                        <div class="modal-footer">
                                            <button type="submit" @click="createTurn(turn)" class="btn btn-success" >Agregar</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="modal-body">
                                <div class="card-body">
                                <div class="table-responsive">
                                    <table id="searcher-datatable-Charla" class="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid">
                                    <thead>
                                        <tr >
                                            <th style="width: 20px;">#</th>
                                            <th style="width: 20px;">Hora Inicio</th>
                                            <!--<th style="width: 20px;">Hora Fin</th>-->
                                            <th style="width: 20px;">Aforo</th>
                                            <!--<th style="width: 20px;">Inscritos</th>
                                            <th style="width: 20px;">Asistencias</th> -->
                                            <th style="width: 20px;">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(turno,index) in turns" >
                                            <th style="width: 20px;">Turno {{index+1}} </th>
                                            <th style="width: 20px;"><Datetime v-model="turno.startHour" type="time" title="Hora inicio"></Datetime></th>
                                            <!--<th style="width: 20px;"><Datetime v-model="turno.endHour" type="time" title="Hora fin"></Datetime></th>-->
                                            <th style="width: 20px;"><input type="text" v-model="turno.quota" class="form-control col-md-7 col-xs-12"></th>
                                            <!--<th style="width: 10px;">{{turno.turnSignUps}}</th>
                                            <th style="width: 10px;">{{turno.turnAttendances}}</th>-->
                                            <th style="width: 20px;"><button @click="deleteTurn(turno)" type="button" class="btn btn-danger btn-xs" > Eliminar </button> </th>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" data-target=".modal-Turn" data-toggle="modal" @click="addTurnOff()" class="btn btn-default"> Cancelar </button>
                                        <button type="button" class="btn btn-primary" @click="updateTurn(turns)" > Guardar </button>
                                    </div>

                                </div>
                            </div> <!--Body-->
                        </div> <!--Content-->
                    </div>
                </div>
                <!--Modal Turno Fin-->

                <!--Modal not-->
                <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-cat">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">{{formNot.tit}} </h4>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p> <center> {{formNot.not}} </center> </p>
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

                <message :titleMessage="titleMessage" :bodyMessage="messageBody" ref="MessageModal">
                </message>

            </div> <!--card-->
        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import moment from 'moment';
    import _ from 'lodash';
    //import * as lang from "vuejs-datepicker/src/locale";
    import { Datetime } from 'vue-datetime';
    //COMPONENTS
    import LoadingComponent from "./../../components/loadingComponent.vue";
    //import Datepicker from 'vuejs-datepicker';
    import TableMaf from "./../../components/TableMaf.vue";
    import SearchInput from "./../../components/searcherComponent.vue";
    import Message from "./../../components/MessageConfirmation.vue";


  export default {
        name: "CharlaReclutamiento",
        components: {
            LoadingComponent,
            Datetime,
            TableMaf,
            SearchInput,
            Message,
        },

        data: () => ({
            isLoading: true,

            locals:[],
            local:{},
            localeRooms:[],
            localeRoom:[],
            studyCenters:[],
            studyCenter:[],
            region:[],
            regions:[],
            statusEvent:[],

            colum:[],
            titleTable:'',

            events:[],
            eventsFull:[],
            event:{},
            turns:[],
            formEvent:{},
            turn:{quota:''},
            formType:'',
            turnType:'',
            titleMessage:'',
            messageBody:'',
            semester:[],
            formNot:{not:'',tit:'',},
        }),

        async created () {
            this.setHeadTable();
            await this.getSessionStorage();
            await this.getStudyCenter();
            await this.getMasters();
            this.getEvents();
            },


        methods: {

            async getLocal(){
                console.log("entró a getLocal");
                const response = await consultServices('getLocale','POST',{});
                this.locals = response ;
                if(this.region != null){
                        console.log("NO ESTÁ VACÍO",this.region )
                }

            },

            async getLocaleRoom(){

                if(this.formType=='EDIT'){
                    this.localeRoom = [];
                    this.$refs.localeRoom.setText("");
                }

                this.localeRooms = [];
                console.log("entró a locales   "+ this.local.id);
                const response = await consultServices('getLocaleRoom','POST',{id:this.local.id});
                this.localeRooms = response ;
            },

            async getLocals(){
                console.log('region', this.region.id)
                const response = await consultServices('getLocale','POST',{});
                var locals=[]
                for (let index = 0; index < response.length; index++) {
                   if(response[index].region == this.region.id ){
                       locals.push(response[index])
                   }
                    
                }
                this.locals = locals ;


            },

            async getStudyCenter(){
                var nulo={id: "0", name: "NINGUNO", active: true};
                const response = await consultServices('getStudyCenter','POST',{});
                this.studyCenters = response;
                this.studyCenters.push(nulo);
            },

            // async getRegion(){

            //     const response = await consultServices('getRegions','POST',{});
            //     this.regions = response;
            // },

            async getSessionStorage(){

                this.isLoading = true;
                //validar si existen los atributos en sessionStorage
                //si no existen y son masterValues, agregar idMaster a ids
                 var ids = [] ;
                 var flagStatusEvent = false;
                if(!window.sessionStorage.statusEvent){
                  ids.push(1);
                  flagStatusEvent = true;
                }
                console.log("acá están las ids " ,ids);
                //si se necesita consultar un valor que no es masterValue pero este no será modificado, consultarlo en esta sección
                if(!window.sessionStorage.regions){
                    this.regions =  await consultServices('getRegions','POST',{});
                    window.sessionStorage.regions  = JSON.stringify(this.regions);

                }
                // if(!window.sessionStorage.studyCenters){
                //     var nulo={id: "0", name: "NINGUNO", active: true};
                //     const response = await consultServices('getStudyCenter','POST',{});
                //     this.studyCenters = response;
                //     this.studyCenters.push(nulo);
                //     window.sessionStorage.studyCenters  = JSON.stringify(this.studyCenters);
                // }

                if( ids.length > 0){

                //Hacer consulta única de masterValues
                    var arrayMasters =  await consultServices('getMasterValues','POST',{ids:ids});
                    console.log("array  ",arrayMasters);
                    //Dividir el arreglo arrayMaster en arreglos por idMaster, en los arreglos definidos por la pantalla
                    if(flagStatusEvent == true){
                       this.statusEvent =  _.filter(arrayMasters, function(master) {return master.idMaster == 1; });
                       window.sessionStorage.statusEvent  = JSON.stringify(this.statusEvent);
                    }

                }

                ////si los datos existen cargarlos en los arreglos definidos para la patalla

                    this.statusEvent =JSON.parse( window.sessionStorage.statusEvent );
                    this.regions =JSON.parse( window.sessionStorage.regions );
                    //this.studyCenters =JSON.parse( window.sessionStorage.studyCenters );

                ////fin de la carga de arreglos para la pantalla

                this.isLoading = false;
            },

            async getMasters(){

                this.isLoading = true;
                if(!window.sessionStorage.semester){
                  var response =  await consultServices('getCurrentSemester','POST', {});
                  this.semester = response;
                  window.sessionStorage.semester  = JSON.stringify(this.semester);
                }
                this.semester =JSON.parse( window.sessionStorage.semester );
                await this.getLocal();
                //await this.getStudyCenter();
                //await this.getRegion();

                this.isLoading = false;
            },

            async getEvents (){

                this.isLoading = true;

                const response = await consultServices('getEvents','POST',{});
                //console.log(response);

                this.setDataTable(response);

                this.isLoading = false;

            },

            async listProvinces() {
                var ctx = this;
             },            

            async createEvent(event){

                this.titleMessage = "Eventos";
                event.startDate = moment(event.startDate).format('YYYY-MM-DD');
                var studyCenterID="";
                //nuevo centro de estudios
                if(this.studyCenter.id==999999){
                    var formNew={name:this.studyCenter.name }
                    const responseCreate = await consultServices('createStudyCenter','POST',formNew)
                    //asignar id del nuevo centro de estudios
                    studyCenterID = responseCreate.id
                }
                else if(this.studyCenter.id==0){
                    console.log("CENTROOOOO ",this.studyCenter)
                    studyCenterID=null;

                }else{
                    studyCenterID=this.studyCenter.id;
                }

                var form = {
                    idLocaleRoom: this.localeRoom.id,
                    region: this.region.id,
                    idStudyCenter: studyCenterID,
                    startDate: event.startDate,
                    semesterCode: this.semester.id
                };
                console.log("valor para id centro de estudios:    "+form.idStudyCenter);
                console.log("fecha:  "+form.startDate);
                console.log("form ::::::::::::", form)

                if(!form.idLocaleRoom && !form.region && !form.idStudyCenter && form.startDate == "Invalid date")
                {
                    this.messageBody="Complete todos los campos";
                    this.$refs.MessageModal.showModal();
                }else{
                    this.isLoading = true;
                    console.log(form);
                    const responseII = await consultServices('newEvent','POST',form);
                    this.getEvents();
                    this.getStudyCenter();
                
                
                if(responseII.id){
                    this.formNot.tit="Actualización correcta "; this.formNot.not="Se actualizó la charla de manera existosa"
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo actualizar la charla"
                }
                this.isLoading = false;
                $('.modal-Trainning').modal('hide');
                $('.bs-example-modal-not').modal('show');

                    // this.isLoading = false;
                    // this.messageBody="Se registro evento";
                    // this.$refs.MessageModal.showModal();
                    // $('.modal-Trainning').modal('hide');

                }

            },

            async updateEventbyStatus(event){


                var mensaje = '';
                var estado = 1;
                if(event.statusCode=='EVENT_CREATED' || event.statusCode=='EVENT_ENROLLMENT_CLOSED')
                {
                    mensaje =  "¿Aperturar inscripciones?";
                    estado = 'EVENT_ENROLLMENT_OPENED' ;
                }
                else
                {
                    if (event.statusCode == 'EVENT_ENROLLMENT_OPENED')
                    {
                        mensaje =  "¿Cerrar inscripciones?";
                        estado = 'EVENT_ENROLLMENT_CLOSED' ;
                    }
                }

                var retVal = confirm(mensaje);
                if( retVal == true ) {
                    this.isLoading = true;
                    var evento = {idEvent:this.event.id, statusCode:estado};
                    const responseII = await consultServices('updateStatusEvent','POST', evento);
                    console.log(responseII);
                    await this.getEvents();

                    var ctx = this;
                    console.log(evento.idEvent)
                    var evenTemp = _.find(this.eventsFull, function(o){ return o.id == evento.idEvent });
                    console.log(evenTemp);
                    this.event = _.cloneDeep(evenTemp);
                    let val = _.find(this.statusEvent, function(o){ return o.code == ctx.event.status_code });
                    this.formEvent.statusCode = this.event.status_code;
                    this.formEvent.statusValue = val.displayValue;

                    $('.modal-Trainning').modal('refresh');

                    this.isLoading = false;
                }
                else
                {
                    return false;
                }
            },

            async updateEvent(event)
            {
                var form = event;
                form.idEvent = this.event.id;
                form.idLocaleRoom = this.localeRoom.id;
                form.region = this.region.id;
                if(this.studyCenter.id == 0 ){
                    form.idStudyCenter = null;
                }
                //nuevo centro de estudios 
                else if(this.studyCenter.id==999999){
                    var formNew={name:this.studyCenter.name }
                    const responseCreate = await consultServices('createStudyCenter','POST',formNew)
                    //asignar id del nuevo centro de estudios
                    form.idStudyCenter = responseCreate.id                
                }else{
                    form.idStudyCenter = this.studyCenter.id;
                }
                event.startDate = moment(event.startDate).format('YYYY-MM-DD');
                this.isLoading = true;
                console.log(form);
                const responseII = await consultServices('updateEvent','POST',form);
                this.getEvents();
                if(responseII[0]){
                    this.formNot.tit="Actualización correcta "; this.formNot.not="Se actualizó la charla de manera existosa"
                }else{
                    this.formNot.tit="Error en la operación  "; this.formNot.not="No se pudo actualizar la charla"
                }
                this.isLoading = false;
                $('.modal-Trainning').modal('hide');
                $('.bs-example-modal-not').modal('show');
               
            },

            async deleteEvent(event){
                var retVal = confirm("Seguro que desea eliminar charla");
                if( retVal == true ) {
                    this.isLoading = true;
                    const responseII = await consultServices('updateStatusEvent','POST',{statusCode:'EVENT_CANCELED', idEvent:this.event.id,});
                    this.getEvents();
                    this.isLoading = false;
                    $('.modal-Trainning').modal('hide');
                }
                else
                {
                    return false;
                }
            },

            async closeEvent(event){
                var retVal = confirm("Seguro que desea cerrar charla");
                if( retVal == true ) {
                    this.isLoading = true;
                    const responseII = await consultServices('updateEventbyStatus','POST',{status:5, _id:event._id,});
                    const response = await consultServices('getEvents','POST',{});
                    this.events = response;
                    console.log(events);
                    this.isLoading = false;
                    $('.modal-Trainning').modal('hide');
                }
                else
                {
                    return false;
                }
            },

            async getTurns(){
                var aux= [];
                this.isLoading = true;

                const response = await consultServices('getTurnbyEvent','POST',{idEvent:this.formEvent.id});
                console.log("response antes cambio  ", response)
                // aux= response

                // console.log("auxiliar antes ", aux)
                // for (let index = 0; index < aux.length; index++) {
                //     aux[index].startHour = moment( response[index].startHour).format('HH:mm:ss');
                //     console.log("moment ", moment( response[index].startHour).format('HH:mm:ss') )
                //      console.log("dentro de moment ",  response[index].startHour)
                // }
                // console.log("auxiliar ", aux)
                // // }
                // // return _.map(response, (turn) => {
                // //     turn.startHour = moment(turn.startHour).format('HH:mm:ss');
                // //     return turn;
                // // });


                this.turns = response;
                console.log("turns en getTurns ", this.turns)


                this.isLoading = false;

            },

            async createTurn(turn){


                var form = _.cloneDeep(turn);
                if (!form.startHour  && !form.idEvent) {
                    this.titleMessage = "Turno";
                    this.messageBody="Complete todos los campos";
                    this.$refs.MessageModal.showModal();
                }
                else{
                    console.log("formulario crear ", form)
                    form.startHour = moment(form.startHour).format('HH:mm:ss');
                    //form.endHour = moment(form.endHour).format('HH:mm:ss');
                    form.idEvent = this.formEvent.id;
                    console.log("turno creado  ", form)
                    const response = await consultServices('addTurn','POST',form);
                    this.addTurnOff();

                    this.getEvents();
                    this.getTurns();
                    this.turn={};
                }



            },

            async updateTurn(turns){

                var _turns = _.cloneDeep(turns);
                console.log("datos que se van a bulkUpdate ",turns);

                this.isLoading = true;

                console.log("HOLI");

                var _turns = this.converTurnHours(turns);
                const responseII = await consultServices('updateTurn','POST',_turns);
                this.getEvents();

                this.isLoading = false;
                $('.modal-Turn').modal('hide');
                this.turns=[];
            },

            async deleteTurn(turn){
                var retVal = confirm("Seguro que desea eliminar turno, no podrá recuperarlo");
                if( retVal == true ) {
                    const responseII = await consultServices('deleteTurn','POST',{idTurn:turn.id});
                    this.getTurns();
                    this.turnType = "None";
                }
                else
                {
                    return false;
                }
            },

            async showEditEvent(event){

                this.isLoading = true;

                this.event = {};
                this.formType = "EDIT";
                this.event = _.cloneDeep(event);
                this.local = _.find(this.locals, function(o){ return o.id==event.locale_id });
                await this.getStudyCenter();
                await this.getLocaleRoom();
                this.region = _.find(this.regions, function(o){ return o.id==event.region });
                console.log('event::::::::::::: ', event)
                console.log('eventRegion::::::::::::', event.region)
                console.log('region::::::::::::', this.region )
                if(event.study_center_id != null){
                    this.studyCenter = _.find(this.studyCenters, function(o){ return o.id==event.study_center_id });
                }else{
                    this.studyCenter = _.find(this.studyCenters, function(o){ return o.id==0 });
                }
                console.log("studycenter:::::::::",this.studyCenter)
                this.localeRoom = _.find(this.localeRooms, function(o){ return o.id==event.locale_room_id });
                this.$refs.locale.setText(this.local.name);
                this.$refs.localeRoom.setText(event.locale_room_name);
                this.$refs.region.setText(this.region.name);
                this.$refs.studyCenter.setText(this.studyCenter.name);

                var ctx = this;
                this.formEvent = {
                        startDate: ctx.event.start_date,
                        statusCode: ctx.event.status_code,
                        }
                if(this.event.status_code != 'EVENT_ENROLLMENT_CLOSED'){

                    let val = _.find(this.statusEvent, function(o){ return o.code == ctx.event.status_code });
                    this.formEvent.statusValue = val.displayValue;

                }

                this.isLoading = false;

            },
            showAddTurn(){
                this.turnType = "ADD";
            },

            showTurns(event){
                this.formEvent = _.cloneDeep(event);
                this.getTurns();
            },

            showAddEvent(){
                this.formType = "ADD";
                this.formEvent = {
                    startDate : '',
                };
                this.local = {};
                this.$refs.locale.cleanText();
                this.localeRoom = {};
                this.$refs.localeRoom.cleanText();
                this.region = {};
                this.$refs.region.cleanText();
                this.studyCenter = {};
                this.$refs.studyCenter.cleanText();
            },

            showDateModal(day){
                return moment(day).toISOString();
            },

            showDate(day){
                return moment(day).format('DD/MM/YYYY');
            },

            // showTurnHours(turns)
            // {
            //     return _.map(turns, (turn) => {
            //         turn.startHour = this.showHour(turn.startHour);
            //         //turn.endHour = this.showHour(turn.endHour);
            //         return turn;
            //     });
            // },

            converTurnHours(turns){
                console.log("entró a converTurnHours ", turns)

                return _.map(turns, (turn) => {

                    if(turn.startHour.split(".").length > 1){
                        turn.startHour = moment(turn.startHour).format('HH:mm:ss');
                    }
                    return turn;
                });
            },

            showHour(hour){
                return moment(hour).toISOString();
            },

            setHeadTable(){
            this.colum = [
                {label:'Fecha de charla' ,name:'startDate' ,find:1},
                {label:'Dirigido a' ,name:'nameStudyCenter' ,find:1 ,sort:1},
                {label:'Lugar' ,name:'nameLocaleRoom' ,find:1 ,sort:1},
                {label:'Dirección' ,name:'address' ,find:1 ,sort:1},
                {label:'Inscritos' ,name:'totalSignups' ,find:1 ,sort:1},
                {label:'Asistencia' ,name:'totalAttendance' ,find:1 ,sort:1},
                {label:'Estado' ,name:'statusDescription' ,find:1 ,sort:1},
                {label:'Acciones' ,name:'actions' ,find:0 ,sort:0}];
            this.titleTable = "Charlas";
            },

            refreshData(){
                this.$refs.tableMaf.formatData(this.events);
            },

            setDataTable(arrayData){
                var ctx = this;
                this.events = [];
                this.eventsFull = _.cloneDeep(arrayData);
                arrayData.forEach(item => {
                    var eventStatus = {};
                    eventStatus = _.find(this.statusEvent, function(o){ return o.code == item.status_code });
                    if (!eventStatus){
                        eventStatus = {};
                        switch (item.status_code) {
                            case 'EVENT_ENROLLMENT_CLOSED':
                                eventStatus.displayValue = "Inscripciones cerradas";
                                break;
                            default:
                            eventStatus.displayValue = item.status_code;
                                break;
                        }
                    }
                    var object = {};
                        object.startDate = moment(item.start_date).format('DD/MM/YYYY');
                        object.nameStudyCenter  = item.study_center_name;
                        object.nameLocaleRoom = item.locale_room_name;
                        object.address = item.address;
                        object.totalSignups = item.total_signups;
                        object.totalAttendance = item.total_attendances;


                        object.statusDescription = <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            {item.status_code=='EVENT_CREATED'?<button type="button" class="btn btn-success btn-xs">{eventStatus.displayValue}</button>:null}
                            {item.status_code=='EVENT_ENROLLMENT_OPENED'?<button type="button" class="btn btn-info btn-xs">{eventStatus.displayValue}</button>:null}
                            {item.status_code=='EVENT_ENROLLMENT_CLOSED'?<button type="button" class="btn btn-warning btn-xs">{eventStatus.displayValue}</button>:null}
                        </font></font>;

                        object.actions = <font style="vertical-align: inherit;">
                                                  <div> <button onClick={()=>ctx.showEditEvent(item)} data-toggle="modal" data-target=".modal-Trainning" class="btn btn-primary btn-xs" >Editar charla</button></div>
                                                  <div> <button onClick={()=>ctx.showTurns(item)} data-toggle="modal" data-target=".modal-Turn" class="btn btn-warning btn-xs">Ver turnos</button></div>
                                                  {item.status_code=='EVENT_ENROLLMENT_OPENED'? <div>   <a href={'/dashboard/asisenciareclu/'+ item.id } class="btn btn-success btn-xs" target="_newtab">Link asistencias</a></div>:null}
                                                 

                                                  </font>;

                    this.events.push(object);
                });

                    this.refreshData();
                },

            addTurnOff(){
                this.turnType = "None";
            }


        },

    }

</script>

<style scoped>
</style>
