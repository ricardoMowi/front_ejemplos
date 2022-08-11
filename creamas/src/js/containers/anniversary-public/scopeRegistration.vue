<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card-body" background-color= #198ac8>
                <div class="card">
                        <div class="card-header">
                            <center>
                                <img src="/LogoCrea.png" alt="img" class="img-responsive" width="200" heigth="100">
                            </center>
                            <h1>10 años Crea+</h1>
                            <h4>Como saben, este año celebraremos los 10 años de Crea+ en colegios públicos.</h4>
                            <h4>Queremos que sea una celebración de cumpleaños número 10 que sirva para REENCONTRARNOS y CELEBRAR con todos los que hemos hecho posible que Crea+ exista.</h4>
                            <h4>Te pedimos dejes aquí tus datos para mantenerte al tanto de los preparativos de esta celebración y para mantenernos en contacto de aquí a futuro. </h4>
                            <h4>Gracias, ¡será genial contar contigo! </h4>
                            <h5>(*) Campos requeridos</h5>                  
                        </div>                         
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 col-sm-12 col-xs-12" v-on:keyup.enter="searchParticipant" >
                                    <inputMaf type="text" v-model="documentNumber" :valueInput='documentNumber'
                                    label="Número de Documento (*):" :validation="{required:true, alpha_num:true, max:60}" etiqueta='true' ref="inputDocument"  >
                                    </inputMaf>
                                    <div class="small text-muted">
                                        <center style="color: blue;"><span>Búsqueda de documento</span>: Completa el campo y presiona ENTER en tu PC o celular. </center>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <!-- Nombre del voluntario -->
                    <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Nombres:</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" v-model="volunteerName" class="form-control col-md-7 col-xs-12" readonly="readonly">
                        </div>
                    </div>
                    <!--Link de post-->
                    <div class="card-body">
                        <inputMaf type='text' v-model="link.postUrl" :valueInput="link.postUrl" label="Link del post (*):" :validation="{required:true, alpha_num:true}" etiqueta='true' ref="inputPostUrl" />
                    </div>

                    <!--Iteracciones-->
                        <div class="card-body">
                        <inputMaf type='number' v-model="link.userLikesCount" :valueInput="link.userLikesCount" label="Num. iteracciones (*):" :validation="{required:true, numeric:true}" etiqueta='true' ref="inputUserLikesCount" />
                    </div>

                    <!--Comentarios-->
                        <div class="card-body">
                        <inputMaf type='number' v-model="link.userCommentsCount" :valueInput="link.userCommentsCount" label="Num. comentarios (*):" :validation="{required:true, numeric:true}" etiqueta='true' ref="inputUserCommentsCount" />
                    </div>

                    <!--Compartidos-->
                    <div class="card-body">
                        <inputMaf type='number' v-model="link.userSharesCount" :valueInput="link.userSharesCount" label="Num. compartidos (*):" :validation="{required:true, numeric:true}" etiqueta='true' ref="inputUserSharesCount" />
                    </div>
                    <!-- Attachment -->
                    <div class="form-group">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Captura de pantalla (*):</label>
                            <div class="col-md-6 col-sm-6 col-xs-12 ">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile" ref="inputAttachment" accept="image/*" v-on:change="handleFileUpload">
                                <label class="custom-file-label" for="customFile">{{this.attachmentName}}</label>
                            </div>
                            </div>
                        </div>
                    </div>  
                    <div class="modal-footer">
                        <button type="button" @click="registerLink" class="btn btn-primary"> Enviar </button>
                    </div>
                </div>
            </div> <!--card-body-->
                <!--Modal not-->
            <div class="modal fade bs-example-modal-not" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-cat">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" > {{formNot.title}} </h5>
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body">{{formNot.not}}</div>
                        <div class="modal-footer">
                            <center>
                                <button type="button" data-dismiss="modal" class="btn btn-success" >Aceptar</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
                <!--Modal not-->
        </div> <!--col 12 -->
    </div> <!--row-->
</template>

<script>
    import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    import modalEvaluatedComponent from "./../../components/modalEvaluatedComponent.vue";
    import moment from 'moment';
    import inputMaf from "./../../components/inputMaf.vue";


    export default {
        components: {
            LoadingComponent,
            modalEvaluatedComponent,
            inputMaf,
        },
        data: () => ({
            isLoading: true,
            documentNumber: '',
            volunteerName: '',
            attachmentName: 'Selecciona un archivo',
            attachment: {},
            link: {
                idParticipation:'',
                userLikesCount:0,
                userSharesCount:0,
                userCommentsCount:0,
                postUrl:'',
                attachmentUrl:'',
            },
            readonly:1,
            formNot:{not:'',title:'',},

        }),
        created () {
            this.isLoading = false;
        },

        methods: {

            async showNotificacion(){
                $('.bs-example-modal-not').modal('show');
            },

            /**
             * handleFileUpload: Sube la imagen a Spaces
            */
            async handleFileUpload(e){
                //seteamos el sufijo indicando la carpeta y subcarpeta con el número de documento del usuario
                this.attachment = e.target.files[0]
                this.attachmentName = this.attachment.name
            },

            /**
             * registerLink: Registra un nuevo link en el sistema
            */
            async registerLink() {
                //Validamos su puso número de documento
                if(this.documentNumber != '' ){
                    //si alguno los campos obligatorios están vacíos, informar 
                    if(this.link.idParticipation == '' || this.link.userLikesCount === '' 
                     || this.link.userSharesCount === '' || this.link.userCommentsCount === '' 
                     || this.link.postUrl == '' || !this.attachment.name){
                        this.formNot.title="Campos vacíos"; this.formNot.not="Por favor complete los campos obligatorio (*)";
                        $('.modal').modal('hide');
                        this.showNotificacion();  
                    }else{
                        //Registrar Link  
                        if(confirm("¿Registrar participación?")){     
                            this.isLoading = true;  
                            //Subiremos el archivo!
                            const urlSufix = 'anniversary/'+ this.documentNumber +'/'
                            var formData = new FormData();
                                formData.append('file',this.attachment)
                                var url = 'upload/uploadAttachment?urlSufix='+urlSufix
                                fetch(url, {
                                    method:'POST',
                                    body: formData
                                })
                                .then(response => {
                                    if (response.ok) {
                                        response.json()
                                        .then(async data => {
                                        if(data.error){
                                            this.formNot.title="Esta opción no fue posible"; this.formNot.not="Hubo un error subiendo tu captura, por favor. Vuelve a intentar más tarde.";
                                            $('.modal').modal('hide');
                                            this.showNotificacion();
                                        }else{
                                            this.link.attachmentUrl = data.generatedUrl;
                                            const response = await consultServices('createScopeLink','POST',this.link);
                                            if(response.message){
                                                this.formNot.title="Esta opción no es posible"; this.formNot.not = response.message;
                                            }else{
                                                this.formNot.title="Registro exitoso";
                                                this.formNot.not="Registro realizado de manera correcta."; 
                                                this.ClearForm();
                                            }
                                            $('.modal').modal('hide');
                                            this.showNotificacion();   
                                        }
                                        this.isLoading = false;
                                        })
                                    }else{
                                    this.isLoading = false;
                                    }
                                })
                        }
                    }  
                }else{
                    this.formNot.title="Campo vacío"; this.formNot.not="Complete el número de documento ";
                   $('.modal').modal('hide');
                   this.showNotificacion();
                }     
            },

            /**
             * ClearForm: Limpia los campos usados para poder reusar el formulario
            */
            async ClearForm(){
                this.volunteerName = '';
                this.attachment = {};
                this.attachmentName = 'Selecciona un archivo';
                this.documentNumber = '';
                this.link = {
                    idParticipation:'',
                    userLikesCount:0,
                    userSharesCount:0,
                    userCommentsCount:0,
                    postUrl:'',
                    attachmentUrl:'',
                }
                this.$refs.inputPostUrl ? await this.$refs.inputPostUrl.clearValue() : null
                // this.$refs.inputUserLikesCount ? await this.$refs.inputUserLikesCount.clearValue() :null
                // this.$refs.inputUserCommentsCount ? await this.$refs.inputUserCommentsCount.clearValue() :null
                // this.$refs.inputUserSharesCount ? await this.$refs.inputUserSharesCount.clearValue() :null
                this.$refs.inputDocument ? await this.$refs.inputDocument.clearValue() :null
            },

            /**
             * searchParticipant: Busca el registro de participación del dni indicado.
             * Coloca el nombre del participante en el campo de nombres y notifica si hay un problema
            */
            async searchParticipant() {
                if(this.$refs.inputDocument.returnValidation() == false ){
                   this.formNot.title="Campo vacío"; this.formNot.not="Complete el número de documento ";
                   this.showNotificacion();
                }else{
                    this.isLoading = true;
                    const response = await consultServices('getParticipantByDocument','POST',{documentNumber:this.documentNumber});

                    if(response.message){
                        this.formNot.title="Esta opción no es posible"; this.formNot.not=response.message;
                        this.showNotificacion();
                    }else{
                        this.link.idParticipation = response.SpecialEventParticipations[0].id
                        this.volunteerName = response.name + ' ' + response.lastName + ' ' + (response.secondLastName ? response.secondLastName : '')
                    }
                    this.isLoading = false;
                }
            }
        }


    }
</script>
<style>
.inner {
  display: table;
  margin: 0 auto;

}

.outer {

  width:100%
}
</style>
