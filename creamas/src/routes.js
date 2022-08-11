import router from 'koa-router';
import DashboardRouter from './routers/DashboardRouter';
import ApiRouter from './routers/ApiRouter';
import GenerateRouter from './routers/GenerateRouter';
import UploadRouter from './routers/UploadRouter';

const Router = router();
Router.use(DashboardRouter.routes());
Router.use(ApiRouter.routes());
Router.use(GenerateRouter.routes());
Router.use(UploadRouter.routes());

module.exports = Router;
