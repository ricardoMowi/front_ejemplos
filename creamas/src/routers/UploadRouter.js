import router from 'koa-router';
import body from 'koa-body';

import UploadController from '../controllers/UploadController';

const Router = router();
// const koaBody = body({patchNode:true, patchKoa:true, multipart: true,formidable:{uploadDir: './assets'},jsonLimit:'10mb'});
const koaBody = body({ multipart: true , jsonLimit:'10mb'});


Router.prefix('/upload');

Router.post('/uploadFile', koaBody, UploadController.uploadImageEntidad);
Router.post('/uploadAttachment', koaBody, UploadController.uploadAttachment);


module.exports = Router;
