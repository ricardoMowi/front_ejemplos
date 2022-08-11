import router from 'koa-router';
import GeneralRouter from './routers/GeneralRouter';
import ApiRouter from './routers/ApiRouter';

const Router = router();
Router.use(GeneralRouter.routes());
Router.use(ApiRouter.routes());

module.exports = Router;
