<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Crea+ Perú</h2>
                    <div class="clearfix"></div>
                </div>

                <div class="card">
                    <h2>Estamos llegando a {{countSchcools}} colegios a nivel nacional. En caso tengas un viaje programado puedes visitar alguna de las sedes los sábados.</h2>
                </div>

                <div class="card-body">
                    <TableMaf :header="colum" :data="schools" :tableTitle="titleTable"  ref="tableMaf" >
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
        name: "ColegiosNivelNacionalContainer",
        components: {
            LoadingComponent,
            TableMaf,
        },
        data: () => ({
            isLoading:false,
            schools:[],
            idsDistrict:[],
            countSchcools: 0,
            titleTable:"",
        }),
        async created () {
            this.isLoading = true;
            await this.setHeadTable();
            await this.listSchools();
            this.isLoading = false;
        },
        
        methods: {
            async listSchools() {
                this.isLoading = true;
                
                const arraySchools =  await consultServices('listSchools','POST',{});
                
                this.idsDistrict = await this.getIdsDistricts(arraySchools);

                const form = {
                    idsDistrict:this.idsDistrict
                }

                const response = await consultServices('getLocationsByDisctrics','POST',form);

                this.setDataTable(arraySchools,response);
                this.isLoading = false;
            },
            getIdsDistricts (arraySchools) {
                var idsDistrict = [];
                arraySchools.forEach(element => {
                    idsDistrict.push(element.district);
                });
                return idsDistrict;
            },
            setHeadTable() {
                this.colum = [
                    {label:'Nombre' ,name:'name' ,find:1 ,sort:0},
                    {label:'Dirección' ,name:'address' ,find:1 ,sort:0},
                    {label:'Región' ,name:'region' ,find:1 ,sort:0},
                    {label:'Distrito' ,name:'district' ,find:1 ,sort:0},
                ]
                this.titleTable = "Lista de colegios";
            },
             setDataTable(arraySchools,regions) {
                var ctx = this;
                this.schools = [];
                arraySchools.forEach(item => {
                    var school = {};
                    school.name = item.name;
                    school.address = item.address;
                    _.map(regions,(region)=>{
                        if(region.id == item.region) {
                            school.region = region.name;
                        }
                        _.map(region.Provinces,(province)=>{
                            _.map(province.Districts,(district)=>{
                                if(district.id == item.district) {
                                    school.district = district.name;
                                }
                            });
                        });
                    });
                    this.schools.push(school);
                    this.countSchcools = this.schools.length;
                });
                this.$refs.tableMaf.formatData(this.schools);
            },
        }
    }
</script>