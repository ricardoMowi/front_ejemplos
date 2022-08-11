import Api from './Api';
const koa = require('koa');
import _ from 'lodash';
const userAgent = require('koa-useragent');
import aws from 'aws-sdk';
import fs from 'fs';
import fsExtra from 'fs-extra';
import moment from 'moment';

module.exports.login = async (ctx,next) => {
  const body = ctx.request.body;
  let response = await Api.login(body);
  ctx.session.user= response.body
  // if(!response.code) {
  //   if(response.body.roles){
  //     ctx.session.user=response.body;
  //   //ctx.session.allAccess=(response.idOrganization)?false:true;
  //   } else {
  //     console.log('Fallo', response)
  //     if(response.status && response.body){
  //     }else{
  //       response =  {
  //         status:800,
  //         body:{
  //             code: 800,
  //             message:'Intente nuevamente o contacte al administrador.'
  //           }
  //       }
  //     }
  //   }
  // }
  ctx.status = response.status;
  ctx.body = JSON.stringify(response.body);
}
//////////////////MONITOREO///////////////////
module.exports.getActiveServices = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.getActiveServices(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.getActiveRiders = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.getActiveRiders(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.getService = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.getService(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.getRider = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.getRider(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

/////////////////////USER///////////////////////
module.exports.updateUser = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateUser(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.validateUser = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.validateUser(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.showUser = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.showUser(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.registerUser = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.signUp(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
module.exports.resetPassword = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.resetPassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.changePassword = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.changePassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.generatePasswordToken = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.generatePasswordToken(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.findByToken = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.findByToken(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}
module.exports.validPassword = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.validPassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.resetPassword = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.resetPassword(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;

}

//Client
module.exports.listClients = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listClients(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createClient = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createClient(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.searchClients = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.searchClients(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}
//Rider
module.exports.listRiders = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listActiveRiders(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.setActive = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.setActive(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.setupRider = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.setupRider(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateDocumentation = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateDocumentation(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//News
module.exports.listNews = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listNews(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.searchNews = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.searchNews(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createNewRecord = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createNewRecord(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateNewRecord = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateNewRecord(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteNewRecord = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteNewRecord(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.publishNewRecord = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.publishNewRecord(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.unpublishNewRecord = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.unpublishNewRecord(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


//Especialidades
module.exports.listSpecialties = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listSpecialties(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createSpeciality = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createSpeciality(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


module.exports.updateSpeciality = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateSpeciality(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteSpeciality = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteSpeciality(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Especialistas
module.exports.listSpecialists = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listSpecialists(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.reportAdmin = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.reportAdmin(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createSpecialist = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createSpecialist(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


module.exports.updateSpecialist = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateSpecialist(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteSpecialist = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteSpecialist(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Pacientes
module.exports.listPatients = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listPatients(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createPatient = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createPatient(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


module.exports.updatePatient = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updatePatient(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deletePatient = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deletePatient(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//HCPBS
module.exports.listHCPBs = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listHCPBs(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.showHCPB = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.showHCPB(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createHCPB = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createHCPB(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


module.exports.updateHCPB = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateHCPB(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.terminatedHCPB = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.terminatedHCPB(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteHCPB = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteHCPB(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//CONTROLS
module.exports.listControls = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listControls(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.showControl = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.showControl(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createControl = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createControl(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteControl = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteControl(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


//EMERGENCIES
module.exports.listEmergencies = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listEmergencies(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.showEmergency = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.showEmergency(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createEmergency = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createEmergency(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteEmergency = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteEmergency(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.classifyPregnancy = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.classifyPregnancy(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}


//Service
module.exports.createService = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createService(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateService = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateService(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Credits
module.exports.listCredits = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listCredits(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.searchCredits = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.searchCredits(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createCredit = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createCredit(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.approveCredit = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.approveCredit(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.rejectCredit = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.rejectCredit(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.deleteCredit = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.deleteCredit(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getConfiguration = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.getConfiguration(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.saveConfiguration = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.saveConfiguration(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.getSuggestions = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.getSuggestions(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.searchSuggestions = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.searchSuggestions(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Questions
module.exports.listQuestions = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.listQuestions(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}





module.exports.searchQuestions = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.searchQuestions(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.createQuestion = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.createQuestion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.updateQuestion = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.updateQuestion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

module.exports.publishQuestion = async (ctx,next) => {
  const body = ctx.request.body;
  const response = await Api.publishQuestion(body);
  ctx.body = JSON.stringify(response.body);
  ctx.status = response.status;
}

//Upload
/**
 * uploadAttachment: Sube el archivo a Spaces
*/
module.exports.uploadAttachment = async (ctx, next) => {
  console.log('Controller uploadAttachment')
  //Obtenemos el sufijo del archivo
  const urlSufix = ctx.request.query.urlSufix

  if (ctx.request.query.fileName){
    const fileName = ctx.request.query.fileName
    const file = ctx.request.body.files.file;
    // console.log('archivo: ', ctx.request.body)
    await uploadFileDO(file, urlSufix, fileName).then((temp) =>{
      ctx.body = JSON.stringify(temp);
    })
  }else{
    const file = ctx.request.body.files.file;
    // console.log(' ctx.request.body.files.file 000000000000000000000 ',  ctx.request.body.files.file)
    await uploadFileDO(file, urlSufix).then((temp) =>{
      ctx.body = JSON.stringify(temp);
    })
  }
}

/**
 * uploadFileDO: Función encargada de subir el archivo a Spaces de Digital Ocean
*/
async function uploadFileDO(file, urlSufix, newFileName) {
  //El uri que vamos a consumir
  const fileServerEndpoint = `${process.env.BUCKET_ENDPOINT}`
  // Llave de acceso público
  const publicKey = `${process.env.BUCKET_PUBLIC_KEY}`
  // el prefijo de nuestro bucket
  const urlPrefix = `${process.env.BUCKET_PREFIX}`
  //llave de acceso secreta
  const secretKey = `${process.env.BUCKET_SECRET_KEY}`
  const spacesEndpoint = new aws.Endpoint(fileServerEndpoint);
  let fileName = ''
  if (!newFileName){
      fileName = file.name
  }else{
    fileName = newFileName
  }

  //objeto s3, que ejecutará la subida
  const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: publicKey,
    secretAccessKey: secretKey
  });
  //Ejecutamos el upload
  //console.log('Vamos a subir!: ', file.path)
  var url = urlSufix + newFileName + '_' + moment().valueOf()
  var generalPromise = await new Promise ((generalResolve, reject)=>{
    fs.readFile(file.path, async function (err, data ) {
      //console.log('1: ', data)
      //Representación del archivo a subir
      var params = {
        Body: data,
        Bucket: "byclo-space",
        Key:  url,
        ACL: 'public-read',
        ContentType: file.type,
      };

      var s3Result = await new Promise ((resolve, reject)=>{
        s3.putObject(params, (error, result) => {
          if(error){
            resolve(error)
          }else{
            resolve(result)
          }
        });
      })

      fsExtra.remove(file.path, (err) => {
        if (err) {
          console.log('Error eliminando archivo temporal: ', err);
        }
      });

      if (s3Result.message) {
        generalResolve({ 'error': 'Error subiendo archivo.' })
      }else {
        //console.log('3')
        //Imagen subida con éxito!
        // console.log('Éxito: ', data);
        generalResolve({ 'generatedUrl': urlPrefix + url })
        // return { 'generatedUrl': urlSufix + fileName };
      }
    })
  })
  // console.log("generalPromise ...................",generalPromise)
  return generalPromise;
};