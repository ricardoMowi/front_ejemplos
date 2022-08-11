<template>
    <div class="row">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="card-header">
                    <h2>Crea+ Perú</h2>
                    <div class="clearfix"></div>
                </div>
                <div id="wrapper">
                <div id="container">
                    <ol class="organizational-chart">
                        <li>
                            <div class="cardPerson-wrapper">
                                <div class="cardPerson">
                                    <a disabled="disabled" class="cardPerson-link" :href="organization.url" target="_blank">
                                        <div class="cardPerson-information-img-wrapper"><img class="cardPerson-information-img" :src="organization.img" width="100" height="100"></div>
                                        <div class="cardPerson-information-wrapper">
                                            <div class="cardPerson-information-name">{{organization.name}}</div>
                                            <div class="cardPerson-information-title">{{organization.title}}</div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                            <ol v-if="organization.childrenFlag == true">
                                <li v-for="volunteer in organization.children">
                                    <div class="cardPerson-wrapper">
                                        <div class="cardPerson">
                                            <a class="cardPerson-link" :href="volunteer.url" target="_blank">
                                                <div class="cardPerson-information-img-wrapper"><img class="cardPerson-information-img" :src="volunteer.img" width="100" height="100"></div>
                                                <div class="cardPerson-information-wrapper">
                                                    <div class="cardPerson-information-name">{{volunteer.name}}</div>
                                                    <div class="cardPerson-information-title">{{volunteer.title}}</div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <ol v-if="volunteer.childrenFlag == true">
                                        <li v-for="volunteer2 in volunteer.children">
                                            <div class="cardPerson-wrapper">
                                                <div class="cardPerson">
                                                    <a class="cardPerson-link" :href="volunteer2.url" target="_blank">
                                                        <div class="cardPerson-information-img-wrapper"><img class="cardPerson-information-img" :src="volunteer2.img" width="100" height="100"></div>
                                                        <div class="cardPerson-information-wrapper">
                                                            <div class="cardPerson-information-name">{{volunteer2.name}}</div>
                                                            <div class="cardPerson-information-title">{{volunteer2.title}}</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import consultServices from './../../utilities/consultServices.js';
    import LoadingComponent from "./../../components/loadingComponent.vue";
    import _ from 'lodash';
    export default {
        name: "LideresCreaContainer",
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading:false,
            nodes:[],
            organization:{},
            semester:{},
        }),
        async created () {
          await this.getMasterValues();
          await this.createHierarchy();
        },
        methods: {

            async getMasterValues() {

                  if(!window.sessionStorage.semester){
                    var response =  await consultServices('getCurrentSemester','POST', {});
                    this.semester = response;
                    window.sessionStorage.semester  = JSON.stringify(this.semester);
                  }

                  this.semester =JSON.parse( window.sessionStorage.semester );
              },

            treeOrganizationA (org) {
                var organization = {};
                    organization.title = org.name;

                    if(org.VolunteerJobs.length == 0) {
                        organization.name = "Vacante";
                        organization.img = "./user.png";
                        organization.url = null;
                    } else {
                        organization.name = (org.VolunteerJobs[0].Volunteer.name != null ? org.VolunteerJobs[0].Volunteer.name : "") + (org.VolunteerJobs[0].Volunteer.lastName != null ? " " + org.VolunteerJobs[0].Volunteer.lastName : "");
                        organization.img = (org.VolunteerJobs[0].Volunteer.imageUrl != null ? org.VolunteerJobs[0].Volunteer.imageUrl : "./user.png");
                        organization.url = (org.VolunteerJobs[0].Volunteer.websiteUrl != null ? org.VolunteerJobs[0].Volunteer.websiteUrl : null);
                    }
                    organization.childrenFlag = false;
                    if(org.childen.length != 0) {
                        organization.childrenFlag = true;
                        organization.children = [];
                        _.map(org.childen,(volunteer2)=>{
                            var aux2 = {};
                             aux2.title = volunteer2.name;
                             if(volunteer2.VolunteerJobs.length == 0) {
                                 aux2.name = "Vacante";
                                 aux2.img = "./user.png";
                                 aux2.url = null;
                             } else {
                                 aux2.name = (volunteer2.VolunteerJobs[0].Volunteer.name != null ? volunteer2.VolunteerJobs[0].Volunteer.name : "") + (volunteer2.VolunteerJobs[0].Volunteer.lastName != null ? " " + volunteer2.VolunteerJobs[0].Volunteer.lastName : "");
                                 aux2.img = (volunteer2.VolunteerJobs[0].Volunteer.imageUrl != null ? volunteer2.VolunteerJobs[0].Volunteer.imageUrl : "./user.png");
                                 aux2.url = (volunteer2.VolunteerJobs[0].Volunteer.websiteUrl != null ? volunteer2.VolunteerJobs[0].Volunteer.websiteUrl : null);
                            }
                            aux2.childrenFlag = false;
                             if(volunteer2.childen.length !=0) {
                                 aux2.childrenFlag = true;
                                 aux2.children = [],
                                 _.map(volunteer2.childen,(volunteer3)=>{
                                     var aux3 = {};
                                     aux3.title = volunteer3.name;
                                     if(volunteer3.VolunteerJobs.length == 0) {
                                         aux3.name = "Vacante";
                                         aux3.img = "./user.png";
                                         aux3.url = null;
                                     } else {
                                         aux3.name = (volunteer3.VolunteerJobs[0].Volunteer.name != null ? volunteer3.VolunteerJobs[0].Volunteer.name : "") + (volunteer3.VolunteerJobs[0].Volunteer.lastName != null ? " " + volunteer3.VolunteerJobs[0].Volunteer.lastName : "");
                                         aux3.img = (volunteer3.VolunteerJobs[0].Volunteer.imageUrl != null ? volunteer3.VolunteerJobs[0].Volunteer.imageUrl : "./user.png");
                                         aux3.url = (volunteer3.VolunteerJobs[0].Volunteer.websiteUrl != null ? volunteer3.VolunteerJobs[0].Volunteer.websiteUrl : null);
                                     }
                                     aux2.children.push(aux3);
                                 });
                             }
                             organization.children.push(aux2);
                        });
                    }

                return organization;
            },
            async createHierarchy() {
                this.isLoading=true;

                const response = await consultServices('getOrganizationTree','POST', { semesterCode: this.semester.id });

                this.organization = await this.treeOrganizationA(response);

                this.isLoading=false;

            },

        }
    }
