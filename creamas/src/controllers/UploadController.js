import renderGeneralView from '../utilities/renderGeneralView';
import aws from 'aws-sdk';
import fs from 'fs';
import fsExtra from 'fs-extra';
import moment from 'moment';
import _ from 'lodash';


async function uploadFileDO(file, urlSufix, newFileName) {
  // console.log("entró a uploadFileDO")
  // console.log("url  ",urlSufix)
  // console.log("file  ",file)
  // console.log("newFileName  ",newFileName)
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
  var url = urlSufix
  if(newFileName){
    var url = urlSufix + fileName
  }else{
    var url = urlSufix + moment().valueOf() + '_' + fileName
  }
  var generalPromise = await new Promise ((generalResolve, reject)=>{
    fs.readFile(file.path, async function (err, data ) {
      //console.log('1: ', data)
      //Representación del archivo a subir
      var params = {
        Body: data,
        Bucket: "creamas-space",
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
        if (console.error(err)) {
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

module.exports.uploadImageEntidad = async (ctx,next) => {
  // var file = ctx.request.body.files['file0'];
  // //var response = await uploadFileS3(file,'productos/');
  // var response = await uploadFileS3(file,'');
  // ctx.body = JSON.stringify(response);
};

module.exports.uploadAttachment = async (ctx, next) => {
  // console.log("uploadAttachment ",ctx)
  const urlSufix = ctx.request.query.urlSufix
  // console.log('ctx.request 00000000000000000000000000 ', ctx.request.query.name);
  if (ctx.request.query.fileName){
    const fileName = ctx.request.query.fileName
    const file = ctx.request.body.files.file;
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
