<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h1>Bienvenido</h1>
                    <div class="clearfix"></div>
                </div>

                <div class="card-body">
                    
                    <div class="card-body">
                        <h2>Usted ya ha iniciado sesión</h2>
                    </div>                    
                     <a href= '/dashboard/escritorio/'  target="_newtab"><button type="button" class="btn btn-primary" > Ir a intranet </button></a>
              




                </div>
            </div>
        </div>
    </div>
</template>
