import router from 'koa-router';
import body from 'koa-body';

import GenerateController from '../controllers/GenerateController';

const Router = router();
const koaBody = body();

Router.prefix('/generate');
Router.post('/pdfCertificate', koaBody, GenerateController.certificatePDF);
Router.get('/footer', GenerateController.generatefooter);

module.exports = Router;
