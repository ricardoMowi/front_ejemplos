import wkhtmltopdf from 'wkhtmltopdf';
import Xvfb from 'xvfb';
import path from 'path';
//Si se está testeando en un ambiente no-linux, comentar las líneas 8 y 23

const saveToPDF = async(template,saveTo,params,callback) => {
  var xvfb = new Xvfb();
  xvfb.startSync();
  wkhtmltopdf(template,{
    output: saveTo,
    encoding:'UTF-8',
    'footer-html':`http://intranet.creamas.org/pdf/resources/footer.html`,
    //'footer-font-size':params['footer-font-size'] || 7,
    //'footer-right':params['footer-right'] || 'Página [page] de [topage]',
    'margin-bottom':'3cm',
    //'footer-html':`http://drive.google.com/uc?export=view&id=1WWJFklhksnq40U8kdRcvhtZQa6_C8Zpd`,

  }, (err, eer)=>{
    console.log('err');
      console.log(err);
      console.log('eer');
        console.log(eer);
        xvfb.stopSync();
    callback(err, eer);
  });
}

export {
  saveToPDF
}
