import path from 'path';
import {saveToPDF} from './Utilities/pdfHelper'
import nunjucks from 'nunjucks';
import moment from 'moment';
import fs from 'fs';
import fsExtra from 'fs-extra';
import _ from 'lodash';
//import fs from '@mh-cbon/sudo-fs';
import Api from './Api';
import renderGeneralView from '../utilities/renderGeneralView';




async function generatePDFCertificate(form,params={}) {
  console.log('generate PDF CERTIFICATE !!!!! GO')
  console.log(form);
  form.creando.secondLastName == null ? form.creando.secondLastName='' : null
  var data = {
    documentNumber: `${form.creando.documentNumber}`,
    fullName: `${form.creando.name} ${form.creando.lastName} ${form.creando.secondLastName}`,
    semester:`${form.semester}`,
    date:`${form.date}`,
    job:`${form.job}`,
    area:`${form.area}`,
    period:`${form.period}`,
    hours:`${form.hours}`,
    documentType:`${form.documentType}`,
    signature: `${form.signature}`,
    language:`${form.language}`,
  }
  console.log("data para el pdf  ",data)
  if(data.documentType == 'CERTIFICATE' &&  data.language == 'SPANISH'){
    return await generatePDF(`../../views/dashboard/pages/pdf/certificate.html`,{certificate:data, title:''},'Certificado_Crea');
  }
  if(data.documentType == 'CONSTANCY' &&  data.language == 'SPANISH' ){
    return await generatePDF(`../../views/dashboard/pages/pdf/constancy.html`,{constancy:data, title:''},'Constancia_Crea');
  }
  if(data.documentType == 'CONSTANCY' &&  data.language == 'ENGLISH' ){
    return await generatePDF(`../../views/dashboard/pages/pdf/constancyEN.html`,{constancy:data, title:''},'Constancia_Crea');
  }
  if(data.documentType == 'CERTIFICATE' && data.language == 'ENGLISH'){
    return await generatePDF(`../../views/dashboard/pages/pdf/certificateEN.html`,{certificate:data, title:''},'Certificate_Crea');
  }

}




function generatePDF(routeTemplate,data,nameFile) {
  console.log("ENTRO A GENERAR PDF");
  console.log("val 1",routeTemplate)
  console.log("val 2",data)
  console.log("val 3",nameFile)
  return new Promise((resolve, reject) => {
    //Funcion que recibe el HTML TEMPLATE, DATA PARA LLENAR EL TEMPLATE, RUTA DONDE GUARDARA EL PDF GENERADO
    nunjucks.render(path.resolve(__dirname,routeTemplate),data,function(err, res) {
      //console.log('error nunjucks', err);
      //console.log(res)

      var folderGenerated = moment().valueOf();

      //Si no existe se creara una nueva carpeta donde estara el PDF
      var router = path.resolve(__dirname, './../../assets/pdf/'+folderGenerated);

      console.log("router ", router);

      if (!fs.existsSync(router)){
          fs.mkdirSync(router);
      }

      //Agregarmos el codigo de la evaluación como nombre del pdf a generar
      router= `${router}/${nameFile}.pdf`;

      console.log("router COmplete ", router);

      //Enviamos "res" que es el HTMl en texto y enviamos la ruta
      saveToPDF(res,path.resolve(__dirname, router),{},(err2, eer2)=>{
        console.log('generate');
        console.log(path.resolve(__dirname, router));
        console.log(err2)

        //Si se genera correctamente se devolvera la ruta para el Browser del PDF
        resolve(`/pdf/${folderGenerated}/${nameFile}.pdf`)
      })
    });
  })
}











function deleteByTimePDFs(){
  try {
    const directoryPath = path.resolve(__dirname, './../../assets/pdf/');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      console.log(directoryPath);
      files.forEach(function (file) {
        if(Number(file)!="Invalid date"){
          if(Number(file)<(moment().valueOf() - (10*60*1000))){
            deleteFolder(directoryPath,file);
          }
        }
        console.log(file);
      });
    });
  }
  catch(error) {
    console.error(error);
  }
};


function deleteFolder(directoryPath,file){
    fsExtra.remove(directoryPath+'/'+file, err => {
      console.error(err)
    })
};



  module.exports.certificatePDF = async (ctx,next) => {
    const body = ctx.request.body;

    var url = await generatePDFCertificate({
      creando:body.creando,
      semester:body.semesterCode,
      area:body.area,
      date: body.date,
      documentType:body.documentType,
      job:body.job,
      period:body.period,
      hours:body.hours,
      signature: body.signature,
      language:body.language })
    deleteByTimePDFs();
    ctx.body = JSON.stringify({url});
  };

  module.exports.generatefooter = async (ctx,next) => {
    console.log("entró a generatefooter")
    const _initialState = {
    }
    const viewData = {
      initialState: JSON.stringify(_initialState)
    }
    await renderGeneralView(ctx,'dashboard/pages/pdf/footer', viewData);
  };