</script>
<style scoped>
.card-tree-organization {
    height: 800px;
}

</style>
<style>
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        background-color: #1d1f20;
        font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
    }

    #wrapper {
        overflow-y: scroll;
        display: block;
    }

    #container {
        float: left;
        padding: 1em;
    }

    .cardPerson   {
        width: 200px!important;
        margin-right: auto !important;
        margin-left: auto !important;

        background: white!important;
        border: 3px solid #0059a8;
    }

    .cardPerson-wrapper {
        margin-right: 10px!important;
        margin-left: 10px!important;
    }

    ol.organizational-chart,
    ol.organizational-chart ol,
    ol.organizational-chart li,
    ol.organizational-chart li > div {
        position: relative;
    }

    ol.organizational-chart,
    ol.organizational-chart ol {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ol.organizational-chart {
        text-align: center;
    }

    ol.organizational-chart ol {
        padding-top: 1em;
    }

    ol.organizational-chart ol:before,
    ol.organizational-chart ol:after,
    ol.organizational-chart ol:after,
    ol.organizational-chart li:before,
    ol.organizational-chart li:after{
        background-color: #0059a8;
        content: '';
        position: absolute;
    }

    ol.organizational-chart ol > li {
        padding: 1em 0 0 1em;
    }

    ol.organizational-chart > li ol:before {
        height: 1em;
        left: 50%;
        top: 0;
        width: 3px;
    }

    ol.organizational-chart > li ol:after {
        height: 0;
        left: 3px;
        top: 0;
        width: 50%;
    }

    ol.organizational-chart > li ol > li:not(:last-of-type):before {
        height: 1em;
        left: 50%;
        top: 0;
        width: 3px;
    }
    ol.organizational-chart > li ol > li:first-of-type:not(:only-of-type):after {
        width: 51%;
        left: 50%;
    }

    ol.organizational-chart > li ol > li:not(:last-of-type):after {
      top: 0;
      height: 3px;
      left: 0;
      width: 100%;
    }

    ol.organizational-chart > li ol > li:last-of-type:before {
      height: 1em;
        left: 50%;
        top: 0;
        width: 3px;
    }

    ol.organizational-chart > li ol > li:last-of-type:after {
      height: 3px;
      top: 0;
      width: 50%;
      right: 50%;
    }

    ol.organizational-chart > li ol > li:only-child:after {
      width: 0;
    }

    ol.organizational-chart li > div.cardPerson-wrapper .cardPerson {
        background-color: #fff;
        border-radius: 3px;
        min-height: 2em;
        padding: 0.5em;
    }

    /*** PRIMARY ***/
    ol.organizational-chart > li > div.cardPerson-wrapper .cardPerson {
        background-color: #a2ed56;
        margin-right: 1em;
    }

    ol.organizational-chart > li > div:before {
        bottom: 2em;
        height: 3px;
        right: -1em;
        width: 1em;
    }

    ol.organizational-chart > li > div:first-of-type:after {
        bottom: 0;
        height: 2em;
        right: -1em;
        width: 3px;
    }

    ol.organizational-chart > li > div + div {
        margin-top: 1em;
    }

    ol.organizational-chart > li > div + div:after {
        height: calc(100% + 1em);
        right: -1em;
        top: -1em;
        width: 3px;
    }

    /*** SECONDARY ***/
    ol.organizational-chart > li > ol:before {
        left: inherit;
        right: 0;
    }

    ol.organizational-chart > li > ol:after {
        left: 0;
        width: 100%;
    }

    ol.organizational-chart > li > ol > li > div.cardPerson-wrapper .cardPerson {
        background-color: #83e4e2;
    }

    /*** TERTIARY ***/
    ol.organizational-chart > li > ol > li > ol > li > div.cardPerson-wrapper .cardPerson {
        background-color: blue;
        margin: 10;
        margin-bottom: 0;
    }

    /*** QUATERNARY ***/
    ol.organizational-chart > li > ol > li > ol > li > ol > li > div.cardPerson-wrapper .cardPerson {
        background-color: #fca858;
        margin: 10;
    }



        ol.organizational-chart {
            margin-left: -1em;
            margin-right: -1em;
        }

        /* PRIMARY */
        ol.organizational-chart > li > div {
            display: inline-block;
            float: none;
            margin: 0 1em 1em 1em;
            vertical-align: bottom;
        }

        ol.organizational-chart > li > div:only-of-type {
            margin-bottom: 0;
            width: calc((100% / 1) - 2em - 4px);
        }

        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(2),
        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(2) ~ div {
            width: calc((100% / 2) - 2em - 4px);
        }

        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(3),
        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(3) ~ div {
            width: calc((100% / 3) - 2em - 4px);
        }

        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(4),
        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(4) ~ div {
            width: calc((100% / 4) - 2em - 4px);
        }

        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(5),
        ol.organizational-chart > li > div:first-of-type:nth-last-of-type(5) ~ div {
            width: calc((100% / 5) - 2em - 4px);
        }

        ol.organizational-chart > li > div:before,
        ol.organizational-chart > li > div:after {
            bottom: -1em!important;
            top: inherit!important;
        }

        ol.organizational-chart > li > div:before {
            height: 1em!important;
            left: 50%!important;
            width: 3px!important;
        }

        ol.organizational-chart > li > div:only-of-type:after {
            display: none;
        }

        ol.organizational-chart > li > div:first-of-type:not(:only-of-type):after,
        ol.organizational-chart > li > div:last-of-type:not(:only-of-type):after {
            bottom: -1em;
            height: 3px;
            width: calc(50% + 1em + 3px);
        }

        ol.organizational-chart > li > div:first-of-type:not(:only-of-type):after {
            left: calc(50% + 3px);
        }

        ol.organizational-chart > li > div:last-of-type:not(:only-of-type):after {
            left: calc(-1em - 3px);
        }

        ol.organizational-chart > li > div + div:not(:last-of-type):after {
            height: 3px;
            left: -2em;
            width: calc(100% + 4em);
        }

        /* SECONDARY */
        ol.organizational-chart > li > ol {
            display: flex;
            flex-wrap: nowrap;
        }
         /*** Tercero ***/
         ol.organizational-chart > li > ol > li > ol {
            display: flex;
            /* flex-wrap: nowrap; */
        }
        /*** Cuarto ***/
        ol.organizational-chart > li > ol > li > ol > li > ol {
            display: flex;
            /* flex-wrap: nowrap; */
        }

        /* ** QUATERNARY **
        ol.organizational-chart > li > ol > li > ol {
            display: flex;
            flex-wrap: nowrap;
        } */

        ol.organizational-chart > li > ol:before,
        ol.organizational-chart > li > ol > li:before {
            height: 1em!important;
            left: 50%!important;
            top: 0!important;
            width: 3px!important;
        }

        ol.organizational-chart > li > ol:after {
            display: none;
        }

        ol.organizational-chart > li > ol > li {
            flex-grow: 1;
            padding-left: 1em;
            padding-right: 1em;
            padding-top: 1em;
        }


        ol.organizational-chart > li > ol > li:only-of-type {
            padding-top: 0;
        }

        ol.organizational-chart > li > ol > li:only-of-type:before,
        ol.organizational-chart > li > ol > li:only-of-type:after {
            display: none;
        }

        ol.organizational-chart > li > ol > li:first-of-type:not(:only-of-type):after,
        ol.organizational-chart > li > ol > li:last-of-type:not(:only-of-type):after {
            height: 3px;
            top: 0;
            width: 50%;
        }

        ol.organizational-chart > li > ol > li:first-of-type:not(:only-of-type):after {
            left: 50%;
        }

        ol.organizational-chart > li > ol > li:last-of-type:not(:only-of-type):after {
            left: 0;
        }

        ol.organizational-chart > li > ol > li + li:not(:last-of-type):after {
            height: 3px;
            left: 0;
            top: 0;
            width: 100%;
        }

        .cardPerson-link {
            display:flex;
        }
        .cardPerson-information-img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .cardPerson-information-wrapper {}
        .cardPerson-information-name {}
        .cardPerson-information-title {
            color: #0059a8;
            margin-top: 10px;
        }

</style>
