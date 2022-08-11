<template>
        <!--Modal Evaluated-->
    <div class="modal fade modal-Message" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">{{titleMessage}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <p> {{bodyMessage}} </p>
                </div> <!--Body-->
            </div> <!--Content-->
        </div>
    </div>
            
    <!--Modal Evaluated-->
</template>

<script>

    //COMPONENTS
    import LoadingComponent from "./../components/loadingComponent.vue";

    export default {
        name: "modalEvaluatedComponent",
        props: ['titleMessage','bodyMessage','callbackData'],

        data: () => ({
          isLoading:false,
        }),

        created () {
        },

        methods: {
            
            showModal(){
                $('.modal-Message').modal('show');
                
            },
        },

    }
</script>

<style>

</style>
