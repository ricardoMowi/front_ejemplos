<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card-body" background-color= #198ac8>
                <div class="card">
                    <div class="card-body">
                        <div class="card-body">
                            <h2>Usted no cuenta con los permisos suficientes </h2>
                        </div>                    
                        <a href= '/dashboard/escritorio/' ><button type="button" class="btn btn-primary" >Ir al inicio </button></a>             
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
